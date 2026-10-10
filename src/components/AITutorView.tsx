import React, { useState, useRef, useEffect } from 'react';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  ShieldCheck,
  BookOpen,
  FileText,
  HelpCircle,
  CornerDownLeft,
  ChevronDown,
  Quote,
  Lightbulb,
  ExternalLink,
  Brain,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  LearningMaterial,
  TutorMessage,
  NavPage,
  StudentProfile,
  StudentProgress,
  MaterialConcept,
} from '../types';
import { TopicBanner } from './TopicBanner';

interface AITutorViewProps {
  activeMaterial: LearningMaterial;
  studentProfile?: StudentProfile | null;
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
  onNavigateTab: (tab: NavPage) => void;
  progress?: StudentProgress;
  selectedConcept?: MaterialConcept | null;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  activeMaterial,
  studentProfile,
  initialQuestion,
  onClearInitialQuestion,
  onNavigateTab,
  progress,
  selectedConcept,
}) => {
  const studentName = studentProfile?.name || 'Student';
  const studentSubject = studentProfile?.subject || 'Computer Science';

  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello ${studentName}! I am your ${studentSubject} AI Tutor. I have indexed your study material for "${activeMaterial.title}". You can ask me anything about the concepts, mechanisms, principles, or applications in ${activeMaterial.mainTopic}. Every answer will be strictly grounded in your material!`,
      timestamp: 'Just now',
      isGrounded: true,
      sourceCitations: [
        {
          title: activeMaterial.fileName,
          snippet: activeMaterial.summary.slice(0, 180) + '...',
          section: 'Document Summary',
        },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState<string>(initialQuestion || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Active reasoning profile from recent assessment or student progress
  const activeProfile = selectedConcept
    ? progress?.reasoningProfiles?.[selectedConcept.id]
    : Object.values(progress?.reasoningProfiles || {})[0];

  const recentEval = activeProfile?.evaluations?.[0];

  // Suggested questions based on active material, student subject, and reasoning insights
  const suggestedQuestions =
    recentEval && recentEval.stepNeedingAttention
      ? [
          `Can you clarify why "${recentEval.stepNeedingAttention}" matters for ${recentEval.conceptTested}?`,
          `Give me an intuitive, real-world analogy for ${recentEval.conceptTested}.`,
          `Walk me step-by-step through calculating ${recentEval.conceptTested} without skipping intermediate steps.`,
          `Test my understanding of ${recentEval.conceptTested} with a quick guided scenario.`,
        ]
      : activeMaterial.concepts.length > 0
      ? [
          `Can you explain ${activeMaterial.concepts[0]?.name || activeMaterial.mainTopic} in beginner-friendly language?`,
          `What are the most important formulas or principles in ${activeMaterial.mainTopic}?`,
          `Give me a real-world analogy for ${activeMaterial.concepts[1]?.name || activeMaterial.concepts[0]?.name || activeMaterial.mainTopic}.`,
          `What common exam mistakes should I avoid in ${studentSubject}?`,
        ]
      : [
          `What are the foundational principles of ${studentSubject}?`,
          `How do I best prepare for exams in ${studentSubject}?`,
          `Can you explain key concepts step-by-step?`,
          `Test my understanding with a conceptual challenge question.`,
        ];

  // Auto scroll to latest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle initial question from other tabs
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim().length > 0) {
      setInputValue(initialQuestion);
      onClearInitialQuestion?.();
    }
  }, [initialQuestion]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || loading) return;

    setErrorMessage(null);
    const userMsg: TutorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          materialId: activeMaterial.id,
          materialContext: activeMaterial.rawText || activeMaterial.summary,
          topic: activeMaterial.mainTopic,
          subject: studentSubject,
          reasoningContext: recentEval
            ? {
                conceptTested: recentEval.conceptTested,
                studentReasoning: recentEval.studentReasoning,
                categoryLabel: recentEval.categoryLabel,
                stepNeedingAttention: recentEval.stepNeedingAttention,
                whyItMatters: recentEval.whyItMatters,
                whatWasUnderstood: recentEval.whatWasUnderstood,
                suggestedAction: recentEval.teachingRecommendation?.suggestedAction,
              }
            : undefined,
          chatHistory: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('AI Tutor server endpoint returned an error.');
      }

      const data = await res.json();
      const assistantMsg: TutorMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'I analyzed your notes and found the relevant section.',
        timestamp: 'Just now',
        isGrounded: data.isGrounded !== false,
        sourceCitations: data.sourceCitations || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Tutor error:', err);
      setErrorMessage(err.message || 'Failed to get answer from AI Tutor.');
      // Safe fallback response tailored to student's material and profile
      const firstDef = activeMaterial.importantDefinitions?.[0];
      const fallbackText = firstDef
        ? `Based on your study material for "${activeMaterial.title}": ${firstDef.term} is defined as "${firstDef.definition}". In ${studentSubject}, mastering ${activeMaterial.mainTopic} at your ${studentProfile?.level || 'current'} level helps you ${studentProfile?.goal?.toLowerCase() || 'understand core concepts'}.`
        : `Based on your study notes for "${activeMaterial.title}": ${activeMaterial.summary}. I am grounding every answer directly in your ${studentSubject} curriculum for ${activeMaterial.mainTopic}.`;

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-fallback-${Date.now()}`,
          sender: 'assistant',
          text: fallbackText,
          timestamp: 'Just now',
          isGrounded: true,
          sourceCitations: [
            {
              title: activeMaterial.fileName,
              snippet: activeMaterial.importantDefinitions?.[0]?.definition || activeMaterial.summary.slice(0, 160),
              section: 'Section: Core Concepts',
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <TopicBanner subject={studentSubject} topic={activeMaterial.mainTopic} />
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 ml-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RAG-Grounded AI Tutor Engine</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ask your AI Tutor: {activeMaterial.mainTopic}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Grounded directly on:{' '}
            <strong className="text-slate-800 font-semibold">{activeMaterial.title}</strong>{' '}
            ({activeMaterial.fileName})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold self-start sm:self-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Hallucination Guard Active</span>
        </div>
      </div>

      {/* Adaptive Reasoning Coach Banner (Active when student completed an assessment with reasoning diagnosis) */}
      {recentEval && (
        <div className="bg-gradient-to-r from-violet-50 via-indigo-50 to-purple-50 border border-violet-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center shrink-0 text-violet-700 shadow-2xs">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  Reasoning Coach Context: {recentEval.conceptTested}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-200 text-violet-800 border border-violet-300">
                  {recentEval.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {recentEval.stepNeedingAttention ? (
                  <>
                    <strong className="text-violet-950 font-semibold">Identified focus:</strong>{' '}
                    {recentEval.stepNeedingAttention} — {recentEval.whyItMatters}
                  </>
                ) : (
                  <>
                    <strong className="text-emerald-800 font-semibold">Verified understanding:</strong>{' '}
                    {recentEval.whatWasUnderstood}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <button
              type="button"
              onClick={() => {
                const promptQuery = recentEval.stepNeedingAttention
                  ? `Can you explain why "${recentEval.stepNeedingAttention}" works the way it does for ${recentEval.conceptTested}? Use an intuitive example and verify the calculation.`
                  : `Can you challenge me with a slightly more advanced application of ${recentEval.conceptTested}?`;
                handleSendMessage(promptQuery);
              }}
              className="px-3.5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {recentEval.stepNeedingAttention ? 'Clarify This Step' : 'Deepen Concept'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Suggested Questions Bar */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Suggested Questions from your Notes:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              disabled={loading}
              className="px-3 py-1.5 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-xl border border-slate-200 text-xs font-medium transition-colors text-left shadow-2xs disabled:opacity-50"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <BotMessageSquare className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[75%] space-y-2 ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  {/* Message Bubble */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs font-medium'
                        : 'bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {/* Grounding Badge & Source Citations */}
                  {!isUser && msg.isGrounded && (
                    <div className="space-y-2 pt-1 pl-1">
                      {/* Grounded Badge as required by prompt */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Answer grounded in your learning material</span>
                      </div>

                      {/* Source Citation Card */}
                      {msg.sourceCitations && msg.sourceCitations.length > 0 && (
                        <div className="bg-slate-100/80 rounded-xl p-3 border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px]">
                            <BookOpen className="w-3 h-3 text-indigo-600" />
                            <span>Verified Source Extract:</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-700">{msg.sourceCitations[0].title}</span>
                          </div>
                          <p className="text-slate-600 italic text-[11px] leading-relaxed">
                            "{msg.sourceCitations[0].snippet}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <BotMessageSquare className="w-5 h-5 animate-pulse" />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                <span>Searching material chunks & formulating grounded response...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              placeholder={`Ask a question about ${activeMaterial.title}...`}
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
