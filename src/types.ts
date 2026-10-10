export type NavPage =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'materials'
  | 'learn'
  | 'tutor'
  | 'visual'
  | 'assessments'
  | 'roadmap'
  | 'progress'
  | 'settings';

export type StudentSubject =
  | 'Computer Science'
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Other';

export type StudentLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Primary'
  | 'Secondary'
  | 'Undergraduate';

export type StudentLearningGoal =
  | 'Understand concepts'
  | 'Prepare for exams'
  | 'Improve weak topics'
  | 'Practice questions'
  | 'Learn from my notes';

export interface StudentProfile {
  name: string;
  subject: string;
  level: StudentLevel;
  goal: StudentLearningGoal;
  topic?: string;
  isOnboarded: boolean;
}

export interface MaterialConcept {
  id: string;
  name: string;
  category: string;
  shortSummary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  simpleExplanation?: string;
  detailedExplanation?: string;
  analogy?: string;
  keyPoints?: string[];
  formulaOrSyntax?: string;
  example?: string;
}

export interface ChapterSummaryData {
  overview: string;
  keyConcepts: Array<{ name: string; summary: string }>;
  formulas: Array<{ name: string; formula: string; explanation: string }>;
  quickRevisionNotes: string[];
  learningOutcomes: string[];
  importantTakeaways: string[];
}

export interface InteractiveCheckpoint {
  sceneIndex: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  fileType: 'pdf' | 'text' | 'image' | 'notes';
  fileName: string;
  uploadDate: string;
  status: 'ready' | 'processing' | 'error';
  summary: string;
  mainTopic: string;
  subtopics: string[];
  concepts: MaterialConcept[];
  importantDefinitions: Array<{ term: string; definition: string }>;
  importantFormulas: Array<{ name: string; formula: string; explanation: string }>;
  difficultConcepts: string[];
  prerequisites: string[];
  suggestedLearningOrder: string[];
  learningObjectives?: string[];
  learningOutcomes?: string[];
  conceptRelationships?: Array<{ source: string; target: string; type: string }>;
  rawText?: string;
  chunks?: string[];
}

export interface VisualStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  stateLabel?: string;
  nodeType: 'start' | 'process' | 'decision' | 'action' | 'accept' | 'reject';
  highlight?: boolean;
  notes?: string;
  keywords?: string[]; // Synchronized key terms for speech/visual sync
  annotation?: string; // Visual diagram annotation
}

export interface VisualLesson {
  id: string;
  conceptId: string;
  conceptTitle: string;
  diagramType: 'state-machine' | 'flowchart' | 'process' | 'concept-map';
  overview: string;
  steps: VisualStep[];
  analogy: string;
  narrationScript: string;
  interactiveTips: string[];
  chapterSummary?: ChapterSummaryData;
  checkpoint?: InteractiveCheckpoint;
  targetLevel?: StudentLevel;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  conceptTested: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface KnowledgeGapDetail {
  questionId: string;
  conceptTested: string;
  gapType: string;
  diagnosis: string;
  recommendedAction: string;
}

export type ReasoningCategory =
  | 'correct_sound' // A. Correct answer with sound reasoning
  | 'correct_incomplete' // B. Correct answer with incomplete reasoning
  | 'incorrect_conceptual' // C. Incorrect answer caused by a likely conceptual misunderstanding
  | 'incorrect_procedural' // D. Incorrect answer caused by a likely calculation or procedural error
  | 'incorrect_misinterpretation' // E. Incorrect answer caused by a likely misinterpretation of the question
  | 'partially_correct' // F. Partially correct reasoning with an incomplete conclusion
  | 'insufficient_evidence' // G. Insufficient evidence to identify the difficulty
  | 'unsure_needs_guidance'; // H. Student is unsure and needs guided support

export interface StudentReasoningInput {
  questionId: string;
  selectedOptionIndex: number;
  reasoningText: string;
  isUnsure?: boolean;
}

export interface AdaptiveTeachingRecommendation {
  approach:
    | 'simplify'
    | 'prerequisite'
    | 'analogy'
    | 'step_by_step'
    | 'visual_diagram'
    | 'contrast_misconception'
    | 'partial_solution'
    | 'guiding_question'
    | 'challenge_application';
  approachLabel: string;
  guidanceText: string;
  suggestedAction: string;
}

export interface QuestionReasoningEvaluation {
  questionId: string;
  conceptTested: string;
  selectedOptionIndex: number;
  correctAnswerIndex: number;
  isAnswerCorrect: boolean;
  studentReasoning: string;
  reasoningCategory: ReasoningCategory;
  categoryLabel: string;
  whatWasUnderstood: string;
  stepNeedingAttention?: string;
  whyItMatters: string;
  matchedExplanation: string;
  targetedExampleOrVisual?: string;
  clarifyingOrGuidingQuestion?: string;
  teachingRecommendation: AdaptiveTeachingRecommendation;
  followUpQuestion?: QuizQuestion;
  confidence: 'High' | 'Moderate' | 'Tentative';
}

export interface ConceptReasoningProfile {
  conceptId: string;
  conceptTitle: string;
  subject: string;
  topic: string;
  lastAssessedAt: string;
  totalAttempts: number;
  soundReasoningCount: number;
  demonstratedWithSoundReasoning: boolean;
  understandsNeedsPractice: boolean;
  possibleMisconceptionsToVerify: string[];
  repeatedProceduralDifficulties: string[];
  recommendedNextStep: string;
  confidenceLevel: 'High' | 'Moderate' | 'Tentative';
  recentReasoningCategory?: ReasoningCategory;
  evaluations: QuestionReasoningEvaluation[];
}

export interface QuizSubmissionResult {
  quizId: string;
  conceptId: string;
  conceptTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  strongAreas: string[];
  weakAreas: string[];
  knowledgeGaps: KnowledgeGapDetail[];
  recommendedNextSteps: string[];
  reasoningEvaluations?: QuestionReasoningEvaluation[];
  overallReasoningSummary?: string;
  recommendedAdaptiveAction?: string;
}

export interface QuizAssessment {
  id: string;
  materialId: string;
  conceptId: string;
  conceptTitle: string;
  questions: QuizQuestion[];
  userAnswers?: Record<number, number>; // questionIndex -> chosen optionIndex
  userReasoning?: Record<string, string>; // questionId -> reasoning text
  score?: number;
  totalQuestions?: number;
  percentage?: number;
  submittedAt?: string;
  strongAreas?: string[];
  weakAreas?: string[];
  knowledgeGaps?: string[];
  recommendation?: string;
  reasoningEvaluations?: QuestionReasoningEvaluation[];
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  level: 'Foundation' | 'Core' | 'Advanced' | 'Mastery' | string;
  stage?: 'Foundations' | 'Core Concepts' | 'Advanced Concepts' | 'Mastery' | string;
  order: number;
  status:
    | 'Completed'
    | 'In Progress'
    | 'Recommended'
    | 'Needs Improvement'
    | 'Locked'
    | 'completed'
    | 'in_progress'
    | 'recommended'
    | 'needs_improvement'
    | 'locked';
  prerequisites: string[];
  conceptId?: string;
  estimatedMinutes: number;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isGrounded?: boolean;
  sourceCitations?: Array<{
    title: string;
    snippet: string;
    section?: string;
  }>;
}

export interface StudentProgress {
  overallPercentage: number;
  conceptsCompleted: number;
  totalConcepts: number;
  quizzesTaken: number;
  quizAverage: number;
  learningStreakDays: number;
  studyTimeHours: number;
  strongTopics: string[];
  weakTopics: string[];
  reasoningProfiles?: Record<string, ConceptReasoningProfile>; // conceptId -> reasoning profile
  recentActivities: Array<{
    id: string;
    type: 'quiz' | 'lesson' | 'upload' | 'chat';
    title: string;
    timestamp: string;
    score?: number;
    reasoningCategory?: ReasoningCategory;
  }>;
}
