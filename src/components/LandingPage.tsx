import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Network,
  BotMessageSquare,
  HelpCircle,
  Compass,
  FileText,
  BarChart3,
} from 'lucide-react';
import { NavPage } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigateTab?: (tab: NavPage) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onNavigateTab,
}) => {
  const featureList = [
    {
      title: 'Multimodal Material Ingestion',
      description:
        'Upload textbooks, lecture PDFs, slide decks, or handwritten notebook photos. Gemini extracts structure, definitions, formulas, and prerequisites automatically.',
      icon: FileText,
      accent: 'bg-blue-500/10 text-blue-600 border-blue-200',
    },
    {
      title: 'Interactive Visual Lessons',
      description:
        'Convert dry theory into step-by-step state machine diagrams, biological cycle flowcharts, and animated logic flows with built-in voice narration.',
      icon: Network,
      accent: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    },
    {
      title: 'RAG-Grounded AI Tutor',
      description:
        'Ask deep questions and get instant answers strictly anchored to your uploaded syllabus. Every explanation links directly to verified source citations.',
      icon: BotMessageSquare,
      accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    },
    {
      title: 'Adaptive AI Assessments',
      description:
        'Generate conceptual multiple-choice exams on demand with comprehensive explanations. Zero spoiler leakage before submission.',
      icon: HelpCircle,
      accent: 'bg-amber-500/10 text-amber-600 border-amber-200',
    },
    {
      title: 'Knowledge Gap Detection',
      description:
        'Identifies exact cognitive misconceptions, reveals missing prerequisites, and diagnoses why an answer failed instead of just scoring numbers.',
      icon: BarChart3,
      accent: 'bg-rose-500/10 text-rose-600 border-rose-200',
    },
    {
      title: 'Personalized Learning Roadmap',
      description:
        'Dynamic prerequisite tree that reorganizes after every quiz, highlighting your optimal next milestone from Foundation to Mastery.',
      icon: Compass,
      accent: 'bg-purple-500/10 text-purple-600 border-purple-200',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Study Material',
      description: 'Drag in PDFs, lecture slides, documents, or photos of handwritten notes.',
    },
    {
      step: '02',
      title: 'AI Content Extraction',
      description: 'Gemini breaks down key concepts, definitions, formulas, and suggested order.',
    },
    {
      step: '03',
      title: 'Explore Visual Flowcharts',
      description: 'Interact with animated state graphs and listen to synced AI voice narration.',
    },
    {
      step: '04',
      title: 'Target Gaps & Advance',
      description: 'Take adaptive quizzes, isolate weak areas, and progress along your personal roadmap.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-indigo-50/40 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6 shadow-xs animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI-Powered Visual Learning Engine for Complex Subjects</span>
          </div>

          {/* Main Title & Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
            Turn complex study material into{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              visual, personalized learning.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            IntelliLearn AI transforms textbooks, PDFs, and handwritten notes into simple explanations,
            interactive visual diagrams, grounded AI tutoring, and adaptive mastery roadmaps.
          </p>

          {/* Primary Action Button */}
          <div className="mt-10 flex items-center justify-center">
            <button
              type="button"
              onClick={onGetStarted}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-base"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 text-indigo-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Comprehensive Learning Intelligence
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Six interconnected engines engineered for deep comprehension
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${feature.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-100/60 rounded-3xl my-12 border border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            The IntelliLearn Workflow
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            From raw study files to verified subject mastery
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/80 relative">
              <span className="text-3xl font-black text-indigo-100 block mb-2 font-mono">
                {s.step}
              </span>
              <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-4xl mx-auto px-4 text-center py-20">
        <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-10 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to experience intelligent visual learning?
          </h3>
          <p className="text-indigo-200 text-sm sm:text-base max-w-xl mx-auto">
            Set up your personalized learning path or upload study materials to start learning with Gemini AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onGetStarted}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl text-white shadow-md transition-colors flex items-center gap-2 text-base"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-indigo-200" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
