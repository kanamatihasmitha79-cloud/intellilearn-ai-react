import React from 'react';
import {
  TrendingUp,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  ArrowRight,
  BarChart2,
  Calendar,
  Sparkles,
  Brain,
  MessageSquare,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import {
  StudentProgress,
  LearningMaterial,
  NavPage,
  StudentProfile,
  ConceptReasoningProfile,
} from '../types';
import { TopicBanner } from './TopicBanner';
import { REASONING_CATEGORY_META } from '../data/reasoningEngine';

interface ProgressViewProps {
  progress: StudentProgress;
  activeMaterial: LearningMaterial;
  studentProfile?: StudentProfile | null;
  onNavigateTab: (tab: NavPage) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  activeMaterial,
  studentProfile,
  onNavigateTab,
}) => {
  // Mock weekly study time breakdown
  const weeklyActivity = [
    { day: 'Mon', hours: 1.2 },
    { day: 'Tue', hours: 0.8 },
    { day: 'Wed', hours: 2.1 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 1.0 },
    { day: 'Sat', hours: 2.4 },
    { day: 'Sun (Today)', hours: 0.8 },
  ];

  const studentSubject = studentProfile?.subject || 'Computer Science';

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <TopicBanner subject={studentSubject} topic={activeMaterial.mainTopic} />
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 ml-1">
              <TrendingUp className="w-4 h-4" />
              <span>Learning Analytics & Cognitive Growth</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Performance Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracking retention, quiz consistency, and topic mastery across your active courses.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-900 px-3.5 py-1.5 rounded-full border border-amber-200 text-xs font-semibold self-start sm:self-center">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{progress.learningStreakDays} Days Streak Active</span>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Mastery</span>
          <div className="text-3xl font-extrabold text-slate-900">{progress.overallPercentage}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full"
              style={{ width: `${progress.overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Topics Mastered</span>
          <div className="text-3xl font-extrabold text-slate-900">
            {progress.conceptsCompleted} / {progress.totalConcepts}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">3 topics this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Quiz Average</span>
          <div className="text-3xl font-extrabold text-slate-900">{progress.quizAverage}%</div>
          <span className="text-[11px] text-slate-500 font-medium">
            Across {progress.quizzesTaken} assessments
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">Study Time</span>
          <div className="text-3xl font-extrabold text-slate-900">{progress.studyTimeHours} hrs</div>
          <span className="text-[11px] text-indigo-600 font-medium">+9.8 hrs this week</span>
        </div>
      </div>

      {/* Weekly Study Activity Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Weekly Study Engagement (Hours)</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Target: 1.5 hrs/day</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4 items-end h-48 border-b border-slate-100 pb-3">
          {weeklyActivity.map((item, idx) => {
            const heightPercent = Math.round((item.hours / 2.5) * 100);
            const isToday = idx === weeklyActivity.length - 1;

            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.hours}h
                </span>
                <div className="w-full max-w-[40px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-32">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-indigo-600 to-violet-500'
                        : 'bg-indigo-200 group-hover:bg-indigo-300'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-500">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strong Areas vs Weak Areas Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Demonstrated Topic Mastery</span>
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              High Retention
            </span>
          </div>

          <div className="space-y-3">
            {progress.strongTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">{topic}</span>
                </div>
                <span className="text-emerald-700 font-semibold">100% Correct</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosed Weak Topics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Targeted Revision Queue</span>
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {progress.weakTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div>
                    <span className="font-bold text-slate-900 block">{topic}</span>
                    <span className="text-[11px] text-slate-500">Missed in recent quiz</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateTab('learn')}
                  className="px-3 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg font-semibold transition-colors text-[11px]"
                >
                  Review Concept
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Reasoning Profile (Educational Evidence Record) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Personalized Reasoning Profile</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Educational evidence across your explanations: understanding patterns, verified rules, and adaptive next steps.
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-violet-100 text-violet-800 font-semibold self-start sm:self-center flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5" />
            <span>Reasoning-Aware Engine</span>
          </span>
        </div>

        {/* Categories of Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sound Reasoning Verified</span>
            </span>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {progress.strongTopics.length > 0
                ? progress.strongTopics.join(', ')
                : 'Complete an assessment with reasoning to verify principles.'}
            </p>
            <span className="text-[11px] text-emerald-600 block font-medium">Confidence: High</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide block flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Conceptual Misconceptions to Clarify</span>
            </span>
            <p className="text-xs text-amber-800 leading-relaxed">
              {progress.weakTopics.length > 0
                ? progress.weakTopics.join(', ')
                : 'No recurring misconceptions detected.'}
            </p>
            <span className="text-[11px] text-amber-600 block font-medium">Under active calibration</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wide block flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Procedural / Arithmetic Checks</span>
            </span>
            <p className="text-xs text-blue-800 leading-relaxed">
              Double-check calculation steps, sample space counting, and edge constraints.
            </p>
            <span className="text-[11px] text-blue-600 block font-medium">Next Step: Verification practice</span>
          </div>
        </div>

        {/* Concept-by-Concept Tracked Understanding Profiles */}
        {progress.reasoningProfiles && Object.keys(progress.reasoningProfiles).length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tracked Concept Profiles & Diagnostic Evidence
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(Object.values(progress.reasoningProfiles) as ConceptReasoningProfile[]).map((prof) => {
                const meta = prof.recentReasoningCategory
                  ? REASONING_CATEGORY_META[prof.recentReasoningCategory]
                  : null;

                return (
                  <div
                    key={prof.conceptId}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-2">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">
                          {prof.conceptTitle}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {prof.soundReasoningCount} sound proof{prof.soundReasoningCount !== 1 ? 's' : ''} out of {prof.totalAttempts} check{prof.totalAttempts !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {meta && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${meta.badgeColor}`}
                        >
                          {meta.label}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 text-slate-700">
                      {prof.possibleMisconceptionsToVerify.length > 0 && (
                        <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                          <strong>Active misconception notice:</strong>{' '}
                          {prof.possibleMisconceptionsToVerify.join('; ')}
                        </div>
                      )}
                      {prof.repeatedProceduralDifficulties.length > 0 && (
                        <div className="text-[11px] text-blue-800 bg-blue-50 p-2 rounded-lg border border-blue-200">
                          <strong>Procedural checkpoint:</strong>{' '}
                          {prof.repeatedProceduralDifficulties.join('; ')}
                        </div>
                      )}
                      <div className="text-slate-600">
                        <strong className="text-slate-800">Adaptive Next Step:</strong>{' '}
                        {prof.recommendedNextStep || 'Continue to practice follow-up verification.'}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/50">
                      <button
                        type="button"
                        onClick={() => onNavigateTab('assessments')}
                        className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-200 font-semibold text-[11px] transition-colors flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3 text-indigo-600" />
                        <span>Check Understanding</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateTab('tutor')}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-[11px] transition-colors flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Ask AI Tutor</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Reasoning Activity Timeline */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Recent Assessment Reasoning History
          </h4>
          <div className="space-y-2">
            {progress.recentActivities.slice(0, 5).map((act, i) => {
              const categoryMeta = act.reasoningCategory
                ? REASONING_CATEGORY_META[act.reasoningCategory]
                : null;

              return (
                <div
                  key={act.id || i}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <div>
                      <span className="font-semibold text-slate-800 block">{act.title}</span>
                      {categoryMeta && (
                        <span className="text-[10px] text-slate-500 font-medium">
                          Diagnosis: {categoryMeta.label}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    {act.score !== undefined && (
                      <span className="font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {act.score}%
                      </span>
                    )}
                    <span>{act.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
