import React from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  PlayCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  Layers,
} from 'lucide-react';
import {
  RoadmapNode,
  LearningMaterial,
  MaterialConcept,
  NavPage,
  StudentProfile,
} from '../types';
import { TopicBanner } from './TopicBanner';

interface RoadmapViewProps {
  nodes: RoadmapNode[];
  activeMaterial: LearningMaterial;
  studentProfile?: StudentProfile | null;
  onSelectConcept: (concept: MaterialConcept) => void;
  onNavigateTab: (tab: NavPage) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  nodes,
  activeMaterial,
  studentProfile,
  onSelectConcept,
  onNavigateTab,
}) => {
  const studentSubject = studentProfile?.subject || 'Computer Science';
  const stages: Array<'Foundation' | 'Core' | 'Advanced' | 'Mastery'> = [
    'Foundation',
    'Core',
    'Advanced',
    'Mastery',
  ];

  const getStageName = (node: RoadmapNode): string => {
    if (node.level) {
      if (node.level.startsWith('Foundation')) return 'Foundation';
      if (node.level.startsWith('Core')) return 'Core';
      if (node.level.startsWith('Advanced')) return 'Advanced';
      if (node.level.startsWith('Mastery')) return 'Mastery';
    }
    return node.level || 'Foundation';
  };

  const handleNodeClick = (node: RoadmapNode) => {
    const isLocked = node.status.toLowerCase() === 'locked';
    if (isLocked) return;

    // Match with material concept or fallback
    const matched = activeMaterial.concepts.find(
      (c) =>
        c.name.toLowerCase().includes(node.title.toLowerCase()) ||
        node.title.toLowerCase().includes(c.name.toLowerCase())
    );

    if (matched) {
      onSelectConcept(matched);
      onNavigateTab('learn');
    } else {
      // Create a temporary concept representation
      onSelectConcept({
        id: node.id,
        name: node.title,
        shortSummary: node.description,
        simpleExplanation: node.description,
        difficulty: node.level === 'Foundation' ? 'Beginner' : node.level === 'Core' ? 'Intermediate' : 'Advanced',
        category: node.level || 'Core',
      });
      onNavigateTab('learn');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <TopicBanner subject={studentSubject} topic={activeMaterial.mainTopic} />
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 ml-1">
              <Compass className="w-4 h-4" />
              <span>Dynamic Prerequisite Learning Pathway</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learning Roadmap: {activeMaterial.mainTopic}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Adapts automatically to your quiz scores, diagnosed knowledge gaps, and prerequisite chains.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-800 px-3 py-1.5 rounded-full border border-indigo-200 text-xs font-semibold self-start sm:self-center">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Dynamic Adaptive Engine</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <span className="text-slate-400 font-bold uppercase text-[11px]">Legend:</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse" />
          <span>Recommended Next</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Needs Review / Gap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-slate-400" />
          <span>Locked (Prereqs Required)</span>
        </div>
      </div>

      {/* Roadmap Stages */}
      <div className="space-y-8 relative">
        {stages.map((stageName, stageIdx) => {
          const stageNodes = nodes.filter((n) => getStageName(n) === stageName);
          if (stageNodes.length === 0) return null;

          return (
            <div key={stageName} className="space-y-4">
              {/* Stage Header */}
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-bold text-xs">
                  {stageIdx + 1}
                </span>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Stage {stageIdx + 1}: {stageName}
                </h2>
                <div className="h-px bg-slate-200 flex-1 ml-2" />
              </div>

              {/* Stage Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stageNodes.map((node) => {
                  const s = node.status.toLowerCase();
                  const isLocked = s === 'locked';
                  const isCompleted = s === 'completed';
                  const isRecommended = s === 'recommended';
                  const isNeedsReview = s === 'needs improvement' || s === 'needs_improvement';

                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isLocked
                          ? 'bg-slate-50/70 border-slate-200 opacity-60 cursor-not-allowed'
                          : 'bg-white hover:shadow-md cursor-pointer ' +
                            (isRecommended
                              ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-xs'
                              : isNeedsReview
                              ? 'border-amber-400 bg-amber-50/20'
                              : isCompleted
                              ? 'border-emerald-300'
                              : 'border-slate-200')
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {node.level || stageName}
                          </span>

                          {/* Status Badge */}
                          {isCompleted && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Mastered
                            </span>
                          )}
                          {isRecommended && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-600 text-white flex items-center gap-1 shadow-xs animate-pulse">
                              <PlayCircle className="w-3 h-3" />
                              Recommended Next
                            </span>
                          )}
                          {isNeedsReview && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Needs Revision
                            </span>
                          )}
                          {isLocked && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-600 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Locked
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {node.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {node.description}
                        </p>

                        {node.estimatedMinutes && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{node.estimatedMinutes} mins study time</span>
                          </div>
                        )}
                      </div>

                      {!isLocked && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group">
                          <span>
                            {isCompleted ? 'Review Concept' : isNeedsReview ? 'Target Weak Area' : 'Start Topic'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
