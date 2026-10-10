import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  User,
  GraduationCap,
  Target,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BrainCircuit,
  Compass,
} from 'lucide-react';
import {
  StudentProfile,
  StudentSubject,
  StudentLevel,
  StudentLearningGoal,
  NavPage,
} from '../types';
import {
  DEFAULT_SUBJECT_OPTIONS,
  LEARNING_GOAL_OPTIONS,
  LEVEL_OPTIONS,
} from '../data/personalizationHelper';

interface StudentOnboardingViewProps {
  initialProfile?: StudentProfile | null;
  onComplete?: (profile: StudentProfile) => void;
  onCompleteOnboarding?: (profile: StudentProfile) => void;
  onCancel?: () => void;
  onBackToLanding?: () => void;
  isEditing?: boolean;
}

export const StudentOnboardingView: React.FC<StudentOnboardingViewProps> = ({
  initialProfile,
  onComplete,
  onCompleteOnboarding,
  onCancel,
  onBackToLanding,
  isEditing = false,
}) => {
  const [name, setName] = useState<string>(initialProfile?.name || '');
  const [subject, setSubject] = useState<string>(initialProfile?.subject || '');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [level, setLevel] = useState<StudentLevel>(initialProfile?.level || 'Beginner');
  const [goal, setGoal] = useState<StudentLearningGoal>(
    initialProfile?.goal || 'Understand concepts'
  );
  const [topic, setTopic] = useState<string>(initialProfile?.topic || '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Safe caller for profile completion
  const handleDone = (profile: StudentProfile) => {
    if (onComplete) {
      onComplete(profile);
    } else if (onCompleteOnboarding) {
      onCompleteOnboarding(profile);
    }
  };

  // Safe caller for cancel/back
  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else if (onBackToLanding) {
      onBackToLanding();
    }
  };

  // Determine current active step based on progress
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  const handleNextStep = () => {
    setErrorMessage(null);
    if (activeStep === 1) {
      if (!name.trim()) {
        setErrorMessage('Please enter your name.');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      const finalSubject = subject === 'Other' ? customSubject.trim() : subject.trim();
      if (!finalSubject) {
        setErrorMessage('Please select a subject.');
        return;
      }
      setActiveStep(3);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (activeStep > 1) {
      setActiveStep((prev) => (prev - 1) as 1 | 2);
    } else {
      handleBack();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage(null);

    const trimmedName = name.trim();
    const finalSubject = subject === 'Other' ? customSubject.trim() : subject.trim();

    // Required field validation as specified:
    if (!trimmedName) {
      setErrorMessage('Please enter your name.');
      setActiveStep(1);
      return;
    }

    if (!finalSubject) {
      setErrorMessage('Please select a subject.');
      setActiveStep(2);
      return;
    }

    setIsSubmitting(true);

    const profile: StudentProfile = {
      name: trimmedName,
      subject: finalSubject,
      level,
      goal,
      topic: topic.trim() || undefined,
      isOnboarded: true,
    };

    // Temporarily show "Starting your learning journey..." before transition
    setTimeout(() => {
      try {
        handleDone(profile);
      } finally {
        setIsSubmitting(false);
      }
    }, 450);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl">
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isEditing ? 'Update Student Profile' : 'AI Student Personalization'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isEditing ? 'Edit Your Learning Profile' : 'Personalize Your Learning Experience'}
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Tell IntelliLearn AI about your learning focus so we can tailor visual lessons, AI tutoring, assessments, and roadmaps specifically for you.
          </p>
        </div>

        {/* Multi-Step Progress Indicator */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-6 h-0.5 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
            />

            {[
              { num: 1, label: 'Your Identity' },
              { num: 2, label: 'Subject & Level' },
              { num: 3, label: 'Goal & Focus' },
            ].map((st) => {
              const isCompleted = activeStep > st.num;
              const isCurrent = activeStep === st.num;
              return (
                <button
                  type="button"
                  key={st.num}
                  onClick={() => {
                    if (st.num < activeStep) setActiveStep(st.num as 1 | 2 | 3);
                    else if (st.num === 2 && name.trim()) setActiveStep(2);
                    else if (st.num === 3 && name.trim() && (subject !== 'Other' || customSubject.trim())) setActiveStep(3);
                  }}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-400 border-2 border-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 ${
                      isCurrent ? 'text-indigo-700' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Friendly Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-800 animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-0.5">Please check required information:</span>
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Onboarding Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* STEP 1: Student Name */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step 1 of 3
                </span>
                <h2 className="text-xl font-bold text-slate-900">What is your name?</h2>
                <p className="text-xs text-slate-500">
                  We will use this to address you, track your mastery streak, and personalize tutor responses.
                </p>
              </div>

              <div>
                <label htmlFor="student-name-input" className="block text-xs font-bold text-slate-700 mb-2">
                  Student Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="student-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNextStep();
                      }
                    }}
                    placeholder="e.g., Hasmitha"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Required. No fake or random names will be used.
                </p>
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-indigo-600 shrink-0" />
                <p className="text-xs text-indigo-900">
                  Your personalized dashboard will greet you directly as{' '}
                  <strong className="font-semibold text-indigo-950">
                    {name.trim() ? `Welcome, ${name.trim()}! 👋` : 'Welcome, [Your Name]! 👋'}
                  </strong>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Subject & Current Level */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step 2 of 3
                </span>
                <h2 className="text-xl font-bold text-slate-900">Choose your Subject & Level</h2>
                <p className="text-xs text-slate-500">
                  Select the academic domain you want to master. We adapt diagrams and tutor terminology accordingly.
                </p>
              </div>

              {/* Subject Cards */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5">
                  Subject of Study <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DEFAULT_SUBJECT_OPTIONS.map((subj) => {
                    const isSelected = subject === subj.name;
                    return (
                      <button
                        type="button"
                        key={subj.name}
                        onClick={() => {
                          setSubject(subj.name);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50/80'
                        }`}
                      >
                        <div>
                          <span className="text-2xl mb-1.5 block">{subj.icon}</span>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">
                            {subj.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                          {subj.category}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {subject === 'Other' && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specify Subject Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder="e.g., Economics, Psychology, Statistics..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-xs font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Current Level */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Current Knowledge Level <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {LEVEL_OPTIONS.map((lvl) => {
                    const isSelected = level === lvl.id;
                    return (
                      <button
                        type="button"
                        key={lvl.id}
                        onClick={() => setLevel(lvl.id as StudentLevel)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 mb-1">{lvl.label}</div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{lvl.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Learning Goal & Optional Specific Topic */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step 3 of 3
                </span>
                <h2 className="text-xl font-bold text-slate-900">Learning Goal & Specific Topic</h2>
                <p className="text-xs text-slate-500">
                  Select your primary objective and optionally specify an exact topic to start with.
                </p>
              </div>

              {/* Learning Goal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Primary Learning Goal <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-2.5">
                  {LEARNING_GOAL_OPTIONS.map((g) => {
                    const isSelected = goal === g.id;
                    return (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => setGoal(g.id as StudentLearningGoal)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{g.icon}</span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{g.label}</span>
                            <span className="text-[11px] text-slate-500">{g.desc}</span>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional: Specific Topic */}
              <div className="pt-2 border-t border-slate-100">
                <label htmlFor="student-topic-input" className="block text-xs font-bold text-slate-700 mb-1">
                  Optional: Specific Topic you want to learn first
                </label>
                <input
                  id="student-topic-input"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={
                    subject === 'Computer Science'
                      ? 'e.g., Data Structures, DFA, Algorithms...'
                      : subject === 'Mathematics'
                      ? 'e.g., Calculus, Probability, Linear Algebra...'
                      : subject === 'Physics'
                      ? 'e.g., Classical Mechanics, Electromagnetism...'
                      : 'e.g., Molecular Bonding, Genetics, Thermodynamics...'
                  }
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 transition-colors"
                />

                {/* Popular Topics Quick Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] font-semibold text-slate-400">Popular:</span>
                  {(subject === 'Computer Science'
                    ? ['Data Structures', 'Operating Systems', 'Computer Networks', 'DBMS', 'Machine Learning', 'Finite Automata']
                    : subject === 'Probability & Statistics'
                    ? ['Probability', 'Mean', 'Standard Deviation', 'Conditional Probability', 'Normal Distribution']
                    : subject === 'Mathematics'
                    ? ['Probability & Statistics', 'Calculus', 'Linear Algebra', 'Discrete Math']
                    : subject === 'Physics'
                    ? ['Classical Mechanics', 'Electromagnetism', 'Quantum Mechanics', 'Thermodynamics']
                    : subject === 'Biology'
                    ? ['Photosynthesis', 'Digestive System', 'Cellular Respiration', 'Genetics']
                    : subject === 'Chemistry'
                    ? ['Chemical Bonding', 'Electronegativity', 'Thermodynamics', 'Atomic Structure']
                    : ['Fundamental Principles', 'Applied Theory', 'Core Concepts']
                  ).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                        topic.toLowerCase() === t.toLowerCase()
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 mt-1.5">
                  Leave blank to start with recommended foundations for{' '}
                  <strong className="text-slate-700 font-semibold">{subject === 'Other' ? customSubject || 'your subject' : subject}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Action Button Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{activeStep === 1 ? 'Back to Overview' : 'Previous'}</span>
            </button>

            {activeStep < 3 ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="onboarding-continue-button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="start-learning-button-quick"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isSubmitting
                      ? 'bg-indigo-400 text-white cursor-not-allowed'
                      : 'border border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>Starting your learning journey...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Start Learning</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                type="button"
                id="start-learning-button"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
                className={`px-7 py-3 rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all flex items-center gap-2 ${
                  isSubmitting
                    ? 'bg-indigo-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Starting your learning journey...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
