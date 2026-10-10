import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Volume2,
  Cpu,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Sliders,
  User,
  Edit3,
  GraduationCap,
  Target,
  LogOut,
} from 'lucide-react';
import { StudentProfile } from '../types';

interface SettingsViewProps {
  studentProfile?: StudentProfile | null;
  onEditProfile?: () => void;
  onLogout?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  studentProfile,
  onEditProfile,
  onLogout,
}) => {
  const [learningStyle, setLearningStyle] = useState<'visual' | 'concise' | 'rigorous'>('visual');
  const [narrationSpeed, setNarrationSpeed] = useState<number>(1.0);
  const [autoQuizAfterVisual, setAutoQuizAfterVisual] = useState<boolean>(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Application & Learning Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize student profile details, AI models, voice synthesis, and learning preferences.
        </p>
      </div>

      {/* Student Profile Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <User className="w-5 h-5 text-indigo-600" />
            <span>Student Learning Profile</span>
          </div>
          <div className="flex items-center gap-2">
            {onEditProfile && (
              <button
                type="button"
                onClick={onEditProfile}
                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
                title="Log out of student session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Name</span>
            <div className="text-sm font-bold text-slate-900">{studentProfile?.name || 'Not configured'}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Subject</span>
            <div className="text-sm font-bold text-slate-900">{studentProfile?.subject || 'Computer Science'}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Level</span>
            <div className="text-sm font-bold text-slate-900">{studentProfile?.level || 'Beginner'}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 sm:col-span-2 lg:col-span-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Learning Goal</span>
            <div className="text-sm font-bold text-slate-900">{studentProfile?.goal || 'Understand concepts'}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Current Topic</span>
            <div className="text-sm font-bold text-slate-900">{studentProfile?.topic || 'Foundational Principles'}</div>
          </div>
        </div>
      </div>

      {/* Backend & Security Architecture Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Security & Infrastructure Status</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">AI Model</span>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>Gemini 3.8 Flash (Multimodal)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Low-latency JSON structured output and vision processing.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">API Key Security</span>
            <div className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strictly Server-Side Proxied</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Gemini API keys are never exposed to browser dev tools or client code.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Cognitive Learning Preferences</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Primary Explanation Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'visual', label: 'Visual & Analogies', desc: 'Focuses on real-world examples and step diagrams' },
                { id: 'concise', label: 'Concise Bullet Points', desc: 'Fast summaries for quick review' },
                { id: 'rigorous', label: 'Academic Formalisms', desc: 'Mathematical proofs and formal tuple notation' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setLearningStyle(style.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    learningStyle === style.id
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-950'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-0.5">{style.label}</div>
                  <div className="text-[11px] text-slate-500">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">
                Auto-Prompt Practice Quiz After Visual Lesson
              </div>
              <div className="text-[11px] text-slate-500">
                Reinforces memory immediately after stepping through state diagrams
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoQuizAfterVisual}
              onChange={(e) => setAutoQuizAfterVisual(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Voice & Narration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-indigo-600" />
          <span>Speech Synthesis Narration Settings</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Default Narration Rate</span>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
              {narrationSpeed}x
            </span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.5"
            step="0.05"
            value={narrationSpeed}
            onChange={(e) => setNarrationSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.75x (Slower)</span>
            <span>1.0x (Normal)</span>
            <span>1.5x (Faster)</span>
          </div>
        </div>
      </div>

      {/* Account & Session Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Account & Session</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {studentProfile?.name
              ? `Signed in as ${studentProfile.name} (${studentProfile.subject || 'Student'}). Log out to clear session and return to the home page.`
              : 'End the current session and return to the landing page.'}
          </p>
        </div>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 self-start sm:self-center"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        )}
      </div>
    </div>
  );
};
