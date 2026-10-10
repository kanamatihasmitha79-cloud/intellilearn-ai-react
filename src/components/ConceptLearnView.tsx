import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Network,
  HelpCircle,
  BotMessageSquare,
  ChevronRight,
  Lightbulb,
  Cpu,
  Layers,
  ListOrdered,
  AlertCircle,
  FileCode,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { LearningMaterial, MaterialConcept, NavPage, StudentProfile } from '../types';
import { TopicBanner } from './TopicBanner';

interface ConceptLearnViewProps {
  activeMaterial: LearningMaterial;
  selectedConcept: MaterialConcept | null;
  studentProfile?: StudentProfile | null;
  onSelectConcept: (concept: MaterialConcept) => void;
  onNavigateTab: (tab: NavPage) => void;
  onSetTutorQuestion: (q: string) => void;
}

export const ConceptLearnView: React.FC<ConceptLearnViewProps> = ({
  activeMaterial,
  selectedConcept,
  studentProfile,
  onSelectConcept,
  onNavigateTab,
  onSetTutorQuestion,
}) => {
  const [activeMode, setActiveMode] = useState<'simple' | 'detailed'>('simple');

  // Fallback to first concept if none selected
  const activeConcept = selectedConcept || activeMaterial.concepts[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header & Main Topic Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <TopicBanner
                subject={studentProfile?.subject || 'Computer Science'}
                topic={activeMaterial.mainTopic}
              />
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 ml-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Content Understanding Engine</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeMaterial.mainTopic}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Derived from: <strong className="text-slate-700">{activeMaterial.fileName}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {activeMaterial.concepts.length} Extracted Concepts
            </span>
            <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              Syllabus Ready
            </span>
          </div>
        </div>

        {/* Suggested Learning Sequence Pill Bar */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ListOrdered className="w-3.5 h-3.5 text-indigo-600" />
            <span>Recommended Learning Sequence:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeMaterial.suggestedLearningOrder.map((stepName, idx) => {
              const matchedConcept = activeMaterial.concepts.find(
                (c) => c.name.toLowerCase().includes(stepName.toLowerCase()) || stepName.toLowerCase().includes(c.name.toLowerCase())
              );
              const isSelected = matchedConcept && activeConcept?.id === matchedConcept.id;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (matchedConcept) onSelectConcept(matchedConcept);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="opacity-70 font-mono text-[10px]">{idx + 1}.</span>
                  <span>{stepName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Concept Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Concept Selector */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Concepts in Module
          </h2>
          <div className="space-y-1.5">
            {activeMaterial.concepts.map((concept) => {
              const isSelected = activeConcept?.id === concept.id;
              return (
                <button
                  key={concept.id}
                  type="button"
                  onClick={() => onSelectConcept(concept)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        concept.difficulty === 'Beginner'
                          ? 'bg-emerald-100 text-emerald-800'
                          : concept.difficulty === 'Intermediate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {concept.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-400">{concept.category}</span>
                  </div>
                  <div className="text-sm line-clamp-1">{concept.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area: Concept Details */}
        <div className="lg:col-span-3 space-y-6">
          {activeConcept ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Concept Title & Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                      {activeConcept.category}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-500">
                      Difficulty: {activeConcept.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeConcept.name}
                  </h2>
                </div>

                {/* Simple vs Detailed Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveMode('simple')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeMode === 'simple'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Simple Explanation
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('detailed')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeMode === 'detailed'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Detailed Academic
                  </button>
                </div>
              </div>

              {/* Explanation Box */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{activeMode === 'simple' ? 'Plain-English Explanation' : 'Formal Technical Definition'}</span>
                </h3>
                <div className="text-slate-700 leading-relaxed text-sm sm:text-base bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                  {activeMode === 'simple'
                    ? activeConcept.simpleExplanation || activeConcept.shortSummary
                    : activeConcept.detailedExplanation || activeConcept.shortSummary}
                </div>
              </div>

              {/* Beginner Analogy Card */}
              {activeConcept.analogy && (
                <div className="bg-gradient-to-r from-amber-50/80 to-amber-100/40 rounded-2xl p-5 border border-amber-200/90 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Beginner Analogy</span>
                  </div>
                  <p className="text-amber-950 text-sm sm:text-base leading-relaxed italic">
                    "{activeConcept.analogy}"
                  </p>
                </div>
              )}

              {/* Mathematical Formula or Syntax */}
              {activeConcept.formulaOrSyntax && (
                <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>Formal Mathematical Notation</span>
                  </div>
                  <div className="font-mono text-sm sm:text-base text-indigo-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800 overflow-x-auto">
                    {activeConcept.formulaOrSyntax}
                  </div>
                </div>
              )}

              {/* Key Points */}
              {activeConcept.keyPoints && activeConcept.keyPoints.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Essential Rules & Properties
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeConcept.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concrete Worked Example */}
              {activeConcept.example && (
                <div className="space-y-2 bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100">
                  <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    Concrete Worked Example:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeConcept.example}
                  </p>
                </div>
              )}

              {/* Interactive Next Steps CTA Bar */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSetTutorQuestion(`Explain ${activeConcept.name} from my study notes in detail with an example.`);
                    onNavigateTab('tutor');
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <BotMessageSquare className="w-4 h-4 text-slate-600" />
                  <span>Ask AI Tutor About This</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('assessments')}
                    className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Take Quiz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateTab('visual')}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Network className="w-4 h-4" />
                    <span>Launch Visual Lesson →</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
              Select a concept on the left to inspect AI understanding.
            </div>
          )}
        </div>
      </div>

      {/* Definitions & Formulas Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Important Definitions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-600" />
            <span>Important Glossary Definitions</span>
          </h3>
          <div className="space-y-3">
            {activeMaterial.importantDefinitions.map((def, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs space-y-1"
              >
                <span className="font-bold text-slate-900 block">{def.term}</span>
                <p className="text-slate-600 leading-relaxed">{def.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Formulas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>Mathematical Formalisms & Formulas</span>
          </h3>
          <div className="space-y-3">
            {activeMaterial.importantFormulas.map((form, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{form.name}</span>
                </div>
                <div className="font-mono text-xs text-indigo-700 bg-white p-2 rounded-lg border border-slate-200 font-semibold">
                  {form.formula}
                </div>
                <p className="text-[11px] text-slate-600">{form.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
