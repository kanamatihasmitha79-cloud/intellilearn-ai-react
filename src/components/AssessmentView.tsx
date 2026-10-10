import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BarChart3,
  Lightbulb,
  Compass,
  Check,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  MessageSquare,
  BotMessageSquare,
  Mic,
  Brain,
  HelpCircle as QuestionIcon,
} from 'lucide-react';
import {
  LearningMaterial,
  MaterialConcept,
  QuizAssessment,
  QuizSubmissionResult,
  NavPage,
  StudentProfile,
  QuestionReasoningEvaluation,
  QuizQuestion,
} from '../types';
import { createQuizForConcept } from '../data/personalizationHelper';
import {
  evaluateStudentReasoningLocally,
  generateFollowUpVerificationQuestion,
  REASONING_CATEGORY_META,
} from '../data/reasoningEngine';
import { TopicBanner } from './TopicBanner';

interface AssessmentViewProps {
  activeMaterial: LearningMaterial;
  selectedConcept: MaterialConcept | null;
  studentProfile?: StudentProfile | null;
  onNavigateTab: (tab: NavPage) => void;
  onQuizCompleted: (result: QuizSubmissionResult) => void;
  onSetTutorQuestion?: (question: string) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  activeMaterial,
  selectedConcept,
  studentProfile,
  onNavigateTab,
  onQuizCompleted,
  onSetTutorQuestion,
}) => {
  const currentConcept = selectedConcept || activeMaterial.concepts[0];
  const studentSubject = studentProfile?.subject || 'Computer Science';

  const [quiz, setQuiz] = useState<QuizAssessment>(() =>
    createQuizForConcept(currentConcept, activeMaterial.mainTopic, studentSubject)
  );
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [reasoningInputs, setReasoningInputs] = useState<Record<string, string>>({});
  const [unsureFlags, setUnsureFlags] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<QuizSubmissionResult | null>(null);
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [activeFollowUpQuestion, setActiveFollowUpQuestion] = useState<QuizQuestion | null>(null);
  const [followUpAnswer, setFollowUpAnswer] = useState<number | null>(null);
  const [followUpSubmitted, setFollowUpSubmitted] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);

  // Sync quiz whenever current concept or main topic changes
  useEffect(() => {
    if (!currentConcept) return;

    setIsSubmitted(false);
    setSubmissionResult(null);
    setSelectedAnswers({});
    setReasoningInputs({});
    setUnsureFlags({});
    setCurrentQuestionIndex(0);
    setActiveFollowUpQuestion(null);
    setFollowUpAnswer(null);
    setFollowUpSubmitted(false);

    const generated = createQuizForConcept(
      currentConcept,
      activeMaterial.mainTopic,
      studentSubject
    );
    setQuiz(generated);
  }, [currentConcept?.id, activeMaterial.mainTopic, studentSubject]);

  // Generate new quiz via API
  const handleGenerateQuiz = async () => {
    setLoadingQuiz(true);
    setIsSubmitted(false);
    setSubmissionResult(null);
    setSelectedAnswers({});
    setReasoningInputs({});
    setUnsureFlags({});
    setCurrentQuestionIndex(0);
    setActiveFollowUpQuestion(null);
    setFollowUpAnswer(null);
    setFollowUpSubmitted(false);

    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conceptName: currentConcept?.name || activeMaterial.mainTopic,
          context: currentConcept?.detailedExplanation || currentConcept?.shortSummary || '',
          conceptId: currentConcept?.id || 'concept-active',
          questionCount: 5,
          topic: activeMaterial.mainTopic,
          subject: studentSubject,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.quiz) {
          setQuiz(data.quiz);
        } else if (data.questions && data.questions.length > 0) {
          setQuiz({
            id: `quiz-${Date.now()}`,
            materialId: activeMaterial.id,
            conceptId: currentConcept?.id || 'concept-active',
            conceptTitle: currentConcept?.name || activeMaterial.mainTopic,
            questions: data.questions,
          });
        }
      }
    } catch (e) {
      console.error('Quiz generation error:', e);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleReasoningChange = (questionId: string, text: string) => {
    if (isSubmitted) return;
    setReasoningInputs((prev) => ({
      ...prev,
      [questionId]: text,
    }));
    if (unsureFlags[questionId]) {
      setUnsureFlags((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const handleToggleUnsure = (questionId: string) => {
    if (isSubmitted) return;
    const nextState = !unsureFlags[questionId];
    setUnsureFlags((prev) => ({ ...prev, [questionId]: nextState }));
    if (nextState) {
      setReasoningInputs((prev) => ({
        ...prev,
        [questionId]: "I'm not sure how to solve this step yet.",
      }));
    }
  };

  const handleVoiceInputSim = (questionId: string) => {
    if (isRecordingVoice || isSubmitted) return;
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      const samplePhases = [
        `I chose this option because I set up the formula and calculated step by step.`,
        `I thought about the sample space and favorable outcomes for this experiment.`,
        `I looked at the transition rules from the start state to the final accepting state.`,
      ];
      const randomPhase = samplePhases[Math.floor(Math.random() * samplePhases.length)];
      setReasoningInputs((prev) => ({
        ...prev,
        [questionId]: prev[questionId] ? `${prev[questionId]} ${randomPhase}` : randomPhase,
      }));
    }, 1200);
  };

  const handleSubmitQuiz = async () => {
    setEvaluating(true);
    try {
      // Analyze every question response with its written reasoning
      const evaluatedQuestions: QuestionReasoningEvaluation[] = [];

      for (const q of quiz.questions) {
        const chosen = selectedAnswers[q.id];
        const studentText = reasoningInputs[q.id] || '';
        const isUnsure = unsureFlags[q.id] || false;

        let evalResult: QuestionReasoningEvaluation | null = null;

        // Try AI Reasoning Engine endpoint
        try {
          const res = await fetch('/api/reasoning/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: q,
              selectedOptionIndex: chosen,
              studentReasoning: studentText,
              isUnsure,
              subject: studentSubject,
              topic: activeMaterial.mainTopic,
              conceptName: q.conceptTested || currentConcept?.name,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.evaluation) {
              evalResult = data.evaluation;
            }
          }
        } catch (e) {
          // Will fall back to local rule-based engine below
        }

        // Local robust fallback if server is offline or returned null
        if (!evalResult) {
          evalResult = evaluateStudentReasoningLocally({
            question: q,
            selectedOptionIndex: chosen !== undefined ? chosen : -1,
            reasoningText: studentText,
            isUnsure,
            subject: studentSubject,
            topic: activeMaterial.mainTopic,
          });
        }

        // Ensure follow-up question is available
        if (!evalResult.followUpQuestion) {
          evalResult.followUpQuestion = generateFollowUpVerificationQuestion({
            originalQuestion: q,
            reasoningCategory: evalResult.reasoningCategory,
            subject: studentSubject,
            topic: activeMaterial.mainTopic,
          });
        }

        evaluatedQuestions.push(evalResult);
      }

      // Calculate score and summary
      let correctCount = 0;
      evaluatedQuestions.forEach((eq) => {
        if (eq.isAnswerCorrect) correctCount++;
      });

      const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);

      // Build knowledge gaps & diagnostic insights
      const gapDetails = evaluatedQuestions
        .filter((eq) => !eq.isAnswerCorrect || eq.reasoningCategory === 'correct_incomplete')
        .map((eq) => ({
          questionId: eq.questionId,
          conceptTested: eq.conceptTested,
          gapType: eq.categoryLabel,
          diagnosis: eq.stepNeedingAttention
            ? `Attention on ${eq.stepNeedingAttention}: ${eq.whyItMatters}`
            : eq.whatWasUnderstood,
          recommendedAction: eq.teachingRecommendation.suggestedAction,
        }));

      const finalSubmission: QuizSubmissionResult = {
        quizId: quiz.id,
        conceptId: quiz.conceptId,
        conceptTitle: quiz.conceptTitle,
        score: scorePercent,
        totalQuestions: quiz.questions.length,
        correctCount,
        strongAreas:
          evaluatedQuestions
            .filter((eq) => eq.reasoningCategory === 'correct_sound')
            .map((eq) => eq.conceptTested)
            .slice(0, 3) || [`${quiz.conceptTitle} Core Rules`],
        weakAreas:
          evaluatedQuestions
            .filter((eq) => !eq.isAnswerCorrect)
            .map((eq) => eq.conceptTested)
            .slice(0, 3) || [],
        knowledgeGaps: gapDetails,
        recommendedNextSteps: [
          `Review the reasoning breakdown for missed steps below`,
          `Attempt the follow-up verification check to confirm understanding`,
        ],
        reasoningEvaluations: evaluatedQuestions,
        overallReasoningSummary:
          scorePercent >= 80
            ? 'Demonstrated strong conceptual mastery with articulated reasoning.'
            : 'Good effort. Specific conceptual and calculation steps identified below for targeted improvement.',
        recommendedAdaptiveAction: evaluatedQuestions.find((eq) => !eq.isAnswerCorrect)
          ?.teachingRecommendation.suggestedAction || 'Advance to next topic milestone.',
      };

      setSubmissionResult(finalSubmission);
      setIsSubmitted(true);
      onQuizCompleted(finalSubmission);
    } catch (err) {
      console.error('Submission evaluation error:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const currentQ = quiz.questions[currentQuestionIndex];
  const allAnswered = quiz.questions.every((q) => selectedAnswers[q.id] !== undefined);
  const currentEvaluation = submissionResult?.reasoningEvaluations?.find(
    (e) => e.questionId === currentQ?.id
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <TopicBanner subject={studentSubject} topic={activeMaterial.mainTopic} />
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 ml-1">
              <Brain className="w-4 h-4 text-violet-600" />
              <span>Reasoning-Aware Cognitive Assessment</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Check Understanding for {quiz.conceptTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            We evaluate your answer <em>and your thinking</em> together. We diagnose the reasoning behind your choice, detect misconceptions, and adapt subsequent teaching.
          </p>
        </div>

        <button
          type="button"
          disabled={loadingQuiz || evaluating}
          onClick={handleGenerateQuiz}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-center disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Generate New AI Questions</span>
        </button>
      </div>

      {/* Submission Results / Diagnostic Report */}
      {isSubmitted && submissionResult && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xs ${
                  submissionResult.score >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : submissionResult.score >= 60
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {submissionResult.score}%
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Assessment Completed: {submissionResult.correctCount} / {submissionResult.totalQuestions} Correct
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {submissionResult.overallReasoningSummary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateTab('roadmap')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Updated Roadmap</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('progress')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Reasoning Profile</span>
              </button>
            </div>
          </div>

          {/* Reasoning Diagnostics Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Demonstrated Strengths */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Sound Reasoning</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {submissionResult.strongAreas && submissionResult.strongAreas.length > 0 ? (
                  submissionResult.strongAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{area}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500">Practice explanations to build sound reasoning proofs.</li>
                )}
              </ul>
            </div>

            {/* Targeted Guidance Queue */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Brain className="w-4 h-4 text-amber-600" />
                <span>Targeted Learning Opportunity</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {submissionResult.weakAreas && submissionResult.weakAreas.length > 0 ? (
                  submissionResult.weakAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{area} (Reviewing specific step)</span>
                    </li>
                  ))
                ) : (
                  <li className="text-emerald-700 font-semibold">
                    No persistent cognitive gaps! High conceptual fluency verified.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Question Meta Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs">
            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-slate-500 font-medium">
              Concept Tested: <strong className="text-slate-700">{currentQ.conceptTested}</strong>
            </span>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const isCorrect = isSubmitted && optIdx === currentQ.correctAnswerIndex;
              const isWrongSelected = isSubmitted && isSelected && !isCorrect;

              let optionStyle =
                'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800';

              if (isSelected && !isSubmitted) {
                optionStyle =
                  'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold ring-2 ring-indigo-500/20';
              } else if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isWrongSelected) {
                  optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                      isSelected && !isSubmitted
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : isSubmitted && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isSubmitted && isWrongSelected
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white text-slate-600 border-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="text-sm leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Reasoning Input Box (Only when option selected, before/after submission) */}
          {selectedAnswers[currentQ.id] !== undefined && (
            <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor={`reasoning-${currentQ.id}`}
                  className="text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Why did you choose this answer? (Explain your thinking)</span>
                </label>
                {!isSubmitted && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleVoiceInputSim(currentQ.id)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg border flex items-center gap-1 transition-all ${
                        isRecordingVoice
                          ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Accessible Voice Input"
                    >
                      <Mic className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{isRecordingVoice ? 'Listening...' : 'Voice Input'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleUnsure(currentQ.id)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                        unsureFlags[currentQ.id]
                          ? 'bg-sky-100 text-sky-800 border-sky-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {unsureFlags[currentQ.id] ? "✓ I'm not sure (No penalty)" : "I'm not sure"}
                    </button>
                  </div>
                )}
              </div>

              {!isSubmitted ? (
                <>
                  <textarea
                    id={`reasoning-${currentQ.id}`}
                    rows={2}
                    value={reasoningInputs[currentQ.id] || ''}
                    onChange={(e) => handleReasoningChange(currentQ.id, e.target.value)}
                    placeholder="Describe your steps, the rule you used, or what you understood from the question (short explanation in your own words)..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 placeholder:text-slate-400 bg-white leading-relaxed resize-none transition-colors"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Partial explanations and honest hesitation are welcomed without penalty.
                    </span>
                    <span>
                      {reasoningInputs[currentQ.id]?.trim() ? '✓ Reasoning recorded' : 'Optional prompt'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900 block mb-1">Your Explanation:</span>
                  <p className="italic text-slate-600">
                    "{reasoningInputs[currentQ.id] || "I didn't write an explanation."}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Reasoning Diagnostic Card (Displayed after submission) */}
          {isSubmitted && currentEvaluation && (
            <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 rounded-2xl border border-indigo-200 space-y-4 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {REASONING_CATEGORY_META[currentEvaluation.reasoningCategory]?.icon || '🧠'}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Reasoning Diagnosis: {currentEvaluation.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Diagnosis Confidence: {currentEvaluation.confidence}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    REASONING_CATEGORY_META[currentEvaluation.reasoningCategory]?.badgeColor ||
                    'bg-slate-100 text-slate-800'
                  }`}
                >
                  {currentEvaluation.isAnswerCorrect ? 'Answer Correct' : 'Needs Calibration'}
                </span>
              </div>

              {/* What was understood */}
              <div className="text-xs text-slate-800 space-y-1">
                <strong className="text-emerald-800 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>What You Understood:</span>
                </strong>
                <p className="text-slate-700 pl-5 leading-relaxed">
                  {currentEvaluation.whatWasUnderstood}
                </p>
              </div>

              {/* Step needing attention */}
              {currentEvaluation.stepNeedingAttention && (
                <div className="text-xs text-slate-800 space-y-1">
                  <strong className="text-amber-800 block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Step Needing Attention: {currentEvaluation.stepNeedingAttention}</span>
                  </strong>
                  <p className="text-slate-700 pl-5 leading-relaxed">
                    <strong>Why it matters:</strong> {currentEvaluation.whyItMatters}
                  </p>
                </div>
              )}

              {/* Matched Explanation */}
              <div className="p-3.5 bg-white rounded-xl border border-indigo-100 text-xs space-y-1.5">
                <strong className="text-indigo-950 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Personalized Pedagogical Explanation:</span>
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  {currentEvaluation.matchedExplanation}
                </p>
              </div>

              {/* Targeted Example or Visual */}
              {currentEvaluation.targetedExampleOrVisual && (
                <div className="p-3 bg-indigo-950 text-indigo-100 rounded-xl font-mono text-[11px] space-y-1 border border-indigo-900">
                  <span className="text-indigo-300 font-bold block">
                    Targeted Example / Trace:
                  </span>
                  <p className="whitespace-pre-line">
                    {currentEvaluation.targetedExampleOrVisual}
                  </p>
                </div>
              )}

              {/* Guiding Question */}
              {currentEvaluation.clarifyingOrGuidingQuestion && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <strong className="flex items-center gap-1.5 text-amber-950">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Guiding Question:</span>
                  </strong>
                  <p className="leading-relaxed">
                    {currentEvaluation.clarifyingOrGuidingQuestion}
                  </p>
                </div>
              )}

              {/* Adaptive Teaching Recommendation & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-indigo-700 font-semibold">
                  Adaptive Approach: {currentEvaluation.teachingRecommendation.approachLabel}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSetTutorQuestion) {
                        onSetTutorQuestion(
                          `Regarding question "${currentQ.question}", I reasoned: "${currentEvaluation.studentReasoning}". Can you explain why "${currentEvaluation.stepNeedingAttention || currentEvaluation.conceptTested}" works this way using an analogy?`
                        );
                        onNavigateTab('tutor');
                      }
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <BotMessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Ask AI Tutor to Clarify</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveFollowUpQuestion(currentEvaluation.followUpQuestion || null);
                      setFollowUpAnswer(null);
                      setFollowUpSubmitted(false);
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <QuestionIcon className="w-3.5 h-3.5" />
                    <span>Try Follow-up Question</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Follow-Up Verification Check Modal / Section */}
          {activeFollowUpQuestion && isSubmitted && (
            <div className="p-5 bg-white rounded-2xl border-2 border-violet-400 shadow-sm space-y-4 animate-scale-up">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-violet-600" />
                  <span>Adaptive Verification Check: {activeFollowUpQuestion.conceptTested}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveFollowUpQuestion(null)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-sm font-bold text-slate-900 leading-relaxed">
                {activeFollowUpQuestion.question}
              </p>

              <div className="space-y-2">
                {activeFollowUpQuestion.options.map((opt, i) => {
                  const isChosen = followUpAnswer === i;
                  const isCorrect = followUpSubmitted && i === activeFollowUpQuestion.correctAnswerIndex;
                  const isWrong = followUpSubmitted && isChosen && !isCorrect;

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={followUpSubmitted}
                      onClick={() => setFollowUpAnswer(i)}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950'
                          : isWrong
                          ? 'bg-rose-50 border-rose-500 font-bold text-rose-950'
                          : isChosen
                          ? 'bg-violet-50 border-violet-500 font-bold text-violet-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px]">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!followUpSubmitted ? (
                <button
                  type="button"
                  disabled={followUpAnswer === null}
                  onClick={() => setFollowUpSubmitted(true)}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Verify My Understanding</span>
                </button>
              ) : (
                <div className="p-3 bg-violet-50 rounded-xl border border-violet-200 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-violet-900 block">
                    {followUpAnswer === activeFollowUpQuestion.correctAnswerIndex
                      ? '🎉 Understanding Successfully Verified! Your reasoning profile has been strengthened.'
                      : 'Step Still Needs Attention. Revisit the visual walkthrough and AI Tutor.'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {activeFollowUpQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={() => {
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                setActiveFollowUpQuestion(null);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {quiz.questions.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setActiveFollowUpQuestion(null);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentQuestionIndex
                      ? 'bg-indigo-600 scale-125'
                      : selectedAnswers[q.id] !== undefined
                      ? 'bg-indigo-300'
                      : 'bg-slate-200'
                  }`}
                  title={`Question ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setActiveFollowUpQuestion(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : !isSubmitted ? (
                <button
                  type="button"
                  disabled={evaluating || !allAnswered}
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>{evaluating ? 'Analyzing Student Reasoning...' : 'Submit Answers & Diagnose Reasoning'}</span>
                  <Check className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
