import {
  VisualLesson,
  LearningMaterial,
  ChapterSummaryData,
  InteractiveCheckpoint,
  StudentLevel,
} from '../types';

/**
 * Multilingual Translations Dictionary for Narration & Subtitles
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', label: 'English', flag: '🇺🇸', name: 'English' },
  { code: 'es-ES', label: 'Español', flag: '🇪🇸', name: 'Spanish' },
  { code: 'fr-FR', label: 'Français', flag: '🇫🇷', name: 'French' },
  { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪', name: 'German' },
  { code: 'hi-IN', label: 'हिन्दी', flag: '🇮🇳', name: 'Hindi' },
  { code: 'zh-CN', label: '中文', flag: '🇨🇳', name: 'Mandarin' },
];

/**
 * Sign Language / Visual Gesture Icon Mapping for Visual Concept Accessibility
 */
export const SIGN_LANGUAGE_CUES: Record<string, { icon: string; label: string; gestureDescription: string }> = {
  start: { icon: '🟢☝️', label: 'Start / Initialize', gestureDescription: 'Index finger pointing upward, indicating origin or beginning.' },
  process: { icon: '⚙️🤲', label: 'Process / Transform', gestureDescription: 'Both open hands moving inward, representing transformation.' },
  decision: { icon: '⚖️🤔', label: 'Decision / Condition', gestureDescription: 'Two palms facing upward tilting like scale pans, representing choice.' },
  action: { icon: '⚡👉', label: 'Action / Execution', gestureDescription: 'Firm forward pointing hand, denoting active execution.' },
  accept: { icon: '✅🙌', label: 'Accept / Completed', gestureDescription: 'Both hands raised open in affirmation, denoting successful acceptance.' },
  reject: { icon: '❌🙅', label: 'Reject / Dead State', gestureDescription: 'Arms crossed at wrists, signifying boundary termination or rejection.' },
};

/**
 * Get or synthesize complete Chapter Summary, Formulas, and Revision Notes
 */
export function getChapterSummaryForLesson(
  lesson: VisualLesson,
  subject: string,
  topic: string
): ChapterSummaryData {
  if (lesson.chapterSummary) return lesson.chapterSummary;

  const topLower = topic.toLowerCase();
  const subjLower = subject.toLowerCase();
  const isProbStat = subjLower.includes('prob') || subjLower.includes('stat') || topLower.includes('prob') || topLower.includes('mean') || topLower.includes('deviation');
  const isAutomata = topLower.includes('automata') || topLower.includes('dfa') || topLower.includes('toc');
  const isBio = subjLower.includes('bio') || topLower.includes('photo') || topLower.includes('digest');
  const isPhys = subjLower.includes('physic') || topLower.includes('newton') || topLower.includes('motion');
  const isChem = subjLower.includes('chem') || topLower.includes('bond');

  if (isProbStat) {
    return {
      overview: `A rigorous study of probability principles and descriptive statistics, focusing on sample spaces S, event probabilities P(E), and measures of central dispersion (arithmetic mean μ and standard deviation σ).`,
      keyConcepts: [
        { name: 'Sample Space (S)', summary: 'The universal set of all mutually exclusive elementary outcomes of a random trial.' },
        { name: 'Event Probability P(E)', summary: 'The ratio of favorable outcomes n(E) to the total possible outcomes n(S): P(E) = n(E) / n(S).' },
        { name: 'Arithmetic Mean (μ)', summary: 'The center of mass and balance point: μ = (Σ xᵢ) / N, where total deviations Σ(xᵢ - μ) = 0.' },
        { name: 'Standard Deviation (σ)', summary: 'Quantifies data variation in original linear units: σ = √[ (1/N) * Σ(xᵢ - μ)² ].' },
      ],
      formulas: [
        {
          name: 'Classical Probability Rule',
          formula: 'P(E) = n(E) / n(S) = (Favorable Outcomes) / (Total Possible Outcomes)',
          explanation: 'Requires that all elementary outcomes in sample space S are equally likely. 0 ≤ P(E) ≤ 1.',
        },
        {
          name: 'Population Mean Formula',
          formula: 'μ = (1 / N) * Σᵢ₌₁ᴺ xᵢ',
          explanation: 'Sum of all observations divided by the total count N. Sensitive to extreme outliers.',
        },
        {
          name: 'Standard Deviation Formula',
          formula: 'σ = √[ (1 / N) * Σᵢ₌₁ᴺ (xᵢ - μ)² ]',
          explanation: 'Square root of variance. Squaring prevents positive and negative deviations from canceling out.',
        },
      ],
      quickRevisionNotes: [
        'Always verify that favorable outcomes are a subset of the total sample space, never the reverse.',
        'Complement rule: P(Eᶜ) = 1 - P(E). Very useful for "at least one" problems.',
        'Two datasets can share identical means while possessing drastically different spreads.',
        'In any normal distribution, ~68% of data falls within [μ - σ, μ + σ] and ~95% within [μ - 2σ, μ + 2σ].',
      ],
      learningOutcomes: [
        'Calculate exact probabilities by exhaustively listing sample spaces.',
        'Compute population and sample means using summation notation.',
        'Evaluate step-by-step deviations, squared differences, variance, and standard deviation.',
        'Distinguish between favorable outcomes, sample spaces, and compound event unions.',
      ],
      importantTakeaways: [
        'Probability cannot exceed 1.0 or fall below 0.0.',
        'Always count total outcomes N accurately, including zeros.',
        'Standard deviation is expressed in original units, whereas variance is in squared units.',
      ],
    };
  }

  if (isAutomata) {
    return {
      overview: `Formal computational analysis of Deterministic Finite Automata (DFA) as 5-tuples M = (Q, Σ, δ, q₀, F). Explores language recognition, state transition functions, and acceptance criteria.`,
      keyConcepts: [
        { name: 'DFA 5-Tuple Definition', summary: 'M = (Q, Σ, δ, q₀, F) with finite states Q, input alphabet Σ, transition function δ, start state q₀, and accept states F.' },
        { name: 'Total Transition Function (δ)', summary: 'In a DFA, δ: Q × Σ → Q is single-valued and fully defined for every state-symbol pair with no ambiguity or ε-moves.' },
        { name: 'Extended Transition Function (δ*)', summary: 'Recursive processing of input strings: δ*(q, ε) = q and δ*(q, wa) = δ(δ*(q, w), a).' },
        { name: 'Regular Language L(M)', summary: 'The set of all strings w ∈ Σ* such that δ*(q₀, w) halts in an accepting state F.' },
      ],
      formulas: [
        {
          name: 'DFA Transition Mapping',
          formula: 'δ: Q × Σ → Q',
          explanation: 'Given current state q and input symbol a, returns exactly one next deterministic state.',
        },
        {
          name: 'Language Acceptance Criteria',
          formula: 'L(M) = { w ∈ Σ* | δ*(q₀, w) ∈ F }',
          explanation: 'A string w is accepted if and only if the machine finishes reading w and halts in an accepting state F.',
        },
      ],
      quickRevisionNotes: [
        'A DFA must have exactly one designated start state q₀, but can have zero, one, or multiple accept states F.',
        'Dead / Trap states are required in DFAs whenever an invalid prefix cannot lead to an accepted string.',
        'DFAs and NFAs possess identical computational power: both recognize precisely the class of regular languages.',
        'DFA state minimization using the table-filling algorithm merges equivalent states to produce the canonical minimal DFA.',
      ],
      learningOutcomes: [
        'Construct DFA state diagrams and transition tables from formal language specifications.',
        'Trace input string execution step-by-step through state sequences.',
        'Differentiate between DFA deterministic mapping and NFA multi-branch trajectories.',
        'Verify acceptance criteria by inspecting terminal state membership in F.',
      ],
      importantTakeaways: [
        'Every regular language has a unique minimal DFA up to state isomorphism.',
        'DFA transitions cannot have ε-moves (empty string jumps).',
      ],
    };
  }

  if (isBio) {
    return {
      overview: `Comprehensive biological investigation of cellular energy transduction and physiological pathways, emphasizing anatomical structure-function relationships and enzyme kinetics.`,
      keyConcepts: [
        { name: 'Chloroplast & Thylakoid Dynamics', summary: 'Specialized plant organelles where chlorophyll pigments absorb photons to excite electrons.' },
        { name: 'Photolysis & Light Reactions', summary: 'Splitting of water (2H₂O → 4H⁺ + 4e⁻ + O₂) producing ATP and NADPH along thylakoid membranes.' },
        { name: 'Calvin Cycle & Carbon Fixation', summary: 'Light-independent synthesis in the stroma using RuBisCO to fix CO₂ into glucose.' },
        { name: 'Enzymatic Catalysis', summary: 'Biological proteins lowering reaction activation energy without being consumed.' },
      ],
      formulas: [
        {
          name: 'Photosynthesis Balanced Equation',
          formula: '6 CO₂ + 6 H₂O + Light Energy → C₆H₁₂O₆ + 6 O₂',
          explanation: 'Carbon dioxide and water are transformed into chemical potential energy (glucose) and oxygen gas.',
        },
      ],
      quickRevisionNotes: [
        'Light reactions take place in the thylakoid membranes; the Calvin cycle takes place in the stroma.',
        'Oxygen released in photosynthesis originates from water (photolysis), not carbon dioxide.',
        'Enzymes lower the activation energy barrier but do not alter the overall ΔG of the reaction.',
      ],
      learningOutcomes: [
        'Trace energy flow from solar photons to chemical ATP and glucose bonds.',
        'Identify specific organelle compartments and their biochemical functions.',
        'Explain negative feedback and homeostatic regulation.',
      ],
      importantTakeaways: [
        'Structure strictly dictates function at cellular and organ levels.',
      ],
    };
  }

  if (isPhys) {
    return {
      overview: `Rigorous classical mechanics breakdown of Newton's Laws of Motion, vector force superposition, and kinematics.`,
      keyConcepts: [
        { name: "Newton's First Law (Inertia)", summary: 'A body maintains constant velocity unless acted upon by a net external force (ΣF = 0).' },
        { name: "Newton's Second Law", summary: 'Net force produces acceleration proportional to mass: ΣF = m·a.' },
        { name: "Newton's Third Law", summary: 'Forces occur in equal and opposite interaction pairs acting on distinct bodies.' },
      ],
      formulas: [
        {
          name: "Newton's Second Law Formula",
          formula: 'Σ F = m · a',
          explanation: 'Net force vector equals mass times acceleration vector. Units: Newtons (N) = kg·m/s².',
        },
      ],
      quickRevisionNotes: [
        'Force is a vector: always resolve into orthogonal x and y Cartesian components.',
        'Action and reaction pairs never cancel each other because they act on different objects.',
      ],
      learningOutcomes: [
        'Draw accurate free-body diagrams showing all external vector forces.',
        'Apply ΣF = ma along independent coordinate axes.',
      ],
      importantTakeaways: [
        'Zero net force means zero acceleration, not necessarily zero velocity.',
      ],
    };
  }

  // General Subject Default
  return {
    overview: `Structured chapter summary for ${lesson.conceptTitle} covering fundamental axioms, operational mechanisms, and learning sequence.`,
    keyConcepts: [
      { name: 'Foundational Principles', summary: 'The core governing definitions and baseline parameters.' },
      { name: 'Operational Mechanisms', summary: 'How individual components interact systematically.' },
      { name: 'Practical Applications', summary: 'Applying theoretical concepts to solve real-world problems.' },
    ],
    formulas: [
      {
        name: 'Standard Transformation Rule',
        formula: 'Output = Function(Inputs, Constraints)',
        explanation: 'Governing relationship linking operational parameters to measurable outcomes.',
      },
    ],
    quickRevisionNotes: [
      'Master the foundational definitions before advancing to edge cases.',
      'Verify boundary conditions and initial parameters systematically.',
    ],
    learningOutcomes: [
      'Articulate primary principles in plain language.',
      'Demonstrate sound step-by-step reasoning.',
    ],
    importantTakeaways: [
      'Connect individual rules into a cohesive domain framework.',
    ],
  };
}

/**
 * Multilingual Translation Generator for Subtitles & Narration
 */
export function getMultilingualNarration(text: string, langCode: string): string {
  if (!text || langCode.startsWith('en')) return text;

  // Domain-specific keyword replacement mappings for instant offline synchronized multilingual demo
  if (langCode.startsWith('es')) {
    return text
      .replace(/Welcome to this/g, 'Bienvenido a esta')
      .replace(/visual walkthrough of/g, 'demostración visual de')
      .replace(/Follow along step by step/g, 'Siga paso a paso')
      .replace(/Deterministic Finite Automaton/g, 'Autómata Finito Determinista')
      .replace(/state transitions/g, 'transiciones de estado')
      .replace(/acceptance criteria/g, 'criterios de aceptación')
      .replace(/sample space/g, 'espacio muestral')
      .replace(/favorable outcomes/g, 'resultados favorables')
      .replace(/standard deviation/g, 'desviación estándar')
      .replace(/arithmetic mean/g, 'media aritmética')
      .replace(/photosynthesis/g, 'fotosíntesis')
      .replace(/Step/g, 'Paso')
      .replace(/Notice how/g, 'Observe cómo');
  }

  if (langCode.startsWith('fr')) {
    return text
      .replace(/Welcome to this/g, 'Bienvenue dans cette')
      .replace(/visual walkthrough of/g, 'démonstration visuelle de')
      .replace(/Follow along step by step/g, 'Suivez étape par étape')
      .replace(/Deterministic Finite Automaton/g, 'Automate Fini Déterministe')
      .replace(/state transitions/g, 'transitions d’état')
      .replace(/sample space/g, 'espace échantillon')
      .replace(/standard deviation/g, 'écart-type')
      .replace(/Step/g, 'Étape');
  }

  if (langCode.startsWith('de')) {
    return text
      .replace(/Welcome to this/g, 'Willkommen zu diesem')
      .replace(/visual walkthrough of/g, 'visuellen Durchlauf von')
      .replace(/Follow along step by step/g, 'Folgen Sie Schritt für Schritt')
      .replace(/Deterministic Finite Automaton/g, 'Deterministischer endlicher Automat')
      .replace(/state transitions/g, 'Zustandsübergänge')
      .replace(/standard deviation/g, 'Standardabweichung')
      .replace(/Step/g, 'Schritt');
  }

  if (langCode.startsWith('hi')) {
    return text
      .replace(/Welcome to this/g, 'इस दृश्य पाठ में आपका स्वागत है')
      .replace(/visual walkthrough of/g, 'का दृश्य प्रदर्शन')
      .replace(/Follow along step by step/g, 'चरण-दर-चरण पालन करें')
      .replace(/sample space/g, 'प्रतिदर्श समष्टि (सैंपल स्पेस)')
      .replace(/standard deviation/g, 'मानक विचलन (Standard Deviation)')
      .replace(/arithmetic mean/g, 'समांतर माध्य (Mean)')
      .replace(/Step/g, 'चरण');
  }

  if (langCode.startsWith('zh')) {
    return text
      .replace(/Welcome to this/g, '欢迎来到本')
      .replace(/visual walkthrough of/g, '的可视化演示')
      .replace(/Follow along step by step/g, '请按部就班跟随学习')
      .replace(/Deterministic Finite Automaton/g, '确定性有限自动机')
      .replace(/standard deviation/g, '标准差')
      .replace(/sample space/g, '样本空间')
      .replace(/Step/g, '步骤');
  }

  return text;
}

/**
 * Generate an in-scene interactive checkpoint question
 */
export function getCheckpointQuestionForLesson(
  lesson: VisualLesson,
  subject: string,
  topic: string
): InteractiveCheckpoint {
  if (lesson.checkpoint) return lesson.checkpoint;

  const topLower = topic.toLowerCase();
  const isProbStat = topLower.includes('prob') || topLower.includes('stat') || topLower.includes('mean') || topLower.includes('deviation');
  const isAutomata = topLower.includes('automata') || topLower.includes('dfa') || topLower.includes('toc');
  const isBio = topLower.includes('photo') || topLower.includes('bio');

  if (isProbStat) {
    return {
      sceneIndex: 1,
      question: 'Checkpoint: In calculating probability P(E) = n(E) / n(S), what does the denominator n(S) represent?',
      options: [
        'The total number of all possible outcomes in the entire sample space',
        'Only the outcomes that satisfy the desired winning condition',
        'The difference between winning and losing outcomes',
        'The square root of the mean value',
      ],
      correctIndex: 0,
      hint: 'Recall that probability is favorable divided by EVERYTHING that could possibly happen.',
      explanation: 'n(S) represents the cardinality of the full sample space S—every possible elementary outcome of the experiment.',
    };
  }

  if (isAutomata) {
    return {
      sceneIndex: 1,
      question: 'Checkpoint: In a Deterministic Finite Automaton (DFA), what does the transition function δ(q, a) specify?',
      options: [
        'Exactly one deterministic next state with no ambiguity or branching',
        'A random set of multiple simultaneous states',
        'An empty string transition requiring no input tape symbol',
        'The immediate halting and termination of the machine',
      ],
      correctIndex: 0,
      hint: 'The key word is "Deterministic": there is always exactly one unambiguous path.',
      explanation: 'In a DFA, δ: Q × Σ → Q maps every state and alphabet symbol to exactly one unique target state.',
    };
  }

  if (isBio) {
    return {
      sceneIndex: 1,
      question: 'Checkpoint: Where do the light-dependent reactions of photosynthesis take place inside the plant cell?',
      options: [
        'In the thylakoid membranes of the chloroplast',
        'In the fluid stroma outside the thylakoids',
        'Inside the cell nucleus',
        'In the outer cell wall cellulose fibers',
      ],
      correctIndex: 0,
      hint: 'Chlorophyll pigments are embedded in membranous disc stacks called thylakoids.',
      explanation: 'Light absorption and photolysis take place on thylakoid membranes, generating ATP and NADPH for the stroma.',
    };
  }

  return {
    sceneIndex: 1,
    question: `Checkpoint: What is the primary purpose of this step in ${lesson.conceptTitle}?`,
    options: [
      'To establish validated criteria before proceeding to the next phase',
      'To randomize outcomes without repeatable rules',
      'To bypass the foundational axioms of the subject',
      'To conclude the entire experiment prematurely',
    ],
    correctIndex: 0,
    hint: 'Each phase in a systematic workflow builds upon verified criteria from previous steps.',
    explanation: 'Systematic analysis requires verifying baseline parameters before transitioning to downstream execution.',
  };
}

/**
 * Generate Standalone Offline Learning Package (Single-file HTML with interactive offline player)
 */
export function generateOfflinePackageHtml(
  lesson: VisualLesson,
  material: LearningMaterial,
  subject: string,
  summaryData: ChapterSummaryData
): string {
  const jsonLesson = JSON.stringify(lesson);
  const jsonSummary = JSON.stringify(summaryData);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offline Learning Package — ${lesson.conceptTitle}</title>
  <style>
    :root { --primary: #4f46e5; --bg: #0f172a; --card: #1e293b; --text: #f8fafc; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; background: #312e81; color: #c7d2fe; text-transform: uppercase; margin-bottom: 10px; }
    h1 { font-size: 26px; margin: 0 0 10px; }
    .card { background: var(--card); border: 1px solid #334155; border-radius: 16px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .controls { display: flex; gap: 10px; align-items: center; margin-top: 15px; }
    button { background: var(--primary); color: white; border: none; padding: 10px 16px; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 13px; }
    button:hover { background: #4338ca; }
    .step-box { border-left: 4px solid var(--primary); padding-left: 15px; margin: 15px 0; }
    .formula { font-family: monospace; background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #334155; color: #a5b4fc; margin: 8px 0; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Offline Learning Package • IntelliLearn AI</div>
    <h1>${lesson.conceptTitle}</h1>
    <p style="color: #94a3b8; font-size: 13px;">Subject: <strong>${subject}</strong> • Topic: <strong>${material.mainTopic}</strong> • Standalone Offline Bundle</p>

    <div class="card">
      <h2 style="font-size: 18px; margin-top: 0;">🎧 Offline Visual Narration & Scene Stepper</h2>
      <p style="color: #cbd5e1;">${lesson.overview}</p>
      <div id="active-step" class="step-box">
        <h3 id="step-title" style="margin: 0; color: #a5b4fc;">Step 1: ${lesson.steps[0]?.title || 'Overview'}</h3>
        <p id="step-desc" style="color: #cbd5e1;">${lesson.steps[0]?.description || ''}</p>
        <div id="step-notes" style="font-size: 12px; color: #94a3b8;">${lesson.steps[0]?.notes || ''}</div>
      </div>
      <div class="controls">
        <button onclick="prevStep()">◀ Previous Scene</button>
        <span id="step-count" style="font-size: 12px; font-weight: bold; color: #94a3b8;">Scene 1 of ${lesson.steps.length}</span>
        <button onclick="nextStep()">Next Scene ▶</button>
        <button onclick="speakCurrent()" style="background: #10b981;">🔊 Read Narration Aloud</button>
      </div>
    </div>

    <div class="card">
      <h2 style="font-size: 18px; margin-top: 0;">📌 Chapter Summary & Key Formulas</h2>
      <p>${summaryData.overview}</p>

      <h4 style="color: #a5b4fc; margin-bottom: 8px;">Key Formulas:</h4>
      ${summaryData.formulas.map(f => `
        <div class="formula"><strong>${f.name}:</strong> ${f.formula}<br><small style="color: #94a3b8;">${f.explanation}</small></div>
      `).join('')}

      <h4 style="color: #a5b4fc; margin-top: 15px; margin-bottom: 8px;">Quick Revision Notes:</h4>
      <ul>
        ${summaryData.quickRevisionNotes.map(n => `<li>${n}</li>`).join('')}
      </ul>

      <h4 style="color: #a5b4fc; margin-top: 15px; margin-bottom: 8px;">Learning Outcomes:</h4>
      <ul>
        ${summaryData.learningOutcomes.map(o => `<li>✓ ${o}</li>`).join('')}
      </ul>
    </div>
  </div>

  <script>
    const lessonData = ${jsonLesson};
    let currentIdx = 0;

    function renderStep() {
      const step = lessonData.steps[currentIdx];
      if (!step) return;
      document.getElementById('step-title').innerText = 'Step ' + (currentIdx + 1) + ': ' + step.title;
      document.getElementById('step-desc').innerText = step.description;
      document.getElementById('step-notes').innerText = step.notes || '';
      document.getElementById('step-count').innerText = 'Scene ' + (currentIdx + 1) + ' of ' + lessonData.steps.length;
    }

    function prevStep() {
      if (currentIdx > 0) { currentIdx--; renderStep(); }
    }
    function nextStep() {
      if (currentIdx < lessonData.steps.length - 1) { currentIdx++; renderStep(); }
    }
    function speakCurrent() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const step = lessonData.steps[currentIdx];
        const text = step ? (step.title + '. ' + step.description) : lessonData.overview;
        const ut = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(ut);
      } else {
        alert('Web Speech API is not supported in this browser.');
      }
    }
  </script>
</body>
</html>`;
}
