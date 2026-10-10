import React, { useState, useEffect } from 'react';
import {
  Network,
  Play,
  Pause,
  Square,
  Volume2,
  ArrowRight,
  RotateCcw,
  BotMessageSquare,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Cpu,
  Layers,
  Database,
  Server,
  Brain,
  Binary,
  GitCommit,
  Clock,
  Zap,
  Leaf,
  Sun,
  FlaskConical,
  Atom,
  Activity,
  Gauge,
  Dna,
  BarChart3,
  Calculator,
  Download,
  BookOpen,
  Edit3,
  Languages,
  SlidersHorizontal,
  Eye,
  FileDown,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  LearningMaterial,
  MaterialConcept,
  VisualLesson,
  VisualStep,
  NavPage,
  StudentProfile,
  StudentLevel,
} from '../types';
import { DEMO_VISUAL_LESSONS } from '../data/demoMaterial';
import {
  createVisualLessonForConcept,
  isAutomataTopic,
  isDsaTopic,
  isOsTopic,
  isNetworksTopic,
  isDbmsTopic,
  isMlTopic,
  isBiologySubjectOrTopic,
  isPhysicsSubjectOrTopic,
  isChemistrySubjectOrTopic,
  isProbStatSubjectOrTopic,
  isMathSubjectOrTopic,
} from '../data/personalizationHelper';
import {
  getChapterSummaryForLesson,
  getMultilingualNarration,
  getCheckpointQuestionForLesson,
  generateOfflinePackageHtml,
  SUPPORTED_LANGUAGES,
  SIGN_LANGUAGE_CUES,
} from '../data/lessonEnhancements';
import { TopicBanner } from './TopicBanner';

interface VisualLessonViewProps {
  activeMaterial: LearningMaterial;
  selectedConcept: MaterialConcept | null;
  studentProfile?: StudentProfile | null;
  onNavigateTab: (tab: NavPage) => void;
  onSetTutorQuestion: (q: string) => void;
}

export const VisualLessonView: React.FC<VisualLessonViewProps> = ({
  activeMaterial,
  selectedConcept,
  studentProfile,
  onNavigateTab,
  onSetTutorQuestion,
}) => {
  const studentSubject = studentProfile?.subject || 'Computer Science';
  const currentConcept =
    (selectedConcept && activeMaterial.concepts.some((c) => c.id === selectedConcept.id)
      ? selectedConcept
      : activeMaterial.concepts[0]) || activeMaterial.concepts[0];

  const isBio = isBiologySubjectOrTopic(studentSubject, activeMaterial.mainTopic);
  const isPhys = !isBio && isPhysicsSubjectOrTopic(studentSubject, activeMaterial.mainTopic);
  const isChem = !isBio && !isPhys && isChemistrySubjectOrTopic(studentSubject, activeMaterial.mainTopic);
  const isProbStat = !isBio && !isPhys && !isChem && isProbStatSubjectOrTopic(studentSubject, activeMaterial.mainTopic);
  const isMath = !isBio && !isPhys && !isChem && !isProbStat && isMathSubjectOrTopic(studentSubject, activeMaterial.mainTopic);

  const isTopicAutomata = !isBio && !isPhys && !isChem && !isProbStat && !isMath && isAutomataTopic(activeMaterial.mainTopic);
  const isTopicDsa = !isTopicAutomata && !isBio && !isPhys && !isChem && !isProbStat && !isMath && isDsaTopic(activeMaterial.mainTopic);
  const isTopicOs = !isTopicAutomata && !isBio && !isPhys && !isChem && !isProbStat && !isMath && isOsTopic(activeMaterial.mainTopic);
  const isTopicNetworks = !isTopicAutomata && !isBio && !isPhys && !isChem && !isProbStat && !isMath && isNetworksTopic(activeMaterial.mainTopic);
  const isTopicDbms = !isTopicAutomata && !isBio && !isPhys && !isChem && !isProbStat && !isMath && isDbmsTopic(activeMaterial.mainTopic);
  const isTopicMl = !isTopicAutomata && !isBio && !isPhys && !isChem && !isProbStat && !isMath && isMlTopic(activeMaterial.mainTopic);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [lesson, setLesson] = useState<VisualLesson>(() => {
    if (isTopicAutomata && currentConcept && DEMO_VISUAL_LESSONS[currentConcept.id]) {
      return DEMO_VISUAL_LESSONS[currentConcept.id];
    }
    return createVisualLessonForConcept(currentConcept, activeMaterial.mainTopic, studentSubject);
  });
  const [, setLoadingLesson] = useState<boolean>(false);

  // Narration Speech Synthesis State
  const [isPlayingNarration, setIsPlayingNarration] = useState<boolean>(false);
  const [isPausedNarration, setIsPausedNarration] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Supplementary Offline-Round & Accessibility States
  const [targetLevel, setTargetLevel] = useState<StudentLevel>(studentProfile?.level || 'Secondary');
  const [selectedLang, setSelectedLang] = useState<string>('en-US');
  const [showClosedCaptions, setShowClosedCaptions] = useState<boolean>(true);
  const [ccFontSize, setCcFontSize] = useState<'normal' | 'large'>('normal');
  const [audioDescriptions, setAudioDescriptions] = useState<boolean>(false);
  const [signLanguageCues, setSignLanguageCues] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [autoPlayScenes, setAutoPlayScenes] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showTeacherEditModal, setShowTeacherEditModal] = useState<boolean>(false);
  const [showAccessibilityBar, setShowAccessibilityBar] = useState<boolean>(false);
  const [offlineDownloaded, setOfflineDownloaded] = useState<boolean>(false);
  const [currentSpokenWord, setCurrentSpokenWord] = useState<string>('');
  const [isCheckpointActive, setIsCheckpointActive] = useState<boolean>(false);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState<boolean>(false);
  const [teacherEditedLesson, setTeacherEditedLesson] = useState<VisualLesson>(lesson);

  useEffect(() => {
    setTeacherEditedLesson(lesson);
  }, [lesson]);

  // 1. Interactive DFA State (Automata)
  const [dfaString, setDfaString] = useState<string>('01');
  const [dfaRunning, setDfaRunning] = useState<boolean>(false);
  const [dfaActiveState, setDfaActiveState] = useState<string>('q0');
  const [dfaTapeIndex, setDfaTapeIndex] = useState<number>(0);
  const [dfaLog, setDfaLog] = useState<string[]>([]);
  const [dfaVerdict, setDfaVerdict] = useState<'accept' | 'reject' | null>(null);

  // 2. Interactive DSA Binary Search State
  const [dsaArray] = useState<number[]>([12, 24, 35, 48, 57, 69, 81, 95]);
  const [dsaTarget, setDsaTarget] = useState<number>(57);
  const [dsaLow, setDsaLow] = useState<number>(0);
  const [dsaHigh, setDsaHigh] = useState<number>(7);
  const [dsaMid, setDsaMid] = useState<number | null>(null);
  const [dsaFoundIndex, setDsaFoundIndex] = useState<number | null>(null);
  const [dsaRunning, setDsaRunning] = useState<boolean>(false);
  const [dsaLogs, setDsaLogs] = useState<string[]>([]);

  // 3. Interactive Networks TCP Handshake State
  const [tcpStep, setTcpStep] = useState<number>(0); // 0: Closed, 1: SYN-SENT, 2: SYN-RECEIVED, 3: ESTABLISHED
  const [tcpLog, setTcpLog] = useState<string[]>([
    'Socket initialized on Client (Port 50123) and Server (Port 443). Waiting to initiate 3-Way Handshake...',
  ]);

  // 4. Interactive OS CPU Scheduling State
  const [osClock, setOsClock] = useState<number>(0);
  const [osActivePid, setOsActivePid] = useState<string>('P1');
  const [osProcesses, setOsProcesses] = useState<Array<{ id: string; burstRemaining: number; state: 'Ready' | 'Running' | 'Done' }>>([
    { id: 'P1', burstRemaining: 4, state: 'Running' },
    { id: 'P2', burstRemaining: 3, state: 'Ready' },
    { id: 'P3', burstRemaining: 2, state: 'Ready' },
  ]);
  const [osLogs, setOsLogs] = useState<string[]>([
    'Clock 0: Dispatcher allocated CPU to Process P1 (Remaining Burst: 4ms). Ready Queue: [P2, P3].',
  ]);

  // 5. Interactive DBMS Query & Lock State
  const [dbPlan, setDbPlan] = useState<'index_seek' | 'table_scan'>('index_seek');
  const [dbLockType, setDbLockType] = useState<'None' | 'Shared (S)' | 'Exclusive (X)'>('None');
  const [dbCost, setDbCost] = useState<number>(3); // 3 page reads
  const [dbLogs, setDbLogs] = useState<string[]>([
    'SQL Query: "SELECT * FROM users WHERE id = 42" received. Parser generated Relational AST.',
    'Cost-Based Optimizer evaluated B+ Tree Index on (id). Estimated cost: 3 I/O pages vs 1200 table scan pages.',
  ]);

  // 6. Interactive ML Optimization State
  const [mlWeight, setMlWeight] = useState<number>(0.8);
  const [mlBias, setMlBias] = useState<number>(0.2);
  const [mlEpoch, setMlEpoch] = useState<number>(1);
  const [mlLoss, setMlLoss] = useState<number>(0.42);
  const [mlLogs, setMlLogs] = useState<string[]>([
    'Input Feature: x = 2.0, Ground Truth Target: y = 3.0',
    'Forward Pass: z = (0.80 * 2.0) + 0.20 = 1.80. Prediction: ŷ = 1.80. Loss (MSE): 0.42.',
  ]);

  // 7. Interactive Biology: Photosynthesis Lab State
  const [bioLightIntensity, setBioLightIntensity] = useState<number>(80);
  const [bioCo2Level, setBioCo2Level] = useState<number>(400);
  const [bioActivePhase, setBioActivePhase] = useState<'light' | 'calvin'>('light');

  // 8. Interactive Biology: Digestive System Explorer State
  const [bioDigestStation, setBioDigestStation] = useState<number>(0);

  // 9. Interactive Physics: Newton's Laws & Dynamics Lab State
  const [physForce, setPhysForce] = useState<number>(30); // N
  const [physMass, setPhysMass] = useState<number>(5); // kg
  const [physFriction, setPhysFriction] = useState<number>(5); // N

  // 10. Interactive Chemistry: Chemical Bonding & Electronegativity State
  const [chemPairIdx, setChemPairIdx] = useState<number>(0);

  // 11. Interactive Probability & Statistics Lab State
  const [probStatMode, setProbStatMode] = useState<'dice' | 'stats' | 'normal'>('dice');
  const [selectedEventPreset, setSelectedEventPreset] = useState<number>(0);
  const [lastDiceRoll, setLastDiceRoll] = useState<number | null>(4);
  const [isRollingDice, setIsRollingDice] = useState<boolean>(false);
  const [diceHistory, setDiceHistory] = useState<number[]>([4, 2, 6, 1, 4]);
  const [selectedDatasetIdx, setSelectedDatasetIdx] = useState<number>(0);

  const handleRollDice = () => {
    if (isRollingDice) return;
    setIsRollingDice(true);
    let rolls = 0;
    const interval = setInterval(() => {
      const randomFace = Math.floor(Math.random() * 6) + 1;
      setLastDiceRoll(randomFace);
      rolls++;
      if (rolls > 6) {
        clearInterval(interval);
        setIsRollingDice(false);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setLastDiceRoll(finalRoll);
        setDiceHistory((prev) => [finalRoll, ...prev.slice(0, 9)]);
      }
    }, 80);
  };

  // Load or fetch visual lesson data when concept changes
  useEffect(() => {
    if (!currentConcept) return;

    if (isTopicAutomata && DEMO_VISUAL_LESSONS[currentConcept.id]) {
      setLesson(DEMO_VISUAL_LESSONS[currentConcept.id]);
      setActiveStepIndex(0);
      return;
    }

    const generated = createVisualLessonForConcept(
      currentConcept,
      activeMaterial.mainTopic,
      studentSubject
    );
    setLesson(generated);
    setActiveStepIndex(0);

    const fetchVisualLesson = async () => {
      setLoadingLesson(true);
      try {
        const res = await fetch('/api/visual/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conceptName: currentConcept.name,
            context: currentConcept.detailedExplanation || currentConcept.shortSummary,
            conceptId: currentConcept.id,
            topic: activeMaterial.mainTopic,
            subject: studentSubject,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.lesson && data.lesson.steps && data.lesson.steps.length > 0) {
            setLesson(data.lesson);
          }
        }
      } catch (e) {
        // Fallback to our local generated lesson
      } finally {
        setLoadingLesson(false);
      }
    };

    if (currentConcept.detailedExplanation && currentConcept.detailedExplanation.length > 50) {
      fetchVisualLesson();
    }
  }, [currentConcept?.id, activeMaterial.mainTopic, isTopicAutomata, studentSubject]);

  // Speech synthesis cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPausedNarration) {
      window.speechSynthesis.resume();
      setIsPlayingNarration(true);
      setIsPausedNarration(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${lesson.conceptTitle}. ${lesson.overview}. ${lesson.narrationScript}. Step ${
      activeStepIndex + 1
    }: ${lesson.steps[activeStepIndex]?.title}. ${lesson.steps[activeStepIndex]?.description}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingNarration(false);
      setIsPausedNarration(false);
    };

    utterance.onerror = () => {
      setIsPlayingNarration(false);
      setIsPausedNarration(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingNarration(true);
    setIsPausedNarration(false);
  };

  const handlePauseNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPlayingNarration(false);
    setIsPausedNarration(true);
  };

  const handleStopNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingNarration(false);
    setIsPausedNarration(false);
  };

  // DFA Simulation Runner
  const runDfaSimulation = () => {
    setDfaRunning(true);
    setDfaLog([]);
    setDfaActiveState('q0');
    setDfaTapeIndex(0);
    setDfaVerdict(null);

    const chars = dfaString.split('');
    let currentState = 'q0';
    const logs: string[] = [`Initial state set to q₀ (Start). Tape: "${dfaString}"`];

    let i = 0;
    const interval = setInterval(() => {
      if (i < chars.length) {
        const symbol = chars[i];
        let nextState = currentState;

        if (currentState === 'q0') {
          nextState = symbol === '0' ? 'q1' : 'q0';
        } else if (currentState === 'q1') {
          nextState = symbol === '1' ? 'q2' : 'q1';
        } else if (currentState === 'q2') {
          nextState = symbol === '0' ? 'q1' : 'q0';
        }

        logs.push(`Step ${i + 1}: Read '${symbol}' → δ(${currentState}, '${symbol}') → ${nextState}`);
        currentState = nextState;
        setDfaActiveState(nextState);
        setDfaTapeIndex(i + 1);
        setDfaLog([...logs]);
        i++;
      } else {
        clearInterval(interval);
        setDfaRunning(false);
        const isAccepted = currentState === 'q2';
        setDfaVerdict(isAccepted ? 'accept' : 'reject');
        logs.push(
          isAccepted
            ? `Final state is ${currentState} ∈ F (Accepting). String "${dfaString}" is ACCEPTED!`
            : `Final state is ${currentState} ∉ F. String "${dfaString}" is REJECTED.`
        );
        setDfaLog([...logs]);
      }
    }, 700);
  };

  // DSA Binary Search Step Runner
  const stepDsaSearch = () => {
    if (dsaFoundIndex !== null) return;
    if (dsaLow > dsaHigh) {
      setDsaLogs((prev) => [...prev, `Search space exhausted: Target ${dsaTarget} was NOT found in array.`]);
      return;
    }

    const mid = Math.floor((dsaLow + dsaHigh) / 2);
    setDsaMid(mid);
    const midVal = dsaArray[mid];

    if (midVal === dsaTarget) {
      setDsaFoundIndex(mid);
      setDsaLogs((prev) => [
        ...prev,
        `Match Found! arr[${mid}] = ${midVal} == Target (${dsaTarget}). Terminating in O(log n) time.`,
      ]);
    } else if (dsaTarget < midVal) {
      setDsaLogs((prev) => [
        ...prev,
        `Compare: Target (${dsaTarget}) < arr[${mid}] (${midVal}) → Discard right half. Set High = ${mid - 1}.`,
      ]);
      setDsaHigh(mid - 1);
    } else {
      setDsaLogs((prev) => [
        ...prev,
        `Compare: Target (${dsaTarget}) > arr[${mid}] (${midVal}) → Discard left half. Set Low = ${mid + 1}.`,
      ]);
      setDsaLow(mid + 1);
    }
  };

  const resetDsaSearch = (newTarget: number = dsaTarget) => {
    setDsaTarget(newTarget);
    setDsaLow(0);
    setDsaHigh(dsaArray.length - 1);
    setDsaMid(null);
    setDsaFoundIndex(null);
    setDsaRunning(false);
    setDsaLogs([`Initialized Binary Search for Target = ${newTarget} in sorted array of size ${dsaArray.length}.`]);
  };

  // Networks TCP Handshake Step Runner
  const stepTcpHandshake = () => {
    if (tcpStep === 0) {
      setTcpStep(1);
      setTcpLog((prev) => [
        ...prev,
        'Step 1: Client sends SYN packet (seq=100) to Server. Client State: CLOSED → SYN-SENT.',
      ]);
    } else if (tcpStep === 1) {
      setTcpStep(2);
      setTcpLog((prev) => [
        ...prev,
        'Step 2: Server receives SYN, allocates transmission buffer, and replies with SYN-ACK (seq=300, ack=101). Server State: LISTEN → SYN-RECEIVED.',
      ]);
    } else if (tcpStep === 2) {
      setTcpStep(3);
      setTcpLog((prev) => [
        ...prev,
        'Step 3: Client confirms with ACK packet (seq=101, ack=301). Connection Status: ESTABLISHED on both endpoints! Full-duplex byte stream ready.',
      ]);
    } else {
      setTcpStep(0);
      setTcpLog(['Connection closed and reset. Ready to initiate 3-Way Handshake again.']);
    }
  };

  // OS CPU Scheduler Step Runner
  const stepOsScheduler = () => {
    const nextClock = osClock + 1;
    setOsClock(nextClock);

    setOsProcesses((prev) => {
      const runningIdx = prev.findIndex((p) => p.state === 'Running');
      if (runningIdx === -1) return prev;

      const current = prev[runningIdx];
      const remaining = current.burstRemaining - 1;

      if (remaining <= 0) {
        // Process finished
        const updated = [...prev];
        updated[runningIdx] = { ...current, burstRemaining: 0, state: 'Done' };
        // Find next ready process
        const nextReadyIdx = updated.findIndex((p) => p.state === 'Ready');
        if (nextReadyIdx !== -1) {
          updated[nextReadyIdx] = { ...updated[nextReadyIdx], state: 'Running' };
          setOsActivePid(updated[nextReadyIdx].id);
          setOsLogs((logs) => [
            ...logs,
            `Clock ${nextClock}: Process ${current.id} finished! Context switch: CPU loaded ${updated[nextReadyIdx].id}.`,
          ]);
        } else {
          setOsLogs((logs) => [
            ...logs,
            `Clock ${nextClock}: Process ${current.id} finished! All ready jobs completed.`,
          ]);
        }
        return updated;
      } else {
        // Round robin time slice check (quantum = 2)
        if (nextClock % 2 === 0) {
          const updated = [...prev];
          updated[runningIdx] = { ...current, burstRemaining: remaining, state: 'Ready' };
          const nextReadyIdx = updated.findIndex((p, idx) => p.state === 'Ready' && idx !== runningIdx);
          if (nextReadyIdx !== -1) {
            updated[nextReadyIdx] = { ...updated[nextReadyIdx], state: 'Running' };
            setOsActivePid(updated[nextReadyIdx].id);
            setOsLogs((logs) => [
              ...logs,
              `Clock ${nextClock}: Quantum expired for ${current.id} (Left: ${remaining}ms). Swapped in ${updated[nextReadyIdx].id}.`,
            ]);
          } else {
            updated[runningIdx].state = 'Running';
            setOsLogs((logs) => [
              ...logs,
              `Clock ${nextClock}: Process ${current.id} executed 1ms (Remaining: ${remaining}ms). No other jobs in ready queue.`,
            ]);
          }
          return updated;
        } else {
          const updated = [...prev];
          updated[runningIdx] = { ...current, burstRemaining: remaining };
          setOsLogs((logs) => [
            ...logs,
            `Clock ${nextClock}: Process ${current.id} executed 1ms (Remaining: ${remaining}ms).`,
          ]);
          return updated;
        }
      }
    });
  };

  const resetOsScheduler = () => {
    setOsClock(0);
    setOsActivePid('P1');
    setOsProcesses([
      { id: 'P1', burstRemaining: 4, state: 'Running' },
      { id: 'P2', burstRemaining: 3, state: 'Ready' },
      { id: 'P3', burstRemaining: 2, state: 'Ready' },
    ]);
    setOsLogs(['Scheduler reset. Ready Queue initialized. P1 allocated CPU.']);
  };

  // DBMS Query Step Runner
  const toggleDbPlan = (plan: 'index_seek' | 'table_scan') => {
    setDbPlan(plan);
    if (plan === 'index_seek') {
      setDbLockType('Shared (S)');
      setDbCost(3);
      setDbLogs([
        'Execution Plan: B+ Tree Index Seek selected.',
        '1. Traversed Root Page #102 → Internal Split Key 30.',
        '2. Traversed Internal Page #208 → Reached Leaf Page #415.',
        '3. Retrieved matching row pointer. Acquired Shared (S) Lock. Cost: 3 Page Reads (O(log n)).',
      ]);
    } else {
      setDbLockType('Shared (S)');
      setDbCost(1200);
      setDbLogs([
        'Execution Plan: Full Table Scan (Sequential Scan).',
        'Warning: No index applied. Scanning all 1200 disk blocks from page #0 to #1200.',
        'Total Cost: 1200 Page I/O Reads (O(n)). Execution time: 400x slower than Index Seek.',
      ]);
    }
  };

  // ML Optimization Step Runner
  const stepMlGradient = () => {
    const lr = 0.15;
    const x = 2.0;
    const yTarget = 3.0;
    const currentPred = mlWeight * x + mlBias;
    const error = currentPred - yTarget;
    const newLoss = Math.round(error * error * 100) / 100;

    // Gradients
    const dW = 2 * error * x;
    const dB = 2 * error;
    const newW = Math.round((mlWeight - lr * dW) * 100) / 100;
    const newB = Math.round((mlBias - lr * dB) * 100) / 100;

    setMlWeight(newW);
    setMlBias(newB);
    setMlLoss(newLoss);
    setMlEpoch((prev) => prev + 1);

    setMlLogs((prev) => [
      ...prev,
      `Epoch ${mlEpoch + 1}: Loss = ${newLoss}. Gradient ∇W = ${Math.round(dW * 100) / 100}. Updated W = ${newW}, B = ${newB}.`,
    ]);
  };

  const currentStep: VisualStep = lesson.steps[activeStepIndex] || lesson.steps[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header & Concept Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <TopicBanner subject={studentSubject} topic={activeMaterial.mainTopic} />
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 ml-1">
              <Network className="w-4 h-4" />
              <span>Interactive Visual Learning & Mechanism Flow</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Visual Lessons for {activeMaterial.mainTopic}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Focus: <strong className="text-slate-800 font-semibold">{lesson.conceptTitle}</strong> • {lesson.overview}
          </p>
        </div>

        {/* AI Narration Audio Controller */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 self-start md:self-center shrink-0">
          <div className="flex items-center gap-1 px-2 text-xs font-semibold text-slate-600">
            <Volume2 className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">AI Narration:</span>
          </div>

          {isPlayingNarration ? (
            <button
              type="button"
              onClick={handlePauseNarration}
              className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs transition-colors"
              title="Pause narration"
            >
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlayNarration}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5 font-semibold px-3"
              title="Play speech narration"
            >
              <Play className="w-4 h-4 fill-current" />
              <span className="text-xs">Listen</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleStopNarration}
            className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs transition-colors"
            title="Stop narration"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>

          {/* Speed Selector */}
          <select
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="bg-white text-slate-700 text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="0.8">0.8x</option>
            <option value="1.0">1.0x</option>
            <option value="1.2">1.2x</option>
          </select>
        </div>
      </div>

      {/* Main Visual Workspace: Stepper & Flow Graph */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6">
        {/* Workspace Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-300">
              Visual Execution Flow • Step {activeStepIndex + 1} of {lesson.steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none rounded-lg text-xs font-medium transition-colors"
            >
              Previous Step
            </button>
            <button
              type="button"
              disabled={activeStepIndex === lesson.steps.length - 1}
              onClick={() => setActiveStepIndex((prev) => Math.min(lesson.steps.length - 1, prev + 1))}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Diagram Nodes: Horizontal Flow Graph */}
        <div className="py-6 overflow-x-auto">
          <div className="min-w-[680px] flex items-center justify-between gap-3 relative">
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0" />

            {lesson.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative z-10 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all cursor-pointer group text-center focus:outline-none ${
                    isActive ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Node Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-sm border-2 transition-all shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-tr from-indigo-500 to-violet-500 text-white border-white ring-4 ring-indigo-500/30'
                        : isPast
                        ? 'bg-slate-800 text-emerald-400 border-emerald-500/60'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {isTopicAutomata
                      ? step.nodeType === 'start'
                        ? 'q₀'
                        : step.nodeType === 'accept'
                        ? 'F'
                        : `${idx + 1}`
                      : `${idx + 1}`}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`text-[11px] font-bold max-w-[120px] leading-tight block ${
                      isActive ? 'text-indigo-300' : 'text-slate-400'
                    }`}
                  >
                    {step.stateLabel || step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details Card */}
        {currentStep && (
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                {isBio
                  ? `Stage: ${currentStep.stateLabel || `Step ${currentStep.stepNumber}`}`
                  : isPhys
                  ? `System Phase: ${currentStep.stateLabel || `Step ${currentStep.stepNumber}`}`
                  : isChem
                  ? `Reaction Stage: ${currentStep.stateLabel || `Step ${currentStep.stepNumber}`}`
                  : isProbStat
                  ? `Statistical Step: ${currentStep.stateLabel || `Step ${currentStep.stepNumber}`}`
                  : isMath
                  ? `Mathematical Step: ${currentStep.stateLabel || `Step ${currentStep.stepNumber}`}`
                  : `Active Step: ${currentStep.stateLabel || `Step ${currentStep.stepNumber}`}`}
              </span>
              <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 font-mono">
                {isBio
                  ? `Biological Phase: ${currentStep.nodeType}`
                  : isPhys
                  ? `Physical Phase: ${currentStep.nodeType}`
                  : isChem
                  ? `Chemical State: ${currentStep.nodeType}`
                  : isProbStat
                  ? `Method: ${currentStep.nodeType}`
                  : isMath
                  ? `Math Stage: ${currentStep.nodeType}`
                  : `Phase: ${currentStep.nodeType}`}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">{currentStep.title}</h3>

            <p className="text-slate-300 text-sm leading-relaxed">{currentStep.description}</p>

            {currentStep.notes && (
              <div className="p-3 bg-indigo-950/50 border border-indigo-900/60 rounded-xl text-xs text-indigo-200 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{currentStep.notes}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TOPIC-SPECIFIC INTERACTIVE SIMULATORS */}

      {/* 1. AUTOMATA SIMULATOR: Shown when topic is Automata / Theory of Computation */}
      {isTopicAutomata && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <span>Live Automaton Tape Simulator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter any binary string to watch the DFA transitions execute in real time. (Accepts strings ending with "01")
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={dfaString}
                onChange={(e) => setDfaString(e.target.value.replace(/[^01]/g, ''))}
                placeholder="Binary e.g. 01, 1001"
                maxLength={10}
                disabled={dfaRunning}
                className="px-3 py-1.5 border border-slate-300 rounded-xl font-mono text-sm w-36 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase tracking-widest text-center"
              />
              <button
                type="button"
                onClick={runDfaSimulation}
                disabled={dfaRunning || !dfaString}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Tape</span>
              </button>
            </div>
          </div>

          {/* Tape Visualization */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Input Tape w:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto p-3 bg-slate-50 rounded-2xl border border-slate-200">
              {dfaString.split('').map((char, index) => {
                const isCurrent = index === dfaTapeIndex - 1;
                const isNext = index === dfaTapeIndex;
                const isPassed = index < dfaTapeIndex;

                return (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-12 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-base border-2 transition-all ${
                        isCurrent
                          ? 'bg-indigo-600 text-white border-indigo-700 scale-105 shadow-md ring-4 ring-indigo-500/20'
                          : isPassed
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isNext
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {char}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">[{index}]</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* States Indicator */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { id: 'q0', label: 'q₀ (Start)', desc: 'Scan tape start' },
              { id: 'q1', label: 'q₁ (Saw 0)', desc: 'Candidate prefix' },
              { id: 'q2', label: 'q₂ (Accepting F)', desc: 'Ends in "01"' },
            ].map((st) => {
              const isCurrent = dfaActiveState === st.id;
              return (
                <div
                  key={st.id}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    isCurrent
                      ? 'bg-indigo-50/80 border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {st.id}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{st.label}</h4>
                    <p className="text-[11px] text-slate-500">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verdict Banner */}
          {dfaVerdict && (
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 animate-fade-in ${
                dfaVerdict === 'accept'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {dfaVerdict === 'accept' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <div className="text-xs">
                <strong className="font-bold">
                  {dfaVerdict === 'accept' ? 'String ACCEPTED by DFA' : 'String REJECTED by DFA'}
                </strong>
                <p className="mt-0.5 opacity-90">
                  {dfaVerdict === 'accept'
                    ? `Input string "${dfaString}" ends in '01' and reached final state q₂.`
                    : `Input string "${dfaString}" terminated in non-accepting state.`}
                </p>
              </div>
            </div>
          )}

          {/* Automata Log Console */}
          {dfaLog.length > 0 && (
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 max-h-40 overflow-y-auto border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                Automata State Transition Console:
              </div>
              {dfaLog.map((log, i) => (
                <div key={i} className="text-slate-300">
                  › {log}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. DATA STRUCTURES SIMULATOR: Shown when topic is Data Structures */}
      {isTopicDsa && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Live Data Structure Visualizer: Binary Search</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Observe logarithmic halving O(log n) as Low, Mid, and High pointers isolate the target element in sorted memory.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Target:</span>
              <input
                type="number"
                value={dsaTarget}
                onChange={(e) => resetDsaSearch(parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-1.5 border border-slate-300 rounded-xl font-mono text-xs font-bold text-center"
              />
              <button
                type="button"
                onClick={stepDsaSearch}
                disabled={dsaFoundIndex !== null}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Next Compare</span>
              </button>
              <button
                type="button"
                onClick={() => resetDsaSearch(dsaTarget)}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
                title="Reset Search"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Array Cell Blocks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Contiguous Array Buffer (Sorted Ints):
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-blue-600 font-bold">● Low: {dsaLow}</span>
                <span className="text-indigo-600 font-bold">● Mid: {dsaMid !== null ? dsaMid : '-'}</span>
                <span className="text-purple-600 font-bold">● High: {dsaHigh}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {dsaArray.map((val, idx) => {
                const isMid = idx === dsaMid;
                const isFound = idx === dsaFoundIndex;
                const inRange = idx >= dsaLow && idx <= dsaHigh;

                return (
                  <div
                    key={idx}
                    onClick={() => resetDsaSearch(val)}
                    className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                      isFound
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105'
                        : isMid
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-4 ring-indigo-500/20 scale-105'
                        : inRange
                        ? 'bg-slate-50 border-slate-300 text-slate-800 hover:border-indigo-400'
                        : 'bg-slate-100/50 border-slate-200 text-slate-400 opacity-40'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-70 mb-0.5">[{idx}]</div>
                    <div className="font-extrabold text-base font-mono">{val}</div>
                    <div className="text-[9px] font-bold mt-1 uppercase">
                      {isFound ? 'Match!' : isMid ? 'Midpoint' : idx === dsaLow ? 'Low' : idx === dsaHigh ? 'High' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Target Chips */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500">Quick Test Targets:</span>
            {[35, 57, 95, 40].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => resetDsaSearch(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  dsaTarget === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* DSA Log Console */}
          {dsaLogs.length > 0 && (
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 max-h-36 overflow-y-auto border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                Data Structure Search Traversal Console:
              </div>
              {dsaLogs.map((log, i) => (
                <div key={i} className="text-slate-300">
                  › {log}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. COMPUTER NETWORKS SIMULATOR: Shown when topic is Computer Networks */}
      {isTopicNetworks && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600" />
                <span>Live TCP 3-Way Handshake Protocol Simulator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Step through SYN → SYN-ACK → ACK packet exchange synchronizing sequence numbers across client and server.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={stepTcpHandshake}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{tcpStep === 3 ? 'Reset Connection' : 'Send Next Packet'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Network Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {/* Client Box */}
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs text-center space-y-2">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Client Host</div>
              <div className="font-mono text-xs text-slate-500">192.168.1.10 : 50123</div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono inline-block ${
                  tcpStep === 0
                    ? 'bg-slate-100 text-slate-600'
                    : tcpStep === 1
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {tcpStep === 0 ? 'CLOSED' : tcpStep === 1 ? 'SYN-SENT' : 'ESTABLISHED'}
              </div>
            </div>

            {/* Packet In-Flight Wire */}
            <div className="text-center space-y-2">
              <div className="text-xs font-bold text-slate-600">Physical Channel (IP Network)</div>
              <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs shadow-inner">
                {tcpStep === 0 && <span className="text-slate-500">Channel Idle</span>}
                {tcpStep === 1 && (
                  <span className="text-amber-400 font-bold animate-pulse">→ [SYN] seq=100 →</span>
                )}
                {tcpStep === 2 && (
                  <span className="text-blue-400 font-bold animate-pulse">← [SYN+ACK] seq=300, ack=101 ←</span>
                )}
                {tcpStep === 3 && (
                  <span className="text-emerald-400 font-bold">↔ [ESTABLISHED] Full-Duplex Data Ready ↔</span>
                )}
              </div>
            </div>

            {/* Server Box */}
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs text-center space-y-2">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Server Host</div>
              <div className="font-mono text-xs text-slate-500">93.184.216.34 : 443</div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono inline-block ${
                  tcpStep === 0
                    ? 'bg-blue-100 text-blue-800'
                    : tcpStep === 1
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {tcpStep === 0 ? 'LISTEN' : tcpStep === 1 ? 'SYN-RECEIVED' : 'ESTABLISHED'}
              </div>
            </div>
          </div>

          {/* TCP Log Console */}
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 max-h-36 overflow-y-auto border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
              Network Protocol Packet Exchange Log:
            </div>
            {tcpLog.map((log, i) => (
              <div key={i} className="text-slate-300">
                › {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. OPERATING SYSTEMS SIMULATOR: Shown when topic is Operating Systems */}
      {isTopicOs && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span>Live CPU Process Scheduler & Context Switch Simulator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Observe the OS Dispatcher cycle processes through Ready, Running, and Terminated states under Round Robin scheduling.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
                CPU Clock: {osClock}ms
              </span>
              <button
                type="button"
                onClick={stepOsScheduler}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Step Clock (+1ms)</span>
              </button>
              <button
                type="button"
                onClick={resetOsScheduler}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
                title="Reset Scheduler"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Processes State Boards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {osProcesses.map((p) => {
              const isRunning = p.state === 'Running';
              const isDone = p.state === 'Done';

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border-2 transition-all space-y-2 ${
                    isRunning
                      ? 'bg-indigo-50/90 border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                      : isDone
                      ? 'bg-slate-50 border-slate-200 opacity-50'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900">Process {p.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${
                        isRunning
                          ? 'bg-indigo-600 text-white'
                          : isDone
                          ? 'bg-slate-200 text-slate-600'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.state}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Remaining Burst: <strong className="font-mono">{p.burstRemaining}ms</strong>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${isRunning ? 'bg-indigo-600' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.max(0, 100 - p.burstRemaining * 25)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* OS Scheduler Log Console */}
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 max-h-36 overflow-y-auto border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
              Kernel Dispatcher & Context Switch Console:
            </div>
            {osLogs.map((log, i) => (
              <div key={i} className="text-slate-300">
                › {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DBMS SIMULATOR: Shown when topic is DBMS */}
      {isTopicDbms && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600" />
                <span>Live DBMS Query Plan & B+ Tree Index Simulator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Compare Cost-Based Optimizer execution: B+ Tree Index Seek (O(log n)) vs Full Table Scan (O(n)).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleDbPlan('index_seek')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  dbPlan === 'index_seek'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                B+ Tree Index Seek
              </button>
              <button
                type="button"
                onClick={() => toggleDbPlan('table_scan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  dbPlan === 'table_scan'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Full Table Scan
              </button>
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Estimated Disk I/O</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">{dbCost} Pages</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Concurrency Lock</span>
              <div className="text-xl font-bold font-mono text-indigo-600 mt-1">{dbLockType}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Time Complexity</span>
              <div className="text-xl font-bold font-mono text-emerald-600 mt-1">
                {dbPlan === 'index_seek' ? 'O(log N)' : 'O(N)'}
              </div>
            </div>
          </div>

          {/* DBMS Log Console */}
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 max-h-36 overflow-y-auto border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
              Database Query Engine & Storage Engine Console:
            </div>
            {dbLogs.map((log, i) => (
              <div key={i} className="text-slate-300">
                › {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MACHINE LEARNING SIMULATOR: Shown when topic is Machine Learning */}
      {isTopicMl && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span>Live Neural Forward Pass & Gradient Descent Simulator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Observe weights update iteratively via backpropagation to minimize Mean Squared Error loss.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
                Epoch: {mlEpoch}
              </span>
              <button
                type="button"
                onClick={stepMlGradient}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Take Gradient Step</span>
              </button>
            </div>
          </div>

          {/* Neural Weight Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Input x</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">2.0</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Weight W</span>
              <div className="text-xl font-bold font-mono text-indigo-600 mt-1">{mlWeight}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Bias B</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-1">{mlBias}</div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <span className="text-[11px] font-semibold text-indigo-700 uppercase">Loss (MSE)</span>
              <div className="text-xl font-bold font-mono text-indigo-900 mt-1">{mlLoss}</div>
            </div>
          </div>

          {/* ML Log Console */}
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 max-h-36 overflow-y-auto border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
              Optimization Pipeline & Backpropagation Console:
            </div>
            {mlLogs.map((log, i) => (
              <div key={i} className="text-slate-300">
                › {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. BIOLOGY SIMULATOR: Shown when subject or topic is Biology */}
      {isBio && (
        <div className="space-y-6">
          {/* A. Photosynthesis Interactive Lab */}
          {(activeMaterial.mainTopic.toLowerCase().includes('photo') ||
            lesson.conceptTitle.toLowerCase().includes('photo') ||
            (currentConcept?.name || '').toLowerCase().includes('photo')) ? (
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <span>Photosynthesis Photon & Carbon Fixation Chamber</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Adjust solar irradiance and carbon dioxide levels to observe light reactions and Calvin cycle glucose output.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 p-1.5 rounded-xl border border-emerald-200">
                  <button
                    type="button"
                    onClick={() => setBioActivePhase('light')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      bioActivePhase === 'light'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    Thylakoid Light Phase
                  </button>
                  <button
                    type="button"
                    onClick={() => setBioActivePhase('calvin')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      bioActivePhase === 'calvin'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    Stroma Calvin Cycle
                  </button>
                </div>
              </div>

              {/* Environmental Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500" />
                      Solar Light Intensity:
                    </span>
                    <span className="font-mono text-emerald-700">{bioLightIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={bioLightIntensity}
                    onChange={(e) => setBioLightIntensity(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Dim (Low Photons)</span>
                    <span>Moderate</span>
                    <span>Peak Irradiance</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-blue-500" />
                      Atmospheric CO₂ Concentration:
                    </span>
                    <span className="font-mono text-emerald-700">{bioCo2Level} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="50"
                    value={bioCo2Level}
                    onChange={(e) => setBioCo2Level(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>200 ppm (Depleted)</span>
                    <span>400 ppm (Ambient)</span>
                    <span>800 ppm (Enriched)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Physiological Outputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-700">Net Photosynthesis</span>
                  <div className="text-xl font-extrabold text-emerald-950 font-mono mt-1">
                    {Math.min(100, Math.round((bioLightIntensity * 0.55) + (bioCo2Level / 800 * 45)))}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500">O₂ Evolution Rate</span>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {(bioLightIntensity * 0.22).toFixed(1)} mL/min
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Glucose Output</span>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {((bioLightIntensity / 100) * (bioCo2Level / 400) * 14.2).toFixed(1)} mg/hr
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-700">ATP / NADPH Pool</span>
                  <div className="text-xs font-extrabold text-emerald-800 mt-2">
                    {bioLightIntensity >= 50 ? 'Saturating (High)' : 'Rate-Limiting (Low)'}
                  </div>
                </div>
              </div>

              {/* Chloroplast Active Phase Visual */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-950/5 text-emerald-900 text-xs space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>
                    {bioActivePhase === 'light'
                      ? 'Thylakoid Membrane: Photolysis & Photophosphorylation Active'
                      : 'Chloroplast Stroma: RuBisCO Carbon Fixation (Calvin Cycle) Active'}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {bioActivePhase === 'light'
                    ? 'Photons strike Photosystem II and I pigments, exciting electrons. Water is split by photolysis (2H₂O → 4H⁺ + 4e⁻ + O₂↑). Protons pumped into the thylakoid lumen power ATP Synthase while NADP⁺ reductase produces NADPH.'
                    : 'RuBisCO binds atmospheric CO₂ to 5-carbon RuBP, forming 3-PGA. Using ATP and NADPH from the light reactions, 3-PGA is reduced to G3P. Every 2 G3P molecules exit to form one stable glucose molecule (C₆H₁₂O₆).'}
                </p>
              </div>
            </div>
          ) : (activeMaterial.mainTopic.toLowerCase().includes('digest') ||
            lesson.conceptTitle.toLowerCase().includes('digest') ||
            (currentConcept?.name || '').toLowerCase().includes('digest')) ? (
            /* B. Human Digestive System Interactive Explorer */
            <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-amber-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Dna className="w-5 h-5 text-amber-600" />
                  <span>Human Gastrointestinal (GI) Tract Sequential Explorer</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trace nutrients through mechanical digestion, enzyme-catalyzed hydrolysis, and intestinal absorption.
                </p>
              </div>

              {/* Station Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { name: '1. Oral Cavity', organ: 'Mouth' },
                  { name: '2. Esophagus', organ: 'Peristalsis' },
                  { name: '3. Stomach', organ: 'Gastric Churning' },
                  { name: '4. Duodenum', organ: 'Liver & Pancreas' },
                  { name: '5. Small Intestine', organ: 'Villi Absorption' },
                  { name: '6. Colon', organ: 'Water Uptake' },
                ].map((st, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBioDigestStation(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      bioDigestStation === idx
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>

              {/* Station Detail Card */}
              {(() => {
                const stations = [
                  {
                    title: 'Oral Cavity (Mouth & Salivary Glands)',
                    ph: 'pH 6.8 - 7.2 (Neutral)',
                    enzymes: 'Salivary Amylase & Lingual Lipase',
                    action: 'Mechanical mastication cuts and grinds food bolus. Salivary amylase begins breaking down starch into maltose.',
                    absorption: 'Minimal (water, sublingual medications)',
                  },
                  {
                    title: 'Esophagus & Epiglottis',
                    ph: 'pH 7.0',
                    enzymes: 'Mucus secretions (lubrication only)',
                    action: 'Coordinated involuntary wave of muscular contractions (peristalsis) propels bolus through the lower esophageal sphincter.',
                    absorption: 'None',
                  },
                  {
                    title: 'Stomach (Gastric Pit Secretions)',
                    ph: 'pH 1.5 - 2.0 (Hydrochloric Acid HCl)',
                    enzymes: 'Pepsin (activated from pepsinogen) & Gastric Lipase',
                    action: 'Vigorous mechanical churning creates acidic chyme. Low pH denatures dietary proteins and destroys swallowed pathogens.',
                    absorption: 'Alcohol, water, aspirin',
                  },
                  {
                    title: 'Duodenum (Bile & Pancreatic Duct Juices)',
                    ph: 'pH 7.5 - 8.2 (Bicarbonate Neutralization)',
                    enzymes: 'Bile Salts (Liver), Pancreatic Amylase, Trypsin, Chymotrypsin, Pancreatic Lipase',
                    action: 'Bile emulsifies dietary fat globules into microscopic droplets. Pancreatic enzymes hydrolyze proteins, carbohydrates, and lipids.',
                    absorption: 'Iron, calcium, initial fatty acids',
                  },
                  {
                    title: 'Small Intestine (Jejunum & Ileum)',
                    ph: 'pH 7.4',
                    enzymes: 'Brush-border enzymes (Maltase, Sucrase, Lactase, Peptidases)',
                    action: 'Millions of finger-like villi and microvilli expand absorptive surface area (~30 m²).',
                    absorption: 'Monosaccharides, amino acids, dipeptides into capillaries; fatty acids & chylomicrons into lymphatic lacteals.',
                  },
                  {
                    title: 'Large Intestine (Colon) & Rectum',
                    ph: 'pH 6.0 - 7.0',
                    enzymes: 'Beneficial microbiome bacterial fermentation (Vitamin K & Biotin)',
                    action: 'Reabsorbs ~90% of remaining water and sodium/potassium electrolytes. Compacts indigestible cellulose fiber into stool.',
                    absorption: 'Water, electrolytes, bacterial vitamins',
                  },
                ];
                const active = stations[bioDigestStation] || stations[0];
                return (
                  <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                      <h4 className="font-extrabold text-base text-amber-950">{active.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-xs font-mono font-bold text-amber-900">
                          {active.ph}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                        <span className="text-[10px] font-bold text-amber-700 uppercase">Active Enzymes & Secretions</span>
                        <p className="font-semibold text-slate-800">{active.enzymes}</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                        <span className="text-[10px] font-bold text-amber-700 uppercase">Nutrient Absorption</span>
                        <p className="font-semibold text-slate-800">{active.absorption}</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-100">
                      <span className="font-bold text-slate-900">Physiological Mechanism: </span>
                      {active.action}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* C. General Biology Interactive Organelle & Pathway Explorer */
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-emerald-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span>Biological System & Cellular Homeostasis Progression</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Examine structure-function relationships and biological pathways governing {lesson.conceptTitle}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {lesson.steps.map((s, idx) => (
                  <div
                    key={s.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      idx === activeStepIndex
                        ? 'bg-emerald-50 border-emerald-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">Biological Stage {idx + 1}</span>
                      <span className="text-[10px] font-mono text-slate-400">{s.stateLabel || 'Stage'}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">{s.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. PHYSICS SIMULATOR: Shown when subject or topic is Physics */}
      {isPhys && (
        <div className="bg-white rounded-2xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Newtonian Mechanics & Force-Dynamics Lab</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Investigate Newton's Laws (F_net = m·a): vary applied forces, surface friction, and object mass to analyze dynamic kinematics.
              </p>
            </div>
          </div>

          {/* Interactive Dynamics Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Applied Force (F):</span>
                <span className="font-mono text-blue-600">{physForce} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={physForce}
                onChange={(e) => setPhysForce(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 N</span>
                <span>50 N</span>
                <span>100 N</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Inertial Mass (m):</span>
                <span className="font-mono text-blue-600">{physMass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={physMass}
                onChange={(e) => setPhysMass(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 kg</span>
                <span>12 kg</span>
                <span>25 kg</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Frictional Resistance (f):</span>
                <span className="font-mono text-amber-600">{physFriction} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                value={physFriction}
                onChange={(e) => setPhysFriction(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 N (Frictionless)</span>
                <span>15 N</span>
                <span>30 N</span>
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Calculations */}
          {(() => {
            const netForce = Math.max(0, physForce - physFriction);
            const accel = physMass > 0 ? (netForce / physMass) : 0;
            const velocityAt3s = accel * 3;
            const kineticEnergy = 0.5 * physMass * (velocityAt3s * velocityAt3s);

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-[10px] uppercase font-bold text-blue-700">Net Resultant Force (ΣF)</span>
                    <div className="text-xl font-extrabold text-blue-950 font-mono mt-1">{netForce} N</div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                    <span className="text-[10px] uppercase font-bold text-indigo-700">Acceleration (a = ΣF/m)</span>
                    <div className="text-xl font-extrabold text-indigo-950 font-mono mt-1">{accel.toFixed(2)} m/s²</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Velocity at t=3s</span>
                    <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{velocityAt3s.toFixed(2)} m/s</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Kinetic Energy (½mv²)</span>
                    <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{kineticEnergy.toFixed(1)} J</div>
                  </div>
                </div>

                {/* Free-Body Diagram Representation */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="font-bold text-blue-400 uppercase tracking-wider">Free-Body Diagram Vector Balance:</span>
                    <span>Mass = {physMass} kg</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-slate-300">
                    <div>↑ Normal Force (F_N): +{(physMass * 9.8).toFixed(1)} N</div>
                    <div>↓ Gravity Force (F_g): -{(physMass * 9.8).toFixed(1)} N</div>
                    <div>→ Applied Force (F): +{physForce} N</div>
                    <div>← Friction Force (f): -{physFriction} N</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 9. CHEMISTRY SIMULATOR: Shown when subject or topic is Chemistry */}
      {isChem && (
        <div className="bg-white rounded-2xl border border-teal-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-teal-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-teal-600" />
              <span>Chemical Bonding & Electronegativity (ΔEN) Explorer</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select interacting elemental pairs to evaluate electronegativity differentials, electron cloud transfers, and resulting chemical bond types.
            </p>
          </div>

          {/* Elemental Pair Preset Buttons */}
          {(() => {
            const chemPairs = [
              {
                name: 'Sodium + Chlorine (NaCl)',
                elA: { symbol: 'Na', en: 0.93, val: 1 },
                elB: { symbol: 'Cl', en: 3.16, val: 7 },
                type: 'Ionic Lattice',
                desc: 'Large electronegativity difference causes complete electron transfer from Na to Cl, forming Na⁺ and Cl⁻ ions arranged in a crystalline lattice.',
              },
              {
                name: 'Hydrogen + Chlorine (HCl)',
                elA: { symbol: 'H', en: 2.20, val: 1 },
                elB: { symbol: 'Cl', en: 3.16, val: 7 },
                type: 'Polar Covalent',
                desc: 'Chlorine attracts the bonding electron pair more strongly, creating a permanent dipole with partial negative charge (δ⁻) on Cl and partial positive (δ⁺) on H.',
              },
              {
                name: 'Carbon + Hydrogen (Methane CH₄)',
                elA: { symbol: 'C', en: 2.55, val: 4 },
                elB: { symbol: 'H', en: 2.20, val: 1 },
                type: 'Nonpolar Covalent',
                desc: 'Near-equal electronegativity yields symmetric electron sharing. Tetrahedral symmetry cancels dipole moments.',
              },
              {
                name: 'Oxygen + Hydrogen (Water H₂O)',
                elA: { symbol: 'O', en: 3.44, val: 6 },
                elB: { symbol: 'H', en: 2.20, val: 1 },
                type: 'Strong Polar Covalent',
                desc: 'High ΔEN and bent molecular geometry produce strong intermolecular hydrogen bonding and unique solvent properties.',
              },
              {
                name: 'Nitrogen + Nitrogen (N₂ Gas)',
                elA: { symbol: 'N', en: 3.04, val: 5 },
                elB: { symbol: 'N', en: 3.04, val: 5 },
                type: 'Pure Nonpolar Covalent (Triple Bond)',
                desc: 'Identical electronegativity (ΔEN = 0.00). Six electrons are shared symmetrically in a high-energy triple bond (:N≡N:).',
              },
              {
                name: 'Iron + Iron (Metallic Lattice)',
                elA: { symbol: 'Fe', en: 1.83, val: 2 },
                elB: { symbol: 'Fe', en: 1.83, val: 2 },
                type: 'Metallic Bonding',
                desc: 'Valence electrons delocalize into a freely flowing electron sea around positive iron cation cores, imparting high electrical and thermal conductivity.',
              },
            ];

            const active = chemPairs[chemPairIdx] || chemPairs[0];
            const deltaEn = Math.abs(active.elA.en - active.elB.en);

            return (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {chemPairs.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setChemPairIdx(idx)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        chemPairIdx === idx
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                {/* Electronegativity Comparison Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Element A ({active.elA.symbol})</span>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">EN = {active.elA.en}</div>
                    <span className="text-[10px] text-slate-400">Valence: {active.elA.val}e⁻</span>
                  </div>

                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-teal-700">ΔEN Differential</span>
                    <div className="text-2xl font-black font-mono text-teal-900 mt-1">{deltaEn.toFixed(2)}</div>
                    <span className="text-[10px] font-bold text-teal-700">{active.type}</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Element B ({active.elB.symbol})</span>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">EN = {active.elB.en}</div>
                    <span className="text-[10px] text-slate-400">Valence: {active.elB.val}e⁻</span>
                  </div>
                </div>

                {/* Chemical Mechanism Card */}
                <div className="p-4 bg-teal-950/5 rounded-xl border border-teal-200 text-xs text-slate-700 leading-relaxed space-y-1">
                  <div className="font-bold text-teal-900">Bond Classification & Electron Behavior:</div>
                  <p>{active.desc}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 10. PROBABILITY & STATISTICS INTERACTIVE LAB: Shown when subject or topic is Probability & Statistics */}
      {isProbStat && (
        <div className="bg-white rounded-2xl border border-violet-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-violet-100 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-600" />
                <span>Probability & Statistics Interactive Lab</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore sample spaces, dice roll probabilities, arithmetic mean, deviations, and standard deviation spread.
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setProbStatMode('dice')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  probStatMode === 'dice'
                    ? 'bg-white text-violet-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎲 Probability & Dice
              </button>
              <button
                type="button"
                onClick={() => setProbStatMode('stats')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  probStatMode === 'stats'
                    ? 'bg-white text-violet-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📊 Mean & Standard Deviation
              </button>
              <button
                type="button"
                onClick={() => setProbStatMode('normal')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  probStatMode === 'normal'
                    ? 'bg-white text-violet-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔔 Normal Curve (68-95-99.7)
              </button>
            </div>
          </div>

          {/* MODE 1: PROBABILITY & DICE LAB */}
          {probStatMode === 'dice' && (() => {
            const diceEvents = [
              { name: 'Roll a 4', desc: 'Single specific number', favorable: [4], formula: 'P(4) = 1/6' },
              { name: 'Even Number {2, 4, 6}', desc: 'Three favorable outcomes', favorable: [2, 4, 6], formula: 'P(Even) = 3/6 = 1/2' },
              { name: 'Roll ≥ 5 {5, 6}', desc: 'High rolls', favorable: [5, 6], formula: 'P(≥5) = 2/6 = 1/3' },
              { name: 'Prime Number {2, 3, 5}', desc: 'Prime dice faces', favorable: [2, 3, 5], formula: 'P(Prime) = 3/6 = 1/2' },
              { name: 'Odd Number {1, 3, 5}', desc: 'Three odd numbers', favorable: [1, 3, 5], formula: 'P(Odd) = 3/6 = 1/2' },
            ];

            const activeEvent = diceEvents[selectedEventPreset] || diceEvents[0];
            const probPercent = ((activeEvent.favorable.length / 6) * 100).toFixed(1);
            const complementPercent = (100 - parseFloat(probPercent)).toFixed(1);
            const isLastRollFavorable = lastDiceRoll !== null && activeEvent.favorable.includes(lastDiceRoll);

            return (
              <div className="space-y-6">
                {/* Event Preset Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Select Target Event (E):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {diceEvents.map((evt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedEventPreset(idx)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedEventPreset === idx
                            ? 'bg-violet-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {evt.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sample Space S Visual Grid */}
                <div className="p-5 bg-violet-50/50 rounded-2xl border border-violet-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700">
                        Complete Sample Space S = {'{1, 2, 3, 4, 5, 6}'} (Total = 6)
                      </span>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Highlighted tiles represent favorable outcomes satisfying event "{activeEvent.name}".
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={isRollingDice}
                      onClick={handleRollDice}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <span>🎲 Roll Fair Die</span>
                    </button>
                  </div>

                  {/* 6 Dice Faces */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((face) => {
                      const isFavorable = activeEvent.favorable.includes(face);
                      const isRolled = lastDiceRoll === face;

                      return (
                        <div
                          key={face}
                          className={`p-4 rounded-xl text-center border-2 transition-all ${
                            isRolled
                              ? 'bg-violet-600 text-white border-violet-700 ring-4 ring-violet-300 scale-105'
                              : isFavorable
                              ? 'bg-white text-violet-900 border-violet-400 shadow-xs'
                              : 'bg-slate-100/70 text-slate-400 border-slate-200 opacity-70'
                          }`}
                        >
                          <div className="text-2xl font-black font-mono">{face}</div>
                          <span
                            className={`text-[10px] font-bold block mt-1 uppercase ${
                              isRolled
                                ? 'text-white'
                                : isFavorable
                                ? 'text-violet-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {isRolled ? '★ ROLLED' : isFavorable ? 'Favorable' : 'Outcome'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Last Roll Status Banner */}
                  {lastDiceRoll !== null && (
                    <div
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                        isLastRollFavorable
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🎲</span>
                        <span>
                          Last Rolled: <strong>{lastDiceRoll}</strong> &nbsp;—&nbsp;
                          {isLastRollFavorable
                            ? `Satisfies event "${activeEvent.name}" (Favorable)!`
                            : `Does NOT satisfy event "${activeEvent.name}".`}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        History: [{diceHistory.join(', ')}]
                      </span>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Probability Calculation Card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Total Possible Outcomes (n(S))</span>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">6 Outcomes</div>
                    <span className="text-[10px] text-slate-400">Sample space: {'{1, 2, 3, 4, 5, 6}'}</span>
                  </div>

                  <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
                    <span className="text-[10px] uppercase font-bold text-violet-700">Favorable Outcomes (n(E))</span>
                    <div className="text-xl font-black font-mono text-violet-900 mt-1">
                      {activeEvent.favorable.length} {activeEvent.favorable.length === 1 ? 'Outcome' : 'Outcomes'}
                    </div>
                    <span className="text-[10px] font-bold text-violet-700">
                      Subset E = {'{' + activeEvent.favorable.join(', ') + '}'}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Probability P(E)</span>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                      {activeEvent.favorable.length}/6 = {probPercent}%
                    </div>
                    <span className="text-[10px] text-slate-400">Complement P(not E) = {complementPercent}%</span>
                  </div>
                </div>

                {/* Educational Mathematical Formula Breakdown */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="font-bold text-violet-400 uppercase tracking-wider">
                      Classical Probability Calculation:
                    </span>
                    <span>P(E) = n(E) / n(S)</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed pt-1 space-y-1">
                    <div>1. Sample Space S = {'{1, 2, 3, 4, 5, 6}'} ⟹ n(S) = 6</div>
                    <div>2. Favorable Event E = {'{' + activeEvent.favorable.join(', ') + '}'} ⟹ n(E) = {activeEvent.favorable.length}</div>
                    <div>3. Probability P(E) = {activeEvent.favorable.length} / 6 = {(activeEvent.favorable.length / 6).toFixed(4)} ({probPercent}%)</div>
                    <div>4. Complement Rule: P(E') = 1 - P(E) = 1 - {(activeEvent.favorable.length / 6).toFixed(4)} = {(1 - activeEvent.favorable.length / 6).toFixed(4)} ({complementPercent}%)</div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* MODE 2: MEAN & STANDARD DEVIATION CALCULATOR */}
          {probStatMode === 'stats' && (() => {
            const datasets = [
              {
                name: 'Marks: [10, 20, 30, 40, 50]',
                data: [10, 20, 30, 40, 50],
                note: 'User example: Sum = 150, Count N = 5, Mean = 30.',
              },
              {
                name: 'Scores: [60, 70, 80, 90, 100]',
                data: [60, 70, 80, 90, 100],
                note: 'Symmetrical distribution centered at Mean = 80.',
              },
              {
                name: 'High Spread: [10, 25, 50, 95, 120]',
                data: [10, 25, 50, 95, 120],
                note: 'Wide variance showing how larger deviations expand standard deviation.',
              },
              {
                name: 'Low Spread: [48, 49, 50, 51, 52]',
                data: [48, 49, 50, 51, 52],
                note: 'Tightly clustered observations with small standard deviation.',
              },
            ];

            const activeSet = datasets[selectedDatasetIdx] || datasets[0];
            const data = activeSet.data;
            const N = data.length;
            const sum = data.reduce((acc, val) => acc + val, 0);
            const mean = sum / N;
            const deviations = data.map((x) => x - mean);
            const squaredDeviations = deviations.map((d) => d * d);
            const sumSqDev = squaredDeviations.reduce((acc, val) => acc + val, 0);
            const variance = sumSqDev / N;
            const stdDev = Math.sqrt(variance);

            return (
              <div className="space-y-6">
                {/* Dataset Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Select Sample Dataset:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {datasets.map((d, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDatasetIdx(idx)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedDatasetIdx === idx
                            ? 'bg-violet-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{activeSet.note}</p>
                </div>

                {/* Key Summary Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Sample Count (N)</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">{N}</div>
                    <span className="text-[10px] text-slate-400">Observations</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Sum (Σ xᵢ)</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">{sum}</div>
                    <span className="text-[10px] text-slate-400">Total aggregate</span>
                  </div>

                  <div className="p-4 bg-violet-50 rounded-xl border border-violet-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-violet-700">Mean (μ = Σx/N)</span>
                    <div className="text-2xl font-black font-mono text-violet-900 mt-1">{mean.toFixed(2)}</div>
                    <span className="text-[10px] font-bold text-violet-700">Center of mass</span>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-indigo-700">Std Dev (σ = √σ²)</span>
                    <div className="text-2xl font-black font-mono text-indigo-900 mt-1">{stdDev.toFixed(2)}</div>
                    <span className="text-[10px] font-bold text-indigo-700">Variance σ² = {variance.toFixed(1)}</span>
                  </div>
                </div>

                {/* Step-by-Step Deviations & Variance Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Step-by-Step Observation & Deviation Table
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Mean μ = {mean.toFixed(2)}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Observation (xᵢ)</th>
                          <th className="p-3">Deviation from Mean (xᵢ - μ)</th>
                          <th className="p-3">Squared Deviation (xᵢ - μ)²</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {data.map((x, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">{x}</td>
                            <td className="p-3 text-slate-700">
                              {x} - {mean.toFixed(1)} ={' '}
                              <span
                                className={
                                  deviations[i] < 0
                                    ? 'text-rose-600 font-bold'
                                    : deviations[i] > 0
                                    ? 'text-emerald-600 font-bold'
                                    : 'text-slate-500'
                                }
                              >
                                {deviations[i] >= 0 ? `+${deviations[i].toFixed(1)}` : deviations[i].toFixed(1)}
                              </span>
                            </td>
                            <td className="p-3 text-indigo-700 font-bold">
                              {squaredDeviations[i].toFixed(2)}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                          <td className="p-3 text-slate-900">Total Sum = {sum}</td>
                          <td className="p-3 text-slate-700">
                            Σ(xᵢ - μ) = 0.00 &nbsp;
                            <span className="text-[10px] text-emerald-600 font-sans font-bold">
                              (Deviations balance to zero!)
                            </span>
                          </td>
                          <td className="p-3 text-indigo-900">
                            Σ(xᵢ - μ)² = {sumSqDev.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Formulas & Physical Interpretation */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="font-bold text-violet-400 uppercase tracking-wider">
                      Statistical Formulas Breakdown:
                    </span>
                    <span>σ = √[ (1/N) * Σ(xᵢ - μ)² ]</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-300">
                    <div>
                      <strong className="text-violet-300">1. Arithmetic Mean:</strong>
                      <div className="text-slate-400">μ = {sum} / {N} = {mean.toFixed(2)}</div>
                    </div>
                    <div>
                      <strong className="text-violet-300">2. Population Variance:</strong>
                      <div className="text-slate-400">σ² = {sumSqDev.toFixed(2)} / {N} = {variance.toFixed(2)}</div>
                    </div>
                    <div>
                      <strong className="text-violet-300">3. Standard Deviation:</strong>
                      <div className="text-slate-400">σ = √{variance.toFixed(2)} = {stdDev.toFixed(2)}</div>
                    </div>
                    <div>
                      <strong className="text-violet-300">4. Interpretation:</strong>
                      <div className="text-slate-400">
                        Typical data points lie within [{ (mean - stdDev).toFixed(1) }, { (mean + stdDev).toFixed(1) }].
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* MODE 3: NORMAL DISTRIBUTION (68-95-99.7) */}
          {probStatMode === 'normal' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-violet-400 text-sm flex items-center gap-2">
                    <span>The Empirical 3-Sigma Rule: Gaussian Normal Distribution</span>
                  </h4>
                  <span className="text-xs font-mono text-slate-400">X ~ N(μ, σ²)</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  In a symmetric, bell-shaped normal distribution, the standard deviation σ dictates the exact percentage of data enclosed within intervals centered on the mean μ:
                </p>

                {/* 3 Interval Bands */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-800 rounded-xl border border-violet-500/40 text-center">
                    <span className="text-2xl font-black font-mono text-violet-400">~68.3%</span>
                    <h5 className="text-xs font-bold text-white mt-1">Within μ ± 1σ</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      More than two-thirds of all observations lie within 1 standard deviation of the mean.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800 rounded-xl border border-indigo-500/40 text-center">
                    <span className="text-2xl font-black font-mono text-indigo-400">~95.5%</span>
                    <h5 className="text-xs font-bold text-white mt-1">Within μ ± 2σ</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Almost all typical observations lie within 2 standard deviations of the mean.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800 rounded-xl border border-emerald-500/40 text-center">
                    <span className="text-2xl font-black font-mono text-emerald-400">~99.7%</span>
                    <h5 className="text-xs font-bold text-white mt-1">Within μ ± 3σ</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Virtually the entire population lies within 3 standard deviations. Values outside are statistical outliers.
                    </p>
                  </div>
                </div>

                {/* Z-Score Formula */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-2">
                  <span>Standard Z-Score Formula: Z = (X - μ) / σ</span>
                  <span className="text-slate-500">Measures distance from mean in units of σ</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 11. GENERAL TOPIC WALKTHROUGH: Shown for any other subject/topic */}
      {!isTopicAutomata && !isTopicDsa && !isTopicNetworks && !isTopicOs && !isTopicDbms && !isTopicMl && !isBio && !isPhys && !isChem && !isProbStat && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-indigo-600" />
              <span>{isMath ? 'Mathematical Conceptual Walkthrough: ' : 'Interactive Conceptual Walkthrough: '}{activeMaterial.mainTopic}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Step through foundational principles and systematic mechanisms governing {lesson.conceptTitle}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lesson.steps.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  idx === activeStepIndex
                    ? 'bg-indigo-50 border-indigo-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">Step {idx + 1}</span>
                  <span className="text-[10px] font-mono text-slate-400">{s.nodeType}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">{s.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps CTA Footer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            const question = isTopicAutomata
              ? `In the visual lesson for ${lesson.conceptTitle}, explain how state transitions and acceptance criteria work.`
              : isBio
              ? `Can you explain the biological mechanisms, cellular organelles, and enzyme pathways involved in ${lesson.conceptTitle}?`
              : isPhys
              ? `Can you explain the fundamental physical laws, vector forces, and governing equations for ${lesson.conceptTitle}?`
              : isChem
              ? `Can you explain the electron interactions, electronegativity principles, and reaction mechanics in ${lesson.conceptTitle}?`
              : isProbStat
              ? `Can you explain the mathematical formulas, step-by-step calculations, and real-world meaning of ${lesson.conceptTitle}?`
              : `Can you explain the key mechanisms and principles in ${lesson.conceptTitle}?`;
            onSetTutorQuestion(question);
            onNavigateTab('tutor');
          }}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
        >
          <BotMessageSquare className="w-4 h-4 text-indigo-600" />
          <span>Ask AI About This Visual Flow</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('assessments')}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 transform hover:scale-[1.02]"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Check My Understanding for {currentConcept.name} →</span>
        </button>
      </div>
    </div>
  );
};
