import React from 'react';
import {
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  Sparkles,
  BotMessageSquare,
  Network,
  HelpCircle,
  FolderOpen,
  GraduationCap,
} from 'lucide-react';
import {
  LearningMaterial,
  StudentProgress,
  NavPage,
  MaterialConcept,
  StudentProfile,
} from '../types';
import { TopicBanner } from './TopicBanner';

interface DashboardViewProps {
  progress: StudentProgress;
  activeMaterial: LearningMaterial;
  materials: LearningMaterial[];
  studentProfile?: StudentProfile | null;
  onNavigateTab: (tab: NavPage) => void;
  onSelectConcept: (concept: MaterialConcept) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  activeMaterial,
  materials,
  studentProfile,
  onNavigateTab,
  onSelectConcept,
}) => {
  // Find recommended next topic from active material
  const recommendedConcept =
    activeMaterial.concepts.find(
      (c) => c.category === 'Core' || c.id === 'concept-transition-function'
    ) || activeMaterial.concepts[0];

  const studentName = studentProfile?.name || 'Student';
  const studentSubject = studentProfile?.subject || 'Computer Science';

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Current Topic Header Banner */}
      <div className="flex items-center justify-between">
        <TopicBanner
          subject={studentSubject}
          topic={activeMaterial.mainTopic || studentProfile?.topic || 'Finite Automata'}
        />
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Your {studentSubject} Learning Progress</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span>Welcome, {studentName}! 👋</span>
          </h1>

          <p className="text-indigo-200 text-sm leading-relaxed">
            <strong className="text-white font-semibold">Let's start learning {studentSubject}.</strong>{' '}
            {studentProfile?.topic
              ? `Focusing on ${studentProfile.topic} at the ${studentProfile.level} level to ${studentProfile.goal.toLowerCase()}.`
              : `Currently customized at the ${studentProfile?.level || 'Beginner'} level to ${studentProfile?.goal ? studentProfile.goal.toLowerCase() : 'understand core concepts'}.`}
          </p>

          {/* Student Profile Quick Tags */}
          {studentProfile && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <div className="px-3 py-1.5 bg-white/15 backdrop-blur-xs border border-white/20 rounded-xl text-white font-medium flex items-center gap-1.5 shadow-2xs">
                <span className="text-indigo-200 font-semibold">Level:</span>
                <span className="font-bold text-white">{studentProfile.level || 'Beginner'}</span>
              </div>
              <div className="px-3 py-1.5 bg-white/15 backdrop-blur-xs border border-white/20 rounded-xl text-white font-medium flex items-center gap-1.5 shadow-2xs">
                <span className="text-indigo-200 font-semibold">Goal:</span>
                <span className="font-bold text-white">{studentProfile.goal || 'Understand concepts'}</span>
              </div>
              <div className="px-3 py-1.5 bg-white/15 backdrop-blur-xs border border-white/20 rounded-xl text-white font-medium flex items-center gap-1.5 shadow-2xs">
                <span className="text-indigo-200 font-semibold">Current Topic:</span>
                <span className="font-bold text-white">
                  {activeMaterial.mainTopic || studentProfile.topic || 'Core Foundations'}
                </span>
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (recommendedConcept) onSelectConcept(recommendedConcept);
                onNavigateTab('learn');
              }}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 font-semibold rounded-xl text-white text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>Resume Learning: {recommendedConcept?.name || 'Next Concept'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('assessments')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 font-semibold rounded-xl text-white text-xs sm:text-sm transition-colors"
            >
              Take Practice Quiz
            </button>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
          <Network className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Learning Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {progress.overallPercentage}%
            </span>
            <span className="text-xs text-indigo-600 font-medium">
              {progress.overallPercentage > 0 ? `+${progress.overallPercentage}% achieved` : 'Ready to start'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(5, progress.overallPercentage)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Completed Topics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Completed Topics</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {progress.conceptsCompleted}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              of {progress.totalConcepts} core topics
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {progress.conceptsCompleted > 0
              ? `${progress.conceptsCompleted} concepts mastered`
              : `Explore ${activeMaterial.concepts[0]?.name || 'initial concept'}`}
          </p>
        </div>

        {/* Metric 3: Quiz Average */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Quiz Performance</span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {progress.quizzesTaken > 0 ? `${progress.quizAverage}%` : '—'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({progress.quizzesTaken} assessments)
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            {progress.quizzesTaken > 0
              ? `Average score: ${progress.quizAverage}%`
              : 'Take first quiz to test retention'}
          </p>
        </div>

        {/* Metric 4: Learning Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {progress.learningStreakDays} {progress.learningStreakDays === 1 ? 'Day' : 'Days'}
            </span>
            <span className="text-xs text-amber-600 font-semibold">Streak active</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {progress.studyTimeHours > 0 ? `${progress.studyTimeHours} hrs logged` : 'Daily focus goal set'}
          </p>
        </div>
      </div>

      {/* Recommended Next Topic & Weak Areas Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Next Topic Card (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                Recommended Next Topic
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Est. 30 mins
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {recommendedConcept?.name || 'Transition Function (δ)'}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {recommendedConcept?.shortSummary ||
                  'The mathematical mapping rule δ: Q × Σ → Q that guides deterministic state transitions for each input character.'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="font-semibold text-slate-800">Why this is recommended now:</div>
              <p className="text-slate-600 leading-relaxed">
                Structured core topic for {studentSubject} matched to your goal to {studentProfile?.goal?.toLowerCase() || 'understand concepts'} at the {studentProfile?.level || 'Beginner'} level.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Includes Visual Step Flow & Narration</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (recommendedConcept) onSelectConcept(recommendedConcept);
                  onNavigateTab('visual');
                }}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Network className="w-3.5 h-3.5" />
                <span>Open Visual Lesson</span>
              </button>
            </div>
          </div>
        </div>

        {/* Weak Topics & Knowledge Gaps Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-4">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Diagnosed Knowledge Gaps</span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Based on recent quiz assessments, review these specific subtopics to avoid losing exam points:
            </p>

            {progress.weakTopics && progress.weakTopics.length > 0 ? (
              <ul className="space-y-3">
                {progress.weakTopics.map((topic, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-rose-50/60 border border-rose-100 rounded-xl text-xs"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 block">{topic}</span>
                      <span className="text-[11px] text-rose-700">Needs review & practice</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-center space-y-1">
                <p className="text-xs font-semibold text-slate-700">No knowledge gaps detected yet!</p>
                <p className="text-[11px] text-slate-500">
                  Take your first practice quiz to identify areas for improvement.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('roadmap')}
            className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors text-center block"
          >
            Inspect Personalized Roadmap →
          </button>
        </div>
      </div>

      {/* Recent Materials & Quick Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Materials (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-indigo-600" />
              <span>Recent Learning Materials</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('materials')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              View all ({materials.length})
            </button>
          </div>

          <div className="space-y-3">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/80 rounded-xl border border-slate-200/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase">
                    {mat.fileType}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block leading-tight">
                      {mat.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {mat.fileName} • {mat.concepts.length} AI Concepts Extracted
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Ready
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectConcept(mat.concepts[0] || activeMaterial.concepts[0]);
                      onNavigateTab('learn');
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white transition-colors"
                    title="Study this module"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 mb-2">Instant Learning Tools</h3>

          <button
            type="button"
            onClick={() => onNavigateTab('tutor')}
            className="w-full p-3 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-950 rounded-xl border border-indigo-100 flex items-center gap-3 text-left transition-colors"
          >
            <BotMessageSquare className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <div className="text-xs font-bold">Ask AI Tutor</div>
              <div className="text-[11px] text-slate-600">Grounded in your uploaded syllabus</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('visual')}
            className="w-full p-3 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 rounded-xl border border-emerald-100 flex items-center gap-3 text-left transition-colors"
          >
            <Network className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-bold">Visual Flow & Narration</div>
              <div className="text-[11px] text-slate-600">Step-by-step interactive animations</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('assessments')}
            className="w-full p-3 bg-amber-50 hover:bg-amber-100/80 text-amber-950 rounded-xl border border-amber-100 flex items-center gap-3 text-left transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <div className="text-xs font-bold">Generate Practice Quiz</div>
              <div className="text-[11px] text-slate-600">Detect cognitive knowledge gaps</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
