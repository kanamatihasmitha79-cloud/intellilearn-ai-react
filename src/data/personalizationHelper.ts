import {
  StudentProfile,
  LearningMaterial,
  MaterialConcept,
  RoadmapNode,
  StudentProgress,
  VisualLesson,
  QuizAssessment,
  QuizQuestion,
} from '../types';

export const DEFAULT_SUBJECT_OPTIONS: Array<{
  name: string;
  category: string;
  icon: string;
  defaultTopic: string;
  description: string;
  color: string;
}> = [
  {
    name: 'Computer Science',
    category: 'Engineering & Technology',
    icon: '💻',
    defaultTopic: 'Finite Automata',
    description: 'Automata theory, formal languages, algorithms, and systems architecture.',
    color: 'from-blue-500/10 to-indigo-500/10 border-indigo-200 text-indigo-700',
  },
  {
    name: 'Mathematics',
    category: 'Pure & Applied Science',
    icon: '📐',
    defaultTopic: 'Calculus & Linear Algebra',
    description: 'Calculus, linear algebra, coordinate geometry, and discrete structures.',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-700',
  },
  {
    name: 'Probability & Statistics',
    category: 'Mathematical & Data Sciences',
    icon: '🎲',
    defaultTopic: 'Probability & Descriptive Statistics',
    description: 'Sample spaces, probability rules, mean, variance, standard deviation, and distributions.',
    color: 'from-violet-500/10 to-indigo-500/10 border-violet-200 text-violet-700',
  },
  {
    name: 'Physics',
    category: 'Natural Science',
    icon: '⚡',
    defaultTopic: 'Classical Mechanics & Electromagnetism',
    description: 'Mechanics, electromagnetism, optics, and thermodynamics.',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-700',
  },
  {
    name: 'Chemistry',
    category: 'Natural Science',
    icon: '🧪',
    defaultTopic: 'Chemical Bonding & Reaction Kinetics',
    description: 'Atomic structure, molecular bonding, organic synthesis, and kinetics.',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-700',
  },
  {
    name: 'Biology',
    category: 'Life Science',
    icon: '🧬',
    defaultTopic: 'Cell Biology & Genetics',
    description: 'Cellular processes, genetics, molecular biology, and ecosystems.',
    color: 'from-green-500/10 to-emerald-500/10 border-green-200 text-green-700',
  },
  {
    name: 'Other',
    category: 'Interdisciplinary',
    icon: '📚',
    defaultTopic: 'Custom Subject Curriculum',
    description: 'Economics, Psychology, Engineering, or custom specialized domain.',
    color: 'from-slate-500/10 to-slate-600/10 border-slate-200 text-slate-700',
  },
];

export const LEARNING_GOAL_OPTIONS = [
  {
    id: 'Understand concepts',
    label: 'Understand concepts',
    desc: 'Break down complex theoretical topics with intuitive visual analogies and plain English.',
    icon: '💡',
  },
  {
    id: 'Prepare for exams',
    label: 'Prepare for exams',
    desc: 'Focus on high-yield exam definitions, formulas, and time-tested problem patterns.',
    icon: '📝',
  },
  {
    id: 'Improve weak topics',
    label: 'Improve weak topics',
    desc: 'Identify cognitive knowledge gaps and target specific misconceptions with adaptive drills.',
    icon: '🎯',
  },
  {
    id: 'Practice questions',
    label: 'Practice questions',
    desc: 'Challenge your retention with rigorous conceptual multiple-choice quizzes.',
    icon: '📊',
  },
  {
    id: 'Learn from my notes',
    label: 'Learn from my notes',
    desc: 'Transform your own uploaded lecture notes, textbook PDFs, and handwriting into structured lessons.',
    icon: '📂',
  },
];

export const LEVEL_OPTIONS = [
  {
    id: 'Beginner',
    label: 'Beginner',
    desc: 'Starting from fundamentals. Emphasize intuition, real-world analogies, and step-by-step guidance.',
  },
  {
    id: 'Intermediate',
    label: 'Intermediate',
    desc: 'Comfortable with core basics. Focus on standard notations, proofs, and practical applications.',
  },
  {
    id: 'Advanced',
    label: 'Advanced',
    desc: 'Seeking deep mastery. Rigorous mathematical definitions, edge cases, and complex system design.',
  },
];

/**
 * Check if the user's selected topic is related to Finite Automata / Formal Languages
 */
export function isAutomataTopic(topic: string = ''): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes('finite automata') ||
    t.includes('theory of computation') ||
    t.includes('toc') ||
    t.includes('flat') ||
    t.includes('formal language') ||
    t.includes('dfa') ||
    t.includes('nfa') ||
    (t.includes('automata') && !t.includes('network') && !t.includes('dbms') && !t.includes('operating'))
  );
}

/**
 * Check if the user's selected topic is related to DSA
 */
export function isDsaTopic(topic: string = ''): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes('dsa') ||
    t.includes('data structure') ||
    t.includes('algorithm') ||
    t.includes('binary tree') ||
    t.includes('linked list') ||
    t.includes('sorting') ||
    t.includes('graph search') ||
    t.includes('stack') ||
    t.includes('queue') ||
    t.includes('heap')
  );
}

/**
 * Check if the user's selected topic is related to Operating Systems
 */
export function isOsTopic(topic: string = ''): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes('operating system') ||
    t.includes('os') ||
    t.includes('process scheduling') ||
    t.includes('deadlock') ||
    t.includes('virtual memory') ||
    t.includes('concurrency')
  );
}

/**
 * Check if the user's selected topic is related to Computer Networks
 */
export function isNetworksTopic(topic: string = ''): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes('network') ||
    t.includes('tcp') ||
    t.includes('ip') ||
    t.includes('osi') ||
    t.includes('routing') ||
    t.includes('packet') ||
    t.includes('protocol') ||
    t.includes('socket') ||
    t.includes('http') ||
    t.includes('dns')
  );
}

/**
 * Check if the user's selected topic is related to DBMS / Databases
 */
export function isDbmsTopic(topic: string = ''): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes('dbms') ||
    t.includes('database') ||
    t.includes('sql') ||
    t.includes('relational') ||
    t.includes('transaction') ||
    t.includes('acid') ||
    t.includes('query') ||
    t.includes('b-tree') ||
    t.includes('b+ tree') ||
    t.includes('normalization')
  );
}

/**
 * Check if the user's selected topic is related to Machine Learning
 */
export function isMlTopic(topic: string = ''): boolean {
  const t = topic.toLowerCase();
  return (
    t.includes('machine learning') ||
    t.includes('ml') ||
    t.includes('deep learning') ||
    t.includes('neural') ||
    t.includes('gradient descent') ||
    t.includes('artificial intelligence') ||
    t.includes('regression') ||
    t.includes('classification')
  );
}

/**
 * Check if the user's selected subject or topic is related to Biology
 */
export function isBiologySubjectOrTopic(subject: string = '', topic: string = ''): boolean {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  return (
    s.includes('bio') ||
    s.includes('life science') ||
    t.includes('bio') ||
    t.includes('photosynthesis') ||
    t.includes('digestive') ||
    t.includes('digestion') ||
    t.includes('cell') ||
    t.includes('genetics') ||
    t.includes('dna') ||
    t.includes('rna') ||
    t.includes('respiration') ||
    t.includes('chloroplast') ||
    t.includes('mitochondria') ||
    t.includes('enzyme') ||
    t.includes('organ') ||
    t.includes('ecology') ||
    t.includes('evolution') ||
    t.includes('circulatory') ||
    t.includes('nervous') ||
    t.includes('anatomy') ||
    t.includes('physiology') ||
    t.includes('plant')
  );
}

/**
 * Check if the user's selected subject or topic is related to Physics
 */
export function isPhysicsSubjectOrTopic(subject: string = '', topic: string = ''): boolean {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  return (
    s.includes('physic') ||
    t.includes('physic') ||
    t.includes('newton') ||
    t.includes('mechanics') ||
    t.includes('motion') ||
    t.includes('force') ||
    t.includes('gravity') ||
    t.includes('electromagnet') ||
    t.includes('optics') ||
    t.includes('thermodynamic') ||
    t.includes('kinematic') ||
    t.includes('quantum')
  );
}

/**
 * Check if the user's selected subject or topic is related to Chemistry
 */
export function isChemistrySubjectOrTopic(subject: string = '', topic: string = ''): boolean {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  return (
    s.includes('chem') ||
    t.includes('chem') ||
    t.includes('bonding') ||
    t.includes('covalent') ||
    t.includes('ionic') ||
    t.includes('molecule') ||
    t.includes('reaction') ||
    t.includes('acid') ||
    t.includes('base') ||
    t.includes('periodic') ||
    t.includes('organic') ||
    t.includes('stoichiometry') ||
    t.includes('valence')
  );
}

/**
 * Check if the user's selected subject or topic is related to Probability & Statistics
 */
export function isProbStatSubjectOrTopic(subject: string = '', topic: string = ''): boolean {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  return (
    s.includes('probability') ||
    s.includes('statistic') ||
    s.includes('data science') ||
    t.includes('probability') ||
    t.includes('statistic') ||
    t.includes('mean') ||
    t.includes('median') ||
    t.includes('mode') ||
    t.includes('variance') ||
    t.includes('standard deviation') ||
    t.includes('std dev') ||
    t.includes('deviation') ||
    t.includes('normal distribution') ||
    t.includes('gaussian') ||
    t.includes('sample space') ||
    t.includes('conditional probability') ||
    t.includes('bayes') ||
    t.includes('random variable') ||
    t.includes('binomial') ||
    t.includes('poisson') ||
    t.includes('hypothesis') ||
    t.includes('p-value') ||
    t.includes('correlation') ||
    t.includes('regression') ||
    t.includes('dice') ||
    t.includes('coin') ||
    t.includes('combinatorics')
  );
}

/**
 * Check if the user's selected subject or topic is related to Mathematics
 */
export function isMathSubjectOrTopic(subject: string = '', topic: string = ''): boolean {
  const s = (subject || '').toLowerCase();
  const t = (topic || '').toLowerCase();
  return (
    s.includes('math') ||
    t.includes('calculus') ||
    t.includes('algebra') ||
    t.includes('probability') ||
    t.includes('statistics') ||
    t.includes('geometry') ||
    t.includes('derivative') ||
    t.includes('integral') ||
    t.includes('matrix') ||
    t.includes('vector') ||
    t.includes('discrete')
  );
}

/**
 * Generate starter material for a student's personal learning journey based strictly on their selected topic
 */
export function createPersonalizedMaterial(profile: StudentProfile): LearningMaterial {
  const subject = profile.subject.trim() || 'Computer Science';
  const topic = profile.topic?.trim() || getDefaultTopic(subject);

  let concepts: MaterialConcept[] = [];
  let summary = '';
  let definitions: Array<{ term: string; definition: string }> = [];
  let formulas: Array<{ name: string; formula: string; explanation: string }> = [];
  let rawText = '';

  if (isAutomataTopic(topic)) {
    summary = `Comprehensive personalized curriculum for ${profile.name} on Finite Automata & Formal Language Theory. Designed to help you ${profile.goal.toLowerCase()} at the ${profile.level} level. Covers state transitions, formal 5-tuple grammar, acceptance criteria, and non-determinism.`;
    concepts = [
      {
        id: 'fa-concept-1',
        name: 'Alphabets, Strings & Formal Languages',
        category: 'Foundation',
        shortSummary: 'The mathematical vocabulary: alphabets (Σ), strings, empty string (ε), and language subsets (Σ*).',
        difficulty: profile.level,
        prerequisites: ['Set Theory Basics'],
        simpleExplanation: 'Like learning the alphabet before writing sentences: Σ is the set of allowable symbols, a string is a word made from them, and a language is a collection of valid words.',
        detailedExplanation: 'An alphabet Σ is a finite, non-empty set of symbols. A string over Σ is a finite sequence of symbols. The length |w| is the count of symbols. Σ* is the Kleene star closure representing all possible strings including ε (length 0). A language L ⊆ Σ* is any set of strings.',
        analogy: 'The English alphabet {a..z} form words; the dictionary is the accepted language.',
        keyPoints: [
          'Empty string (ε) has length 0: |ε| = 0.',
          'Kleene closure Σ* includes the empty string; Σ+ excludes it.',
          'Languages are sets of strings, closed under union, intersection, and concatenation.',
        ],
        formulaOrSyntax: 'Σ = {0, 1},  w = 0101,  |w| = 4,  L ⊆ Σ*',
      },
      {
        id: 'fa-concept-2',
        name: 'Deterministic Finite Automata (DFA) & 5-Tuple Structure',
        category: 'Core',
        shortSummary: 'The formal definition of a DFA as a 5-tuple: Q, Σ, δ, q₀, and F.',
        difficulty: profile.level,
        prerequisites: ['Alphabets, Strings & Formal Languages'],
        simpleExplanation: 'A machine with fixed memory states: from any state, reading an input symbol moves you deterministically to exactly ONE next state.',
        detailedExplanation: 'A DFA is defined formally as M = (Q, Σ, δ, q₀, F), where Q is a finite set of states, Σ is the alphabet, δ: Q × Σ → Q is the total transition function, q₀ ∈ Q is the unique start state, and F ⊆ Q is the set of accepting/final states.',
        analogy: 'A subway turnstile: starting in Locked state, inserting a coin moves to Unlocked; pushing the arm moves back to Locked.',
        keyPoints: [
          '5-Tuple: Q (states), Σ (alphabet), δ (transition function), q₀ (start), F (accept states).',
          'Every state must have exactly one outgoing transition for every symbol in Σ.',
          'No ambiguous branches and no ε-transitions allowed in a standard DFA.',
        ],
        formulaOrSyntax: 'M = (Q, Σ, δ, q₀, F)  where  δ: Q × Σ → Q',
      },
      {
        id: 'fa-concept-3',
        name: 'State Transition Functions (δ) & State Tables',
        category: 'Core',
        shortSummary: 'Mapping current state and incoming symbol to the next state via transition matrices and extended transition function δ̂.',
        difficulty: profile.level,
        prerequisites: ['Deterministic Finite Automata (DFA) & 5-Tuple Structure'],
        simpleExplanation: 'The navigation GPS matrix: tell it where you currently stand and what symbol you just scanned, and it outputs the exact room you walk into next.',
        detailedExplanation: 'The transition function δ: Q × Σ → Q is extended recursively to strings via δ̂: Q × Σ* → Q, defined as δ̂(q, ε) = q and δ̂(q, wa) = δ(δ̂(q, w), a). Dead or trap states absorb invalid sequences where no future path can reach an accept state.',
        analogy: 'A board game lookup chart where your current square + dice roll determines your next square.',
        keyPoints: [
          'δ̂(q₀, w) evaluates an entire string from start to finish.',
          'Acceptance condition: string w is accepted if and only if δ̂(q₀, w) ∈ F.',
          'Dead/Trap state is a non-accepting sink state with self-loops on all symbols.',
        ],
        formulaOrSyntax: 'δ̂(q, wa) = δ(δ̂(q, w), a)  |  L(M) = { w ∈ Σ* | δ̂(q₀, w) ∈ F }',
      },
      {
        id: 'fa-concept-4',
        name: 'Non-deterministic Finite Automata (NFA) & ε-Transitions',
        category: 'Advanced',
        shortSummary: 'Machines allowing multiple simultaneous next states, zero transitions, or spontaneous ε-moves without consuming input.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['State Transition Functions (δ) & State Tables'],
        simpleExplanation: 'Like a parallel universe explorer: when faced with a choice, the machine splits into multiple parallel copies to try all paths simultaneously.',
        detailedExplanation: 'An NFA allows δ: Q × (Σ ∪ {ε}) → 2^Q, meaning transitions map to a subset of states (powerset). A string is accepted if AT LEAST ONE computational path ends in an accept state.',
        analogy: 'A maze solver that clones itself at every fork; as long as one clone reaches the exit, the puzzle is solved.',
        keyPoints: [
          'Transition output is a set of states: δ(q, a) ⊆ Q.',
          'ε-transitions allow jumping between states without reading any tape symbol.',
          'NFAs recognize the exact same class of regular languages as DFAs.',
        ],
        formulaOrSyntax: 'δ: Q × (Σ ∪ {ε}) → 2^Q',
      },
      {
        id: 'fa-concept-5',
        name: 'NFA to DFA Subset Construction (Powerset Construction)',
        category: 'Advanced',
        shortSummary: 'The algorithmic transformation converting any NFA with n states into an equivalent DFA with up to 2ⁿ states.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['Non-deterministic Finite Automata (NFA) & ε-Transitions'],
        simpleExplanation: 'Bundling parallel states into single composite groups: each DFA state represents the set of all states the NFA could possibly be in at that moment.',
        detailedExplanation: 'Subset construction creates DFA states where each state corresponds to a subset S ⊆ Q_NFA. The start state is ε-closure(q₀). For each subset S and symbol a, the DFA transition is the ε-closure of all transitions from elements of S on a. An accept state is any subset containing at least one NFA accept state.',
        analogy: 'Instead of tracking 3 separate runners, a manager tracks the single team envelope containing all 3 runners.',
        keyPoints: [
          'DFA states are subsets of NFA states; maximum DFA states = 2^|Q_NFA|.',
          'ε-closure(q) computes all states reachable from q via zero or more ε-moves.',
          'Guarantees regular language equivalence: L(DFA) = L(NFA).',
        ],
        formulaOrSyntax: 'Q_DFA ⊆ 2^Q_NFA,  Start = ε-closure(q₀_NFA)',
      },
      {
        id: 'fa-concept-6',
        name: 'DFA State Minimization & Myhill-Nerode Theorem',
        category: 'Mastery',
        shortSummary: 'Table-filling algorithm and partition refinement to find the unique minimal DFA for any regular language.',
        difficulty: 'Advanced',
        prerequisites: ['NFA to DFA Subset Construction'],
        simpleExplanation: 'Merging redundant twin states that behave identically for every future input, eliminating wasted memory.',
        detailedExplanation: 'Two states p and q are equivalent (indistinguishable) if for all strings w ∈ Σ*, δ̂(p, w) ∈ F ↔ δ̂(q, w) ∈ F. The table-filling algorithm iteratively marks distinguishable pairs. By the Myhill-Nerode theorem, the minimal DFA is unique up to state renaming.',
        analogy: 'Condensing two identical elevator buttons on the same floor into a single button.',
        keyPoints: [
          'Unreachable states are deleted first.',
          'Base case: any accept state is distinguishable from any non-accept state.',
          'Inductive step: p and q are distinguishable if δ(p, a) and δ(q, a) are distinguishable.',
        ],
        formulaOrSyntax: 'p ≡ q ↔ (∀w ∈ Σ*: δ̂(p, w) ∈ F ↔ δ̂(q, w) ∈ F)',
      },
    ];

    definitions = [
      { term: 'Finite Automaton', definition: 'A mathematical model of computation with a finite number of internal states that processes symbols from an input tape.' },
      { term: 'DFA 5-Tuple', definition: 'Formal specification consisting of Q (states), Σ (alphabet), δ (transition function), q₀ (start state), and F (accepting states).' },
      { term: 'Transition Function (δ)', definition: 'The mapping rule δ: Q × Σ → Q specifying the unique destination state for any state-symbol pair in a DFA.' },
      { term: 'Accepting / Final State', definition: 'A state marked with a double circle in transition diagrams that signals valid string acceptance upon end-of-input.' },
      { term: 'Dead / Trap State', definition: 'A non-accepting state with self-loops on all alphabet symbols from which an accepting state can never be reached.' },
      { term: 'NFA', definition: 'Non-deterministic Finite Automaton allowing multiple transitions, zero transitions, or ε-transitions on a single symbol.' },
      { term: 'ε-Closure', definition: 'The set of all states reachable from a given state by traversing zero or more ε (epsilon) empty transitions.' },
      { term: 'Regular Language', definition: 'A formal language that can be recognized by a Finite Automaton or described by a Regular Expression.' },
    ];

    formulas = [
      { name: 'DFA Formal 5-Tuple', formula: 'M = (Q, Σ, δ, q₀, F)', explanation: 'Q = finite states, Σ = alphabet, δ: Q×Σ→Q, q₀ = start, F ⊆ Q = accept.' },
      { name: 'Extended Transition Function', formula: 'δ̂(q, wa) = δ(δ̂(q, w), a)', explanation: 'Recursive evaluation of full input strings along state transitions.' },
      { name: 'Language Acceptance', formula: 'L(M) = { w ∈ Σ* | δ̂(q₀, w) ∈ F }', explanation: 'A string w is accepted if processing ends in an accept state in F.' },
      { name: 'NFA Transition Mapping', formula: 'δ: Q × (Σ ∪ {ε}) → 2^Q', explanation: 'Maps state and symbol (or empty string) to a subset in the powerset of Q.' },
      { name: 'Max Subset States', formula: '|Q_DFA| ≤ 2^|Q_NFA|', explanation: 'Upper bound on DFA states produced by subset construction from an N-state NFA.' },
    ];

    rawText = `FINITE AUTOMATA AND FORMAL LANGUAGE THEORY
Topic: ${topic}
Subject: ${subject}
Level: ${profile.level}

1. ALPHABETS, STRINGS, AND LANGUAGES
An alphabet Σ is a finite, non-empty set of symbols.
Example: Σ = {0, 1} or Σ = {a, b}.
A string over Σ is a finite sequence of symbols chosen from Σ.
The empty string is denoted by ε (or λ) and has length |ε| = 0.
The Kleene star Σ* denotes the set of all strings over Σ including ε.
A formal language L is any subset of Σ* (i.e., L ⊆ Σ*).

2. DETERMINISTIC FINITE AUTOMATA (DFA)
A DFA is mathematically specified as a 5-tuple:
M = (Q, Σ, δ, q₀, F)
- Q: A finite set of internal states.
- Σ: A finite input alphabet.
- δ: A transition function mapping Q × Σ → Q.
- q₀: The unique initial/start state where q₀ ∈ Q.
- F: A set of final or accepting states where F ⊆ Q.

DETERMINISTIC PROPERTY:
For every state q ∈ Q and every symbol a ∈ Σ, there is EXACTLY ONE transition defined by δ(q, a).
There are no choices, no parallel branches, and no transitions on the empty string ε.

3. STATE TRANSITIONS AND LANGUAGE ACCEPTANCE
The extended transition function δ̂: Q × Σ* → Q processes strings of arbitrary length:
δ̂(q, ε) = q
δ̂(q, wa) = δ(δ̂(q, w), a) for any string w ∈ Σ* and symbol a ∈ Σ.
A string w is accepted by DFA M if δ̂(q₀, w) ∈ F.
The language recognized by M is L(M) = { w ∈ Σ* | δ̂(q₀, w) ∈ F }.

4. DEAD STATES AND TRAP STATES
A dead state (or trap state) is a non-accepting state from which no accepting state can ever be reached. Once entered, any input symbol causes a self-loop back to the dead state.

5. NON-DETERMINISTIC FINITE AUTOMATA (NFA)
In an NFA, for a given state and input symbol, the machine may transition to zero, one, or multiple states:
δ: Q × (Σ ∪ {ε}) → 2^Q.
An NFA accepts string w if AT LEAST ONE computational path from q₀ ends in an accepting state in F.
NFAs and DFAs have identical expressive power: they both recognize the exact class of regular languages.`;
  } else if (isDsaTopic(topic)) {
    summary = `Personalized study guide for ${profile.name} covering ${topic} in ${subject}. Formatted to support your goal to ${profile.goal.toLowerCase()} at the ${profile.level} level.`;
    concepts = [
      {
        id: 'dsa-concept-1',
        name: 'Linear Data Structures (Arrays & Lists)',
        category: 'Foundation',
        shortSummary: 'Contiguous vs pointer-based memory representations and sequential access complexity.',
        difficulty: profile.level,
        prerequisites: ['Basic Programming', 'Memory Addressing'],
        simpleExplanation: 'Like a train with numbered cars: in an array, each seat has a fixed index so you can jump directly to any passenger in O(1) time.',
        detailedExplanation: 'Arrays provide O(1) random access via index arithmetic base + (index * element_size). Linked lists allocate non-contiguous nodes linked by references, offering O(1) insertion at head but O(n) traversal.',
        analogy: 'An apartment mailbox row where every box has an address number etched in metal.',
        keyPoints: [
          'O(1) constant time direct access for index-based arrays.',
          'Dynamic resizing strategies (amortized O(1) expansion).',
          'Singly vs doubly linked node pointer manipulation.',
        ],
        formulaOrSyntax: 'Address(A[i]) = Base_Address + (i * Element_Size)',
      },
      {
        id: 'dsa-concept-2',
        name: 'Stacks, Queues & State Buffering',
        category: 'Core',
        shortSummary: 'LIFO (Last-In-First-Out) and FIFO (First-In-First-Out) linear abstract data types.',
        difficulty: profile.level,
        prerequisites: ['Linear Data Structures (Arrays & Lists)'],
        simpleExplanation: 'A stack is like a spring-loaded cafeteria plate dispenser (last one placed on top is the first taken off). A queue is a checkout line at the grocery store.',
        detailedExplanation: 'Stacks enforce strict LIFO semantics via push() and pop() operations, serving as the foundational backing store for program call stacks, recursion unwinding, and undo history.',
        analogy: 'A stack of dinner plates or a line of people waiting for a movie ticket.',
        keyPoints: [
          'Stack operations: push, pop, peek running in O(1).',
          'Queue operations: enqueue, dequeue running in O(1).',
          'Applications in parsing parentheses and breadth-first search.',
        ],
        formulaOrSyntax: 'Stack: Top Pointer ∈ [-1, N-1] | Queue: (Rear + 1) mod N',
      },
      {
        id: 'dsa-concept-3',
        name: 'Non-Linear Trees & Hierarchical Graphs',
        category: 'Advanced',
        shortSummary: 'Recursive hierarchical branching structures, search trees, and adjacency representations.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['Stacks, Queues & State Buffering'],
        simpleExplanation: 'Like a family pedigree tree or a filesystem folder tree, where each parent node can branch into multiple subtrees.',
        detailedExplanation: 'Binary Search Trees (BST) guarantee that for any node X, all elements in left subtree < X and all in right subtree > X, yielding O(log n) balanced search and insertion.',
        analogy: 'A company organizational chart from CEO down to managers and contributors.',
        keyPoints: [
          'Binary search tree invariant and height balancing.',
          'In-order, pre-order, and post-order depth-first traversals.',
          'Graph representations: Adjacency matrix vs Adjacency list.',
        ],
        formulaOrSyntax: 'Height(Balanced Tree) = ⌊log₂(N)⌋ + 1',
      },
    ];
    definitions = [
      { term: 'Abstract Data Type (ADT)', definition: 'A mathematical model for data types defined by behavior from user perspective rather than concrete implementation.' },
      { term: 'Time Complexity (Big-O)', definition: 'Upper bound asymptotic classification describing execution time growth as input size n approaches infinity.' },
      { term: 'Pointer / Reference', definition: 'A variable that holds the virtual memory address of another memory location.' },
    ];
    formulas = [
      { name: 'Binary Tree Capacity', formula: 'Max Nodes = 2^(h+1) - 1', explanation: 'Maximum nodes present in a full binary tree of height h.' },
    ];
    rawText = `DATA STRUCTURES AND ALGORITHMS\nTopic: ${topic}\nSubject: ${subject}`;
  } else if (isOsTopic(topic)) {
    summary = `Personalized study guide for ${profile.name} covering ${topic} in ${subject}. Formatted to support your goal to ${profile.goal.toLowerCase()} at the ${profile.level} level.`;
    concepts = [
      {
        id: 'os-concept-1',
        name: 'Operating System Structure & Dual-Mode Execution',
        category: 'Foundation',
        shortSummary: 'Kernel vs user mode privileges, system calls, and hardware protection.',
        difficulty: profile.level,
        prerequisites: ['Computer Architecture Basics'],
        simpleExplanation: 'Like a passport control gate: user programs run in restricted tourist areas, and must present a formal system call to enter the kernel vault.',
        detailedExplanation: 'Dual-mode CPU architecture (user mode and kernel/supervisor mode) protects critical memory and I/O registers. Transitions occur through hardware traps or interrupts.',
        analogy: 'A secure bank lobby with a bulletproof teller window.',
        keyPoints: ['Trap instruction triggers mode bit switch.', 'System call interface (fork, exec, read, write).', 'Timer interrupt prevents infinite loops.'],
        formulaOrSyntax: 'Mode Bit: 0 = Kernel | 1 = User',
      },
      {
        id: 'os-concept-2',
        name: 'Processes, Threads & State Transitions',
        category: 'Core',
        shortSummary: 'The process lifecycle (New, Ready, Running, Waiting, Terminated) and PCB management.',
        difficulty: profile.level,
        prerequisites: ['Operating System Structure & Dual-Mode Execution'],
        simpleExplanation: 'A program is a recipe on paper; a process is the chef actively cooking in the kitchen with ingredients.',
        detailedExplanation: 'A process is a program in execution containing code text, program counter, stack, and heap. The Process Control Block (PCB) preserves state during context switches.',
        analogy: 'Bookmarking your page in a book before closing it to answer the door.',
        keyPoints: ['5-state model: New, Ready, Running, Waiting, Terminated.', 'Context switch latency and overhead.', 'Threads share address space; processes have isolated memory.'],
        formulaOrSyntax: 'PCB = { PID, Registers, PC, Memory Limits, Open Files }',
      },
      {
        id: 'os-concept-3',
        name: 'CPU Scheduling & Synchronization',
        category: 'Advanced',
        shortSummary: 'Preemptive vs non-preemptive schedulers (FCFS, Round Robin, Priority) and race conditions.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['Processes, Threads & State Transitions'],
        simpleExplanation: 'A doctor managing patients in an ER waiting room: deciding who gets seen first based on urgency or arrival time.',
        detailedExplanation: 'Schedulers optimize turnaround time, waiting time, and CPU utilization. Concurrency introduces race conditions solved with mutex locks, semaphores, and monitor invariants.',
        analogy: 'Traffic lights controlling an intersection to prevent collisions.',
        keyPoints: ['Round Robin quantum sizing trade-offs.', 'Critical section problem: Mutual Exclusion, Progress, Bounded Waiting.', 'Deadlock 4 Coffman conditions.'],
        formulaOrSyntax: 'Turnaround Time = Completion Time - Arrival Time',
      },
    ];
    definitions = [
      { term: 'Process Control Block (PCB)', definition: 'Data structure used by the operating system kernel to store all information about an active process.' },
      { term: 'Context Switch', definition: 'The mechanism of saving the state of the active process and restoring state for the next scheduled process.' },
    ];
    formulas = [
      { name: 'Average Waiting Time', formula: 'AWT = (Σ Waiting Times) / N', explanation: 'Key metric for evaluating CPU scheduling algorithm efficiency.' },
    ];
    rawText = `OPERATING SYSTEMS PRINCIPLES\nTopic: ${topic}\nSubject: ${subject}`;
  } else if (isNetworksTopic(topic)) {
    summary = `Personalized study curriculum for ${profile.name} on Computer Networks & ${topic}. Designed to help you ${profile.goal.toLowerCase()} at the ${profile.level} level. Covers protocol layering, packet encapsulation, transmission control, and routing.`;
    concepts = [
      {
        id: 'net-concept-1',
        name: 'The OSI & TCP/IP Layered Architecture',
        category: 'Foundation',
        shortSummary: 'Hierarchical abstraction models (Application, Transport, Network, Link, Physical) and packet encapsulation.',
        difficulty: profile.level,
        prerequisites: ['Basic Computer Systems'],
        simpleExplanation: 'Like mailing a letter inside nested envelopes: each layer adds its own tracking and delivery label before passing it to the courier.',
        detailedExplanation: 'The 5-layer Internet model divides networking into Application (HTTP/DNS), Transport (TCP/UDP), Network (IP), Data Link (Ethernet/Wi-Fi), and Physical (Signals). Headers are prepended as data descends (encapsulation) and stripped on arrival (decapsulation).',
        analogy: 'Sending an international shipping container through customs, trucking, rail, and sea freight.',
        keyPoints: [
          'Encapsulation prepends protocol control information (PCI) at each layer.',
          'Separation of concerns: each layer provides service to the layer above.',
          'PDU names: Data (App) → Segment (Transport) → Packet (Network) → Frame (Link) → Bits (Physical).',
        ],
        formulaOrSyntax: 'PDU = Header_L + Payload',
      },
      {
        id: 'net-concept-2',
        name: 'TCP 3-Way Handshake & Reliable Byte Stream Transmission',
        category: 'Core',
        shortSummary: 'Connection establishment (SYN, SYN-ACK, ACK), sequence numbers, sliding windows, and flow control.',
        difficulty: profile.level,
        prerequisites: ['The OSI & TCP/IP Layered Architecture'],
        simpleExplanation: 'A polite phone conversation: "Can you hear me?" → "Yes, I hear you! Can you hear me?" → "Yes, loud and clear!" Now the actual talk begins.',
        detailedExplanation: 'TCP provides connection-oriented, ordered, error-checked byte streams over unreliable IP. The 3-way handshake synchronizes initial sequence numbers (ISN). Cumulative acknowledgments and sliding window flow control prevent receiver buffer exhaustion.',
        analogy: 'Two security officers exchanging radio check codes before opening a secure data vault.',
        keyPoints: [
          'Handshake steps: SYN → SYN+ACK → ACK establish full-duplex session.',
          'Sequence numbers ensure packets reassembled in correct sequential order.',
          'Sliding window advertises receiver buffer capacity to throttle sender rate.',
        ],
        formulaOrSyntax: 'Client SYN(x) → Server SYN(y)+ACK(x+1) → Client ACK(y+1)',
      },
      {
        id: 'net-concept-3',
        name: 'IP Addressing, Subnetting & Packet Routing',
        category: 'Advanced',
        shortSummary: 'IPv4/IPv6 hierarchical addressing, CIDR prefixes, longest prefix matching, and router forwarding tables.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['TCP 3-Way Handshake & Reliable Byte Stream Transmission'],
        simpleExplanation: 'Like street addresses and postal zip codes: the network prefix finds the city/neighborhood, and the host bits find the specific apartment door.',
        detailedExplanation: 'IP provides best-effort connectionless packet delivery. Subnet masks divide addresses into Network ID and Host ID. Routers evaluate destination IP addresses against forwarding tables using longest prefix match (LPM) algorithms.',
        analogy: 'Postal sorting centers forwarding letters down smaller geographic sectors until arriving at the recipient mailbox.',
        keyPoints: [
          'CIDR notation /24 indicates 24 bits for network and 8 bits for hosts (254 usable hosts).',
          'Default gateway routes traffic destined for external networks outside the local subnet.',
          'Longest Prefix Matching (LPM) determines the outgoing interface in routing tables.',
        ],
        formulaOrSyntax: 'Network_Address = IP_Address & Subnet_Mask',
      },
    ];
    definitions = [
      { term: 'Encapsulation', definition: 'The process where each protocol layer wraps incoming data with its own header information before passing it down.' },
      { term: 'Round Trip Time (RTT)', definition: 'The length of time it takes for a data packet to be sent to a destination and an acknowledgment to be received.' },
      { term: 'Maximum Transmission Unit (MTU)', definition: 'The largest packet or frame size, specified in octets (eight-bit bytes), that can be sent in a packet- or frame-based network.' },
    ];
    formulas = [
      { name: 'Bandwidth-Delay Product', formula: 'BDP = Bandwidth × RTT', explanation: 'Maximum volume of data that can be in flight across the network pipe at any given moment.' },
    ];
    rawText = `COMPUTER NETWORKING PRINCIPLES\nTopic: ${topic}\nSubject: ${subject}`;
  } else if (isDbmsTopic(topic)) {
    summary = `Personalized database curriculum for ${profile.name} on ${topic}. Designed to help you ${profile.goal.toLowerCase()} at the ${profile.level} level. Covers relational schemas, query planning, indexing, and ACID concurrency control.`;
    concepts = [
      {
        id: 'db-concept-1',
        name: 'Relational Data Model & Integrity Constraints',
        category: 'Foundation',
        shortSummary: 'Relations (tables), attributes (columns), tuples (rows), primary keys, and foreign key referential integrity.',
        difficulty: profile.level,
        prerequisites: ['Basic Set Theory & Logic'],
        simpleExplanation: 'A collection of interlocking spreadsheets where each row has a unique passport number (Primary Key), and tables link to each other using those keys (Foreign Keys).',
        detailedExplanation: 'The relational model organizes data into first-normal-form relations. Entity integrity requires primary keys to be unique and non-null. Referential integrity ensures foreign keys reference valid existing tuples in target relations.',
        analogy: 'A library system where each book barcode uniquely identifies a volume, and member checkouts link to book barcodes.',
        keyPoints: [
          'Primary Key (PK) uniquely distinguishes each tuple in a relation.',
          'Foreign Key (FK) enforces referential integrity across related tables.',
          'Domain constraints specify valid data types and range boundaries.',
        ],
        formulaOrSyntax: 'R(A₁, A₂, ..., Aₙ) where PK ⊆ {A₁...Aₙ}',
      },
      {
        id: 'db-concept-2',
        name: 'SQL Query Execution & Index Traversal',
        category: 'Core',
        shortSummary: 'Query parse trees, cost-based optimizer, B+ Tree index search, and full table scans vs index lookups.',
        difficulty: profile.level,
        prerequisites: ['Relational Data Model & Integrity Constraints'],
        simpleExplanation: 'Looking up a recipe: using the alphabetical index at the back of the cookbook is O(log n) fast, compared to flipping through every single page from cover to cover.',
        detailedExplanation: 'The DBMS parses SQL queries into relational algebra trees. The cost-based optimizer selects execution plans based on statistics. B+ Tree indexes store keys in sorted balanced leaf pages linked as a doubly-linked list for fast range scans.',
        analogy: 'The thumb-indexed tabs on an encyclopedia volume.',
        keyPoints: [
          'B+ Tree search complexity is O(log_B N), minimizing expensive disk block I/Os.',
          'Leaf nodes store actual record pointers or clustered row tuples.',
          'Cost optimizer calculates estimated CPU and disk page access costs.',
        ],
        formulaOrSyntax: 'Height(B+ Tree) = ⌈log_fanout(N_keys)⌉',
      },
      {
        id: 'db-concept-3',
        name: 'ACID Transactions & Two-Phase Locking (2PL)',
        category: 'Advanced',
        shortSummary: 'Atomicity, Consistency, Isolation, Durability, Write-Ahead Logging (WAL), and serializability via 2PL.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['SQL Query Execution & Index Traversal'],
        simpleExplanation: 'Transferring money between bank accounts: either both the debit and credit succeed together, or neither happens at all (no money disappears into thin air).',
        detailedExplanation: 'Transactions represent logical units of work satisfying ACID properties. Atomicity and Durability are guaranteed via Write-Ahead Logging (WAL) and ARIES recovery. Isolation is enforced through Two-Phase Locking (Growing Phase acquires locks, Shrinking Phase releases locks), guaranteeing conflict serializability.',
        analogy: 'Signing an escrow contract where keys and payments are exchanged in a locked room simultaneously.',
        keyPoints: [
          'Atomicity: All-or-nothing execution semantics.',
          'Two-Phase Locking (2PL) forbids acquiring new locks after releasing any lock.',
          'WAL rule: log records must be flushed to non-volatile disk before dirty pages are written.',
        ],
        formulaOrSyntax: 'ACID: Atomicity, Consistency, Isolation, Durability',
      },
    ];
    definitions = [
      { term: 'ACID Properties', definition: 'Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent executions behave as if serial), Durability (committed data survives crashes).' },
      { term: 'Two-Phase Locking (2PL)', definition: 'A concurrency control protocol guaranteeing serializability: locks are acquired in the growing phase and released in the shrinking phase.' },
      { term: 'Write-Ahead Logging (WAL)', definition: 'Protocol ensuring changes are recorded in stable storage before actual data pages are modified on disk.' },
    ];
    formulas = [
      { name: 'B+ Tree Fanout Capacity', formula: 'Capacity = Fanout^(Height)', explanation: 'Maximum number of record pointers indexed in a B+ Tree of given fanout and height.' },
    ];
    rawText = `DATABASE MANAGEMENT SYSTEMS PRINCIPLES\nTopic: ${topic}\nSubject: ${subject}`;
  } else if (isMlTopic(topic)) {
    summary = `Personalized machine learning curriculum for ${profile.name} on ${topic}. Formatted to support your goal to ${profile.goal.toLowerCase()} at the ${profile.level} level. Covers supervised loss functions, gradient descent optimization, and neural activations.`;
    concepts = [
      {
        id: 'ml-concept-1',
        name: 'Supervised Learning & Loss Function Minimization',
        category: 'Foundation',
        shortSummary: 'Feature matrices, ground truth targets, hypothesis functions, and quantitative error loss metrics.',
        difficulty: profile.level,
        prerequisites: ['Linear Algebra & Probability Basics'],
        simpleExplanation: 'A student studying flashcards: seeing the question (features), guessing an answer (prediction), and checking how far off they were from the correct answer (loss).',
        detailedExplanation: 'Given training dataset D = {(xᵢ, yᵢ)}, supervised learning fits parameter vector θ to minimize empirical risk. Regression tasks typically minimize Mean Squared Error (MSE), while classification minimizes Cross-Entropy loss.',
        analogy: 'Archery target practice where your goal is to minimize distance between arrows and the bullseye.',
        keyPoints: [
          'Feature vectors X represent observable input attributes.',
          'Loss function L(y, ŷ) measures penalty for incorrect predictions.',
          'Objective: find parameters θ that minimize cumulative training loss.',
        ],
        formulaOrSyntax: 'MSE = (1/N) * Σ (yᵢ - ŷᵢ)²',
      },
      {
        id: 'ml-concept-2',
        name: 'Gradient Descent & Backpropagation',
        category: 'Core',
        shortSummary: 'First-order iterative optimization, learning rate tuning, partial derivatives, and computational graphs.',
        difficulty: profile.level,
        prerequisites: ['Supervised Learning & Loss Function Minimization'],
        simpleExplanation: 'Walking down a foggy mountain blindfolded: you feel the slope of the ground with your foot and take a step in the steepest downhill direction until reaching the valley.',
        detailedExplanation: 'Gradient descent updates parameters iteratively via θ = θ - η * ∇_θ L, where η is the learning rate. In multi-layer neural networks, Backpropagation applies the calculus chain rule backward from output to input to compute partial derivatives efficiently.',
        analogy: 'Rolling a marble down a bowl: it accelerates toward the lowest point of gravitational potential energy.',
        keyPoints: [
          'Gradient ∇L points in direction of steepest loss ascent; we step in negative gradient.',
          'Learning rate η controls step magnitude; too large oscillates, too small converges slowly.',
          'Backpropagation computes exact gradient in O(Parameters) time using chain rule.',
        ],
        formulaOrSyntax: 'θ_{t+1} = θ_t - η * ∇L(θ_t)',
      },
      {
        id: 'ml-concept-3',
        name: 'Generalization, Overfitting & Regularization',
        category: 'Advanced',
        shortSummary: 'Train/validation/test splits, bias-variance tradeoff, L1/L2 penalties, and model complexity control.',
        difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
        prerequisites: ['Gradient Descent & Backpropagation'],
        simpleExplanation: 'Memorizing exact practice exam questions word-for-word (overfitting) versus actually understanding the underlying concepts so you can solve brand new questions (generalization).',
        detailedExplanation: 'Overfitting occurs when a high-capacity model memorizes training noise instead of true data distribution, resulting in low training error but high test error. Regularization (L2 Ridge / Weight Decay, L1 Lasso, Dropout) constrains parameter magnitudes to promote simpler, more generalizable hypotheses.',
        analogy: 'Applying Occam’s Razor: among competing hypotheses, the simplest that explains the data is preferred.',
        keyPoints: [
          'Bias-Variance tradeoff: Underfitting (high bias) vs Overfitting (high variance).',
          'Regularization penalty λ * ||θ||² penalizes excessively large parameter weights.',
          'Cross-validation evaluates real-world out-of-sample performance.',
        ],
        formulaOrSyntax: 'Total_Loss = Empirical_Loss(θ) + λ * ||θ||²',
      },
    ];
    definitions = [
      { term: 'Gradient Descent', definition: 'An optimization algorithm that repeatedly updates parameters in the direction opposite the gradient of the loss function.' },
      { term: 'Overfitting', definition: 'A modeling error that occurs when a machine learning function is too closely aligned to a limited set of data points, failing to generalize.' },
      { term: 'Learning Rate (η)', definition: 'A tuning parameter in an optimization algorithm that determines the step size at each iteration while moving toward a minimum.' },
    ];
    formulas = [
      { name: 'Weight Update Rule', formula: 'W = W - η * (∂L/∂W)', explanation: 'Core parameter adjustment rule in gradient descent optimization.' },
    ];
    rawText = `MACHINE LEARNING PRINCIPLES\nTopic: ${topic}\nSubject: ${subject}`;
  } else if (isBiologySubjectOrTopic(subject, topic)) {
    const tLower = topic.toLowerCase();
    const isPhotosynthesis = tLower.includes('photo') || tLower.includes('chloroplast') || tLower.includes('calvin') || tLower.includes('plant');
    const isDigestive = tLower.includes('digest') || tLower.includes('stomach') || tLower.includes('gut') || tLower.includes('intestine') || tLower.includes('enzyme');
    const isCell = tLower.includes('cell') || tLower.includes('organelle') || tLower.includes('membrane') || tLower.includes('mitochondria');

    if (isPhotosynthesis) {
      summary = `Personalized Biology curriculum for ${profile.name} on Photosynthesis. Explores biological structures (chloroplasts, thylakoids, stroma), biochemical energy transformations, light-dependent reactions, and the Calvin cycle at the ${profile.level} level.`;
      concepts = [
        {
          id: 'bio-photo-1',
          name: 'What is Photosynthesis & Where Does It Occur?',
          category: 'Foundation',
          shortSummary: 'The biological process by which green plants, algae, and cyanobacteria synthesize glucose from sunlight, water, and carbon dioxide.',
          difficulty: profile.level,
          prerequisites: ['Plant Cell Basics', 'Chloroplast Anatomy'],
          simpleExplanation: 'Photosynthesis is the process by which green plants make their own food using sunlight, carbon dioxide, and water, releasing oxygen as a vital byproduct. It occurs mainly inside the chloroplasts of plant leaf cells.',
          detailedExplanation: 'Photosynthesis takes place in specialized plant organelles called chloroplasts. Within chloroplasts, double-membraned disc structures called thylakoids contain light-absorbing chlorophyll pigments, while the surrounding fluid matrix (the stroma) hosts enzymatic reactions. Overall balanced biological equation: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂.',
          analogy: 'Think of a plant leaf as a living solar bakery: chloroplasts are solar ovens using sunlight to combine air (CO₂) and water into nutritious bread (glucose).',
          keyPoints: [
            'Where it occurs: Inside the chloroplasts of photosynthetic plant cells.',
            'Key structures: Chloroplast, Chlorophyll pigments, Thylakoid membranes, and Stroma.',
            'Raw materials: Sunlight photons, atmospheric carbon dioxide (CO₂), and soil water (H₂O).',
            'Products: High-energy glucose (C₆H₁₂O₆) and oxygen gas (O₂) released into the atmosphere.',
          ],
          formulaOrSyntax: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂',
          example: 'A sunflower in a sunny field absorbing light via chlorophyll pigments in its leaves to generate sucrose for root growth while releasing fresh oxygen.',
        },
        {
          id: 'bio-photo-2',
          name: 'Important Structures & Chloroplast Anatomy',
          category: 'Foundation',
          shortSummary: 'Specialized biological structures powering photosynthesis: Chloroplasts, Chlorophyll, Thylakoid membranes, Granum stacks, and Stroma.',
          difficulty: profile.level,
          prerequisites: ['What is Photosynthesis & Where Does It Occur?'],
          simpleExplanation: 'Chloroplasts contain green chlorophyll pigments packed into flattened disc-like sacs called thylakoids, stacked into grana, floating in an enzyme-rich fluid called the stroma.',
          detailedExplanation: 'Thylakoid membranes house Photosystems I and II, chlorophyll pigments, electron transport chains, and ATP Synthase complexes. Chlorophyll absorbs blue and red wavelengths while reflecting green light. The stroma contains soluble enzymes, notably RuBisCO, along with chloroplast DNA and ribosomes.',
          analogy: 'A kitchen workshop where thylakoids are the stove burner pans capturing heat, and the stroma is the mixing counter where ingredients are combined.',
          keyPoints: [
            'Chlorophyll: Green photosynthetic pigment that absorbs sunlight photons.',
            'Thylakoid Membrane: Site of light absorption, water photolysis, and ATP/NADPH synthesis.',
            'Stroma: Fluid matrix where the Calvin cycle fixes CO₂ into glucose.',
            'Stomata: Microscopic pores on leaf undersides regulating gas exchange (CO₂ in, O₂ out).',
          ],
          formulaOrSyntax: 'Structure: Chloroplast [ Thylakoid Lumen | Thylakoid Membrane | Stroma Matrix ]',
          example: 'Inspecting leaf cross-sections under a light microscope reveals palisade mesophyll cells densely packed with bright green oval chloroplasts.',
        },
        {
          id: 'bio-photo-3',
          name: 'Stage 1: Light-Dependent Reactions & Photolysis',
          category: 'Core',
          shortSummary: 'Sunlight absorption in thylakoid membranes, splitting water into protons, electrons, and oxygen, while generating ATP and NADPH.',
          difficulty: profile.level,
          prerequisites: ['Important Structures & Chloroplast Anatomy'],
          simpleExplanation: 'Step 1: Chlorophyll absorbs sunlight. Step 2: Water is split during light-dependent reactions (photolysis). Step 3: Oxygen is released and energy-rich chemical carrier molecules (ATP and NADPH) are produced.',
          detailedExplanation: 'Photons hit Photosystem II, exciting electrons. The oxygen-evolving complex splits water (2H₂O → 4H⁺ + 4e⁻ + O₂). Excited electrons travel along a thylakoid electron transport chain, generating a proton gradient across the thylakoid lumen that powers ATP Synthase (photophosphorylation). Electrons then reach Photosystem I to reduce NADP⁺ into NADPH.',
          analogy: 'Water flowing over a hydroelectric dam: energized electrons pump protons into a reservoir, and their rush through the turbine (ATP Synthase) creates usable battery packs.',
          keyPoints: [
            'Location: Occurs strictly across the thylakoid membranes.',
            'Photolysis: Water is split, providing electrons and releasing O₂ as a natural byproduct.',
            'Energy Storage: Produces ATP and NADPH to power the light-independent dark reactions.',
            'Light Dependency: Cannot take place in the dark; directly requires sunlight photon energy.',
          ],
          formulaOrSyntax: '2H₂O + 2NADP⁺ + 3ADP + 3Pi + Light → O₂ + 2NADPH + 3ATP',
          example: 'Aquatic pondweed (Elodea) placed near a lamp visibly releasing streams of oxygen gas bubbles from its cut stem.',
        },
        {
          id: 'bio-photo-4',
          name: 'Stage 2: Light-Independent Reactions (The Calvin Cycle)',
          category: 'Core',
          shortSummary: 'Carbon dioxide fixation in the stroma using ATP and NADPH energy to synthesize glucose sugars.',
          difficulty: profile.level,
          prerequisites: ['Stage 1: Light-Dependent Reactions & Photolysis'],
          simpleExplanation: 'Step 4: Carbon dioxide from the air enters the stroma. Step 5: Energy molecules (ATP & NADPH) drive the Calvin cycle. Step 6: Glucose sugar is produced to nourish the plant and store energy.',
          detailedExplanation: 'The Calvin cycle takes place in the chloroplast stroma in three enzymatic stages: 1) Carbon Fixation: The enzyme RuBisCO attaches atmospheric CO₂ to 5-carbon RuBP; 2) Reduction: ATP and NADPH convert intermediate molecules into G3P (glyceraldehyde-3-phosphate); 3) Regeneration: Remaining G3P molecules use ATP to regenerate RuBP. Two G3P molecules exit to form stable glucose (C₆H₁₂O₆).',
          analogy: 'A revolving cookie factory line: workers take raw sugar flour (CO₂), apply battery power (ATP/NADPH), pack finished cookies (glucose), and reset the conveyor belt.',
          keyPoints: [
            'Location: Takes place in the aqueous chloroplast stroma.',
            'Enzyme Catalyst: RuBisCO is the primary carbon-fixing enzyme on Earth.',
            'Raw Input: Uses atmospheric CO₂ entering through leaf stomata.',
            'Final Output: Triose phosphate sugars that condense into glucose, cellulose, and starch.',
          ],
          formulaOrSyntax: '3CO₂ + 9ATP + 6NADPH → G3P (sugar precursor) + 9ADP + 8Pi + 6NADP⁺',
          example: 'Corn and sugarcane plants converting atmospheric carbon into sweet sucrose stored inside their stalks during daylight hours.',
        },
        {
          id: 'bio-photo-5',
          name: 'Ecological Importance & Environmental Factors',
          category: 'Advanced',
          shortSummary: 'Why photosynthesis is vital for living organisms, food chains, the global carbon-oxygen balance, and limiting factors.',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ['Stage 2: Light-Independent Reactions (The Calvin Cycle)'],
          simpleExplanation: 'Photosynthesis is the foundation of life on Earth: it produces the oxygen animals breathe and creates the initial food source for virtually every food chain. Its rate depends on sunlight intensity, CO₂ levels, and temperature.',
          detailedExplanation: 'Autotrophs form the primary producer trophic level supporting global ecosystems. Photosynthesis acts as Earth\'s primary atmospheric carbon sink, mitigating greenhouse gases. Limiting factors follow Blackman\'s Law: if light intensity, ambient temperature, or CO₂ concentration is deficient, the rate of photosynthesis reaches a ceiling.',
          analogy: 'The master power grid of planet Earth: without primary solar harvesting by green plants, all animal and microbial food chains collapse.',
          keyPoints: [
            'Ecosystem Foundation: Provides organic chemical energy for primary consumers and herbivores.',
            'Atmospheric Balance: Maintains oxygen concentration and sequesters carbon dioxide.',
            'Limiting Factors: Rate is governed by light intensity, carbon dioxide availability, and temperature.',
            'Storage: Plants convert excess glucose into insoluble starch for overnight metabolic needs.',
          ],
          formulaOrSyntax: 'Rate = f(Light Intensity, [CO₂], Temperature, Water Availability)',
          example: 'A greenhouse farmer raising CO₂ levels and installing LED grow lights to double the tomato yield by eliminating photosynthesis bottlenecks.',
        },
      ];
      definitions = [
        { term: 'Photosynthesis', definition: 'The biological synthesis of organic glucose compounds from water and carbon dioxide utilizing absorbed light energy.' },
        { term: 'Chloroplast', definition: 'The double-membrane plant cell organelle containing thylakoids and stroma where photosynthesis occurs.' },
        { term: 'Chlorophyll', definition: 'The primary green photosynthetic pigment embedded in thylakoid membranes that absorbs light wavelengths.' },
        { term: 'Thylakoid', definition: 'A flattened membrane sac inside the chloroplast used to convert light energy into chemical energy.' },
        { term: 'Stroma', definition: 'The fluid-filled internal space of the chloroplast surrounding thylakoids where the Calvin cycle occurs.' },
        { term: 'RuBisCO', definition: 'The primary chloroplast enzyme that catalyzes the initial fixation of atmospheric carbon dioxide.' },
      ];
      formulas = [
        { name: 'Overall Photosynthesis Reaction', formula: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂', explanation: 'Six carbon dioxide molecules and six water molecules yield one glucose molecule and six oxygen gas molecules.' },
        { name: 'Photolysis Reaction', formula: '2H₂O → 4H⁺ + 4e⁻ + O₂', explanation: 'Water splitting inside the thylakoid lumen catalyzed by the oxygen-evolving complex.' },
      ];
      rawText = `BIOLOGY: PHOTOSYNTHESIS\nOrganism: Autotrophic Green Plants\nOrganelle: Chloroplast\nStages: Light Reactions (Thylakoids) and Calvin Cycle (Stroma)`;
    } else if (isDigestive) {
      summary = `Personalized Biology curriculum for ${profile.name} on the Human Digestive System. Covers gastrointestinal anatomy, mechanical and chemical digestion, digestive enzymes, villi nutrient absorption, and homeostatic regulation at the ${profile.level} level.`;
      concepts = [
        {
          id: 'bio-dig-1',
          name: 'The Digestive Tract: Organs & Food Movement',
          category: 'Foundation',
          shortSummary: 'The anatomical pathway of food: Mouth → Esophagus → Stomach → Small Intestine → Large Intestine.',
          difficulty: profile.level,
          prerequisites: ['Human Body Organ Systems'],
          simpleExplanation: 'The digestive system is a long continuous muscular tube that breaks down the food we eat into microscopic nutrients that can be absorbed into the bloodstream, moving food along via smooth muscle contractions called peristalsis.',
          detailedExplanation: 'The gastrointestinal (GI) tract consists of the alimentary canal (oral cavity, pharynx, esophagus, stomach, small intestine, and large intestine) and accessory organs (salivary glands, liver, gallbladder, and pancreas). Ingestion begins in the mouth, followed by peristaltic transit, enzymatic digestion, nutrient absorption, and waste elimination.',
          analogy: 'A biological disassembly line where a large complex structure is progressively dismantled into individual building blocks.',
          keyPoints: [
            'Alimentary Canal: Continuous passage from oral cavity to rectum.',
            'Peristalsis: Involuntary wave-like contractions of circular and longitudinal smooth muscle pushing food forward.',
            'Two Types of Digestion: Mechanical (physical breakdown) and Chemical (enzymatic cleavage).',
            'Sphincters: Muscular valves (cardiac, pyloric, ileocecal) regulating food transit between compartments.',
          ],
          formulaOrSyntax: 'Pathway: Mouth → Esophagus → Stomach → Small Intestine → Large Intestine',
          example: 'Swallowing a piece of bread: peristaltic contractions in the esophagus move the food bolus into the stomach even if you were hanging upside down.',
        },
        {
          id: 'bio-dig-2',
          name: 'Mouth & Stomach: Mechanical & Gastric Digestion',
          category: 'Core',
          shortSummary: 'Chewing, salivary amylase, esophageal peristalsis, and stomach proteolysis using gastric acid and pepsin.',
          difficulty: profile.level,
          prerequisites: ['The Digestive Tract: Organs & Food Movement'],
          simpleExplanation: 'Chewing physically breaks food into smaller pieces while salivary amylase begins digesting starches. In the stomach, strong hydrochloric acid (pH 1.5-2) and the enzyme pepsin churn food into a soupy liquid called chyme, breaking down dietary proteins.',
          detailedExplanation: 'The stomach gastric glands contain parietal cells (secreting HCl and intrinsic factor) and chief cells (secreting pepsinogen). The acidic environment denatures tertiary protein structures and activates pepsinogen into active pepsin. Mucus-secreting goblet cells protect the stomach epithelial lining from autodigestion.',
          analogy: 'A food processor combined with an acid bath: physical churning shreds the food while acid softens proteins for enzymatic cutting.',
          keyPoints: [
            'Salivary Amylase: Initiates starch breakdown in the oral cavity at neutral pH.',
            'Hydrochloric Acid (HCl): Creates a strongly acidic pH (1.5-2.0) that kills bacteria and activates pepsin.',
            'Pepsin: Protease enzyme that cleaves protein peptide bonds into shorter polypeptides.',
            'Chyme: Semi-liquid mixture of partly digested food and gastric secretions released into the duodenum.',
          ],
          formulaOrSyntax: 'Pepsinogen (inactive) + HCl → Pepsin (active protease)',
          example: 'Heartburn or acid reflux occurring when acidic chyme leaks backward past the lower esophageal sphincter into the esophagus.',
        },
        {
          id: 'bio-dig-3',
          name: 'Accessory Organs: Liver, Bile & Pancreatic Enzymes',
          category: 'Core',
          shortSummary: 'The biochemical clearinghouse: Pancreas secretes bicarbonate and digestive enzymes; Liver synthesizes bile stored in gallbladder to emulsify fats.',
          difficulty: profile.level,
          prerequisites: ['Mouth & Stomach: Mechanical & Gastric Digestion'],
          simpleExplanation: 'As food enters the small intestine, the pancreas squirts in digestive juices to neutralize acid and digest sugars, proteins, and fats. The liver produces bile, which breaks large fat droplets into tiny bubbles so enzymes can easily digest them.',
          detailedExplanation: 'The duodenum receives chyme, pancreatic juice, and bile. Sodium bicarbonate in pancreatic juice neutralizes gastric acid, raising pH to ~7-8 for optimal enzyme activity. Pancreatic amylase, lipases, and proteases (trypsin, chymotrypsin) hydrolyze macromolecules. Bile salts emulsify hydrophobic lipid droplets, dramatically increasing surface area for lipase action.',
          analogy: 'Dish soap breaking up grease on a cooking pan: bile salts break large fat blobs into microscopic droplets so cleaning enzymes can wash them away.',
          keyPoints: [
            'Pancreas: Secretes bicarbonate (neutralizes acid), pancreatic amylase, lipase, trypsin, and chymotrypsin.',
            'Liver & Gallbladder: Liver synthesizes bile salts; gallbladder stores and concentrates bile for lipid emulsification.',
            'Duodenum: The primary crossroad where acidic chyme meets bile and pancreatic secretions.',
            'Optimum pH: Shifts from acidic (stomach pH 2) to slightly alkaline (intestinal pH 7.5-8.0).',
          ],
          formulaOrSyntax: 'Lipid Globules + Bile Salts → Emulsified Micelles + Pancreatic Lipase → Fatty Acids + Glycerol',
          example: 'Patients with gallbladder removal needing to moderate dietary fat intake because bile is no longer stored and concentrated in large pulses.',
        },
        {
          id: 'bio-dig-4',
          name: 'Small Intestine & Villi: Nutrient Absorption',
          category: 'Core',
          shortSummary: 'The primary site of nutrient absorption: Villi and microvilli expand internal surface area to absorb simple sugars, amino acids, and lipids.',
          difficulty: profile.level,
          prerequisites: ['Accessory Organs: Liver, Bile & Pancreatic Enzymes'],
          simpleExplanation: 'The small intestine is where almost all nutrient absorption takes place. Millions of tiny, finger-like projections called villi and microvilli create a huge surface area (the size of a tennis court) to pull nutrients directly into the blood.',
          detailedExplanation: 'The jejunum and ileum are lined with circular folds (plicae circulares), villi, and a microvillar brush border. Monosaccharides and amino acids are actively transported across enterocyte membranes into capillary blood vessels flowing to the hepatic portal vein. Fatty acids and monoglycerides reassemble into chylomicrons and enter lymphatic lacteals.',
          analogy: 'A plush, thick bath towel: thousands of tiny terrycloth loops (villi) absorb water vastly faster than a flat smooth sheet of fabric.',
          keyPoints: [
            'Surface Area Expansion: Villi and microvilli increase absorptive area over 600-fold (~250 m²).',
            'Blood Capillaries: Absorb glucose, amino acids, water-soluble vitamins, and minerals.',
            'Lacteals (Lymphatic): Absorb dietary fats, fatty acids, and fat-soluble vitamins (A, D, E, K).',
            'Hepatic Portal System: Transports newly absorbed blood nutrients directly to the liver for processing.',
          ],
          formulaOrSyntax: 'Absorption Rate ∝ Total Surface Area (Villi + Microvilli) × Concentration Gradient',
          example: 'Celiac disease causing autoimmune damage that flattens intestinal villi, leading to severe nutrient malabsorption and weight loss.',
        },
        {
          id: 'bio-dig-5',
          name: 'Large Intestine: Water Balance & Waste Elimination',
          category: 'Advanced',
          shortSummary: 'Colon absorption of water and electrolytes, symbiotic gut microbiota, and elimination of indigestible dietary fiber.',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ['Small Intestine & Villi: Nutrient Absorption'],
          simpleExplanation: 'The large intestine reabsorbs water and essential salts from remaining undigested matter, houses beneficial gut bacteria that synthesize vitamins, and forms solid stool for elimination.',
          detailedExplanation: 'The cecum, colon (ascending, transverse, descending, sigmoid), and rectum reclaim approximately 90% of water from the 7-9 liters of fluids entering the digestive tract daily. Symbiotic gut microbiota ferment unabsorbed carbohydrates (soluble fiber), generating short-chain fatty acids (SCFAs) and synthesizing vitamins K and B12.',
          analogy: 'A recycling and compaction plant: extracting every reusable drop of clean water before safely bagging and disposing of unusable scrap.',
          keyPoints: [
            'Water Reabsorption: Crucial for maintaining systemic hydration and preventing diarrheal dehydration.',
            'Gut Microbiome: Trillions of beneficial bacteria producing vitamins and supporting immune defense.',
            'Dietary Fiber: Undigestible plant cellulose that provides essential bulk for normal peristalsis.',
            'Rectum & Anus: Stores and eliminates consolidated fecal waste under sphincter control.',
          ],
          formulaOrSyntax: 'Fluid Balance: ~9L Ingested/Secreted → ~8.9L Reabsorbed → ~0.1L Excreted',
          example: 'Taking oral antibiotics sometimes causing temporary digestive upset because beneficial vitamin-producing colon bacteria are temporarily depleted.',
        },
      ];
      definitions = [
        { term: 'Peristalsis', definition: 'Wave-like involuntary muscular contractions of the digestive tract that propel food forward.' },
        { term: 'Chyme', definition: 'The acidic, semi-fluid pulpy mass of partly digested food expelled by the stomach into the duodenum.' },
        { term: 'Pepsin', definition: 'A principal digestive enzyme of the stomach that hydrolyzes proteins into smaller peptides.' },
        { term: 'Bile', definition: 'A bitter fluid produced by the liver and stored in the gallbladder that emulsifies dietary fats.' },
        { term: 'Villi', definition: 'Microscopic, finger-like projections lining the small intestine that dramatically amplify nutrient absorption.' },
        { term: 'Amylase', definition: 'An enzyme found in saliva and pancreatic juice that catalyzes the breakdown of starch into sugars.' },
      ];
      formulas = [
        { name: 'Starch Digestion', formula: 'Starch + H₂O (Amylase) → Maltose + Glucose', explanation: 'Enzymatic hydrolysis of complex polysaccharides into absorbable monosaccharides.' },
        { name: 'Protein Cleavage', formula: 'Protein + H₂O (Pepsin/Trypsin) → Polypeptides → Amino Acids', explanation: 'Sequential enzymatic cleavage of peptide bonds throughout stomach and small intestine.' },
      ];
      rawText = `BIOLOGY: HUMAN DIGESTIVE SYSTEM\nAnatomy: Alimentary Canal & Accessory Organs\nMechanisms: Peristalsis, Enzymatic Hydrolysis, Villi Absorption, Water Balance`;
    } else if (isCell) {
      summary = `Personalized Biology curriculum for ${profile.name} on Cell Structure & Organelles. Explores the structural components of living cells, plasma membrane dynamics, organelles, and their physiological functions at the ${profile.level} level.`;
      concepts = [
        {
          id: 'bio-cell-1',
          name: 'Cell Membrane & Compartmentalization',
          category: 'Foundation',
          shortSummary: 'The phospholipid bilayer with selective permeability, regulating transport of materials into and out of the cell.',
          difficulty: profile.level,
          prerequisites: ['Basic Cell Theory'],
          simpleExplanation: 'The cell membrane is the flexible outer protective skin of the cell. Made of a double layer of lipids and proteins, it controls what goes in (nutrients, water) and what goes out (waste).',
          detailedExplanation: 'The plasma membrane follows the fluid mosaic model: an amphipathic phospholipid bilayer with hydrophobic interior fatty acid tails and hydrophilic exterior phosphate heads. Embedded integral and peripheral proteins serve as ion channels, transporters, receptor sites, and cell-surface identifiers.',
          analogy: 'A secure gated security boundary around a busy city, checking passports and admitting authorized delivery trucks while keeping intruders out.',
          keyPoints: [
            'Phospholipid Bilayer: Hydrophilic heads face aqueous environments; hydrophobic tails face inward.',
            'Selective Permeability: Small nonpolar molecules diffuse easily; ions and polar sugars require transport proteins.',
            'Transport Modes: Passive transport (diffusion, osmosis) and active transport (requiring ATP).',
            'Cholesterol & Glycoproteins: Regulate membrane fluidity and cell-cell communication.',
          ],
          formulaOrSyntax: 'Diffusion Flux: J = -D × (dC/dx)  [Fick\'s First Law of Diffusion]',
          example: 'Red blood cells swelling and bursting (hemolysis) when placed in pure distilled water due to rapid osmotic water entry.',
        },
        {
          id: 'bio-cell-2',
          name: 'The Nucleus: Genetic Blueprint & Control Center',
          category: 'Core',
          shortSummary: 'Nuclear envelope, chromatin, nucleolus, and genetic governance of cellular activities.',
          difficulty: profile.level,
          prerequisites: ['Cell Membrane & Compartmentalization'],
          simpleExplanation: 'The nucleus is the master control room of the cell. It houses DNA instructions that tell the cell how to build proteins, grow, and reproduce.',
          detailedExplanation: 'Enclosed by a double-membraned nuclear envelope perforated with nuclear pores, the nucleus protects eukaryotic genomic DNA. Inside, the nucleolus synthesizes ribosomal RNA (rRNA) and assembles ribosome subunits. Gene transcription occurs here, synthesizing mRNA transcripts that exit to the cytoplasm.',
          analogy: 'The central municipal library and city hall: master reference books (DNA) are securely archived in the vaults, while blueprints (mRNA) are dispatched to construction sites.',
          keyPoints: [
            'Nuclear Envelope: Double membrane with pores controlling macromolecular transport (RNA out, proteins in).',
            'DNA & Chromatin: DNA wrapped around histone proteins carrying the genetic code.',
            'Nucleolus: Specialized sub-nuclear region assembling ribosomal subunits.',
            'Transcription: Copying DNA instructions into messenger RNA (mRNA).',
          ],
          formulaOrSyntax: 'Central Dogma Stage 1: DNA (Gene in Nucleus) → Transcription → mRNA (Exits via Nuclear Pore)',
          example: 'Eukaryotic cells protecting genetic integrity inside the nucleus, unlike prokaryotic bacteria which keep their circular DNA loose in the cytoplasm.',
        },
        {
          id: 'bio-cell-3',
          name: 'Mitochondria: Cellular Respiration & ATP Powerhouses',
          category: 'Core',
          shortSummary: 'Double-membraned organelles generating chemical energy in the form of ATP via cellular respiration.',
          difficulty: profile.level,
          prerequisites: ['The Nucleus: Genetic Blueprint & Control Center'],
          simpleExplanation: 'Mitochondria are the power plants of the cell. They take oxygen and breakdown products from food (glucose) and turn them into ATP, the usable energy currency of living cells.',
          detailedExplanation: 'Mitochondria have an outer membrane and a folded inner membrane (cristae) enclosing the mitochondrial matrix. The matrix hosts the Krebs (citric acid) cycle, while the cristae host the electron transport chain and ATP Synthase complexes for oxidative phosphorylation.',
          analogy: 'The electrical power generator of a factory: burning fuel to spin turbines and produce electricity that runs all machinery.',
          keyPoints: [
            'Double Membrane: Folded inner cristae dramatically increase surface area for ATP Synthase.',
            'Cellular Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~32 ATP.',
            'Endosymbiotic Origin: Possesses circular mitochondrial DNA and replicates independently.',
            'Tissue Abundance: Muscle and heart cells have thousands of mitochondria to meet high energy demands.',
          ],
          formulaOrSyntax: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 30-32 ATP (Usable Cellular Energy)',
          example: 'Human cardiac muscle cells containing up to 40% of their volume as mitochondria to maintain continuous heartbeat contractions without tiring.',
        },
        {
          id: 'bio-cell-4',
          name: 'Ribosomes, Endoplasmic Reticulum & Golgi Apparatus',
          category: 'Core',
          shortSummary: 'The protein synthesis and distribution pipeline: Ribosomes translate mRNA, Rough ER folds proteins, and Golgi packages them for delivery.',
          difficulty: profile.level,
          prerequisites: ['Mitochondria: Cellular Respiration & ATP Powerhouses'],
          simpleExplanation: 'Ribosomes build proteins from instructions. The rough endoplasmic reticulum folds and modifies these proteins, and the Golgi apparatus acts like a postal sorting office, tagging and shipping them to where they are needed.',
          detailedExplanation: 'Ribosomes synthesize polypeptide chains. Rough ER membranes, studded with ribosomes, insert proteins into the lumen for folding and glycosylation. Transport vesicles shuttle proteins to the cis-face of the Golgi apparatus, where cisternae enzymes further modify molecules before budding vesicles from the trans-face toward lysosomes or the plasma membrane for exocytosis.',
          analogy: 'An assembly, packaging, and parcel delivery service: workers assemble products (ribosomes), box them (ER), and the postal depot sorts and labels shipping addresses (Golgi).',
          keyPoints: [
            'Ribosomes: Molecular machines translating mRNA transcripts into amino acid polypeptide chains.',
            'Rough ER: Membranous network studded with ribosomes; folds and modifies nascent proteins.',
            'Smooth ER: Synthesizes lipids and phospholipids, metabolizes carbohydrates, and detoxifies drugs.',
            'Golgi Apparatus: Flattened cisternae that modify, sort, and package proteins into transport vesicles.',
          ],
          formulaOrSyntax: 'Secretion Pathway: Ribosome → Rough ER Lumen → Transport Vesicle → Golgi Cisternae → Secretory Vesicle → Exocytosis',
          example: 'Pancreatic beta cells using this pipeline to continuously synthesize, package, and secrete insulin hormone directly into the bloodstream.',
        },
        {
          id: 'bio-cell-5',
          name: 'Plant vs Animal Cells: Chloroplasts, Cell Wall & Vacuoles',
          category: 'Advanced',
          shortSummary: 'Structural differences distinguishing plant cells (rigid cellulose wall, chloroplasts, central vacuole) from animal cells (lysosomes, centrosomes).',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ['Ribosomes, Endoplasmic Reticulum & Golgi Apparatus'],
          simpleExplanation: 'Plant cells have three special features that animal cells lack: a rigid outer cell wall made of cellulose for support, green chloroplasts to make food from sunlight, and a huge central vacuole filled with water for turgor pressure.',
          detailedExplanation: 'Plant cells are encased in a rigid cellulose cell wall outside the plasma membrane, providing hydrostatic turgor support preventing osmotic lysis. Chloroplasts enable autotrophic photosynthesis. A large central vacuole maintains cell turgor pressure and stores metabolites, whereas animal cells have smaller temporary vacuoles, centrioles, and lysosomes.',
          analogy: 'Animal cells are like soft water balloons with flexible skins; plant cells are like water balloons packed inside sturdy cardboard shipping boxes.',
          keyPoints: [
            'Cell Wall: Rigid cellulose matrix maintaining plant upright structure without bones.',
            'Chloroplasts: Site of photosynthesis present in photosynthetic plant tissues.',
            'Central Vacuole: Large water reservoir creating internal hydrostatic turgor pressure.',
            'Lysosomes & Centrosomes: Specialized digestive organelles and mitotic microtubule organizers in animal cells.',
          ],
          formulaOrSyntax: 'Turgor Pressure = Internal Hydrostatic Pressure against Cellulose Cell Wall',
          example: 'A wilting houseplant standing upright within hours of watering as its central vacuoles refill and restore cellular turgor pressure against cell walls.',
        },
      ];
      definitions = [
        { term: 'Organelle', definition: 'A specialized subunit within a cell that has a specific biological function, usually membrane-enclosed.' },
        { term: 'Plasma Membrane', definition: 'The semipermeable phospholipid bilayer that surrounds and encloses the cell cytoplasm.' },
        { term: 'Mitochondrion', definition: 'Double-membrane organelle that generates ATP through oxidative phosphorylation.' },
        { term: 'Ribosome', definition: 'A complex cellular machine constructed of rRNA and proteins that translates mRNA into polypeptides.' },
        { term: 'Golgi Apparatus', definition: 'An organelle of folded membranes that packages and modifies proteins for secretion or intracellular delivery.' },
      ];
      formulas = [
        { name: 'Cellular Respiration Reaction', formula: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 30-32 ATP', explanation: 'Complete aerobic oxidation of glucose generating cellular energy in mitochondria.' },
      ];
      rawText = `BIOLOGY: CELL STRUCTURE & ORGANELLES\nCell Types: Eukaryotic Plant & Animal Cells\nKey Structures: Membrane, Nucleus, Mitochondria, Ribosomes, Golgi, Chloroplasts`;
    } else {
      // General Biology topic
      summary = `Personalized Biology curriculum for ${profile.name} exploring ${topic}. Investigates biological structures, physiological mechanisms, cellular interactions, and ecological importance at the ${profile.level} level.`;
      concepts = [
        {
          id: `bio-gen-1-${Date.now()}`,
          name: `Biological Foundations of ${topic}`,
          category: 'Foundation',
          shortSummary: `What is ${topic}, where does it occur in living organisms, and why is it essential for life?`,
          difficulty: profile.level,
          prerequisites: ['Introductory Biology Concepts'],
          simpleExplanation: `${topic} is a fundamental biological concept in ${subject}. It describes how living organisms structure, coordinate, and sustain vital physiological processes across cells, tissues, or ecosystems.`,
          detailedExplanation: `Examines the anatomical site, cellular location, and molecular components underlying ${topic}. Biological systems maintain homeostatic equilibrium through feedback loops, specialized structures, and enzyme-mediated biochemical reactions.`,
          analogy: `Think of ${topic} like the coordinated systems of a living organism, where every organelle and tissue plays a specialized role in maintaining life.`,
          keyPoints: [
            `Location: Occurs within specific cells, organs, or ecosystems in living organisms.`,
            `Biological Structures: Specialized membranes, tissues, or organelles involved in ${topic}.`,
            `Physiological Role: Sustains homeostasis, metabolic balance, or species survival.`,
            `Key Biological Interactions: Regulated by enzymes, environmental signals, and genetic factors.`,
          ],
          formulaOrSyntax: `Biological System: Organism → Tissue → Cell → Molecular Pathway for ${topic}`,
          example: `Everyday biological observations demonstrating ${topic} in healthy plant or animal physiology.`,
        },
        {
          id: `bio-gen-2-${Date.now()}`,
          name: `Step-by-Step Biological Mechanisms of ${topic}`,
          category: 'Core',
          shortSummary: `The stages, biochemical steps, and cellular reactions driving ${topic}.`,
          difficulty: profile.level,
          prerequisites: [`Biological Foundations of ${topic}`],
          simpleExplanation: `Follow the step-by-step biological stages of ${topic}: how biological structures interact, what triggers each stage, and how energy and molecules transform.`,
          detailedExplanation: `In-depth analysis of the sequential stages comprising ${topic}. Analyzes enzyme kinetics, substrate binding, energy transfers, and cellular transport mechanisms that carry out this biological process.`,
          analogy: 'A biochemical relay race where each specialized molecule or organelle passes the task seamlessly to the next.',
          keyPoints: [
            'Sequential Stages: Clear biological progression from initial trigger to completed function.',
            'Enzymatic Catalysis: Biological catalysts accelerating reaction rates under physiological conditions.',
            'Cellular Regulation: Feedback mechanisms maintaining balance and preventing resource waste.',
          ],
          formulaOrSyntax: `Substrate + Biological Catalyst → Intermediate Complex → Physiological Product in ${topic}`,
          example: 'How cells dynamically adjust the rate of this process in response to temperature, hydration, and nutritional availability.',
        },
        {
          id: `bio-gen-3-${Date.now()}`,
          name: `Significance, Regulation & Real-World Biological Applications`,
          category: 'Advanced',
          shortSummary: `Why ${topic} matters for organism survival, medical science, ecology, and common misconceptions.`,
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: [`Step-by-Step Biological Mechanisms of ${topic}`],
          simpleExplanation: `Understanding why ${topic} is vital for health, evolution, and ecosystems, and exploring practical examples in medicine and nature.`,
          detailedExplanation: `Synthesizes physiological regulation, evolutionary adaptations, and clinical or ecological implications of ${topic}. Investigates how disruptions lead to pathology or ecological imbalance.`,
          analogy: 'Maintaining equilibrium in an ecosystem, where every interconnected biological component supports overall survival.',
          keyPoints: [
            'Ecological & Health Impact: Vital for homeostasis and environmental balance.',
            'Evolutionary Adaptation: How organisms evolved specialized adaptations for this process.',
            'Common Misconceptions: Crucial distinctions tested in examinations and medical science.',
          ],
          formulaOrSyntax: `Homeostasis: Optimal Physiological Range maintained by ${topic}`,
          example: 'Medical or environmental case studies showing how disruptions to this biological process affect living organisms.',
        },
      ];
      definitions = [
        { term: `${topic}`, definition: `The physiological and biological process governing cellular and systemic functions in ${subject}.` },
        { term: 'Homeostasis', definition: 'The state of steady internal physical and chemical conditions maintained by living organisms.' },
      ];
      formulas = [
        { name: 'Biological Balance', formula: 'Steady State ⇌ Dynamic Physiological Equilibrium', explanation: `Regulation and feedback control maintaining biological stability in ${topic}.` },
      ];
      rawText = `BIOLOGY: ${topic.toUpperCase()}\nSubject: ${subject}\nTeaching Structure: Living Structures, Stages, Functions, and Ecological Significance`;
    }
  } else if (isPhysicsSubjectOrTopic(subject, topic)) {
    const tLower = topic.toLowerCase();
    const isNewtonsLaws = tLower.includes('newton') || tLower.includes('motion') || tLower.includes('mechanic') || tLower.includes('force');

    if (isNewtonsLaws) {
      summary = `Personalized Physics curriculum for ${profile.name} on Newton's Laws of Motion. Covers inertia, F = ma momentum dynamics, action-reaction pairs, free-body diagrams, and real-world mechanics at the ${profile.level} level.`;
      concepts = [
        {
          id: 'phys-newton-1',
          name: "Newton's First Law (Law of Inertia)",
          category: 'Foundation',
          shortSummary: 'An object at rest stays at rest, and an object in motion maintains constant velocity, unless acted upon by a net external force.',
          difficulty: profile.level,
          prerequisites: ['Vectors & Velocity Basics'],
          simpleExplanation: 'Things keep doing what they are already doing unless a force pushes or pulls them. If an object is sitting still, it will not move on its own. If it is gliding forward, it will keep gliding at constant speed unless friction or another force slows it down.',
          detailedExplanation: "Newton's First Law defines inertial reference frames. In the absence of a net external force (ΣF = 0), a body's acceleration is zero (a = 0), preserving both speed and direction of motion. Mass is the quantitative scalar measure of an object's inertia (resistance to change in velocity).",
          analogy: 'A hockey puck sliding across smooth friction-free ice gliding endlessly in a straight line until hitting a wall.',
          keyPoints: [
            'Law of Inertia: Resistance of any physical object to a change in its velocity.',
            'Balanced Forces: When ΣF = 0, acceleration a = 0 (equilibrium state).',
            'Mass: The physical measure of inertia; larger mass requires greater force to accelerate.',
            'Frame of Reference: Holds true in non-accelerating inertial reference frames.',
          ],
          formulaOrSyntax: 'ΣF = 0 ⟹ a = 0  (v = constant)',
          example: 'Wearing a seatbelt in a car: when brakes are slammed, your body continues moving forward due to inertia until restrained by the seatbelt.',
        },
        {
          id: 'phys-newton-2',
          name: "Newton's Second Law (F = ma & Momentum)",
          category: 'Core',
          shortSummary: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.',
          difficulty: profile.level,
          prerequisites: ["Newton's First Law (Law of Inertia)"],
          simpleExplanation: 'To accelerate something faster, you need to push it harder. If an object is twice as heavy, you need twice as much force to give it the same acceleration. Force equals mass times acceleration (F = ma).',
          detailedExplanation: "Newton's Second Law establishes the fundamental dynamical equation: the net vector force equals the rate of change of linear momentum: F_net = dp/dt = d(mv)/dt. For constant mass, this simplifies to F_net = m * a. Force is measured in Newtons (1 N = 1 kg·m/s²).",
          analogy: 'Pushing an empty shopping cart versus a cart overflowing with heavy canned goods: with the same push, the empty cart zooms ahead while the heavy cart barely speeds up.',
          keyPoints: [
            'Vector Equation: Direction of acceleration is strictly in the direction of the net force.',
            'SI Units: Force is in Newtons (N), mass in kilograms (kg), acceleration in meters per second squared (m/s²).',
            'Momentum Form: F_net = Δp / Δt, foundation of impulse and collision analysis.',
            'Superposition: Multiple concurrent forces resolve into a single resultant vector force ΣF.',
          ],
          formulaOrSyntax: 'ΣF = m × a   |   1 N = 1 kg·m/s²',
          example: 'Calculating force needed to accelerate a 1,200 kg car at 2.5 m/s²: F = 1200 kg × 2.5 m/s² = 3,000 N.',
        },
        {
          id: 'phys-newton-3',
          name: "Newton's Third Law (Action-Reaction Pairs)",
          category: 'Core',
          shortSummary: 'For every action force, there is an equal and opposite reaction force acting on different interacting objects.',
          difficulty: profile.level,
          prerequisites: ["Newton's Second Law (F = ma & Momentum)"],
          simpleExplanation: 'Whenever one object exerts a force on another, the second object exerts an equal and opposite force back. You cannot touch something without it touching you back with equal strength.',
          detailedExplanation: 'When body A exerts a force on body B (F_AB), body B simultaneously exerts an equal-magnitude, opposite-direction force on body A (F_BA = -F_AB). Crucially, action-reaction pairs never cancel each other because they act on two different bodies.',
          analogy: 'Stepping out of a small canoe onto a dock: as your foot pushes forward toward the dock, the canoe kicks backward into the water with equal force.',
          keyPoints: [
            'Equal & Opposite: Magnitudes are identical (|F_AB| = |F_BA|), directions are antiparallel.',
            'Different Bodies: The two forces act on different bodies, so they never cancel in a single free-body diagram.',
            'Simultaneous: Neither force precedes the other; both exist simultaneously during contact or interaction.',
            'Universal: Applies to contact forces (normal, friction) and field forces (gravity, magnetism).',
          ],
          formulaOrSyntax: 'F_A→B = -F_B→A',
          example: 'A rocket engine burning propellant: high-velocity exhaust gases are expelled downward, exerting an equal and opposite upward thrust force propelling the rocket into space.',
        },
        {
          id: 'phys-newton-4',
          name: 'Free-Body Diagrams & Step-by-Step Problem Solving',
          category: 'Advanced',
          shortSummary: 'Systematic vector isolation, resolving normal force, gravity, friction, and tension to solve dynamics problems.',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ["Newton's Third Law (Action-Reaction Pairs)"],
          simpleExplanation: 'A free-body diagram is a diagram showing all the individual push and pull forces acting on a single object, allowing you to add them up and calculate acceleration.',
          detailedExplanation: 'Step-by-step problem-solving method: 1) Identify the isolated body; 2) Establish a coordinate axis (align one axis with motion); 3) Draw all contact and non-contact force vectors (Weight W = mg, Normal N, Friction f_k = μ_k*N, Tension T); 4) Break vectors into x and y components; 5) Set up ΣF_x = m*a_x and ΣF_y = m*a_y; 6) Solve the algebraic system.',
          analogy: 'An accountant\'s balance sheet for motion: every dollar in (applied force) and dollar out (friction) is tallied to determine the net profit (acceleration).',
          keyPoints: [
            'Isolate the body: Draw only forces acting ON the object, never forces exerted BY the object.',
            'Weight vector: Always points straight down toward Earth\'s center (W = mg).',
            'Normal force: Always perpendicular to the contact surface.',
            'Friction force: Always opposes relative sliding motion along the surface (f_k = μ_k * N).',
          ],
          formulaOrSyntax: 'ΣF_x = m × a_x   and   ΣF_y = m × a_y = 0',
          example: 'A 20 kg crate sliding down a 30-degree ramp: resolving gravity into mg·sin(30°) parallel to ramp and mg·cos(30°) perpendicular to ramp.',
        },
      ];
      definitions = [
        { term: 'Force', definition: 'A push or pull upon an object resulting from its interaction with another object (vector quantity measured in Newtons).' },
        { term: 'Inertia', definition: "The inherent physical property of matter to resist any change in its state of motion or rest." },
        { term: 'Mass', definition: 'A fundamental scalar property of matter measuring the quantity of inertia contained within a body (SI unit: kilogram).' },
        { term: 'Acceleration', definition: 'The rate of change of velocity per unit time (vector quantity measured in m/s²).' },
        { term: 'Normal Force', definition: 'The perpendicular contact force exerted by a surface supporting an object against gravity or external loads.' },
      ];
      formulas = [
        { name: "Newton's Second Law", formula: 'F_net = m × a', explanation: 'Net vector force equals mass multiplied by acceleration.' },
        { name: 'Gravitational Weight', formula: 'W = m × g', explanation: 'Weight force near Earth surface where g ≈ 9.8 m/s².' },
        { name: 'Kinetic Friction', formula: 'f_k = μ_k × N', explanation: 'Friction force proportional to normal force and kinetic friction coefficient.' },
      ];
      rawText = `PHYSICS: NEWTON'S LAWS OF MOTION\nPrinciples: Inertia, Momentum Dynamics, Action-Reaction Pairs\nFormulas: F = ma, W = mg, f = μN`;
    } else {
      // General Physics topic
      summary = `Personalized Physics curriculum for ${profile.name} covering ${topic}. Explores governing physical principles, formulas, SI units, vector resolution, and problem solving at the ${profile.level} level.`;
      concepts = [
        {
          id: `phys-gen-1-${Date.now()}`,
          name: `Core Principles & Definitions of ${topic}`,
          category: 'Foundation',
          shortSummary: `Fundamental physical concepts, definitions, variables, and SI units governing ${topic}.`,
          difficulty: profile.level,
          prerequisites: ['Basic Kinematics & Dimensional Analysis'],
          simpleExplanation: `An introduction to the physical concepts in ${topic}, explaining what physical quantities are measured, what units are used, and how nature behaves.`,
          detailedExplanation: `Establishes fundamental physical laws and governing equations in ${topic}. Defines all physical scalar and vector variables, dimensional units, and boundary conditions.`,
          analogy: 'The physical rules of the road governing how matter and energy move through space and time.',
          keyPoints: [
            `Core Physical Quantities and SI base/derived units in ${topic}.`,
            `Conservation laws (energy, momentum, or charge) governing this physical domain.`,
            `Physical meaning behind each mathematical symbol.`,
          ],
          formulaOrSyntax: `Physical Law: Variables, Units, and Constants for ${topic}`,
          example: `Concrete everyday physical phenomena demonstrating ${topic}.`,
        },
        {
          id: `phys-gen-2-${Date.now()}`,
          name: `Governing Equations & Problem-Solving Methodology`,
          category: 'Core',
          shortSummary: `Step-by-step problem-solving formulas and worked quantitative derivations in ${topic}.`,
          difficulty: profile.level,
          prerequisites: [`Core Principles & Definitions of ${topic}`],
          simpleExplanation: `How to take a word problem, identify known and unknown variables, pick the right formula, and calculate exact numerical answers with proper units.`,
          detailedExplanation: `Mathematical modeling and algebraic derivation of governing relationships in ${topic}. Focuses on setting up coordinate axes, substituting values with units, and verifying physical dimensions.`,
          analogy: 'A precise navigation blueprint where known coordinates lead to exact mathematical destinations.',
          keyPoints: [
            'Systematic Steps: Identify givens, isolate target variable, execute formula with units.',
            'Dimensional Consistency: Verifying left-hand and right-hand units match.',
            'Limiting Cases: Checking behavior when variables approach zero or infinity.',
          ],
          formulaOrSyntax: `Target_Variable = Mathematical_Function(Physical_Parameters)`,
          example: 'Worked numerical problem demonstrating calculation steps from initial givens to final units.',
        },
      ];
      definitions = [
        { term: `${topic}`, definition: `The branch and physical principles governing interactions in ${subject}.` },
      ];
      formulas = [
        { name: 'Governing Physical Law', formula: 'Physical_Effect = Governing_Equation(Causes, Constants)', explanation: `Primary physical relationship governing ${topic}.` },
      ];
      rawText = `PHYSICS: ${topic.toUpperCase()}\nSubject: ${subject}\nStructure: Physical Concepts, Governing Equations, Units, and Worked Solutions`;
    }
  } else if (isChemistrySubjectOrTopic(subject, topic)) {
    summary = `Personalized Chemistry curriculum for ${profile.name} on ${topic}. Explores atomic structure, valence electrons, bonding types, reaction mechanisms, and molecular geometry at the ${profile.level} level.`;
    concepts = [
      {
        id: 'chem-bond-1',
        name: 'Chemical Bonding & Valence Electron Behavior',
        category: 'Foundation',
        shortSummary: 'How atoms attain stable octet configurations through electron transfer (ionic) or electron sharing (covalent).',
        difficulty: profile.level,
        prerequisites: ['Atomic Structure & Periodic Table Basics'],
        simpleExplanation: 'Atoms want to be stable, which usually means having a full outer shell of 8 valence electrons (the Octet Rule). To achieve this, they bond with other atoms by either stealing, giving away, or sharing electrons.',
        detailedExplanation: 'Chemical bonds are thermodynamic attractions holding atoms or ions together in stable chemical compounds. Bond formation is exothermic, lowering potential energy. Electronegativity difference (ΔEN) determines bond character: ΔEN > 2.0 produces ionic bonds, ΔEN < 0.4 produces nonpolar covalent bonds, and 0.4 < ΔEN < 2.0 produces polar covalent bonds.',
        analogy: 'Musical chairs where atoms keep swapping or holding hands with neighbors until every chair in their outer electron circle is filled.',
        keyPoints: [
          'Octet Rule: Atoms share, gain, or lose electrons to attain noble gas configuration (ns²np⁶).',
          'Electronegativity Difference: Dictates whether electrons are transferred (ionic) or shared (covalent).',
          'Potential Energy: Bond formation releases energy; breaking bonds requires energy input.',
          'Valence Electrons: Only outermost shell electrons participate in chemical bonding.',
        ],
        formulaOrSyntax: 'ΔEN = |EN_AtomA - EN_AtomB|  ⟹  Ionic (ΔEN > 2.0) vs Covalent (ΔEN < 1.7)',
        example: 'Table salt (NaCl) where sodium loses its single valence electron to chlorine, forming Na⁺ and Cl⁻ ions that lock into a rigid crystal lattice.',
      },
      {
        id: 'chem-bond-2',
        name: 'Ionic vs Covalent vs Metallic Bonding',
        category: 'Core',
        shortSummary: 'Comparing ionic crystal lattices, directional covalent electron pairs, and metallic "sea of electrons".',
        difficulty: profile.level,
        prerequisites: ['Chemical Bonding & Valence Electron Behavior'],
        simpleExplanation: 'In ionic bonds, metal gives electrons to nonmetal (like salt). In covalent bonds, nonmetals share electrons (like water H₂O). In metallic bonds, metal atoms share a vast sea of flowing electrons that conduct electricity.',
        detailedExplanation: 'Ionic solids form three-dimensional crystal lattices with high melting points, brittle structures, and conductivity when dissolved in water. Covalent molecules feature localized electron density in molecular orbitals (sigma and pi bonds). Metallic bonds consist of positive metal cations immersed in a delocalized "sea" of mobile electrons, providing electrical conductivity, ductility, and malleability.',
        analogy: 'Ionic is a magnetic handshake between opposite charges; covalent is two children sharing a toy; metallic is a swimming pool where all children share all toys freely.',
        keyPoints: [
          'Ionic: Electrostatic attraction between cations (+) and anions (-). High melting points, brittle.',
          'Covalent: Sharing of electron pairs between nonmetals. Molecular shapes governed by VSEPR theory.',
          'Metallic: Cation lattice surrounded by delocalized mobile electrons. Excellent heat/electric conduction.',
          'Intermolecular Forces: Weaker forces (hydrogen bonds, London dispersion) between covalent molecules.',
        ],
        formulaOrSyntax: 'Bond Types: Ionic (Lattice Energy) | Covalent (Bond Dissociation Energy) | Metallic (Delocalized Electron Sea)',
        example: 'Water (H₂O) having polar covalent bonds within each molecule, but hydrogen bonds between molecules giving water high surface tension and high boiling point.',
      },
    ];
    definitions = [
      { term: 'Ionic Bond', definition: 'A chemical bond formed by the electrostatic attraction between oppositely charged ions.' },
      { term: 'Covalent Bond', definition: 'A chemical bond formed when atoms share one or more pairs of valence electrons.' },
      { term: 'Electronegativity', definition: 'A measure of the ability of an atom in a chemical compound to attract shared electrons.' },
    ];
    formulas = [
      { name: 'Coulomb\'s Law of Lattice Energy', formula: 'E_lattice ∝ (q₁ × q₂) / r', explanation: 'Lattice energy is proportional to ion charges and inversely proportional to ionic radius.' },
    ];
    rawText = `CHEMISTRY: ${topic.toUpperCase()}\nSubject: ${subject}\nStructure: Valence Electrons, Ionic/Covalent/Metallic Bonding, and Reaction Geometry`;
  } else if (isProbStatSubjectOrTopic(subject, topic)) {
    const tLower = topic.toLowerCase();
    const isMean = tLower.includes('mean') || tLower.includes('average') || tLower.includes('median') || tLower.includes('mode') || tLower.includes('central');
    const isStdDev = tLower.includes('deviation') || tLower.includes('variance') || tLower.includes('spread') || tLower.includes('dispersion');

    if (isMean) {
      summary = `Personalized Statistics curriculum for ${profile.name} on Mean & Measures of Central Tendency. Covers definition, summation notation, step-by-step arithmetic calculation, and balance point interpretation at the ${profile.level} level.`;
      concepts = [
        {
          id: 'stat-mean-1',
          name: 'What is the Mean? Definition & Formula',
          category: 'Foundation',
          shortSummary: 'The arithmetic average of a numerical dataset: Mean = Sum of observations / Number of observations.',
          difficulty: profile.level,
          prerequisites: ['Basic Arithmetic & Summation Notation'],
          simpleExplanation: 'Mean is the average of a set of values. You add up all the observations in the dataset and divide the sum by how many observations there are.',
          detailedExplanation: 'The arithmetic mean (denoted μ for a population, x̄ for a sample) is the primary measure of central tendency. For observations x₁, x₂, ..., x_N, it is formally defined as μ = (1/N) * Σ xᵢ. The mean represents the physical center of mass where the sum of deviations from the mean is identically zero: Σ(xᵢ - μ) = 0.',
          analogy: 'Imagine sharing a bag of marbles equally among friends: you pour all marbles into one bowl (sum) and divide them into equal piles so each friend receives the exact same number.',
          keyPoints: [
            'Simple definition: Mean = Sum of observations / Number of observations.',
            'Mathematical formula: μ = (Σ xᵢ) / N.',
            'Meaning of variables: xᵢ = individual observations, N = total number of observations, Σ = summation of all values.',
            'Center of balance: The sum of deviations around the mean always equals zero: Σ(xᵢ - μ) = 0.',
          ],
          formulaOrSyntax: 'Mean (μ) = (Σ xᵢ) / N = (x₁ + x₂ + ... + x_N) / N',
          example: 'Marks = [10, 20, 30, 40, 50]. Sum of observations = 10 + 20 + 30 + 40 + 50 = 150. Number of observations = 5. Mean = 150 / 5 = 30.',
        },
        {
          id: 'stat-mean-2',
          name: 'Step-by-Step Calculation & Worked Problem',
          category: 'Core',
          shortSummary: 'Step-by-step calculation workflow: Data collection → Tabulation → Summation → Division → Verification.',
          difficulty: profile.level,
          prerequisites: ['What is the Mean? Definition & Formula'],
          simpleExplanation: 'Follow 4 clear mathematical steps: Step 1: List all numbers. Step 2: Add them together to get the total sum. Step 3: Count how many numbers you have. Step 4: Divide total sum by count.',
          detailedExplanation: 'Given an empirical dataset D = {x₁, x₂, ..., x_N}: 1) Tabulate observations in an organized list; 2) Compute the aggregate sum Σxᵢ; 3) Count sample size N; 4) Compute quotient μ = Σxᵢ / N; 5) Verify by checking that positive deviations (values above mean) balance negative deviations (values below mean).',
          analogy: 'Balancing a wooden ruler on your finger: if you place equal weights at 10, 20, 30, 40, and 50 cm, your finger must sit precisely at the 30 cm mark for the ruler to remain level.',
          keyPoints: [
            'Step 1: Organize observations: [10, 20, 30, 40, 50].',
            'Step 2: Compute sum: 10 + 20 + 30 + 40 + 50 = 150.',
            'Step 3: Determine count: N = 5.',
            'Step 4: Calculate: 150 / 5 = 30.',
            'Common mistake: Forgetting to divide by the count N, or omitting zero values in the count.',
          ],
          formulaOrSyntax: 'x̄ = (1/n) * Σᵢ₌₁ⁿ xᵢ',
          example: 'Student test scores: 70, 80, 90. Sum = 240. Count = 3. Mean score = 240 / 3 = 80.',
        },
        {
          id: 'stat-mean-3',
          name: 'Median, Mode & Outlier Sensitivity',
          category: 'Advanced',
          shortSummary: 'Comparing Mean, Median, and Mode when datasets contain extreme skew or outliers.',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ['Step-by-Step Calculation & Worked Problem'],
          simpleExplanation: 'While the mean uses every value, it can be distorted by one giant number (an outlier). The median is the middle value when sorted, and the mode is the most frequent number.',
          detailedExplanation: 'The arithmetic mean minimizes squared error loss, making it sensitive to outliers. In skewed distributions (e.g., household incomes), a single billionaire inflates the mean, whereas the median (50th percentile) provides a robust measure of typical center. The mode reflects the peak of the probability density.',
          analogy: 'Nine people earning $50,000 in a room have an average of $50,000. If a billionaire walks in, the average becomes $100,000,000, but the median stays $50,000.',
          keyPoints: [
            'Mean: Uses every observation, but heavily influenced by extreme outliers.',
            'Median: The middle observation when sorted; robust to extreme values.',
            'Mode: The value that appears most often in the dataset.',
            'Symmetric distribution: Mean ≈ Median ≈ Mode.',
          ],
          formulaOrSyntax: 'Median = Middle value of sorted data; Mode = argmax(Frequency)',
          example: 'Dataset [2, 3, 3, 4, 100]: Mean = 112 / 5 = 22.4 (skewed by 100), but Median = 3 and Mode = 3 reflect the true cluster.',
        },
      ];
      definitions = [
        { term: 'Mean', definition: 'The arithmetic average of a dataset, calculated by dividing the sum of all values by the number of observations.' },
        { term: 'Observation (xᵢ)', definition: 'An individual recorded data value or measurement within a dataset.' },
        { term: 'Sample Size (N or n)', definition: 'The total number of observations contained in a dataset or sample.' },
        { term: 'Median', definition: 'The middle value in an ordered set of numbers that splits the dataset into two equal halves.' },
        { term: 'Mode', definition: 'The most frequently occurring observation in a dataset.' },
      ];
      formulas = [
        { name: 'Arithmetic Mean Formula', formula: 'Mean = (Σ xᵢ) / N', explanation: 'Sum of all observations divided by the total number of observations.' },
        { name: 'Sum of Deviations Identity', formula: 'Σ (xᵢ - Mean) = 0', explanation: 'The algebraic property that sum of differences from the mean is always zero.' },
      ];
      rawText = `STATISTICS: MEAN & CENTRAL TENDENCY\nTopic: ${topic}\nSubject: ${subject}\nFormula: Mean = Sum of observations / Count of observations\nExample: [10, 20, 30, 40, 50] -> Sum = 150, N = 5 -> Mean = 30`;
    } else if (isStdDev) {
      summary = `Personalized Statistics curriculum for ${profile.name} on Standard Deviation & Variance. Explores data spread, deviation calculation, formulas, and empirical interpretation at the ${profile.level} level.`;
      concepts = [
        {
          id: 'stat-std-1',
          name: 'What is Standard Deviation & Why Measure Spread?',
          category: 'Foundation',
          shortSummary: 'Understanding data dispersion: how far observations typically spread out from the central mean.',
          difficulty: profile.level,
          prerequisites: ['Arithmetic Mean & Basic Algebra'],
          simpleExplanation: 'Standard deviation tells us how spread out the numbers in a dataset are around their average. A low standard deviation means numbers are clustered close to the average; a high standard deviation means numbers are scattered widely.',
          detailedExplanation: 'Two datasets can share identical means (e.g., mean = 30) while having vastly different distributions: [30, 30, 30] vs [0, 30, 60]. Measures of dispersion quantify this variation. Standard deviation (σ for population, s for sample) represents the root-mean-square deviation of observations from the arithmetic mean.',
          analogy: 'Imagine two basketball players who both average 20 points per game: Player A scores 19, 20, 21 every game (low standard deviation, very consistent), while Player B scores 0, 20, 40 (high standard deviation, highly volatile).',
          keyPoints: [
            'What it measures: The spread, variation, or dispersion of values around the mean.',
            'Low standard deviation: Data points cluster tightly around the mean.',
            'High standard deviation: Data points are spread out over a wide range of values.',
            'Always non-negative: σ ≥ 0; σ = 0 only if every single number is identical.',
          ],
          formulaOrSyntax: 'Standard Deviation (σ) = √Variance = √[ (1/N) * Σ(xᵢ - μ)² ]',
          example: 'Marks = [10, 20, 30, 40, 50]. Mean = 30. Observations deviate by up to 20 marks from the mean, giving σ ≈ 14.14.',
        },
        {
          id: 'stat-std-2',
          name: 'The Standard Deviation Formula & Variable Meanings',
          category: 'Core',
          shortSummary: 'Deconstructing σ = √[ Σ(xᵢ - μ)² / N ]: step-by-step meaning of each term and why we square deviations.',
          difficulty: profile.level,
          prerequisites: ['What is Standard Deviation & Why Measure Spread?'],
          simpleExplanation: 'Formula: σ = √[ Σ(xᵢ - μ)² / N ]. Step 1: Find the mean μ. Step 2: Subtract the mean from each number (xᵢ - μ). Step 3: Square each difference (xᵢ - μ)². Step 4: Average the squared differences (Variance). Step 5: Take the square root.',
          detailedExplanation: 'Every term has a specific mathematical purpose: 1) xᵢ is an individual observation; 2) μ is the dataset mean; 3) (xᵢ - μ) is the deviation from the mean; 4) Squaring (xᵢ - μ)² eliminates negative signs so distances do not cancel to zero; 5) Dividing by N yields Variance σ²; 6) The square root returns the units to the original measurement scale.',
          analogy: 'Distance on a map: walking 5 miles north (+5) and 5 miles south (-5) sums to 0 displacement, but your total travel distance is 10 miles. Squaring eliminates negative directions.',
          keyPoints: [
            'Variable xᵢ: Individual data value.',
            'Variable μ: Dataset mean.',
            'Difference (xᵢ - μ): Deviation of value from mean.',
            'Squared difference (xᵢ - μ)²: Eliminates negative signs and penalizes large outliers.',
            'Variable N: Total count of observations.',
            'Square root: Converts squared units (marks²) back to original units (marks).',
          ],
          formulaOrSyntax: 'σ = √[ (1/N) * Σᵢ₌₁ᴺ (xᵢ - μ)² ]',
          example: 'Dataset [10, 20, 30, 40, 50]: Mean μ = 30. Deviations: [-20, -10, 0, 10, 20]. Squared: [400, 100, 0, 100, 400]. Sum = 1000. Variance = 1000/5 = 200. Std Dev = √200 ≈ 14.14.',
        },
        {
          id: 'stat-std-3',
          name: 'The Empirical Rule (68-95-99.7%) & Real-World Interpretation',
          category: 'Advanced',
          shortSummary: 'Interpreting spread in bell-shaped normal distributions using the 68-95-99.7 rule and z-scores.',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ['The Standard Deviation Formula & Variable Meanings'],
          simpleExplanation: 'In any normal bell curve: ~68% of data falls within 1 standard deviation of the mean, ~95% falls within 2 standard deviations, and ~99.7% falls within 3 standard deviations.',
          detailedExplanation: 'For Gaussian normal distributions X ~ N(μ, σ²), Chebyshev and the Empirical 3-sigma Rule establish exact probabilistic intervals: P(μ - σ ≤ X ≤ μ + σ) ≈ 68.27%, P(μ - 2σ ≤ X ≤ μ + 2σ) ≈ 95.45%, and P(μ - 3σ ≤ X ≤ μ + 3σ) ≈ 99.73%. Any observation beyond 3 standard deviations is categorized as an extreme statistical outlier.',
          analogy: 'Quality control in manufacturing: if a machine makes bolts with mean length 10cm and std dev 0.01cm, 99.7% of bolts will measure between 9.97cm and 10.03cm.',
          keyPoints: [
            '68% Rule: Approximately 68% of observations lie within [μ - σ, μ + σ].',
            '95% Rule: Approximately 95% of observations lie within [μ - 2σ, μ + 2σ].',
            '99.7% Rule: Approximately 99.7% of observations lie within [μ - 3σ, μ + 3σ].',
            'Z-score formula: Z = (x - μ) / σ measures how many standard deviations an observation lies from the mean.',
          ],
          formulaOrSyntax: 'P(μ - kσ ≤ X ≤ μ + kσ)  ⟹  k=1: 68%, k=2: 95%, k=3: 99.7%',
          example: 'IQ scores have mean = 100 and std dev = 15. About 68% of people score between 85 and 115, and 95% score between 70 and 130.',
        },
      ];
      definitions = [
        { term: 'Standard Deviation (σ)', definition: 'A quantitative measure of the amount of variation or dispersion of a set of values from their arithmetic mean.' },
        { term: 'Variance (σ²)', definition: 'The average of the squared differences of observations from their mean.' },
        { term: 'Deviation (xᵢ - μ)', definition: 'The signed difference between an individual observation and the mean of the dataset.' },
        { term: 'Empirical Rule', definition: 'The statistical rule stating that for a normal distribution, nearly all data falls within 3 standard deviations of the mean (68-95-99.7%).' },
        { term: 'Z-Score', definition: 'The number of standard deviations a given data point lies above or below the mean.' },
      ];
      formulas = [
        { name: 'Population Standard Deviation', formula: 'σ = √[ (1/N) * Σ (xᵢ - μ)² ]', explanation: 'Root-mean-square deviation of observations from the population mean.' },
        { name: 'Sample Standard Deviation', formula: 's = √[ (1/(n-1)) * Σ (xᵢ - x̄)² ]', explanation: 'Sample standard deviation using Bessel\'s correction (n-1) to eliminate bias.' },
        { name: 'Variance', formula: 'σ² = (1/N) * Σ (xᵢ - μ)²', explanation: 'Average of squared deviations from the mean.' },
      ];
      rawText = `STATISTICS: STANDARD DEVIATION & VARIANCE\nTopic: ${topic}\nSubject: ${subject}\nFormula: σ = √[ Σ(xᵢ - μ)² / N ]\nExample: [10, 20, 30, 40, 50] -> Mean = 30 -> Variance = 200 -> Standard Deviation ≈ 14.14`;
    } else {
      // Probability & General Probability & Statistics topic
      summary = `Personalized Probability & Statistics curriculum for ${profile.name} on ${topic}. Covers sample spaces, classical probability formulas, compound events, and statistical interpretation at the ${profile.level} level.`;
      concepts = [
        {
          id: 'prob-stat-1',
          name: 'What is Probability? Sample Space & Favorable Outcomes',
          category: 'Foundation',
          shortSummary: 'How likely an event is to happen: Probability = Favorable outcomes / Total possible outcomes.',
          difficulty: profile.level,
          prerequisites: ['Basic Fractions & Ratio Concepts'],
          simpleExplanation: 'Probability tells us how likely an event is to happen. For any fair experiment: Probability = Favorable outcomes / Total possible outcomes. When rolling a fair 6-sided die, there are 6 total outcomes {1, 2, 3, 4, 5, 6}. The probability of getting a 4 is P(4) = 1/6.',
          detailedExplanation: 'In classical probability, a random experiment produces a sample space S containing all mutually exclusive, equally likely outcomes. An event E is any subset of the sample space (E ⊆ S). Kolmogorov\'s classical probability definition states P(E) = n(E) / n(S), where n(E) is the count of favorable outcomes and n(S) is the total outcome count. The probability value is strictly bounded: 0 ≤ P(E) ≤ 1.',
          analogy: 'Spinning a wheel of fortune divided into 6 equal slices numbered 1 through 6: the chance of the wheel stopping on slice 4 is 1 slice out of 6 total slices.',
          keyPoints: [
            'What is Probability: Tells us how likely an event is to happen.',
            'Simple formula: Probability = Favorable outcomes / Total possible outcomes = n(E) / n(S).',
            'Sample space (S): The set of all possible outcomes (e.g. {1, 2, 3, 4, 5, 6}).',
            'Event (E): The specific outcome or collection of outcomes we care about (e.g. {4}).',
            'Impossible event: P(∅) = 0 (can never happen). Certain event: P(S) = 1 (guaranteed to happen).',
            'Complement rule: P(not E) = 1 - P(E).',
          ],
          formulaOrSyntax: 'P(E) = n(E) / n(S) = Favorable Outcomes / Total Possible Outcomes',
          example: 'When rolling a fair six-sided die: Total outcomes = 6 {1, 2, 3, 4, 5, 6}. Event: getting a 4. Favorable outcomes = 1 {4}. P(4) = 1/6 ≈ 16.67%.',
        },
        {
          id: 'prob-stat-2',
          name: 'Compound Events, Addition & Multiplication Rules',
          category: 'Core',
          shortSummary: 'Calculating probabilities of multiple events: Mutually exclusive events, independent events, and union/intersection.',
          difficulty: profile.level,
          prerequisites: ['What is Probability? Sample Space & Favorable Outcomes'],
          simpleExplanation: 'If two events cannot happen at the same time (mutually exclusive), you add their probabilities: P(A or B) = P(A) + P(B). If two events are independent, you multiply them: P(A and B) = P(A) × P(B).',
          detailedExplanation: 'For any two events A and B in sample space S: 1) General Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B); 2) If A and B are mutually exclusive (disjoint), P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B); 3) If A and B are independent (one does not affect the other), P(A ∩ B) = P(A) × P(B).',
          analogy: 'Flipping a coin and rolling a die: the coin outcome (Heads or Tails) has zero effect on the die outcome (1 through 6); they are completely independent.',
          keyPoints: [
            'Mutually Exclusive: Two events cannot happen together: P(A ∩ B) = 0.',
            'Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).',
            'Independent Events: Occurrence of A does not alter probability of B.',
            'Multiplication Rule for Independent Events: P(A and B) = P(A) × P(B).',
          ],
          formulaOrSyntax: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)   and   P(A ∩ B) = P(A) × P(B)',
          example: 'Rolling a die: P(Even) = 3/6 = 1/2. P(Greater than 4) = 2/6 = 1/3. Both (Even AND >4, which is {6}): P = 1/6. P(Even OR >4) = 3/6 + 2/6 - 1/6 = 4/6 = 2/3.',
        },
        {
          id: 'prob-stat-3',
          name: 'Conditional Probability & Bayes\' Theorem',
          category: 'Core',
          shortSummary: 'Evaluating P(A|B) = P(A ∩ B) / P(B): updating probability given prior information or observed evidence.',
          difficulty: profile.level,
          prerequisites: ['Compound Events, Addition & Multiplication Rules'],
          simpleExplanation: 'Conditional probability is the probability of event A happening GIVEN THAT event B has already occurred. We write it as P(A|B) and calculate it by taking the probability of both happening and dividing by the probability of the condition B.',
          detailedExplanation: 'Given event B with P(B) > 0, the conditional probability of A given B reduces the effective sample space from S to B: P(A|B) = P(A ∩ B) / P(B). Bayes\' Theorem inverts conditional probabilities: P(A|B) = [P(B|A) * P(A)] / P(B), forming the mathematical cornerstone of probabilistic inference, medical diagnostics, and data science.',
          analogy: 'Guessing who sent a letter: if you only know it\'s from someone in the country, probability is tiny. But GIVEN THAT the stamp is from your hometown, your search space shrinks dramatically.',
          keyPoints: [
            'Notation P(A|B): Read as "the probability of A given B".',
            'Formula: P(A|B) = P(A ∩ B) / P(B).',
            'Sample Space Reduction: The condition B becomes the new restricted sample space.',
            'Bayes\' Theorem: P(A|B) = [P(B|A) × P(A)] / P(B).',
          ],
          formulaOrSyntax: 'P(A|B) = P(A ∩ B) / P(B)   and   P(A|B) = [P(B|A) × P(A)] / P(B)',
          example: 'Deck of 52 cards: Event A = Card is a Queen (4 cards). Event B = Card is a Face card (12 cards). P(Queen | Face) = P(Queen and Face) / P(Face) = (4/52) / (12/52) = 4/12 = 1/3.',
        },
        {
          id: 'prob-stat-4',
          name: 'Descriptive Statistics: Mean, Variance & Standard Deviation',
          category: 'Advanced',
          shortSummary: 'Connecting probability distributions to summary statistics: Expected value (Mean μ), Variance (σ²), and Standard Deviation (σ).',
          difficulty: profile.level === 'Beginner' ? 'Intermediate' : profile.level,
          prerequisites: ['What is Probability? Sample Space & Favorable Outcomes'],
          simpleExplanation: 'Summary statistics describe datasets and probability distributions: Mean (μ) tells you the center average, while Variance (σ²) and Standard Deviation (σ) tell you how spread out the values are.',
          detailedExplanation: 'In descriptive statistics and probability theory, the mean μ = Σ xᵢ / N (or expected value E[X] = Σ x·P(x)) represents the central tendency. Variance σ² = (1/N) * Σ (xᵢ - μ)² measures squared dispersion, and standard deviation σ = √Variance returns spread to the original linear measurement units.',
          analogy: 'A target archery competition: the mean tells you if your arrows average near the bullseye; standard deviation tells you how tightly clustered your arrows are together.',
          keyPoints: [
            'Mean (μ): Sum of observations / Count of observations = (Σ xᵢ) / N.',
            'Variance (σ²): Average squared deviation from the mean = Σ (xᵢ - μ)² / N.',
            'Standard Deviation (σ): Square root of variance = √σ².',
            'Normal Distribution: 68% within μ ± 1σ, 95% within μ ± 2σ, 99.7% within μ ± 3σ.',
          ],
          formulaOrSyntax: 'Mean: μ = (Σ xᵢ)/N   |   Variance: σ² = Σ(xᵢ - μ)²/N   |   Std Dev: σ = √σ²',
          example: 'Exam marks [10, 20, 30, 40, 50]: Sum = 150, Count = 5 -> Mean = 30. Deviations squared sum to 1000 -> Variance = 200 -> Standard Deviation ≈ 14.14.',
        },
      ];
      definitions = [
        { term: 'Probability P(E)', definition: 'A numerical measure of the likelihood that an event will occur, ranging from 0 (impossible) to 1 (certain).' },
        { term: 'Sample Space (S)', definition: 'The set of all possible outcomes of a random experiment or trial.' },
        { term: 'Event (E)', definition: 'Any subset of outcomes belonging to the sample space.' },
        { term: 'Conditional Probability P(A|B)', definition: 'The probability that event A occurs given that event B has already occurred.' },
        { term: 'Mean (μ)', definition: 'The arithmetic average of observations calculated as the sum divided by the count.' },
        { term: 'Standard Deviation (σ)', definition: 'A measure of the dispersion or spread of values around their mean.' },
      ];
      formulas = [
        { name: 'Classical Probability Formula', formula: 'P(E) = n(E) / n(S)', explanation: 'Number of favorable outcomes divided by total possible outcomes.' },
        { name: 'Complement Rule', formula: 'P(not E) = 1 - P(E)', explanation: 'Probability of an event not occurring is 1 minus probability of the event.' },
        { name: 'Conditional Probability', formula: 'P(A|B) = P(A ∩ B) / P(B)', explanation: 'Probability of event A given that event B has occurred.' },
        { name: 'Arithmetic Mean', formula: 'Mean = (Σ xᵢ) / N', explanation: 'Sum of all observations divided by total count of observations.' },
        { name: 'Standard Deviation', formula: 'σ = √[ (1/N) * Σ (xᵢ - μ)² ]', explanation: 'Root mean squared deviation measuring spread around the mean.' },
      ];
      rawText = `PROBABILITY & STATISTICS\nTopic: ${topic}\nSubject: ${subject}\nKey Formulas: P(E) = Favorable / Total, Mean = Sum / Count, σ = √[ Σ(xᵢ - μ)² / N ]\nExamples: Die roll P(4) = 1/6, Marks [10, 20, 30, 40, 50] -> Mean = 30, Std Dev ≈ 14.14`;
    }
  } else if (isMathSubjectOrTopic(subject, topic)) {
    summary = `Personalized Mathematics curriculum for ${profile.name} on ${topic}. Covers formal definitions, governing formulas, variable meanings, step-by-step worked solutions, and proof methods at the ${profile.level} level.`;
    concepts = [
      {
        id: `math-core-1-${Date.now()}`,
        name: `Mathematical Foundations of ${topic}`,
        category: 'Foundation',
        shortSummary: `Definitions, axioms, and intuitive visual representations of ${topic}.`,
        difficulty: profile.level,
        prerequisites: ['Algebraic Prerequisites'],
        simpleExplanation: `A clear introduction to ${topic}, breaking down what the mathematical formulas mean, how to read the notation, and why this concept was developed.`,
        detailedExplanation: `Formal axiomatic definitions, mathematical theorems, and analytical properties in ${topic}. Establishes algebraic domain, range, continuity, and governing identities.`,
        analogy: 'A universal language where precise symbols express exact relationships that hold true anywhere.',
        keyPoints: [
          'Axiomatic definitions and rigorous mathematical vocabulary.',
          'Variable interpretations: dependent, independent, and constant parameters.',
          'Visual and geometric representations (graphs, slopes, areas, vectors).',
        ],
        formulaOrSyntax: `Formula: f(x) and Governing Identities in ${topic}`,
        example: 'Concrete worked numerical example showing each algebraic substitution step clearly.',
      },
    ];
    definitions = [
      { term: `${topic}`, definition: `The mathematical framework and theorems governing analysis in ${subject}.` },
    ];
    formulas = [
      { name: 'Core Theorem / Formula', formula: 'Mathematical_Formula(x) = Derivation', explanation: `Primary governing mathematical theorem in ${topic}.` },
    ];
    rawText = `MATHEMATICS: ${topic.toUpperCase()}\nSubject: ${subject}\nStructure: Definitions, Theorems, Worked Calculations, and Common Pitfalls`;
  } else {
    // General / Customized topic dynamically generated with DOMAIN-AWARE logic
    const isTechOrCS = subject.toLowerCase().includes('comp') || subject.toLowerCase().includes('soft') || subject.toLowerCase().includes('engine');
    summary = `Personalized study guide for ${profile.name} covering ${topic} in ${subject}. Formatted to support your goal to ${profile.goal.toLowerCase()} at the ${profile.level} level.`;
    concepts = [
      {
        id: `gen-concept-1-${Date.now()}`,
        name: `Foundations of ${topic}`,
        category: 'Foundation',
        shortSummary: `Core axioms, basic definitions, and the initial mental model for mastering ${topic}.`,
        difficulty: profile.level,
        prerequisites: ['Introductory Domain Concepts'],
        simpleExplanation: `An accessible introduction to ${topic}, breaking down core terminology and fundamental behaviors with concrete examples.`,
        detailedExplanation: `Explores foundational tenets and essential systems governing ${topic} in ${subject}. Establishes key relationships, baseline variables, and structural boundaries.`,
        analogy: 'The blueprint foundation of a building before constructing the upper floors.',
        keyPoints: [
          `Fundamental axioms and core terminology of ${topic}.`,
          `Key interactions and observable mechanisms in ${subject}.`,
          `Standard conventions and operational vocabulary.`,
        ],
        formulaOrSyntax: isTechOrCS ? `State(t+1) = f(State(t), Input)` : `Synthesis: Foundations → Core Dynamics in ${topic}`,
      },
      {
        id: `gen-concept-2-${Date.now()}`,
        name: `Core Mechanisms & Principles of ${topic}`,
        category: 'Core',
        shortSummary: `Primary operational mechanisms, governing rules, and step-by-step transformations in ${topic}.`,
        difficulty: profile.level,
        prerequisites: [`Foundations of ${topic}`],
        simpleExplanation: `Examining how the key components in ${topic} interact dynamically under varying conditions.`,
        detailedExplanation: `In-depth analysis of interactions, transformation cycles, and dynamic behaviors within ${topic}.`,
        analogy: 'The interlocking gears inside a precision mechanical clock.',
        keyPoints: [
          'Interdependent structural components and rules.',
          'Equilibrium, changes, and responses to stimuli.',
          'Quantitative and qualitative assessment metrics.',
        ],
        formulaOrSyntax: isTechOrCS ? `Output = f(Input, Parameters)` : `Mechanism: Principles + Context = Outcome in ${topic}`,
      },
    ];

    definitions = [
      { term: `${topic} Framework`, definition: `The structural set of rules, models, and relationships organizing the study of ${topic} in ${subject}.` },
    ];

    formulas = [
      { name: 'Core Governing Relationship', formula: isTechOrCS ? 'Output = Function(Input, System_Parameters)' : `Governing_Principle = Dynamics(${topic})`, explanation: `Primary governing relationship in ${topic}.` },
    ];

    rawText = `${subject.toUpperCase()}: ${topic.toUpperCase()}\nCurriculum created for ${profile.name}`;
  }

  return {
    id: `mat-personal-${profile.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    title: `${topic} (${profile.subject})`,
    fileType: 'notes',
    fileName: `${subject.replace(/\s+/g, '_')}_${topic.replace(/\s+/g, '_')}.pdf`,
    uploadDate: new Date().toISOString().split('T')[0],
    status: 'ready',
    summary,
    mainTopic: topic,
    subtopics: concepts.map((c) => c.name),
    concepts,
    importantDefinitions: definitions,
    importantFormulas: formulas,
    difficultConcepts: [concepts[concepts.length - 1]?.name || topic],
    prerequisites: concepts[0]?.prerequisites || ['Basic terminology'],
    suggestedLearningOrder: concepts.map((c) => c.name),
    rawText,
  };
}

/**
 * Generate a personalized roadmap strictly built around the student's selected topic
 */
export function createPersonalizedRoadmap(
  profile: StudentProfile,
  material?: LearningMaterial
): RoadmapNode[] {
  const topic = profile.topic?.trim() || getDefaultTopic(profile.subject);

  // If topic is Finite Automata, output the exact 8-step roadmap required
  if (isAutomataTopic(topic)) {
    return [
      {
        id: 'road-fa-1',
        title: '1. Introduction to Automata',
        description: 'Core concepts of state machines, input tapes, alphabets, and computational models.',
        level: 'Foundation',
        order: 1,
        status: 'recommended',
        prerequisites: [],
        conceptId: 'fa-concept-1',
        estimatedMinutes: 20,
      },
      {
        id: 'road-fa-2',
        title: '2. Alphabets, Strings and Languages',
        description: 'Formal mathematical definitions of Σ, strings, empty string (ε), and language closures (Σ*).',
        level: 'Foundation',
        order: 2,
        status: 'in_progress',
        prerequisites: ['1. Introduction to Automata'],
        conceptId: 'fa-concept-1',
        estimatedMinutes: 25,
      },
      {
        id: 'road-fa-3',
        title: '3. Deterministic Finite Automata (DFA)',
        description: 'The formal 5-tuple M = (Q, Σ, δ, q₀, F) and deterministic execution invariants.',
        level: 'Core',
        order: 3,
        status: 'recommended',
        prerequisites: ['2. Alphabets, Strings and Languages'],
        conceptId: 'fa-concept-2',
        estimatedMinutes: 35,
      },
      {
        id: 'road-fa-4',
        title: '4. Non-deterministic Finite Automata (NFA)',
        description: 'Branching computational paths, powerset transitions δ: Q × Σ → 2^Q, and string acceptance.',
        level: 'Core',
        order: 4,
        status: 'locked',
        prerequisites: ['3. Deterministic Finite Automata (DFA)'],
        conceptId: 'fa-concept-4',
        estimatedMinutes: 35,
      },
      {
        id: 'road-fa-5',
        title: '5. ε-NFA & Epsilon Transitions',
        description: 'Spontaneous state jumps without reading tape symbols and computing the ε-closure(q).',
        level: 'Advanced',
        order: 5,
        status: 'locked',
        prerequisites: ['4. Non-deterministic Finite Automata (NFA)'],
        conceptId: 'fa-concept-4',
        estimatedMinutes: 30,
      },
      {
        id: 'road-fa-6',
        title: '6. NFA to DFA Subset Construction',
        description: 'The algorithmic transformation compiling any non-deterministic automaton into an equivalent DFA.',
        level: 'Advanced',
        order: 6,
        status: 'locked',
        prerequisites: ['5. ε-NFA & Epsilon Transitions'],
        conceptId: 'fa-concept-5',
        estimatedMinutes: 45,
      },
      {
        id: 'road-fa-7',
        title: '7. DFA State Minimization',
        description: 'Table-filling algorithm, Myhill-Nerode equivalence classes, and minimal state reduction.',
        level: 'Mastery',
        order: 7,
        status: 'locked',
        prerequisites: ['6. NFA to DFA Subset Construction'],
        conceptId: 'fa-concept-6',
        estimatedMinutes: 40,
      },
      {
        id: 'road-fa-8',
        title: '8. Assessment and Revision',
        description: 'Comprehensive exam-style assessment testing retention of finite state machines and proofs.',
        level: 'Mastery',
        order: 8,
        status: 'locked',
        prerequisites: ['7. DFA State Minimization'],
        estimatedMinutes: 50,
      },
    ];
  }

  // Otherwise, construct a structured 6-node roadmap aligned with the material concepts
  const mat = material || createPersonalizedMaterial(profile);
  const c = mat.concepts;

  return [
    {
      id: 'road-p-1',
      title: `1. Introduction to ${topic}`,
      description: c[0]?.shortSummary || 'Core definitions, foundational principles, and vocabulary.',
      level: 'Foundation',
      order: 1,
      status: 'recommended',
      prerequisites: [],
      conceptId: c[0]?.id,
      estimatedMinutes: 20,
    },
    {
      id: 'road-p-2',
      title: `2. Foundations of ${c[0]?.name || topic}`,
      description: 'Step-by-step exploration of fundamental behaviors and baseline axioms.',
      level: 'Foundation',
      order: 2,
      status: 'in_progress',
      prerequisites: [`1. Introduction to ${topic}`],
      conceptId: c[0]?.id,
      estimatedMinutes: 25,
    },
    {
      id: 'road-p-3',
      title: `3. Core Mechanics: ${c[1]?.name || 'Operating Principles'}`,
      description: c[1]?.shortSummary || 'Key interaction rules and operational models.',
      level: 'Core',
      order: 3,
      status: 'recommended',
      prerequisites: [`2. Foundations of ${c[0]?.name || topic}`],
      conceptId: c[1]?.id,
      estimatedMinutes: 35,
    },
    {
      id: 'road-p-4',
      title: `4. Advanced Structures & Analysis in ${topic}`,
      description: c[2]?.shortSummary || 'Complex scenarios, multi-factor analysis, and problem patterns.',
      level: 'Advanced',
      order: 4,
      status: 'locked',
      prerequisites: [`3. Core Mechanics: ${c[1]?.name || 'Operating Principles'}`],
      conceptId: c[2]?.id,
      estimatedMinutes: 40,
    },
    {
      id: 'road-p-5',
      title: `5. Edge Cases & Optimization`,
      description: 'Troubleshooting common pitfalls, boundary states, and performance constraints.',
      level: 'Advanced',
      order: 5,
      status: 'locked',
      prerequisites: [`4. Advanced Structures & Analysis in ${topic}`],
      estimatedMinutes: 35,
    },
    {
      id: 'road-p-6',
      title: `6. ${topic} Synthesis & Final Assessment`,
      description: 'Comprehensive milestone evaluation validating complete topic mastery and exam readiness.',
      level: 'Mastery',
      order: 6,
      status: 'locked',
      prerequisites: [`5. Edge Cases & Optimization`],
      estimatedMinutes: 45,
    },
  ];
}

/**
 * Generate a visual lesson specifically aligned with the student's active concept and topic
 */
export function createVisualLessonForConcept(
  concept: MaterialConcept | null | undefined,
  topic: string,
  subject: string
): VisualLesson {
  const conceptName = concept?.name || topic;
  const isAutomata = isAutomataTopic(topic);

  if (isAutomata) {
    if (conceptName.toLowerCase().includes('transition') || conceptName.toLowerCase().includes('delta')) {
      return {
        id: `vis-fa-delta`,
        conceptId: concept?.id || 'fa-concept-3',
        conceptTitle: 'Transition Function (δ) & State Table Execution',
        diagramType: 'state-machine',
        overview: 'Follow how the transition function δ: Q × Σ → Q deterministically maps the machine from state to state upon reading each symbol.',
        analogy: 'A GPS navigation system: current intersection (State) + taken turn (Symbol) = next location.',
        narrationScript: 'The transition function is the beating heart of a deterministic finite automaton. Given any current state and an incoming tape symbol, δ calculates exactly one unambiguous next state. Notice how invalid inputs lead into a trap or dead state.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Current State Inspection: q ∈ Q',
            description: 'The machine registers its active position in the state graph (e.g. q₀).',
            stateLabel: 'State: q₀',
            nodeType: 'start',
            highlight: true,
            notes: 'The machine always starts at designated initial state q₀.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Read Next Symbol: a ∈ Σ',
            description: 'The tape read head advances and scans the next incoming input character (e.g. "0").',
            stateLabel: 'Input: "0"',
            nodeType: 'process',
            highlight: false,
            notes: 'Deterministic automata must have a defined action for every symbol in Σ.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Matrix Intersection: δ(q₀, "0")',
            description: 'The machine looks up the state table coordinate (q₀, 0) to fetch the destination state.',
            stateLabel: 'Lookup: δ(q₀, 0) → q₁',
            nodeType: 'decision',
            highlight: false,
            notes: 'In a DFA, δ is a total function returning exactly one state.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Transition Execution & Update',
            description: 'The active state updates to q₁. The previous state is archived in the execution log.',
            stateLabel: 'New State: q₁',
            nodeType: 'action',
            highlight: false,
            notes: 'State mutation occurs in constant time O(1).',
          },
          {
            id: 'step-5',
            stepNumber: 5,
            title: 'Acceptance Verification: Is q_final ∈ F?',
            description: 'Upon tape end, the machine checks whether the final resting state is marked with a double circle in F.',
            stateLabel: 'Verdict: q ∈ F (Accept)',
            nodeType: 'accept',
            highlight: true,
            notes: 'If q_final ∉ F, the string is rejected.',
          },
        ],
        interactiveTips: [
          'Use the tape simulator below to test different binary inputs.',
          'Notice how every transition is single-valued with no non-deterministic branching.',
        ],
      };
    }

    if (conceptName.toLowerCase().includes('nfa') || conceptName.toLowerCase().includes('non-deterministic')) {
      return {
        id: `vis-fa-nfa`,
        conceptId: concept?.id || 'fa-concept-4',
        conceptTitle: 'NFA Parallel Branching & Powerset Trajectory',
        diagramType: 'state-machine',
        overview: 'Watch how an NFA splits computation into parallel threads when a single symbol leads to multiple destination states.',
        analogy: 'A tree of parallel universes: at every decision fork, time splits into both paths.',
        narrationScript: 'In a non-deterministic finite automaton, reading a symbol can trigger zero, one, or multiple transitions simultaneously. String acceptance requires only that at least ONE active computational thread terminates in an accept state.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Parallel Seed State: {q₀}',
            description: 'The NFA initializes with an active set containing the start state and its ε-closure.',
            stateLabel: 'Active: {q₀}',
            nodeType: 'start',
            highlight: true,
            notes: 'NFA configurations are sets of states, not single states.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Symbol Scan & Multi-Branching',
            description: 'On reading symbol "1", δ(q₀, 1) returns multiple candidate states {q₀, q₁}.',
            stateLabel: 'Branch: {q₀, q₁}',
            nodeType: 'decision',
            highlight: false,
            notes: 'The machine bifurcates, pursuing both trajectories simultaneously.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Spontaneous ε-Move Traversal',
            description: 'Any active branch with an ε-transition immediately expands without reading any tape symbol.',
            stateLabel: 'ε-Closure Expansion',
            nodeType: 'process',
            highlight: false,
            notes: 'ε-transitions allow instant state teleportation.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Terminal Check: Any Active State in F?',
            description: 'If at least one active thread rests in an accepting state, the entire input string is declared accepted.',
            stateLabel: 'Outcome: Accepted',
            nodeType: 'accept',
            highlight: true,
            notes: 'Even if 9 branches died, 1 accepting branch guarantees language acceptance.',
          },
        ],
        interactiveTips: [
          'NFAs make design much simpler than DFAs for complex string suffix checks.',
          'Subset construction can compile this NFA into an equivalent DFA.',
        ],
      };
    }

    // Default Finite Automata DFA Step Visual
    return {
      id: `vis-fa-dfa`,
      conceptId: concept?.id || 'fa-concept-2',
      conceptTitle: 'Deterministic Finite Automaton (DFA) Step-by-Step Flow',
      diagramType: 'state-machine',
      overview: 'Interactive step-by-step visual lesson demonstrating DFA tape processing, state transitions, and acceptance verification.',
      analogy: 'A mechanical subway turnstile: Starts Locked (q₀). Inserting coin transitions to Unlocked (q₁). Pushing arm transitions back to Locked (q₀).',
      narrationScript: 'Welcome to this visual walkthrough of a Deterministic Finite Automaton. Follow along step by step as each tape symbol is processed through the state network. Notice the single designated arrow leaving each state for every input character.',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Start State Initialization: q₀',
          description: 'The machine powers on at the designated initial state q₀, indicated by an incoming start arrow.',
          stateLabel: 'Start: q₀',
          nodeType: 'start',
          highlight: true,
          notes: 'Every DFA has exactly one start state q₀ ∈ Q.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'First Symbol Evaluation',
          description: 'The tape head scans the first input character and fires the matching transition δ(q₀, symbol).',
          stateLabel: 'Scan Symbol',
          nodeType: 'process',
          highlight: false,
          notes: 'No backtrack is required in deterministic execution.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Intermediate State Processing',
          description: 'The automaton cycles through intermediate states as subsequent tape characters are evaluated.',
          stateLabel: 'State: q₁',
          nodeType: 'action',
          highlight: false,
          notes: 'The state captures all necessary historical memory of the string.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Acceptance Criteria Check: F',
          description: 'When the tape is exhausted, the machine checks whether the current state belongs to the set of accepting states F (double circle).',
          stateLabel: 'Accept State: q₂ ∈ F',
          nodeType: 'accept',
          highlight: true,
          notes: 'If in F, the string is accepted; otherwise rejected.',
        },
      ],
      interactiveTips: [
        'Watch how the active state highlights in indigo as steps execute.',
        'Enter test strings into the tape simulator below to see real-time state evaluation.',
      ],
    };
  }

  // 2. Data Structures & Algorithms visual lessons
  if (isDsaTopic(topic)) {
    const cLower = conceptName.toLowerCase();
    if (cLower.includes('stack') || cLower.includes('queue') || cLower.includes('lifo') || cLower.includes('fifo')) {
      return {
        id: `vis-dsa-stack-queue`,
        conceptId: concept?.id || 'dsa-concept-2',
        conceptTitle: 'Stack (LIFO) & Queue (FIFO) Invariant Flow',
        diagramType: 'process',
        overview: 'Track how pointer invariants (Top for Stacks, Front/Rear for Queues) maintain strict insertion and deletion ordering in O(1) time.',
        analogy: 'A spring-loaded cafeteria plate dispenser (Stack) vs a ticketing queue at a train station (Queue).',
        narrationScript: 'In linear abstract data types, structural invariants dictate access points. Stacks enforce Last-In, First-Out where the most recent push is the first popped. Queues enforce First-In, First-Out where elements enqueue at the rear and dequeue from the front.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Pointer Initialization & Bounds Check',
            description: 'Inspect buffer allocation. Stack Top is initialized to -1 (empty) or Queue Front/Rear to index 0.',
            stateLabel: 'State: Ready',
            nodeType: 'start',
            highlight: true,
            notes: 'Prevents stack underflow or queue buffer corruption.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Push / Enqueue Element Insertion',
            description: 'Write element into memory buffer at active pointer and increment pointer offset in O(1) time.',
            stateLabel: 'Insert: Push / Enqueue',
            nodeType: 'process',
            highlight: false,
            notes: 'If buffer is full, trigger dynamic array doubling or throw overflow.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Top / Head Invariant Inspection (Peek)',
            description: 'Inspect current accessible element without mutating data structure state.',
            stateLabel: 'Inspect: Peek Head',
            nodeType: 'decision',
            highlight: false,
            notes: 'Read-only operation with zero computational side effects.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Pop / Dequeue Element Removal & Return',
            description: 'Retrieve current head value, adjust pointer boundary (Top decrement or Front advance), and return data to caller.',
            stateLabel: 'Output: Popped Element',
            nodeType: 'accept',
            highlight: true,
            notes: 'Preserves LIFO/FIFO invariant for subsequent operations.',
          },
        ],
        interactiveTips: [
          'Use the Data Structure Visualizer below to push, pop, enqueue, and inspect live pointers.',
          'Notice how stack frames directly correspond to function call execution stacks in memory.',
        ],
      };
    }

    if (cLower.includes('tree') || cLower.includes('graph') || cLower.includes('bst') || cLower.includes('search')) {
      return {
        id: `vis-dsa-trees`,
        conceptId: concept?.id || 'dsa-concept-3',
        conceptTitle: 'Binary Search Tree (BST) Traversal & Lookup Flow',
        diagramType: 'flowchart',
        overview: 'Follow the recursive binary search invariant: keys in the left subtree are smaller than the node, and keys in the right subtree are larger.',
        analogy: 'Navigating a highway fork: each signpost tells you whether to steer left or right to reach your target exit.',
        narrationScript: 'Binary search structures divide the search space by half at each branch. Comparing the target key with the current node determines whether computation descends down the left child or the right child, achieving O(log n) time in balanced trees.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Root Node Key Inspection',
            description: 'The search pointer initializes at the Tree Root. Read Target Key and Root Value.',
            stateLabel: 'Node: Root',
            nodeType: 'start',
            highlight: true,
            notes: 'Base entry point of the recursive traversal.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Branch Decision: Target vs Node Key',
            description: 'If Target < Current.val, branch Left. If Target > Current.val, branch Right.',
            stateLabel: 'Compare: Branch Left / Right',
            nodeType: 'decision',
            highlight: false,
            notes: 'Eliminates an entire subtree (50% of remaining candidates) in a single comparison.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Child Pointer Traversal & Subtree Descent',
            description: 'Pointer advances to child node. Repeat comparison invariant recursively.',
            stateLabel: 'Traverse: Child Node',
            nodeType: 'process',
            highlight: false,
            notes: 'Tree depth determines total comparison count.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Termination: Target Discovered or Leaf Reached',
            description: 'If Current.val == Target, return node pointer. If Current is null, target is absent.',
            stateLabel: 'Result: Match Found',
            nodeType: 'accept',
            highlight: true,
            notes: 'Returns target node in O(log n) average time complexity.',
          },
        ],
        interactiveTips: [
          'Test the search runner below with sorted array values to visualize logarithmic halving.',
          'Notice how in-order traversal (Left, Root, Right) yields keys in strictly ascending sorted order.',
        ],
      };
    }

    // Default Linear DSA (Arrays & Lists)
    return {
      id: `vis-dsa-arrays`,
      conceptId: concept?.id || 'dsa-concept-1',
      conceptTitle: 'Array Index Addressing & Binary Search Traversal',
      diagramType: 'process',
      overview: 'Visualize contiguous memory allocation, direct index arithmetic Address = Base + (i * size), and logarithmic search range halving.',
      analogy: 'Numbered lockers along a hallway: instantly locating locker #42 without checking lockers 1 through 41.',
      narrationScript: 'Arrays provide constant-time O(1) random access because memory is contiguous. In sorted arrays, Binary Search leverages two boundary pointers to halve the search interval on every step until the target element is isolated.',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Memory Allocation & Boundary Pointers',
          description: 'Establish contiguous buffer with Low pointer at index 0 and High pointer at index N-1.',
          stateLabel: 'Pointers: Low=0, High=N-1',
          nodeType: 'start',
          highlight: true,
          notes: 'Direct indexing computes address in O(1) via base offset arithmetic.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Midpoint Calculation: mid = (Low + High) / 2',
          description: 'Compute pivot index and inspect array element at arr[mid].',
          stateLabel: 'Inspect: arr[mid]',
          nodeType: 'process',
          highlight: false,
          notes: 'Safe midpoint calculation avoids integer overflow: low + (high - low) / 2.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Comparison & Subarray Partitioning',
          description: 'Compare target with arr[mid]. If target > arr[mid], set Low = mid + 1; otherwise High = mid - 1.',
          stateLabel: 'Partition: Halve Range',
          nodeType: 'decision',
          highlight: false,
          notes: 'Discards half of the remaining candidate elements.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Target Discovery & Index Return',
          description: 'When arr[mid] equals Target, execution terminates and returns index mid to caller.',
          stateLabel: 'Verdict: Target Located',
          nodeType: 'accept',
          highlight: true,
          notes: 'Completed in O(log n) steps versus O(n) linear scanning.',
        },
      ],
      interactiveTips: [
        'Use the interactive array runner below to test custom target keys.',
        'Watch Low, Mid, and High pointers move across the visual cells.',
      ],
    };
  }

  // 3. Operating Systems visual lessons
  if (isOsTopic(topic)) {
    const cLower = conceptName.toLowerCase();
    if (cLower.includes('dual') || cLower.includes('kernel') || cLower.includes('syscall') || cLower.includes('mode')) {
      return {
        id: `vis-os-dual-mode`,
        conceptId: concept?.id || 'os-concept-1',
        conceptTitle: 'System Call Trap & Dual-Mode CPU Transition Flow',
        diagramType: 'process',
        overview: 'Witness how hardware CPU mode bits (User Mode 1 vs Kernel Mode 0) protect memory and mediate privileged device I/O through system calls.',
        analogy: 'Passing through a secure bank teller window: customers cannot enter the vault directly, but can submit authorized deposit requests to the teller.',
        narrationScript: 'Operating systems protect physical hardware by executing user code in restricted User Mode. When an application needs disk access or network I/O, it executes a software interrupt trap. The CPU mode bit flips to 0, granting kernel control to execute the privileged service before returning.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'User Mode Application Execution (Mode = 1)',
            description: 'User program executes unprivileged computational instructions in isolated user space.',
            stateLabel: 'CPU: User Mode (1)',
            nodeType: 'start',
            highlight: true,
            notes: 'Attempting direct hardware access here triggers a segmentation fault.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Software Interrupt / Trap Instruction Fired',
            description: 'Application invokes syscall (e.g. read(), write()) and triggers CPU trap instruction.',
            stateLabel: 'Trap: Syscall Raised',
            nodeType: 'process',
            highlight: false,
            notes: 'Saves user program counter and registers onto kernel stack.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Mode Bit Switch & Interrupt Vector Lookup',
            description: 'Hardware flips CPU mode bit from 1 to 0 and jumps to designated Kernel Handler in Interrupt Vector Table.',
            stateLabel: 'CPU: Kernel Mode (0)',
            nodeType: 'decision',
            highlight: false,
            notes: 'Privileged instructions and direct hardware I/O are now permitted.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Syscall Completion & Return-from-Trap',
            description: 'Kernel finishes I/O service, writes return value, resets mode bit to 1, and resumes user application.',
            stateLabel: 'Mode: User Mode Resumed',
            nodeType: 'accept',
            highlight: true,
            notes: 'Seamless return-from-trap keeps application execution continuous.',
          },
        ],
        interactiveTips: [
          'Notice how dual-mode operation guarantees memory protection across multiple isolated processes.',
        ],
      };
    }

    // Default OS (Process Scheduling & Lifecycle)
    return {
      id: `vis-os-process-lifecycle`,
      conceptId: concept?.id || 'os-concept-2',
      conceptTitle: '5-State Process Lifecycle & CPU Context Switch Flow',
      diagramType: 'state-machine',
      overview: 'Follow a process through New, Ready, Running, Waiting, and Terminated states as the OS Dispatcher swaps CPU register contexts.',
      analogy: 'Patients in a clinic: Arriving (New), waiting in lobby (Ready), in exam room with doctor (Running), waiting on lab tests (Waiting), and discharged (Terminated).',
      narrationScript: 'A process is an active program in execution. The operating system maintains a Process Control Block (PCB) tracking registers, program counter, and memory maps. As timer interrupts fire, the scheduler executes context switches, saving outgoing state and loading the next ready job.',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Process Creation & PCB Allocation (New → Ready)',
          description: 'OS allocates Process Control Block (PCB), maps virtual address space, and pushes process into Ready Queue.',
          stateLabel: 'State: Ready Queue',
          nodeType: 'start',
          highlight: true,
          notes: 'Process is fully initialized and waiting for CPU time slice.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Dispatcher Context Switch (Ready → Running)',
          description: 'CPU scheduler selects process. Dispatcher loads registers from PCB and switches CPU execution to Running.',
          stateLabel: 'State: CPU Running',
          nodeType: 'process',
          highlight: false,
          notes: 'Context switch overhead involves saving/restoring hardware register state.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Quantum Expiration or I/O Event (Running → Waiting/Ready)',
          description: 'Timer interrupt fires (time quantum elapsed) or process requests disk/network I/O, entering sleep queue.',
          stateLabel: 'State: Waiting / Preempted',
          nodeType: 'decision',
          highlight: false,
          notes: 'Round-robin prevents any single CPU-bound process from starving interactive jobs.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Process Exit & Resource Reclamation (Terminated)',
          description: 'Process finishes execution via exit() syscall. Kernel deallocates memory, closes open file handles, and returns exit code.',
          stateLabel: 'State: Terminated',
          nodeType: 'accept',
          highlight: true,
          notes: 'Parent collects exit code via wait(), eliminating zombie processes.',
        },
      ],
      interactiveTips: [
        'Use the CPU Process Scheduler simulator below to step through Round Robin and FCFS queues.',
        'Watch processes cycle from Ready to Running to Terminated with live turnaround metrics.',
      ],
    };
  }

  // 4. Computer Networks visual lessons
  if (isNetworksTopic(topic)) {
    const cLower = conceptName.toLowerCase();
    if (cLower.includes('osi') || cLower.includes('encapsulation') || cLower.includes('layer') || cLower.includes('pdu')) {
      return {
        id: `vis-net-encapsulation`,
        conceptId: concept?.id || 'net-concept-1',
        conceptTitle: 'Protocol Data Unit (PDU) Multi-Layer Encapsulation Flow',
        diagramType: 'process',
        overview: 'Watch application data descend the 5-layer Internet protocol stack, acquiring headers at each boundary before transmitting as raw physical bits.',
        analogy: 'Sending a gift: wrapping the item (Data), putting it in a courier box with tracking (Transport), sealing it in a postal crate with destination zip code (Network), loading onto a delivery van (Link).',
        narrationScript: 'Network communication relies on strict layered abstraction. Each layer adds Protocol Control Information (headers) to incoming payload data. On arrival at the destination host, the reverse process decapsulates each header layer by layer until raw application data is delivered.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Application Layer Payload Generation',
            description: 'User application creates raw message payload (e.g. HTTP GET /index.html).',
            stateLabel: 'PDU: App Data',
            nodeType: 'start',
            highlight: true,
            notes: 'High-level application protocols (HTTP, DNS, SSH, SMTP).',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Transport Layer TCP Header Encapsulation',
            description: 'Prepends Source Port (49152) and Destination Port (443), Sequence Numbers, and Checksum.',
            stateLabel: 'PDU: TCP Segment',
            nodeType: 'process',
            highlight: false,
            notes: 'Enables process-to-process multiplexing and reliable byte streaming.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Network Layer IP Header Encapsulation',
            description: 'Prepends Source IP (192.168.1.10), Destination IP (93.184.216.34), and TTL (Time-To-Live).',
            stateLabel: 'PDU: IP Packet',
            nodeType: 'decision',
            highlight: false,
            notes: 'Enables host-to-host global routing across intermediate internet routers.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Data Link Framing & Physical Bitstream Transmission',
            description: 'Prepends MAC Addresses, appends CRC checksum frame trailer, and modulates bits into physical electrical/optical signals.',
            stateLabel: 'PDU: Frame → Bits',
            nodeType: 'accept',
            highlight: true,
            notes: 'Delivers frame hop-by-hop across local physical medium (Ethernet / Wi-Fi).',
          },
        ],
        interactiveTips: [
          'Use the Network Protocol Simulator below to inspect header fields across each layer.',
          'Notice how routers only decapsulate up to Layer 3 (IP) to make forwarding decisions.',
        ],
      };
    }

    // Default Networks (TCP 3-Way Handshake & Connection Flow)
    return {
      id: `vis-net-tcp-handshake`,
      conceptId: concept?.id || 'net-concept-2',
      conceptTitle: 'TCP 3-Way Handshake Connection Establishment Flow',
      diagramType: 'state-machine',
      overview: 'Follow the SYN → SYN-ACK → ACK packet exchange establishing synchronized sequence numbers and full-duplex transmission.',
      analogy: 'Two radio operators establishing contact: "Base, this is Alpha, do you copy?" → "Alpha, this is Base, copy you loud and clear, do you copy?" → "Base, copy that, commencing report."',
      narrationScript: 'Before any data can be transferred over TCP, client and server must agree on initial sequence numbers to ensure reliable ordered delivery. The client initiates with a SYN segment. The server acknowledges with SYN-ACK, and the client confirms with ACK, shifting connection status to ESTABLISHED.',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Client SYN Transmission (SYN-SENT)',
          description: 'Client generates random Initial Sequence Number (ISN=100), sets SYN flag = 1, and transmits segment to Server.',
          stateLabel: 'Packet: SYN(seq=100)',
          nodeType: 'start',
          highlight: true,
          notes: 'Client state transitions from CLOSED to SYN-SENT.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Server SYN-ACK Response (SYN-RECEIVED)',
          description: 'Server allocates buffer, picks its own ISN (300), acknowledges client sequence with ACK=101, and sends SYN+ACK.',
          stateLabel: 'Packet: SYN(300)+ACK(101)',
          nodeType: 'process',
          highlight: false,
          notes: 'Server transitions from LISTEN to SYN-RECEIVED.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Client ACK Confirmation (ESTABLISHED)',
          description: 'Client acknowledges server sequence with ACK=301 and seq=101. Connection is now active on both sides.',
          stateLabel: 'Packet: ACK(seq=101, ack=301)',
          nodeType: 'decision',
          highlight: false,
          notes: 'Client transitions to ESTABLISHED; data payload can now be attached.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Full-Duplex Data Transmission Active',
          description: 'Bidirectional reliable byte stream is established. Sliding window flow control and packet retransmission are now active.',
          stateLabel: 'State: ESTABLISHED',
          nodeType: 'accept',
          highlight: true,
          notes: 'Guarantees in-order, error-checked data transfer across unreliable IP.',
        },
      ],
      interactiveTips: [
        'Use the Network Packet Simulator below to fire SYN, SYN-ACK, and ACK packets interactively.',
        'Watch sequence and acknowledgment numbers advance sequentially with round-trip metrics.',
      ],
    };
  }

  // 5. DBMS visual lessons
  if (isDbmsTopic(topic)) {
    const cLower = conceptName.toLowerCase();
    if (cLower.includes('transaction') || cLower.includes('acid') || cLower.includes('2pl') || cLower.includes('lock')) {
      return {
        id: `vis-dbms-acid-2pl`,
        conceptId: concept?.id || 'db-concept-3',
        conceptTitle: 'Two-Phase Locking (2PL) & ACID Transaction Commit Flow',
        diagramType: 'process',
        overview: 'Observe how Two-Phase Locking enforces serializability and Write-Ahead Logging (WAL) guarantees durability during atomic transactions.',
        analogy: 'A legal closing ceremony: both buyer and seller sign all deeds and title documents (Growing Phase), lock the vault, and only then release escrow funds (Shrinking Phase).',
        narrationScript: 'Database transactions must satisfy ACID properties. Concurrency managers enforce serializability using Two-Phase Locking. In the Growing Phase, transactions acquire Shared and Exclusive locks. Once the first lock is released, the transaction enters the Shrinking Phase where no new locks may be obtained.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Transaction Begin & Write-Ahead Log (WAL) Allocation',
            description: 'DBMS assigns unique Transaction ID (TID) and records BEGIN transaction record in non-volatile WAL buffer.',
            stateLabel: 'TID: BEGIN Tx',
            nodeType: 'start',
            highlight: true,
            notes: 'WAL protocol dictates log entries precede in-memory page modifications.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Growing Phase: Row Lock Acquisition (S & X Locks)',
            description: 'Acquires Shared (S) locks for reads and Exclusive (X) locks for writes. Conflicting requests wait in lock queue.',
            stateLabel: 'Locks: Growing Phase',
            nodeType: 'process',
            highlight: false,
            notes: 'Guarantees conflict serializability across concurrent interleavings.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Buffer Pool Mutation & Redo Log Generation',
            description: 'Mutates dirty pages in RAM buffer pool and logs before/after image byte values into redo/undo logs.',
            stateLabel: 'Buffer: Page Dirty',
            nodeType: 'decision',
            highlight: false,
            notes: 'ARIES recovery engine can roll back uncommitted work in event of a crash.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Commit Flush & Shrinking Phase Lock Release',
            description: 'Flushes WAL log records to durable disk storage. Releases all held locks, finalizing permanent state changes.',
            stateLabel: 'Commit: Durable & Released',
            nodeType: 'accept',
            highlight: true,
            notes: 'Durability satisfied: changes survive power failure.',
          },
        ],
        interactiveTips: [
          'Use the Database Query & Transaction Simulator below to execute concurrent locks and WAL commits.',
        ],
      };
    }

    // Default DBMS (SQL Query Optimization & B+ Tree Index Traversal)
    return {
      id: `vis-dbms-query-btree`,
      conceptId: concept?.id || 'db-concept-2',
      conceptTitle: 'SQL Query Execution & B+ Tree Index Traversal Flow',
      diagramType: 'flowchart',
      overview: 'Trace a SQL query from lexical parser AST through the Cost-Based Optimizer, navigating B+ Tree root to leaf page pointers.',
      analogy: 'Looking up a name in a card catalog: jumping directly to drawer "M" then card "Miller" instead of reading every card in the entire library.',
      narrationScript: 'When a database receives a SQL query, it parses syntax into a relational algebra tree. The cost optimizer compares table scans versus index seeks. A B+ Tree index navigates internal decision nodes by key comparison down to sorted leaf pages where record pointers are fetched in minimal disk I/Os.',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'SQL Parsing & Relational Algebra Tree Generation',
          description: 'Lexer and parser validate SQL syntax and generate Abstract Syntax Tree (AST) representing projections and filters.',
          stateLabel: 'Parser: AST Validated',
          nodeType: 'start',
          highlight: true,
          notes: 'Validates schema identifiers and column data types.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Cost-Based Optimizer Execution Plan Selection',
          description: 'Optimizer evaluates table statistics and determines B+ Tree index seek is O(log n) cheaper than full table scan.',
          stateLabel: 'Optimizer: Index Seek Plan',
          nodeType: 'process',
          highlight: false,
          notes: 'Cost models factor estimated disk block page reads and CPU comparisons.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'B+ Tree Internal Node Traversal',
          description: 'Compares search key against root and internal node split keys to descend to appropriate leaf node page.',
          stateLabel: 'B+ Tree: Root → Leaf Page',
          nodeType: 'decision',
          highlight: false,
          notes: 'High fanout (e.g. 500 keys/page) allows indexing millions of rows in 3-4 tree levels.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Leaf Page Record Fetch & Result Cursor Return',
          description: 'Inspects leaf page records, retrieves row pointer from buffer pool, and yields matching result tuples to client.',
          stateLabel: 'Result: Tuples Returned',
          nodeType: 'accept',
          highlight: true,
          notes: 'Completed in O(log_fanout N) disk block lookups.',
        },
      ],
      interactiveTips: [
        'Use the Query Simulator below to run Index Seeks vs Full Table Scans and inspect disk I/O costs.',
      ],
    };
  }

  // 6. Machine Learning visual lessons
  if (isMlTopic(topic)) {
    const cLower = conceptName.toLowerCase();
    if (cLower.includes('gradient') || cLower.includes('backprop') || cLower.includes('descent') || cLower.includes('optimiz')) {
      return {
        id: `vis-ml-gradient-descent`,
        conceptId: concept?.id || 'ml-concept-2',
        conceptTitle: 'Gradient Descent & Parameter Optimization Flow',
        diagramType: 'process',
        overview: 'Track parameter weights as they iteratively descend the loss surface gradient toward global or local loss minimization.',
        analogy: 'Hiker descending a misty valley: feeling slope steepness underfoot and taking small deliberate steps downhill until reaching the bottom.',
        narrationScript: 'Gradient descent minimizes the objective loss function. On each training iteration, the forward pass produces model predictions. The loss function quantifies error against ground truth targets. Backpropagation computes the gradient vector, and parameters step in the direction of steepest descent scaled by learning rate η.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Forward Pass & Prediction Evaluation: ŷ = f(X; W)',
            description: 'Feeds batch features into model, evaluates linear transformations and activations, producing prediction ŷ.',
            stateLabel: 'Forward: Predict ŷ',
            nodeType: 'start',
            highlight: true,
            notes: 'Matrix multiplications across layers in O(N·d) time.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Loss Function Error Computation: L(y, ŷ)',
            description: 'Calculates scalar loss penalty (e.g. Mean Squared Error or Binary Cross-Entropy) between prediction and true label.',
            stateLabel: 'Loss: L(y, ŷ)',
            nodeType: 'process',
            highlight: false,
            notes: 'Measures how far the current model configuration deviates from optimal performance.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Backpropagation Gradient Calculation: ∇_W L',
            description: 'Applies calculus chain rule backward through computational graph to compute partial derivatives ∂L/∂W.',
            stateLabel: 'Gradient: ∇_W L',
            nodeType: 'decision',
            highlight: false,
            notes: 'Gradient vector indicates direction of steepest loss increase.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Parameter Weight Update: W = W - η * ∇L',
            description: 'Adjusts parameter weights in negative gradient direction scaled by learning rate η, lowering total system loss.',
            stateLabel: 'Update: New Weights W',
            nodeType: 'accept',
            highlight: true,
            notes: 'Iterated across epochs until convergence criteria are met.',
          },
        ],
        interactiveTips: [
          'Use the ML Optimization Simulator below to adjust features, weights, and learning rate interactively.',
          'Watch the loss value decrease in real time as gradient steps execute.',
        ],
      };
    }

    // Default Machine Learning (Neural Forward Pass & Feature Transformation)
    return {
      id: `vis-ml-neural-forward`,
      conceptId: concept?.id || 'ml-concept-1',
      conceptTitle: 'Neural Network Forward Propagation & Activation Flow',
      diagramType: 'process',
      overview: 'Follow feature signals as they pass through input layers, compute weighted linear dot-products (W·x + b), and activate via non-linear ReLU functions.',
      analogy: 'A multi-tier decision committee: junior analysts summarize incoming raw metrics, pass condensed summaries to senior directors, who yield a final verdict.',
      narrationScript: 'Artificial neural networks compose nested non-linear transformations. Raw input feature vectors undergo dot-product multiplication with weight matrices plus bias offsets. The resulting pre-activation vector is passed through an activation function like ReLU, enabling the network to model complex non-linear boundaries.',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Input Layer Feature Feeding: X = [x₁, x₂]',
          description: 'Raw normalized continuous or one-hot categorical features are fed into input layer neuron nodes.',
          stateLabel: 'Layer: Input Features X',
          nodeType: 'start',
          highlight: true,
          notes: 'Feature scaling (z-score standardization) ensures balanced gradient flow.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Linear Transformation: z = W·X + b',
          description: 'Calculates weighted summation of inputs plus trainable bias scalar for each hidden neuron node.',
          stateLabel: 'Linear: z = W·X + b',
          nodeType: 'process',
          highlight: false,
          notes: 'Affine projection rotating and scaling the feature space.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Non-Linear Activation: a = max(0, z) [ReLU]',
          description: 'Passes pre-activation scalar z through Rectified Linear Unit (ReLU), suppressing negative values to introduce non-linearity.',
          stateLabel: 'Activation: ReLU(z)',
          nodeType: 'decision',
          highlight: false,
          notes: 'Without non-linear activations, multi-layer networks collapse to simple linear regression.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Output Layer Prediction & Probability Distribution',
          description: 'Applies output projection (Softmax or Sigmoid) producing class probabilities or continuous regression output ŷ.',
          stateLabel: 'Output: Prediction ŷ',
          nodeType: 'accept',
          highlight: true,
          notes: 'Prediction is ready for loss evaluation and downstream decision making.',
        },
      ],
      interactiveTips: [
        'Use the Neural Forward Pass simulator below to adjust input values x1, x2 and inspect layer activations.',
      ],
    };
  }

  // 7. Biology Topics Visual Lessons (Photosynthesis, Digestive System, Cell, General Biology)
  if (isBiologySubjectOrTopic(subject, topic)) {
    const tLower = topic.toLowerCase();
    const isPhotosynthesis = tLower.includes('photo') || tLower.includes('chloroplast') || tLower.includes('calvin') || tLower.includes('plant');
    const isDigestive = tLower.includes('digest') || tLower.includes('stomach') || tLower.includes('gut') || tLower.includes('intestine') || tLower.includes('enzyme');
    const isCell = tLower.includes('cell') || tLower.includes('organelle') || tLower.includes('membrane') || tLower.includes('mitochondria');

    if (isPhotosynthesis) {
      return {
        id: `vis-bio-photosynthesis`,
        conceptId: concept?.id || 'bio-photo-1',
        conceptTitle: 'Photosynthesis: Biological Energy Transformation & Cycle',
        diagramType: 'process',
        overview: 'Follow the natural biological process of photosynthesis from light absorption in thylakoid membranes to glucose synthesis in the chloroplast stroma.',
        analogy: 'A living solar-powered kitchen inside plant cells: chloroplasts capture sunlight to combine atmospheric carbon dioxide and water into nutritious sugars while releasing oxygen.',
        narrationScript: 'Photosynthesis begins when sunlight strikes chlorophyll pigments in the thylakoid membranes of chloroplasts. Water molecules are split to release oxygen, and the absorbed solar energy is converted into ATP and NADPH. These energy carriers move into the stroma, where the Calvin cycle fixes carbon dioxide into energy-rich glucose.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Sunlight Absorption by Chlorophyll',
            description: 'Chlorophyll pigments embedded in the thylakoid membrane absorb blue and red photons from sunlight, exciting electrons to higher energy levels.',
            stateLabel: 'Location: Thylakoid Membrane',
            nodeType: 'start',
            highlight: true,
            notes: 'Chlorophyll reflects green light (giving leaves their color) while absorbing blue and red photon wavelengths.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Photolysis: Water Splitting & Oxygen Release',
            description: 'The enzyme complex splits water molecules: 2H₂O → 4H⁺ + 4e⁻ + O₂. Protons accumulate in the thylakoid lumen while oxygen gas is released.',
            stateLabel: 'Reaction: Photolysis (H₂O Split)',
            nodeType: 'process',
            highlight: false,
            notes: 'Vital biological fact: The oxygen animals breathe comes from split water molecules, NOT from carbon dioxide.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'ATP & NADPH Energy Carrier Synthesis',
            description: 'Excited electrons pass through the electron transport chain, creating a proton gradient that drives ATP Synthase and generates NADPH.',
            stateLabel: 'Energy: ATP & NADPH Generated',
            nodeType: 'process',
            highlight: false,
            notes: 'These chemical energy carriers travel into the stroma to fuel the light-independent Calvin cycle.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Calvin Cycle & Carbon Dioxide Fixation',
            description: 'The enzyme RuBisCO in the chloroplast stroma captures atmospheric CO₂ entering through leaf stomata, initiating sugar assembly.',
            stateLabel: 'Location: Chloroplast Stroma',
            nodeType: 'decision',
            highlight: false,
            notes: 'RuBisCO is the most abundant enzyme on Earth, catalyzing the conversion of inorganic carbon into organic matter.',
          },
          {
            id: 'step-5',
            stepNumber: 5,
            title: 'Glucose Synthesis & Starch Storage',
            description: 'Triose phosphate (G3P) molecules combine to form glucose (C₆H₁₂O₆), fueling cellular respiration or stored as starch reserves.',
            stateLabel: 'Product: Glucose (C₆H₁₂O₆)',
            nodeType: 'accept',
            highlight: true,
            notes: 'Synthesized glucose forms cellulose for plant cell walls and starch for metabolic nourishment.',
          },
        ],
        interactiveTips: [
          'Notice how photosynthesis is divided into two compartmentalized stages: light reactions in the thylakoid membranes, and sugar synthesis in the stroma.',
          'Explore the interactive biological factors below to see how light intensity and CO₂ levels affect glucose output.',
        ],
      };
    } else if (isDigestive) {
      return {
        id: `vis-bio-digestive`,
        conceptId: concept?.id || 'bio-dig-1',
        conceptTitle: 'Human Digestive Tract: Food Journey & Nutrient Absorption',
        diagramType: 'process',
        overview: 'Follow dietary food along the gastrointestinal tract as mechanical chewing, stomach acid, and intestinal enzymes dismantle macromolecules for villi absorption.',
        analogy: 'A biological disassembly line where each organ station performs specialized chemical or mechanical processing.',
        narrationScript: 'Digestion begins in the mouth with chewing and salivary amylase. Food travels down the esophagus via peristaltic waves into the stomach, where hydrochloric acid and pepsin churn it into chyme. In the small intestine, liver bile and pancreatic enzymes complete digestion, allowing microscopic villi to absorb nutrients into the bloodstream before the colon reclaims water.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Mouth: Mechanical Mastication & Salivary Amylase',
            description: 'Teeth grind food into smaller particles while saliva moistens the bolus and salivary amylase begins polysaccharide digestion.',
            stateLabel: 'Organ: Oral Cavity',
            nodeType: 'start',
            highlight: true,
            notes: 'Mechanical digestion dramatically increases the surface area for subsequent enzyme action.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Esophagus: Peristaltic Muscular Transit',
            description: 'Involuntary smooth muscle contractions (peristalsis) push the food bolus down past the lower esophageal sphincter.',
            stateLabel: 'Organ: Esophagus',
            nodeType: 'process',
            highlight: false,
            notes: 'Peristalsis is strong enough to transport food even when inverted.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Stomach: Gastric Acid Churning & Pepsin Proteolysis',
            description: 'Hydrochloric acid (pH 1.5-2.0) kills pathogens and activates pepsin, which hydrolyzes dietary proteins into polypeptides.',
            stateLabel: 'Organ: Stomach (Acidic Chyme)',
            nodeType: 'process',
            highlight: false,
            notes: 'Goblet cells secrete a thick alkaline mucus layer protecting the stomach wall from autodigestion.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Duodenum: Bile Emulsification & Pancreatic Enzymes',
            description: 'Liver bile salts emulsify fat droplets while pancreatic juice neutralizes acid and delivers lipase, amylase, and trypsin.',
            stateLabel: 'Organ: Duodenum & Liver/Pancreas',
            nodeType: 'decision',
            highlight: false,
            notes: 'Bile breaks large hydrophobic fat globules into tiny micelles, expanding surface area for lipase.',
          },
          {
            id: 'step-5',
            stepNumber: 5,
            title: 'Small Intestine: Villi & Microvilli Nutrient Absorption',
            description: 'Millions of villi and microvilli absorb monosaccharides, amino acids, and fatty acids into blood capillaries and lymphatic lacteals.',
            stateLabel: 'Organ: Small Intestine (Villi)',
            nodeType: 'process',
            highlight: false,
            notes: 'Villi and microvilli expand internal surface area over 600-fold to roughly the area of a tennis court.',
          },
          {
            id: 'step-6',
            stepNumber: 6,
            title: 'Large Intestine: Water Reabsorption & Elimination',
            description: 'The colon reclaims water and electrolytes from indigestible remnants, while gut bacteria synthesize vitamins K and B.',
            stateLabel: 'Organ: Colon & Rectum',
            nodeType: 'accept',
            highlight: true,
            notes: 'Over 90% of water passing through the GI tract is reclaimed to maintain systemic hydration.',
          },
        ],
        interactiveTips: [
          'Trace the shift in pH: neutral in the mouth (~7), highly acidic in the stomach (~2), and slightly alkaline in the duodenum (~8).',
          'Notice how accessory organs (liver, gallbladder, pancreas) connect to the duodenum rather than having food pass directly through them.',
        ],
      };
    } else if (isCell) {
      return {
        id: `vis-bio-cell`,
        conceptId: concept?.id || 'bio-cell-1',
        conceptTitle: 'Living Cell Architecture & Organelle Collaboration',
        diagramType: 'process',
        overview: 'Explore how organelles collaborate to sustain cellular life: from the nucleus instruction center to mitochondrial energy plants and Golgi packaging.',
        analogy: 'A bustling micro-metropolis where each organelle operates as a specialized municipal facility.',
        narrationScript: 'Eukaryotic cells are organized into specialized membrane-bound organelles. The nucleus houses the genetic instruction manual, ribosomes and endoplasmic reticulum synthesize proteins, mitochondria generate ATP energy, and the Golgi apparatus sorts and packages molecular cargo.',
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Plasma Membrane: Selective Barrier & Transport',
            description: 'Phospholipid bilayer with embedded proteins controlling diffusion, osmosis, and active transport of nutrients.',
            stateLabel: 'Structure: Plasma Membrane',
            nodeType: 'start',
            highlight: true,
            notes: 'Hydrophobic core prevents free passage of polar molecules and ions without transporter proteins.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Nucleus: Genetic Blueprint & mRNA Transcription',
            description: 'Stores genomic DNA and transcribes instructions into messenger RNA (mRNA) transcripts dispatched through nuclear pores.',
            stateLabel: 'Structure: Nucleus & Nucleolus',
            nodeType: 'process',
            highlight: false,
            notes: 'The nucleolus synthesizes ribosomal RNA (rRNA) and assembles ribosome subunits.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Ribosomes & Rough ER: Polypeptide Translation & Folding',
            description: 'Ribosomes translate mRNA sequences into amino acid chains, which fold into 3D conformations within the rough ER lumen.',
            stateLabel: 'Structure: Ribosomes & Rough ER',
            nodeType: 'process',
            highlight: false,
            notes: 'Chaperone proteins assist in folding nascent polypeptides into correct tertiary shapes.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Mitochondria: Cellular Respiration & ATP Energy',
            description: 'Inner cristae host the electron transport chain and ATP Synthase, burning glucose products with oxygen to synthesize ATP.',
            stateLabel: 'Structure: Mitochondria (ATP Plant)',
            nodeType: 'decision',
            highlight: false,
            notes: 'Mitochondria contain their own circular DNA and replicate independently within the cell.',
          },
          {
            id: 'step-5',
            stepNumber: 5,
            title: 'Golgi Apparatus: Molecular Sorting & Vesicle Secretion',
            description: 'Cisternae modify, sort, and tag proteins with carbohydrates before dispatching vesicles to lysosomes or the cell membrane.',
            stateLabel: 'Structure: Golgi Complex',
            nodeType: 'accept',
            highlight: true,
            notes: 'Vesicles fuse with the plasma membrane during exocytosis to release hormones and enzymes.',
          },
        ],
        interactiveTips: [
          'Click on each organelle in the inspector below to learn its biological structure and physiological function.',
        ],
      };
    } else {
      // General Biology Visual Lesson
      return {
        id: `vis-bio-general-${Date.now()}`,
        conceptId: concept?.id || 'bio-gen-1',
        conceptTitle: `${conceptName}: Biological Process & Structure Flow`,
        diagramType: 'process',
        overview: `Biological breakdown of ${conceptName}, illustrating how living structures, cellular locations, and biochemical pathways interact in ${subject}.`,
        analogy: `Think of this like an interconnected living ecosystem where each anatomical or cellular component maintains homeostatic balance.`,
        narrationScript: `Welcome to this biological walkthrough of ${conceptName}. Follow each biological stage as living structures and biochemical processes interact to maintain homeostasis and function in ${subject}.`,
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Biological Structure & Anatomical Location',
            description: `Identifies the living tissues, cells, or organelles where ${conceptName} takes place under physiological conditions.`,
            stateLabel: 'Stage 1: Cellular / Tissue Location',
            nodeType: 'start',
            highlight: true,
            notes: `Anatomical and structural foundation for ${topic}.`,
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Physiological Trigger & Molecular Activation',
            description: `Biological signals, hormones, or substrate availability that stimulate the onset of ${conceptName}.`,
            stateLabel: 'Stage 2: Biological Trigger',
            nodeType: 'process',
            highlight: false,
            notes: `Enzymatic activation and cellular signaling in living organisms.`,
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Biochemical Reaction Pathway & Cellular Interaction',
            description: `Sequential biochemical steps and molecular transformations executing the core biological function.`,
            stateLabel: 'Stage 3: Biochemical Mechanism',
            nodeType: 'decision',
            highlight: false,
            notes: 'Enzyme-catalyzed pathway maintaining cellular homeostasis.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Homeostatic Outcome & Biological Significance',
            description: `Delivers the physiological product, regulatory balance, and vital energy essential for organism survival.`,
            stateLabel: 'Stage 4: Physiological Outcome',
            nodeType: 'accept',
            highlight: true,
            notes: `Homeostatic equilibrium achieved in ${subject}.`,
          },
        ],
        interactiveTips: [
          'Review the biological stages above to understand the physiological mechanism before testing your knowledge.',
          'Notice how biological processes rely on compartmentalized cellular structures and enzyme catalysts.',
        ],
      };
    }
  }

  // 8. Physics Topics Visual Lessons
  if (isPhysicsSubjectOrTopic(subject, topic)) {
    return {
      id: `vis-phys-force-motion`,
      conceptId: concept?.id || 'phys-concept-1',
      conceptTitle: `${conceptName}: Physical Principles & Dynamic Force Resolution`,
      diagramType: 'process',
      overview: `Physical breakdown of ${conceptName}, illustrating vector forces, reference frames, governing equations, and kinematic outcomes.`,
      analogy: `A mechanical balance where every vector force contributes to the net acceleration of the physical system.`,
      narrationScript: `Welcome to this physics walkthrough of ${conceptName}. Observe how external forces interact according to physical laws to produce measurable acceleration and kinematic motion.`,
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Physical System Definition & Reference Frame',
          description: 'Isolate the physical body, define coordinate axes, and identify initial velocity and position.',
          stateLabel: 'Physical Frame: Coordinate Axes',
          nodeType: 'start',
          highlight: true,
          notes: 'Establishing an inertial reference frame is essential for applying Newton\'s laws.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Free-Body Diagram & Force Vector Resolution',
          description: 'Identify all contact forces (normal, friction, tension) and field forces (gravity), resolving into x and y vector components.',
          stateLabel: 'Vector Sum: ΣF_x and ΣF_y',
          nodeType: 'process',
          highlight: false,
          notes: 'Forces acting ON the isolated body are summed using vector superposition.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Governing Law Application: ΣF = m × a',
          description: 'Apply Newton\'s Second Law or conservation of energy/momentum to set up dynamical algebraic equations.',
          stateLabel: 'Equation: F_net = m·a',
          nodeType: 'decision',
          highlight: false,
          notes: 'Acceleration vector directly matches the direction of the net resultant force.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Kinematic Resolution & Real-World Result',
          description: 'Solve for target unknowns (acceleration, velocity, trajectory) with proper SI dimensional units (Newtons, m/s²).',
          stateLabel: 'Outcome: Motion with SI Units',
          nodeType: 'accept',
          highlight: true,
          notes: 'Verified result consistent with dimensional analysis.',
        },
      ],
      interactiveTips: [
        'Use the Force & Motion Simulator below to test different mass and force values interactively.',
      ],
    };
  }

  // 9. Chemistry Topics Visual Lessons
  if (isChemistrySubjectOrTopic(subject, topic)) {
    return {
      id: `vis-chem-reaction`,
      conceptId: concept?.id || 'chem-concept-1',
      conceptTitle: `${conceptName}: Chemical Bonding & Molecular Transformation`,
      diagramType: 'process',
      overview: `Molecular breakdown of ${conceptName}, illustrating valence electron interactions, electronegativity gradients, and chemical bond formation.`,
      analogy: `Atoms seeking thermodynamic stability by reorganizing valence electron shells to reach a lower potential energy state.`,
      narrationScript: `Welcome to this chemistry walkthrough of ${conceptName}. Follow valence electrons as atoms interact, overcome activation energy barriers, and form stable chemical bonds.`,
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Atomic Structure & Valence Electron Shells',
          description: 'Examine electron configurations and outermost valence shell electrons seeking stable octet arrangements.',
          stateLabel: 'Shells: Valence Electrons',
          nodeType: 'start',
          highlight: true,
          notes: 'The number of valence electrons determines chemical reactivity and valence capacity.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Electronegativity Differential & Reaction Conditions',
          description: 'Assess the electronegativity difference (ΔEN) and thermal activation energy required to initiate bonding or reaction.',
          stateLabel: 'Condition: ΔEN & Activation Energy',
          nodeType: 'process',
          highlight: false,
          notes: 'ΔEN > 2.0 favors ionic transfer; ΔEN < 1.7 favors covalent orbital sharing.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Transition State & Chemical Bond Rearrangement',
          description: 'Electrons transfer (ionic) or molecular orbitals overlap (covalent) at peak activation energy.',
          stateLabel: 'Transition: Bond Formation',
          nodeType: 'decision',
          highlight: false,
          notes: 'Bond formation is exothermic, releasing bond dissociation energy.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Molecular Product Stability & Lower Potential Energy',
          description: 'Formed compounds achieve stable octet structures and lowest thermodynamic potential energy.',
          stateLabel: 'Product: Stable Compound',
          nodeType: 'accept',
          highlight: true,
          notes: 'Stable chemical equilibrium achieved according to stoichiometric ratios.',
        },
      ],
      interactiveTips: [
        'Explore the chemical bonding visualizer below to see how electron sharing and transfer create molecular geometry.',
      ],
    };
  }

  // 10. Probability & Statistics Visual Lessons
  if (isProbStatSubjectOrTopic(subject, topic)) {
    const tLower = (topic || '').toLowerCase();
    const cLower = (conceptName || '').toLowerCase();
    const isMean = tLower.includes('mean') || tLower.includes('average') || tLower.includes('median') || tLower.includes('mode') || cLower.includes('mean') || cLower.includes('average');
    const isStdDev = tLower.includes('deviation') || tLower.includes('variance') || tLower.includes('spread') || cLower.includes('deviation') || cLower.includes('variance');

    if (isMean) {
      return {
        id: `vis-stat-mean`,
        conceptId: concept?.id || 'stat-concept-mean',
        conceptTitle: `${conceptName}: Step-by-Step Calculation & Balance Point`,
        diagramType: 'process',
        overview: `Visual mathematical breakdown showing how individual observations combine to produce the central arithmetic mean balance point.`,
        analogy: `A physical seesaw or fulcrum: the arithmetic mean is the exact pivot point where positive and negative distances balance each other to zero.`,
        narrationScript: `To find the mean, collect the raw observations, sum them together, divide by the count N, and interpret the resulting average as the central balance point.`,
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Identify Observations & Sample Size N',
            description: 'Record each data observation in the sample. For example, exam marks = [10, 20, 30, 40, 50], giving a total count of N = 5.',
            stateLabel: '1. Data: [10, 20, 30, 40, 50] (N = 5)',
            nodeType: 'start',
            highlight: true,
            notes: 'Each observation xᵢ contributes equally to the arithmetic mean.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Sum All Observations: Σ xᵢ',
            description: 'Add all values together: 10 + 20 + 30 + 40 + 50 = 150. This represents the total cumulative aggregate.',
            stateLabel: '2. Sum: Σ xᵢ = 150',
            nodeType: 'process',
            highlight: false,
            notes: 'The numerator of the arithmetic mean formula.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Divide Sum by Count: μ = Σ xᵢ / N',
            description: 'Execute the division: Mean = 150 / 5 = 30. The resulting mean is expressed in the exact same units as the original observations.',
            stateLabel: '3. Mean Formula: 150 / 5 = 30',
            nodeType: 'process',
            highlight: false,
            notes: 'Formula: Mean (μ) = Sum of observations / Number of observations.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Statistical Interpretation as Balance Point',
            description: 'Verify deviations from the mean: (10-30) + (20-30) + (30-30) + (40-30) + (50-30) = -20 - 10 + 0 + 10 + 20 = 0. The mean acts as the true equilibrium center.',
            stateLabel: '4. Balance Point: μ = 30',
            nodeType: 'accept',
            highlight: true,
            notes: 'The algebraic property Σ(xᵢ - μ) = 0 proves the mean is the center of gravity.',
          },
        ],
        interactiveTips: [
          'Use the Probability & Statistics Lab below to test different datasets and see how the mean shifts dynamically.',
        ],
      };
    }

    if (isStdDev) {
      return {
        id: `vis-stat-std`,
        conceptId: concept?.id || 'stat-concept-std',
        conceptTitle: `${conceptName}: Step-by-Step Spread & Variance Calculation`,
        diagramType: 'process',
        overview: `Visual mathematical workflow for measuring data spread, computing deviations from the mean, squaring to eliminate negatives, and finding standard deviation.`,
        analogy: `Measuring how spread out runners are from the pace car: if runners stay close together, standard deviation is tiny; if they string out across miles, standard deviation is large.`,
        narrationScript: `Standard deviation measures spread. First calculate the mean, compute each deviation (x - μ), square each difference, average them to get variance, and take the square root.`,
        steps: [
          {
            id: 'step-1',
            stepNumber: 1,
            title: 'Calculate Baseline Mean (μ)',
            description: 'Determine the center average μ = Σx / N to serve as the benchmark for spread. For dataset [10, 20, 30, 40, 50], mean μ = 150 / 5 = 30.',
            stateLabel: '1. Baseline Mean: μ = 30',
            nodeType: 'start',
            highlight: true,
            notes: 'Spread cannot be measured without first identifying the central benchmark.',
          },
          {
            id: 'step-2',
            stepNumber: 2,
            title: 'Compute Deviations: (xᵢ - μ)',
            description: 'Subtract the mean from each value: 10-30 = -20, 20-30 = -10, 30-30 = 0, 40-30 = 10, 50-30 = 20.',
            stateLabel: '2. Deviations: {-20, -10, 0, +10, +20}',
            nodeType: 'process',
            highlight: false,
            notes: 'Raw deviations sum to zero, which is why squaring is mathematically necessary.',
          },
          {
            id: 'step-3',
            stepNumber: 3,
            title: 'Square Deviations & Average (Variance: σ²)',
            description: 'Square each deviation (400, 100, 0, 100, 400), sum them (1000), and divide by N: Variance σ² = 1000 / 5 = 200.',
            stateLabel: '3. Variance: σ² = 1000 / 5 = 200',
            nodeType: 'process',
            highlight: false,
            notes: 'Squaring eliminates negative signs and heavily penalizes large outliers.',
          },
          {
            id: 'step-4',
            stepNumber: 4,
            title: 'Take Square Root for Standard Deviation: σ = √σ²',
            description: 'Take the square root of variance: σ = √200 ≈ 14.14 marks. This measures the typical distance observations lie from the average.',
            stateLabel: '4. Standard Deviation: σ ≈ 14.14',
            nodeType: 'accept',
            highlight: true,
            notes: 'Under normal distribution, ~68% of observations fall within μ ± 1σ [15.86, 44.14].',
          },
        ],
        interactiveTips: [
          'Explore the interactive statistics visualizer below to inspect individual squared deviations.',
        ],
      };
    }

    // Default Probability Visual Lesson
    return {
      id: `vis-prob-event`,
      conceptId: concept?.id || 'prob-concept-1',
      conceptTitle: `${conceptName}: Sample Space & Probability Calculation`,
      diagramType: 'process',
      overview: `Visual mathematical breakdown showing random trials, sample spaces, favorable outcomes, and probability ratios.`,
      analogy: `Spinning a fair prize wheel: the probability of winning is the fraction of total equal-sized wheel slices that contain a prize.`,
      narrationScript: `Probability measures how likely an event is to happen. Identify the complete sample space S, count the favorable outcomes in event E, and compute the ratio P(E) = n(E) / n(S).`,
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Define Random Trial & Sample Space S',
          description: 'Identify all mutually exclusive, exhaustive outcomes. For rolling a fair 6-sided die: S = {1, 2, 3, 4, 5, 6}, so total outcomes n(S) = 6.',
          stateLabel: '1. Sample Space: S = {1, 2, 3, 4, 5, 6}',
          nodeType: 'start',
          highlight: true,
          notes: 'Every possible outcome must be accounted for in the sample space.',
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: 'Isolate Favorable Event Subset E ⊆ S',
          description: 'Define the target event. For rolling a 4: favorable outcome E = {4}, with count n(E) = 1. For rolling an even number: E = {2, 4, 6}, count n(E) = 3.',
          stateLabel: '2. Favorable Event: E = {4}',
          nodeType: 'process',
          highlight: false,
          notes: 'An event is any mathematical subset of the sample space S.',
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Compute Probability Ratio: P(E) = n(E) / n(S)',
          description: 'Divide favorable outcomes by total possible outcomes: P(4) = 1 / 6 ≈ 0.1667 (16.67%). Probability must lie strictly between 0 and 1.',
          stateLabel: '3. Probability: P(4) = 1/6 ≈ 16.7%',
          nodeType: 'process',
          highlight: false,
          notes: 'P = 0 denotes an impossible event; P = 1 denotes a certain event.',
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Interpret Likelihood & Complement Rule',
          description: 'In repeated trials, we expect the event in 1 out of 6 rolls. By the complement rule, probability of NOT rolling a 4 is P(not 4) = 1 - 1/6 = 5/6 (83.33%).',
          stateLabel: '4. Likelihood & Complement: 5/6',
          nodeType: 'accept',
          highlight: true,
          notes: 'Long-term frequency converges to theoretical probability by the Law of Large Numbers.',
        },
      ],
      interactiveTips: [
        'Roll the interactive die in the simulator below to compare experimental frequency with theoretical probability.',
      ],
    };
  }

  // 11. General / Customized topic fallback strictly based on selected topic
  const isTechOrCS = subject.toLowerCase().includes('comp') || subject.toLowerCase().includes('soft') || subject.toLowerCase().includes('engine');
  return {
    id: `vis-${concept?.id || 'gen'}-${Date.now()}`,
    conceptId: concept?.id || 'concept-custom',
    conceptTitle: `${conceptName} Step-by-Step Flow`,
    diagramType: 'process',
    overview: `Interactive visual walkthrough explaining how ${conceptName} operates within ${topic}.`,
    analogy: `Think of this like an ordered progression where each step builds systematically toward deep conceptual understanding in ${topic}.`,
    narrationScript: `Welcome to this visual walkthrough of ${conceptName}. Follow each step as fundamental principles of ${subject} guide the progression.`,
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: isTechOrCS ? 'Initial State & Input Setup' : 'Foundational Concept & Baseline Definition',
        description: `Establishes core definitions, starting conditions, and baseline variables for ${conceptName}.`,
        stateLabel: isTechOrCS ? 'Step 1: Input Setup' : 'Step 1: Core Concept',
        nodeType: 'start',
        highlight: true,
        notes: `Pre-conditions and baseline context for ${topic}.`,
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: isTechOrCS ? 'Governing Rule Evaluation & Processing' : 'Core Mechanism & Principle Application',
        description: `Applies core operational mechanisms and governing principles of ${topic}.`,
        stateLabel: isTechOrCS ? 'Step 2: Processing' : 'Step 2: Core Mechanism',
        nodeType: 'process',
        highlight: false,
        notes: `Operational transformation cycle in ${subject}.`,
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: isTechOrCS ? 'State Mutation & Invariant Verification' : 'Step-by-Step Analysis & Application',
        description: `Analyzes intermediate relationships, operations, and application criteria for ${conceptName}.`,
        stateLabel: isTechOrCS ? 'Step 3: Verification' : 'Step 3: Applied Analysis',
        nodeType: isTechOrCS ? 'decision' : 'process',
        highlight: false,
        notes: `Verifies relationships and operational criteria.`,
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: isTechOrCS ? 'Final Outcome & Verified Output' : 'Key Findings & Real-World Understanding',
        description: `Delivers the verified conclusion and real-world understanding for ${conceptName}.`,
        stateLabel: isTechOrCS ? 'Step 4: Output' : 'Step 4: Summary & Takeaways',
        nodeType: isTechOrCS ? 'accept' : 'process',
        highlight: true,
        notes: `Milestone objective achieved in ${topic}.`,
      },
    ],
    interactiveTips: [
      `Review each phase to build deep conceptual intuition before taking the practice quiz.`,
    ],
  };
}

/**
 * Generate a tailored 5-question conceptual quiz strictly for the selected concept and topic
 */
export function createQuizForConcept(
  concept: MaterialConcept | null | undefined,
  topic: string,
  subject: string
): QuizAssessment {
  const conceptTitle = concept?.name || topic;
  const isAutomata = isAutomataTopic(topic) || isAutomataTopic(conceptTitle);

  let questions: QuizQuestion[] = [];

  if (isAutomata) {
    questions = [
      {
        id: 'fa-q-1',
        question: 'Which of the following correctly defines the formal 5-tuple of a Deterministic Finite Automaton (DFA)?',
        options: [
          'M = (Q, Σ, δ, q₀, F) where δ: Q × Σ → Q',
          'M = (Q, Σ, δ, q₀, F) where δ: Q × Σ → 2^Q',
          'M = (V, Σ, R, S) where R is a set of production rules',
          'M = (Q, Σ, Γ, δ, q₀, z₀, F) where Γ is a stack alphabet',
        ],
        correctAnswerIndex: 0,
        explanation: 'A DFA is formally defined as the 5-tuple (Q, Σ, δ, q₀, F), where δ: Q × Σ → Q is a total transition function mapping each state and alphabet symbol to exactly one state.',
        conceptTested: 'DFA 5-Tuple Definition',
        difficulty: 'easy',
      },
      {
        id: 'fa-q-2',
        question: 'What is the fundamental difference between a DFA and an NFA in how transitions are defined?',
        options: [
          'DFAs have infinite states, while NFAs have a strictly finite number of states.',
          'In a DFA, δ(q, a) yields exactly one destination state; in an NFA, δ(q, a) yields a subset of states in 2^Q and can include ε-moves.',
          'NFAs can recognize non-regular context-free languages, whereas DFAs cannot.',
          'DFAs do not possess accepting states, whereas NFAs require multiple start states.',
        ],
        correctAnswerIndex: 1,
        explanation: 'In a DFA, transitions are strictly single-valued (δ: Q × Σ → Q). In an NFA, transitions map to a powerset (δ: Q × (Σ ∪ {ε}) → 2^Q), allowing multiple simultaneous states and spontaneous ε-transitions.',
        conceptTested: 'DFA vs NFA Transition Mechanics',
        difficulty: 'medium',
      },
      {
        id: 'fa-q-3',
        question: 'What is the function of a "Dead State" (or Trap State) in a Deterministic Finite Automaton?',
        options: [
          'It reboots the machine back to the start state q₀ whenever an error occurs.',
          'It is a non-accepting state with self-loops on all symbols, from which an accepting state can never be reached.',
          'It is an accepting state that terminates computation before reading the entire tape.',
          'It temporarily stores symbols in an internal queue for later processing.',
        ],
        correctAnswerIndex: 1,
        explanation: 'A dead state is a non-accepting state where, once entered, all input symbols self-loop back to the dead state. It ensures the transition function δ remains total when an input prefix can never lead to a valid string.',
        conceptTested: 'Dead & Trap State Handling',
        difficulty: 'medium',
      },
      {
        id: 'fa-q-4',
        question: 'For an alphabet Σ = {0, 1}, when is an input string w considered accepted by a DFA M = (Q, Σ, δ, q₀, F)?',
        options: [
          'If the machine visits an accepting state at least once during execution.',
          'If the extended transition function yields an accepting state after processing the entire string: δ̂(q₀, w) ∈ F.',
          'If the string contains an even number of 0s regardless of the final state.',
          'If the tape head reaches the end of input without hitting a dead state, even if the final state is in Q \\ F.',
        ],
        correctAnswerIndex: 1,
        explanation: 'A string w is accepted if and only if the automaton finishes reading the entire string and lands in an accepting state belonging to F: δ̂(q₀, w) ∈ F.',
        conceptTested: 'String Acceptance Criteria',
        difficulty: 'easy',
      },
      {
        id: 'fa-q-5',
        question: 'If an NFA has n states, what is the theoretical maximum number of states in the equivalent DFA produced by Subset Construction?',
        options: [
          'n²',
          '2ⁿ',
          'n!',
          '2n + 1',
        ],
        correctAnswerIndex: 1,
        explanation: 'During powerset / subset construction, each state of the DFA corresponds to a subset of states from the NFA. Since a set with n elements has 2ⁿ subsets, the DFA can have at most 2ⁿ states in the worst case.',
        conceptTested: 'Subset Construction & State Complexity',
        difficulty: 'hard',
      },
    ];
  } else if (isBiologySubjectOrTopic(subject, topic)) {
    const tLower = topic.toLowerCase();
    const isPhotosynthesis = tLower.includes('photo') || tLower.includes('chloroplast') || tLower.includes('calvin') || tLower.includes('plant');
    const isDigestive = tLower.includes('digest') || tLower.includes('stomach') || tLower.includes('gut') || tLower.includes('intestine') || tLower.includes('enzyme');

    if (isPhotosynthesis) {
      questions = [
        {
          id: `bio-q-1`,
          question: 'Where do the light-dependent reactions of photosynthesis specifically take place?',
          options: [
            'Across the thylakoid membranes inside chloroplasts',
            'Freely floating in the stroma liquid matrix',
            'Inside the central cell vacuole',
            'Along the outer cellulose plant cell wall',
          ],
          correctAnswerIndex: 0,
          explanation: 'Chlorophyll pigments and electron transport chains are embedded in the thylakoid membranes, where sunlight is captured and water is split.',
          conceptTested: 'Chloroplast Anatomy & Light Reaction Site',
          difficulty: 'easy',
        },
        {
          id: `bio-q-2`,
          question: 'During the light reactions, photolysis splits water (H₂O). What vital gas is released into the atmosphere as a byproduct?',
          options: [
            'Oxygen gas (O₂)',
            'Carbon dioxide (CO₂)',
            'Nitrogen gas (N₂)',
            'Methane gas (CH₄)',
          ],
          correctAnswerIndex: 0,
          explanation: 'Photolysis splits 2H₂O into 4H⁺ + 4e⁻ + O₂. The oxygen we breathe comes directly from water splitting, not from carbon dioxide.',
          conceptTested: 'Photolysis Mechanism & Byproducts',
          difficulty: 'easy',
        },
        {
          id: `bio-q-3`,
          question: 'What is the primary function of the enzyme RuBisCO in the chloroplast stroma?',
          options: [
            'It fixes atmospheric carbon dioxide (CO₂) to RuBP to initiate the Calvin cycle',
            'It absorbs green wavelengths of sunlight to heat the leaf',
            'It breaks down glucose to produce ATP during the night',
            'It pumps water from the roots to the leaf stomata',
          ],
          correctAnswerIndex: 0,
          explanation: 'RuBisCO is the principal carbon-fixing enzyme on Earth, catalyzing the first critical step of the Calvin cycle in the stroma.',
          conceptTested: 'Enzyme Catalysis in the Calvin Cycle',
          difficulty: 'medium',
        },
        {
          id: `bio-q-4`,
          question: 'Which chemical energy carriers synthesized during light reactions fuel the dark reactions (Calvin cycle)?',
          options: [
            'ATP and NADPH',
            'Hemoglobin and Myoglobin',
            'Glucose and Sucrose',
            'DNA and RNA polymerase',
          ],
          correctAnswerIndex: 0,
          explanation: 'Photophosphorylation generates ATP and NADP⁺ reduction yields NADPH, providing the chemical energy and reducing power to assemble glucose.',
          conceptTested: 'Energy Carrier Coupling in Photosynthesis',
          difficulty: 'medium',
        },
        {
          id: `bio-q-5`,
          question: 'Why is photosynthesis considered the ecological foundation for almost all living food chains on Earth?',
          options: [
            'Autotrophs convert solar energy into organic chemical energy (glucose), supplying primary consumers and replenishing atmospheric oxygen',
            'It eliminates all greenhouse gases permanently from the planetary atmosphere',
            'It converts soil minerals directly into heat energy without needing water',
            'It prevents plants from ever needing cellular respiration',
          ],
          correctAnswerIndex: 0,
          explanation: 'Photosynthesis forms the base of the ecological trophic pyramid, converting abiotic solar energy into biologically usable food.',
          conceptTested: 'Ecological Importance & Global Energy Flow',
          difficulty: 'hard',
        },
      ];
    } else if (isDigestive) {
      questions = [
        {
          id: `bio-dig-q-1`,
          question: 'Which digestive enzyme present in saliva begins the chemical breakdown of dietary carbohydrates in the mouth?',
          options: [
            'Salivary Amylase',
            'Pepsin',
            'Pancreatic Lipase',
            'Trypsin',
          ],
          correctAnswerIndex: 0,
          explanation: 'Salivary amylase breaks starch polysaccharides down into maltose and smaller oligosaccharides in the neutral pH of the oral cavity.',
          conceptTested: 'Oral Digestion & Salivary Enzymes',
          difficulty: 'easy',
        },
        {
          id: `bio-dig-q-2`,
          question: 'What creates the strongly acidic environment (pH 1.5-2.0) in the stomach essential for activating pepsin?',
          options: [
            'Hydrochloric acid (HCl) secreted by gastric parietal cells',
            'Bile salts secreted by the liver',
            'Sodium bicarbonate secreted by the pancreas',
            'Lactic acid produced by gut bacteria',
          ],
          correctAnswerIndex: 0,
          explanation: 'Gastric parietal cells pump hydrochloric acid into the stomach lumen, creating the low pH required to activate pepsinogen into active pepsin.',
          conceptTested: 'Gastric Acid Secretion & Proteolysis',
          difficulty: 'medium',
        },
        {
          id: `bio-dig-q-3`,
          question: 'How do microscopic villi and microvilli lining the small intestine maximize nutrient absorption?',
          options: [
            'By expanding the internal surface area over 600-fold (~250 m²) for nutrient diffusion and active transport',
            'By providing muscular force for churning chyme',
            'By filtering whole blood directly into the stool',
            'By secreting concentrated hydrochloric acid into the duodenum',
          ],
          correctAnswerIndex: 0,
          explanation: 'Villi and microvilli create a massive brush border surface area roughly equivalent to a tennis court, allowing rapid nutrient uptake.',
          conceptTested: 'Villi Anatomy & Nutrient Absorption',
          difficulty: 'medium',
        },
        {
          id: `bio-dig-q-4`,
          question: 'What is the critical physiological role of bile synthesized by the liver and stored in the gallbladder?',
          options: [
            'To emulsify large hydrophobic fat globules into microscopic micelles for lipase digestion',
            'To digest complex proteins into individual amino acids',
            'To neutralize intestinal enzymes before food reaches the colon',
            'To reabsorb water in the esophagus',
          ],
          correctAnswerIndex: 0,
          explanation: 'Bile salts act like detergents to emulsify fats, greatly increasing the lipid surface area available for pancreatic lipase action.',
          conceptTested: 'Bile Emulsification & Lipid Digestion',
          difficulty: 'medium',
        },
        {
          id: `bio-dig-q-5`,
          question: 'Which physiological function is primarily carried out by the large intestine (colon)?',
          options: [
            'Reabsorbing water and electrolytes to prevent dehydration while compacting solid waste',
            'Absorbing the majority of dietary amino acids and glucose',
            'Secreting pepsin and hydrochloric acid to denature proteins',
            'Emulsifying dietary cholesterol using bile salts',
          ],
          correctAnswerIndex: 0,
          explanation: 'The colon reclaims approximately 90% of water from intestinal fluids, preventing severe dehydration and forming solid stool.',
          conceptTested: 'Colon Function & Systemic Fluid Balance',
          difficulty: 'hard',
        },
      ];
    } else {
      // General Biology questions
      questions = [
        {
          id: `bio-gen-q-1`,
          question: `In living organisms, what determines where ${conceptTitle} takes place?`,
          options: [
            `The presence of specialized cellular structures, tissues, or organelles adapted for that function.`,
            `Random dispersion across all cells without structural organization.`,
            `Absence of enzymes and biochemical catalysts.`,
            `The complete isolation of the cell from all external nutrients.`,
          ],
          correctAnswerIndex: 0,
          explanation: `Biological processes occur in specialized anatomical sites or organelles possessing the appropriate enzymes and membranes.`,
          conceptTested: `Cellular Organization & Location of ${conceptTitle}`,
          difficulty: 'easy',
        },
        {
          id: `bio-gen-q-2`,
          question: `How do biological enzymes and catalysts facilitate ${conceptTitle}?`,
          options: [
            `By lowering the activation energy required for biochemical reactions to proceed at body temperature.`,
            `By being consumed and destroyed during the reaction.`,
            `By permanently stopping all physiological feedback loops.`,
            `By reversing the laws of thermodynamics.`,
          ],
          correctAnswerIndex: 0,
          explanation: `Enzymes lower the activation energy barrier, enabling life-sustaining metabolic reactions to occur rapidly at physiological temperatures.`,
          conceptTested: `Enzymatic Regulation in ${conceptTitle}`,
          difficulty: 'medium',
        },
        {
          id: `bio-gen-q-3`,
          question: `Why is homeostatic regulation essential during ${conceptTitle}?`,
          options: [
            `To maintain stable internal physical and chemical conditions necessary for cell survival.`,
            `To cause extreme fluctuations that trigger cell death.`,
            `To prevent cells from communicating with neighboring tissues.`,
            `To ensure that energy is wasted as heat.`,
          ],
          correctAnswerIndex: 0,
          explanation: `Homeostasis ensures that vital parameters (pH, temperature, ion concentrations, glucose) remain within narrow ranges compatible with life.`,
          conceptTested: `Homeostasis & Physiological Balance`,
          difficulty: 'medium',
        },
        {
          id: `bio-gen-q-4`,
          question: `What is a common misconception students make regarding ${conceptTitle}?`,
          options: [
            `Confusing the specific anatomical location or biochemical reactants with general whole-body processes.`,
            `Understanding that cells require energy in the form of ATP.`,
            `Recognizing that biological structures are composed of molecules.`,
            `Observing that living organisms interact with their environment.`,
          ],
          correctAnswerIndex: 0,
          explanation: `Precision regarding cellular locations, specific enzymes, and molecular pathways is essential for mastering biological concepts.`,
          conceptTested: `Common Biological Traps & Distinctions`,
          difficulty: 'medium',
        },
        {
          id: `bio-gen-q-5`,
          question: `How does ${conceptTitle} contribute to the survival of the organism or ecosystem?`,
          options: [
            `By providing essential energy, structural integrity, or metabolic regulation within interconnected biological networks.`,
            `By eliminating all biological diversity across species.`,
            `By operating entirely independently of cellular genetics.`,
            `By preventing any molecular transport across cell membranes.`,
          ],
          correctAnswerIndex: 0,
          explanation: `Biological processes sustain life by fulfilling physiological needs within integrated cellular and ecological networks.`,
          conceptTested: `Evolutionary Significance & Biological Role`,
          difficulty: 'hard',
        },
      ];
    }
  } else if (isPhysicsSubjectOrTopic(subject, topic)) {
    questions = [
      {
        id: `phys-q-1`,
        question: `According to Newton's First Law of Motion, what occurs to an object moving at constant velocity if the net external force ΣF is zero?`,
        options: [
          `It continues moving at the same speed in the same straight-line direction indefinitely.`,
          `It immediately comes to an abrupt halt.`,
          `It continuously accelerates without limit.`,
          `Its mass increases exponentially.`,
        ],
        correctAnswerIndex: 0,
        explanation: `In the absence of a net external force (ΣF = 0), an object retains constant velocity (zero acceleration) due to inertia.`,
        conceptTested: `Law of Inertia & Equilibrium`,
        difficulty: 'easy',
      },
      {
        id: `phys-q-2`,
        question: `In Newton's Second Law (F = ma), if the net force acting on an object is doubled while its mass is kept constant, what happens to its acceleration?`,
        options: [
          `Acceleration doubles.`,
          `Acceleration is halved.`,
          `Acceleration remains unchanged.`,
          `Acceleration quadruples.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Acceleration is directly proportional to net force (a = F/m); doubling the force doubles the acceleration.`,
        conceptTested: `Newton's Second Law Proportionality`,
        difficulty: 'easy',
      },
      {
        id: `phys-q-3`,
        question: `Why do action and reaction force pairs described in Newton's Third Law never cancel each other out in a free-body diagram?`,
        options: [
          `Because they act on two different interacting bodies, never on the same isolated body.`,
          `Because one force occurs before the other in time.`,
          `Because action forces are always larger than reaction forces.`,
          `Because reaction forces only apply in outer space.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Newton's third law forces act on separate bodies (F_AB on body B, F_BA on body A); a free-body diagram sums forces on a single isolated body.`,
        conceptTested: `Newton's Third Law Action-Reaction Mechanics`,
        difficulty: 'medium',
      },
      {
        id: `phys-q-4`,
        question: `What is the standard SI unit of force, and what are its base dimensional units?`,
        options: [
          `Newton (N), equivalent to 1 kg·m/s²`,
          `Joule (J), equivalent to 1 kg·m²/s²`,
          `Pascal (Pa), equivalent to 1 kg/(m·s²)`,
          `Watt (W), equivalent to 1 kg·m²/s³`,
        ],
        correctAnswerIndex: 0,
        explanation: `Force is measured in Newtons (N): from F = ma, 1 N = 1 kg × 1 m/s² = 1 kg·m/s².`,
        conceptTested: `SI Units & Dimensional Analysis`,
        difficulty: 'easy',
      },
      {
        id: `phys-q-5`,
        question: `When drawing a free-body diagram for a crate sliding down a friction-free ramp inclined at angle θ, what is the component of gravity accelerating the crate parallel to the ramp?`,
        options: [
          `mg · sin(θ)`,
          `mg · cos(θ)`,
          `mg · tan(θ)`,
          `mg / sin(θ)`,
        ],
        correctAnswerIndex: 0,
        explanation: `Resolving the downward weight vector (mg) into coordinate axes aligned with the ramp gives mg·sin(θ) along the slope and mg·cos(θ) perpendicular into the surface.`,
        conceptTested: `Vector Resolution on Inclined Planes`,
        difficulty: 'hard',
      },
    ];
  } else if (isChemistrySubjectOrTopic(subject, topic)) {
    questions = [
      {
        id: `chem-q-1`,
        question: `What fundamental principle drives atoms to form chemical bonds with each other?`,
        options: [
          `Attaining a stable outer valence electron configuration (typically an octet) and lower potential energy.`,
          `Increasing the total number of protons in the atomic nucleus.`,
          `Converting mass directly into radioactive emission.`,
          `Maximizing electrical repulsion between electron clouds.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Bond formation allows atoms to complete their valence shells, achieving thermodynamic stability at lower potential energy.`,
        conceptTested: `Octet Rule & Thermodynamic Driving Force`,
        difficulty: 'easy',
      },
      {
        id: `chem-q-2`,
        question: `What type of chemical bond forms between two atoms with a very large electronegativity difference (ΔEN > 2.0), such as Sodium and Chlorine?`,
        options: [
          `Ionic bond (complete electron transfer forming electrostatic lattice)`,
          `Nonpolar covalent bond (equal electron sharing)`,
          `Metallic bond (delocalized sea of electrons)`,
          `Hydrogen bond (dipole-dipole interaction)`,
        ],
        correctAnswerIndex: 0,
        explanation: `When ΔEN > 2.0, the more electronegative atom strips valence electrons from the electropositive atom, producing oppositely charged ions in an ionic lattice.`,
        conceptTested: `Electronegativity Difference & Ionic Bonding`,
        difficulty: 'easy',
      },
      {
        id: `chem-q-3`,
        question: `What distinguishes a covalent bond from an ionic bond?`,
        options: [
          `Covalent bonds involve the sharing of electron pairs between nonmetal atoms in molecular orbitals.`,
          `Covalent bonds only occur between positive metal ions.`,
          `Covalent bonds involve complete transfer of electrons into another atom's nucleus.`,
          `Covalent bonds cannot exist in liquid water.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Covalent bonding occurs when electronegativity values are relatively close and atoms share localized electron pairs.`,
        conceptTested: `Covalent vs Ionic Bonding Mechanisms`,
        difficulty: 'medium',
      },
      {
        id: `chem-q-4`,
        question: `Why are metals typically excellent conductors of electricity and heat?`,
        options: [
          `Because their valence electrons are delocalized in a mobile "sea of electrons" throughout the metal cation lattice.`,
          `Because metal nuclei freely travel from atom to atom.`,
          `Because metals contain only covalent triple bonds.`,
          `Because metal atoms have zero valence electrons.`,
        ],
        correctAnswerIndex: 0,
        explanation: `The metallic bonding model features fixed positive ions surrounded by freely moving delocalized electrons that conduct electric charge.`,
        conceptTested: `Metallic Bonding & Electron Mobility`,
        difficulty: 'medium',
      },
      {
        id: `chem-q-5`,
        question: `What type of intermolecular force gives water (H₂O) its unusually high boiling point and surface tension?`,
        options: [
          `Hydrogen bonding between partially positive hydrogen and electronegative oxygen on adjacent molecules`,
          `London dispersion forces only`,
          `Ionic bonds between water molecules`,
          `Nuclear strong force between atoms`,
        ],
        correctAnswerIndex: 0,
        explanation: `Strong dipole-dipole hydrogen bonds between the delta-positive H and delta-negative O of neighboring water molecules require substantial thermal energy to break.`,
        conceptTested: `Intermolecular Forces & Hydrogen Bonding`,
        difficulty: 'hard',
      },
    ];
  } else if (isProbStatSubjectOrTopic(subject, topic)) {
    questions = [
      {
        id: `prob-q-1`,
        question: `When rolling a fair six-sided die, what is the probability of rolling a 4?`,
        options: [
          `1/6 (≈ 16.67%)`,
          `1/2 (50%)`,
          `4/6 (≈ 66.67%)`,
          `1/4 (25%)`,
        ],
        correctAnswerIndex: 0,
        explanation: `The sample space S = {1, 2, 3, 4, 5, 6} contains 6 total equally likely outcomes. The favorable event E = {4} contains exactly 1 outcome. P(4) = favorable outcomes / total outcomes = 1/6.`,
        conceptTested: `Classical Probability Formula P(E) = n(E)/n(S)`,
        difficulty: 'easy',
      },
      {
        id: `prob-q-2`,
        question: `Given a set of marks: 10, 20, 30, 40, and 50, what is the arithmetic mean?`,
        options: [
          `30`,
          `25`,
          `150`,
          `35`,
        ],
        correctAnswerIndex: 0,
        explanation: `Mean = Sum of observations / Count of observations = (10 + 20 + 30 + 40 + 50) / 5 = 150 / 5 = 30.`,
        conceptTested: `Arithmetic Mean Calculation`,
        difficulty: 'easy',
      },
      {
        id: `prob-q-3`,
        question: `What does the standard deviation (σ) of a numerical dataset measure?`,
        options: [
          `The amount of variation, spread, or dispersion of values around their arithmetic mean`,
          `The single highest data observation recorded in the sample`,
          `The total cumulative sum of all observations`,
          `The most frequently occurring number in the dataset`,
        ],
        correctAnswerIndex: 0,
        explanation: `Standard deviation measures data dispersion around the central mean: σ = √[ Σ(xᵢ - μ)² / N ]. A lower standard deviation indicates values cluster close to the mean.`,
        conceptTested: `Standard Deviation Concept & Measurement of Spread`,
        difficulty: 'medium',
      },
      {
        id: `prob-q-4`,
        question: `In probability theory, what is the formula for the conditional probability of event A given that event B has occurred, P(A|B)?`,
        options: [
          `P(A|B) = P(A ∩ B) / P(B)  [for P(B) > 0]`,
          `P(A|B) = P(A) × P(B)`,
          `P(A|B) = P(A) + P(B) - P(A ∩ B)`,
          `P(A|B) = P(B) / P(A)`,
        ],
        correctAnswerIndex: 0,
        explanation: `Conditional probability restricts the sample space to condition B: P(A|B) is the probability of the intersection P(A ∩ B) divided by the probability of B.`,
        conceptTested: `Conditional Probability Definition`,
        difficulty: 'medium',
      },
      {
        id: `prob-q-5`,
        question: `According to the Empirical Rule (68-95-99.7%) for a bell-shaped normal distribution, what percentage of observations lies within 1 standard deviation of the mean (μ ± 1σ)?`,
        options: [
          `Approximately 68%`,
          `Approximately 50%`,
          `Approximately 95%`,
          `Approximately 99.7%`,
        ],
        correctAnswerIndex: 0,
        explanation: `For any Gaussian normal distribution, approximately 68% of data falls within μ ± 1σ, approximately 95% falls within μ ± 2σ, and 99.7% falls within μ ± 3σ.`,
        conceptTested: `Empirical 3-Sigma Rule for Normal Distributions`,
        difficulty: 'hard',
      },
    ];
  } else {
    // Tailored questions for general topics with DOMAIN-AWARE logic
    const isTechOrCS = subject.toLowerCase().includes('comp') || subject.toLowerCase().includes('soft') || subject.toLowerCase().includes('engine');
    questions = [
      {
        id: `q-${Date.now()}-1`,
        question: `What is the primary foundation when studying ${conceptTitle}?`,
        options: [
          `Establishing core definitions, baseline parameters, and governing relationships in ${subject}.`,
          `Randomizing observed behavior without repeatable criteria.`,
          `Ignoring standard domain boundaries and principles.`,
          `Eliminating the need for systematic testing and observation.`,
        ],
        correctAnswerIndex: 0,
        explanation: `${conceptTitle} establishes the baseline principles and structured relationships governing behavior in ${subject}.`,
        conceptTested: `${conceptTitle} Foundations`,
        difficulty: 'easy',
      },
      {
        id: `q-${Date.now()}-2`,
        question: isTechOrCS
          ? `In ${topic}, which principle guarantees consistent outcomes during state transformations?`
          : `In ${topic}, which principle guarantees consistent outcomes across varying conditions?`,
        options: [
          `Adherence to core governing laws and validated invariants.`,
          `Unconstrained random selection of intermediate values.`,
          `Ignoring initial conditions and context during analysis.`,
          `Discarding verified observational evidence.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Systematic analysis of ${topic} relies on preserving validated principles across all interactions.`,
        conceptTested: `Governing Principles in ${topic}`,
        difficulty: 'medium',
      },
      {
        id: `q-${Date.now()}-3`,
        question: `What distinguishes basic mechanisms from advanced structures in ${conceptTitle}?`,
        options: [
          `Advanced structures account for non-linear interactions, multi-variable dependencies, and edge cases.`,
          `Advanced structures only apply to fictional theoretical examples.`,
          `Basic mechanisms contradict advanced structures.`,
          `There is no functional difference between basic and advanced levels.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Advanced problem solving requires synthesizing foundational rules to solve complex multi-variable scenarios.`,
        conceptTested: `Advanced Mechanics & Edge Cases`,
        difficulty: 'medium',
      },
      {
        id: `q-${Date.now()}-4`,
        question: `What is a common pitfall students encounter when analyzing ${conceptTitle}?`,
        options: [
          `Overlooking boundary conditions and making hasty, unvalidated generalizations.`,
          `Consulting standard reference materials too frequently.`,
          `Structuring step-by-step solutions systematically.`,
          `Testing conclusions against verified criteria.`,
        ],
        correctAnswerIndex: 0,
        explanation: `Failing to verify boundary constraints is the leading source of errors in both academic exams and practical applications.`,
        conceptTested: `Common Misconceptions & Traps`,
        difficulty: 'medium',
      },
      {
        id: `q-${Date.now()}-5`,
        question: `How do practitioners synthesize ${conceptTitle} with other areas of ${subject}?`,
        options: [
          `By connecting core principles into comprehensive frameworks supported by clear empirical evidence.`,
          `By isolating the concept so it cannot interact with other domains.`,
          `By substituting empirical observation with guesswork.`,
          `By disregarding established fundamental definitions.`,
        ],
        correctAnswerIndex: 0,
        explanation: `True mastery involves synthesizing individual concepts into larger, cohesive domain frameworks.`,
        conceptTested: `Synthesis & Real-World Application`,
        difficulty: 'hard',
      },
    ];
  }

  return {
    id: `quiz-${concept?.id || 'gen'}-${Date.now()}`,
    materialId: `mat-${Date.now()}`,
    conceptId: concept?.id || 'concept-active',
    conceptTitle,
    questions,
  };
}

/**
 * Create fresh initial progress for a new onboarded student, strictly aligning strong and weak topics
 * to the selected topic rather than hardcoded DSA
 */
export function createInitialProgress(profile: StudentProfile, material?: LearningMaterial): StudentProgress {
  const topic = profile.topic?.trim() || getDefaultTopic(profile.subject);
  const isAutomata = isAutomataTopic(topic);

  return {
    overallPercentage: 0,
    conceptsCompleted: 0,
    totalConcepts: isAutomata ? 8 : (material?.concepts.length || 6),
    quizzesTaken: 0,
    quizAverage: 0,
    learningStreakDays: 1,
    studyTimeHours: 0.1,
    // Topic-aligned: empty until student takes assessments, avoiding spurious DSA leaks!
    strongTopics: [],
    weakTopics: [],
    recentActivities: [
      {
        id: `act-${Date.now()}`,
        type: 'upload',
        title: `Curriculum initialized for ${profile.name} in ${profile.subject}: ${topic}`,
        timestamp: 'Just now',
      },
    ],
  };
}

function getDefaultTopic(subject: string): string {
  const match = DEFAULT_SUBJECT_OPTIONS.find(
    (s) => s.name.toLowerCase() === subject.toLowerCase()
  );
  return match?.defaultTopic || 'Finite Automata';
}
