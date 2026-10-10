import React, { useState, useEffect } from 'react';
import {
  LearningMaterial,
  MaterialConcept,
  NavPage,
  RoadmapNode,
  StudentProgress,
  QuizSubmissionResult,
  StudentProfile,
} from './types';
import {
  DEMO_FINITE_AUTOMATA,
  DEMO_ROADMAP_NODES,
  DEMO_STUDENT_PROGRESS,
} from './data/demoMaterial';
import {
  createPersonalizedMaterial,
  createPersonalizedRoadmap,
  createInitialProgress,
} from './data/personalizationHelper';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { StudentOnboardingView } from './components/StudentOnboardingView';
import { DashboardView } from './components/DashboardView';
import { MaterialsView } from './components/MaterialsView';
import { ConceptLearnView } from './components/ConceptLearnView';
import { VisualLessonView } from './components/VisualLessonView';
import { AITutorView } from './components/AITutorView';
import { AssessmentView } from './components/AssessmentView';
import { RoadmapView } from './components/RoadmapView';
import { ProgressView } from './components/ProgressView';
import { SettingsView } from './components/SettingsView';

const STORAGE_KEY_PROFILE = 'intellilearn_student_profile';
const STORAGE_KEY_PROGRESS = 'intellilearn_student_progress';

export default function App() {
  // Load saved student profile if exists
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read stored student profile:', e);
    }
    return null;
  });

  // Primary navigation state
  const [activeTab, setActiveTab] = useState<NavPage>('landing');

  // Initialize materials based on profile or baseline
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => {
    if (studentProfile?.isOnboarded) {
      return [createPersonalizedMaterial(studentProfile)];
    }
    return [DEMO_FINITE_AUTOMATA];
  });

  const [activeMaterial, setActiveMaterial] = useState<LearningMaterial>(() => {
    if (studentProfile?.isOnboarded) {
      return createPersonalizedMaterial(studentProfile);
    }
    return DEMO_FINITE_AUTOMATA;
  });

  const [selectedConcept, setSelectedConcept] = useState<MaterialConcept | null>(() => {
    if (studentProfile?.isOnboarded) {
      const mat = createPersonalizedMaterial(studentProfile);
      return mat.concepts[0] || null;
    }
    return (
      DEMO_FINITE_AUTOMATA.concepts.find((c) => c.id === 'concept-dfa') ||
      DEMO_FINITE_AUTOMATA.concepts[0]
    );
  });

  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>(() => {
    if (studentProfile?.isOnboarded) {
      return createPersonalizedRoadmap(studentProfile);
    }
    return DEMO_ROADMAP_NODES;
  });

  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const savedProg = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedProg && studentProfile?.isOnboarded) {
        return JSON.parse(savedProg);
      }
    } catch (e) {
      console.warn('Could not read stored progress:', e);
    }
    if (studentProfile?.isOnboarded) {
      return createInitialProgress(studentProfile);
    }
    return DEMO_STUDENT_PROGRESS;
  });

  // UI helpers
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [tutorQuestionDraft, setTutorQuestionDraft] = useState<string>('');

  // Persist student profile changes
  const saveStudentProfile = (profile: StudentProfile) => {
    setStudentProfile(profile);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile:', e);
    }

    // Generate personalized content
    const personalizedMaterial = createPersonalizedMaterial(profile);
    const personalizedRoadmap = createPersonalizedRoadmap(profile);
    const personalizedProgress = createInitialProgress(profile);

    setMaterials([personalizedMaterial]);
    setActiveMaterial(personalizedMaterial);
    setSelectedConcept(personalizedMaterial.concepts[0] || null);
    setRoadmapNodes(personalizedRoadmap);
    setProgress(personalizedProgress);

    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(personalizedProgress));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }

    setActiveTab('dashboard');
  };

  // Handler when user clicks Get Started
  const handleGetStarted = () => {
    if (studentProfile?.isOnboarded) {
      setActiveTab('dashboard');
    } else {
      setActiveTab('onboarding');
    }
  };

  // When a quiz is submitted, adapt progress and roadmap nodes
  const handleQuizCompleted = (result: QuizSubmissionResult) => {
    setProgress((prev) => {
      const newQuizzesTaken = prev.quizzesTaken + 1;
      const newAverage = Math.round(
        (prev.quizAverage * prev.quizzesTaken + result.score) / newQuizzesTaken
      );
      const newOverall = Math.min(
        100,
        Math.round(prev.overallPercentage + (result.score >= 80 ? 8 : 4))
      );
      const newConceptsCompleted =
        result.score >= 80 ? prev.conceptsCompleted + 1 : prev.conceptsCompleted;

      const updatedReasoningProfiles = { ...(prev.reasoningProfiles || {}) };
      if (result.reasoningEvaluations && result.reasoningEvaluations.length > 0) {
        result.reasoningEvaluations.forEach((evalItem) => {
          const cId = result.conceptId || 'concept-active';
          const existing = updatedReasoningProfiles[cId];
          const soundInc = evalItem.reasoningCategory === 'correct_sound' ? 1 : 0;
          updatedReasoningProfiles[cId] = {
            conceptId: cId,
            conceptTitle: result.conceptTitle,
            subject: studentProfile?.subject || 'General',
            topic: studentProfile?.topic || result.conceptTitle,
            lastAssessedAt: new Date().toISOString(),
            totalAttempts: (existing?.totalAttempts || 0) + 1,
            soundReasoningCount: (existing?.soundReasoningCount || 0) + soundInc,
            demonstratedWithSoundReasoning: (existing?.soundReasoningCount || 0) + soundInc >= 2,
            understandsNeedsPractice: evalItem.isAnswerCorrect && evalItem.reasoningCategory !== 'correct_sound',
            possibleMisconceptionsToVerify: evalItem.reasoningCategory === 'incorrect_conceptual'
              ? Array.from(new Set([...(existing?.possibleMisconceptionsToVerify || []), evalItem.conceptTested]))
              : existing?.possibleMisconceptionsToVerify || [],
            repeatedProceduralDifficulties: evalItem.reasoningCategory === 'incorrect_procedural'
              ? Array.from(new Set([...(existing?.repeatedProceduralDifficulties || []), evalItem.conceptTested]))
              : existing?.repeatedProceduralDifficulties || [],
            recommendedNextStep: evalItem.teachingRecommendation.suggestedAction,
            confidenceLevel: evalItem.confidence,
            recentReasoningCategory: evalItem.reasoningCategory,
            evaluations: [evalItem, ...(existing?.evaluations || []).slice(0, 9)],
          };
        });
      }

      const updated = {
        ...prev,
        quizzesTaken: newQuizzesTaken,
        quizAverage: newAverage,
        overallPercentage: newOverall,
        conceptsCompleted: Math.min(prev.totalConcepts, newConceptsCompleted),
        weakTopics:
          result.weakAreas && result.weakAreas.length > 0
            ? Array.from(new Set([...result.weakAreas, ...prev.weakTopics])).slice(0, 5)
            : prev.weakTopics,
        strongTopics:
          result.strongAreas && result.strongAreas.length > 0
            ? Array.from(new Set([...result.strongAreas, ...prev.strongTopics])).slice(0, 5)
            : prev.strongTopics,
        reasoningProfiles: updatedReasoningProfiles,
        recentActivities: [
          {
            id: `act-${Date.now()}`,
            type: 'quiz' as const,
            title: `Assessment on ${result.conceptTitle}`,
            timestamp: 'Just now',
            score: result.score,
            reasoningCategory: result.reasoningEvaluations?.[0]?.reasoningCategory,
          },
          ...prev.recentActivities.slice(0, 5),
        ],
      };

      if (studentProfile?.isOnboarded) {
        try {
          localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to save progress update:', e);
        }
      }

      return updated;
    });

    // Unlock or update roadmap nodes dynamically
    setRoadmapNodes((prev) =>
      prev.map((node) => {
        const matchesCurrent =
          node.title.toLowerCase().includes(result.conceptTitle.toLowerCase()) ||
          result.conceptTitle.toLowerCase().includes(node.title.toLowerCase());

        if (matchesCurrent) {
          return {
            ...node,
            status: result.score >= 80 ? 'completed' : 'in-progress',
            score: result.score,
          };
        }

        // Unlock next prerequisite node if score is good
        if (result.score >= 80 && node.status === 'locked' && node.prerequisites.length > 0) {
          return {
            ...node,
            status: 'recommended',
          };
        }

        return node;
      })
    );
  };

  const handleAddNewMaterial = (newMat: LearningMaterial) => {
    setMaterials((prev) => [newMat, ...prev]);
    setActiveMaterial(newMat);
    if (newMat.concepts.length > 0) {
      setSelectedConcept(newMat.concepts[0]);
    }
    setActiveTab('learn');
  };

  // Handler when student logs out of their personalized session
  const handleLogout = () => {
    // 1. Clear session profile state
    setStudentProfile(null);

    // 2. Clear personalized student session data from localStorage
    try {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch (e) {
      console.warn('Failed to clear stored session data:', e);
    }

    // 3. Reset learning materials and progress to clean initial state
    setMaterials([DEMO_FINITE_AUTOMATA]);
    setActiveMaterial(DEMO_FINITE_AUTOMATA);
    setSelectedConcept(
      DEMO_FINITE_AUTOMATA.concepts.find((c) => c.id === 'concept-dfa') ||
        DEMO_FINITE_AUTOMATA.concepts[0]
    );
    setRoadmapNodes(DEMO_ROADMAP_NODES);
    setProgress(DEMO_STUDENT_PROGRESS);

    // 4. Close menus and route back to landing page
    setMobileMenuOpen(false);
    setActiveTab('landing');
  };

  const currentSubject = studentProfile?.subject || 'Computer Science';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeMaterial={activeMaterial}
        materials={materials}
        setActiveMaterial={(m) => {
          setActiveMaterial(m);
          if (m.concepts.length > 0) setSelectedConcept(m.concepts[0]);
        }}
        onGetStarted={handleGetStarted}
        onLogout={handleLogout}
        studentProfile={studentProfile}
        streakDays={progress.learningStreakDays}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Page Routing */}
      {activeTab === 'landing' ? (
        <main className="flex-1">
          <LandingPage
            onGetStarted={handleGetStarted}
            onNavigateTab={setActiveTab}
          />
        </main>
      ) : activeTab === 'onboarding' ? (
        <main className="flex-1">
          <StudentOnboardingView
            initialProfile={studentProfile || undefined}
            onComplete={saveStudentProfile}
            onCompleteOnboarding={saveStudentProfile}
            onCancel={() => {
              if (studentProfile?.isOnboarded) {
                setActiveTab('settings');
              } else {
                setActiveTab('landing');
              }
            }}
            onBackToLanding={() => {
              if (studentProfile?.isOnboarded) {
                setActiveTab('settings');
              } else {
                setActiveTab('landing');
              }
            }}
          />
        </main>
      ) : (
        <div className="flex-1 flex w-full max-w-7xl mx-auto">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            completedCount={progress.conceptsCompleted}
            subject={currentSubject}
            isLoggedIn={Boolean(studentProfile?.isOnboarded)}
            onLogout={handleLogout}
          />

          {/* Main View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
            {activeTab === 'dashboard' && (
              <DashboardView
                progress={progress}
                activeMaterial={activeMaterial}
                materials={materials}
                studentProfile={studentProfile}
                onNavigateTab={setActiveTab}
                onSelectConcept={setSelectedConcept}
              />
            )}

            {activeTab === 'materials' && (
              <MaterialsView
                materials={materials}
                activeMaterial={activeMaterial}
                studentProfile={studentProfile}
                setActiveMaterial={setActiveMaterial}
                onSelectConcept={setSelectedConcept}
                onNavigateTab={setActiveTab}
                onAddNewMaterial={handleAddNewMaterial}
              />
            )}

            {activeTab === 'learn' && (
              <ConceptLearnView
                activeMaterial={activeMaterial}
                selectedConcept={selectedConcept}
                studentProfile={studentProfile}
                onSelectConcept={setSelectedConcept}
                onNavigateTab={setActiveTab}
                onSetTutorQuestion={(q) => {
                  setTutorQuestionDraft(q);
                  setActiveTab('tutor');
                }}
              />
            )}

            {activeTab === 'visual' && (
              <VisualLessonView
                activeMaterial={activeMaterial}
                selectedConcept={selectedConcept}
                studentProfile={studentProfile}
                onNavigateTab={setActiveTab}
                onSetTutorQuestion={(q) => {
                  setTutorQuestionDraft(q);
                  setActiveTab('tutor');
                }}
              />
            )}

            {activeTab === 'tutor' && (
              <AITutorView
                activeMaterial={activeMaterial}
                studentProfile={studentProfile}
                initialQuestion={tutorQuestionDraft}
                onClearInitialQuestion={() => setTutorQuestionDraft('')}
                onNavigateTab={setActiveTab}
                progress={progress}
                selectedConcept={selectedConcept}
              />
            )}

            {activeTab === 'assessments' && (
              <AssessmentView
                activeMaterial={activeMaterial}
                selectedConcept={selectedConcept}
                studentProfile={studentProfile}
                onNavigateTab={setActiveTab}
                onQuizCompleted={handleQuizCompleted}
                onSetTutorQuestion={(q) => {
                  setTutorQuestionDraft(q);
                  setActiveTab('tutor');
                }}
              />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapView
                nodes={roadmapNodes}
                activeMaterial={activeMaterial}
                studentProfile={studentProfile}
                onSelectConcept={setSelectedConcept}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressView
                progress={progress}
                activeMaterial={activeMaterial}
                studentProfile={studentProfile}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                studentProfile={studentProfile}
                onEditProfile={() => setActiveTab('onboarding')}
                onLogout={handleLogout}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}
