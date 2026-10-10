import 'dotenv/config';
import express from 'express';
import path from 'path';
import {
  analyzeLearningMaterial,
  understandConceptDeepDive,
  chatWithAITutor,
  generateVisualLessonData,
  generateQuizAssessment,
  evaluateKnowledgeGaps,
  analyzeStudentReasoningWithAI,
  isGeminiConfigured,
} from './server/geminiService';
import { DEMO_FINITE_AUTOMATA, DEMO_VISUAL_LESSONS, DEMO_PRELOADED_QUIZ } from './src/data/demoMaterial';
import { LearningMaterial } from './src/types';

// In-memory materials storage, seeded with the verified hackathon demo material
const materialsStore: Map<string, LearningMaterial> = new Map();
materialsStore.set(DEMO_FINITE_AUTOMATA.id, DEMO_FINITE_AUTOMATA);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Cloud Run and environment sanity check
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    console.warn('[Startup] Warning: GEMINI_API_KEY is not configured or uses placeholder. Application will start normally and use offline curriculum fallback until key is configured.');
  } else {
    console.log('[Startup] GEMINI_API_KEY detected and ready.');
  }

  // Support JSON and urlencoded bodies with 50mb limit for base64 file payloads (images/PDFs)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check endpoint for Cloud Run and monitoring
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      port: PORT,
    });
  });

  // API Health status endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      geminiConfigured: isGeminiConfigured(),
      materialsCount: materialsStore.size,
    });
  });

  // Get all materials
  app.get('/api/materials', (req, res) => {
    const list = Array.from(materialsStore.values());
    res.json({ materials: list });
  });

  // Get specific material by ID
  app.get('/api/materials/:id', (req, res) => {
    const mat = materialsStore.get(req.params.id);
    if (!mat) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json({ material: mat });
  });

  // Analyze uploaded material
  app.post('/api/materials/analyze', async (req, res) => {
    try {
      const { title, fileType, fileName, text, base64Data, mimeType } = req.body;
      if (!fileName && !text && !base64Data) {
        return res.status(400).json({ error: 'Please provide either a document file or text content.' });
      }

      const analyzed = await analyzeLearningMaterial({
        title: title || fileName || 'Uploaded Document',
        fileType: fileType || 'text',
        fileName: fileName || 'Uploaded_Notes.txt',
        text,
        base64Data,
        mimeType,
      });

      const newId = `mat-${Date.now()}`;
      const completeMaterial: LearningMaterial = {
        id: newId,
        title: analyzed.title || 'Extracted Study Notes',
        fileType: analyzed.fileType || 'text',
        fileName: analyzed.fileName || 'Notes.txt',
        uploadDate: analyzed.uploadDate || new Date().toISOString().split('T')[0],
        status: 'ready',
        summary: analyzed.summary || '',
        mainTopic: analyzed.mainTopic || 'General Study Material',
        subtopics: analyzed.subtopics || [],
        concepts: analyzed.concepts || [],
        importantDefinitions: analyzed.importantDefinitions || [],
        importantFormulas: analyzed.importantFormulas || [],
        difficultConcepts: analyzed.difficultConcepts || [],
        prerequisites: analyzed.prerequisites || [],
        suggestedLearningOrder: analyzed.suggestedLearningOrder || [],
        rawText: analyzed.rawText || text || '',
        chunks: analyzed.chunks || [],
      };

      materialsStore.set(newId, completeMaterial);
      res.json({ material: completeMaterial });
    } catch (error: any) {
      console.error('Server error analyzing material:', error);
      res.status(500).json({
        error: error.message || 'Failed to analyze material with Gemini AI.',
      });
    }
  });

  // Understand Concept Deep Dive
  app.post('/api/materials/understand-concept', async (req, res) => {
    try {
      const { conceptName, context } = req.body;
      if (!conceptName) {
        return res.status(400).json({ error: 'conceptName is required' });
      }
      const data = await understandConceptDeepDive(conceptName, context || '');
      res.json(data);
    } catch (error: any) {
      console.error('Server error understanding concept:', error);
      res.status(500).json({ error: error.message || 'Failed to analyze concept.' });
    }
  });

  // AI Tutor RAG Chat
  app.post('/api/tutor/chat', async (req, res) => {
    try {
      const { question, chatHistory, materialId, materialContext, topic, subject, reasoningContext } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Question cannot be empty.' });
      }

      let context = materialContext || '';
      let chunks: string[] = [];

      if (materialId && materialsStore.has(materialId)) {
        const mat = materialsStore.get(materialId)!;
        context = mat.rawText || mat.summary || '';
        chunks = mat.chunks || [];
      }

      const answer = await chatWithAITutor({
        question,
        chatHistory,
        materialContext: context,
        chunks,
        topic,
        subject,
        reasoningContext,
      });

      res.json(answer);
    } catch (error: any) {
      console.error('Server error in tutor chat:', error);
      res.status(500).json({ error: error.message || 'AI Tutor failed to respond.' });
    }
  });

  // Generate Visual Lesson
  app.post('/api/visual/generate', async (req, res) => {
    try {
      const { conceptName, context, conceptId, topic, subject, isDemo } = req.body;
      if (!conceptName) {
        return res.status(400).json({ error: 'conceptName is required' });
      }

      const isAutomata =
        Boolean(isDemo) ||
        (topic && (topic.toLowerCase().includes('automata') || topic.toLowerCase().includes('toc') || topic.toLowerCase().includes('formal language'))) ||
        (conceptName && (conceptName.toLowerCase().includes('automata') || conceptName.toLowerCase().includes('dfa') || conceptName.toLowerCase().includes('nfa')));

      // If requested for DFA and matches preloaded visual lesson in demo/automata mode, return high precision demo
      if (isAutomata && conceptId && DEMO_VISUAL_LESSONS[conceptId]) {
        return res.json({ lesson: DEMO_VISUAL_LESSONS[conceptId] });
      }

      const lesson = await generateVisualLessonData(conceptName, context || '', topic, subject);
      res.json({ lesson });
    } catch (error: any) {
      console.error('Server error in visual generation:', error);
      res.status(500).json({ error: error.message || 'Failed to generate visual lesson.' });
    }
  });

  // Generate Quiz Assessment
  app.post('/api/quiz/generate', async (req, res) => {
    try {
      const { conceptName, context, conceptId, count, questionCount, materialId, topic, subject } = req.body;
      if (!conceptName) {
        return res.status(400).json({ error: 'conceptName is required' });
      }

      const numQuestions = count || questionCount || 5;

      // If requested for DFA concept demo, we can return the verified demo quiz or generate fresh
      if (conceptId === 'concept-dfa' && (!context || context.length < 50)) {
        const quizObj = {
          id: `quiz-dfa-demo`,
          materialId: materialId || 'mat-demo',
          conceptId: 'concept-dfa',
          conceptTitle: conceptName,
          questions: DEMO_PRELOADED_QUIZ.questions,
        };
        return res.json({ quiz: quizObj, questions: DEMO_PRELOADED_QUIZ.questions });
      }

      const questions = await generateQuizAssessment(conceptName, context || '', numQuestions, topic, subject);
      const quizObj = {
        id: `quiz-${conceptId || 'gen'}-${Date.now()}`,
        materialId: materialId || 'mat-active',
        conceptId: conceptId || 'concept-active',
        conceptTitle: conceptName,
        questions,
      };

      res.json({ quiz: quizObj, questions });
    } catch (error: any) {
      console.error('Server error in quiz generation:', error);
      res.status(500).json({ error: error.message || 'Failed to generate quiz.' });
    }
  });

  // Evaluate Quiz & Knowledge Gaps
  app.post('/api/quiz/evaluate', async (req, res) => {
    try {
      const { conceptName, conceptTitle, questions, userAnswers, answers } = req.body;
      const finalAnswers = userAnswers || answers;
      if (!questions || !finalAnswers) {
        return res.status(400).json({ error: 'questions and user answers are required' });
      }

      const diagnosis = await evaluateKnowledgeGaps({
        conceptName: conceptName || conceptTitle || 'Subject Concept',
        questions,
        userAnswers: finalAnswers,
      });

      // Construct a full evaluation result object
      const resultObj = {
        quizId: req.body.quizId || `quiz-${Date.now()}`,
        conceptId: req.body.conceptId || 'concept-active',
        conceptTitle: req.body.conceptTitle || conceptName || 'Quiz Assessment',
        score: diagnosis.percentage,
        totalQuestions: diagnosis.total,
        correctCount: diagnosis.score,
        gapDetails: (diagnosis.weakAreas || []).map((w: string) => ({
          conceptName: w,
          severity: 'moderate',
          explanation: `Identified gap during ${conceptName || 'concept'} assessment. Needs practice on ${w}.`,
          recommendedAction: `Review: ${w}`,
        })),
        recommendation: diagnosis.recommendation,
        strongAreas: diagnosis.strongAreas,
        weakAreas: diagnosis.weakAreas,
      };

      res.json({ result: resultObj, ...diagnosis });
    } catch (error: any) {
      console.error('Server error evaluating quiz:', error);
      res.status(500).json({ error: error.message || 'Failed to evaluate quiz.' });
    }
  });

  // Analyze Student Reasoning (AI-Powered Educational Diagnostic)
  app.post('/api/reasoning/analyze', async (req, res) => {
    try {
      const {
        question,
        selectedOptionIndex,
        studentReasoning,
        isUnsure,
        subject,
        topic,
        conceptName,
        previousAttempts,
      } = req.body;

      if (!question || selectedOptionIndex === undefined) {
        return res.status(400).json({ error: 'question and selectedOptionIndex are required' });
      }

      const evaluation = await analyzeStudentReasoningWithAI({
        question,
        selectedOptionIndex: Number(selectedOptionIndex),
        studentReasoning: studentReasoning || '',
        isUnsure: Boolean(isUnsure),
        subject,
        topic,
        conceptName,
        previousAttempts,
      });

      res.json({ evaluation });
    } catch (error: any) {
      console.error('Server error analyzing student reasoning:', error);
      res.status(500).json({ error: error.message || 'Failed to analyze reasoning.' });
    }
  });

  // Vite middleware in dev; static file serving in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Any unhandled /api requests return a 404 JSON response
    app.all('/api/*', (req, res) => {
      res.status(404).json({ error: 'API route not found' });
    });
    // Single-page application fallback to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IntelliLearn AI server running on port ${PORT} bound to 0.0.0.0`);
  });
}

startServer();
