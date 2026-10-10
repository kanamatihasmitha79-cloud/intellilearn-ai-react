import { LearningMaterial, VisualLesson, QuizAssessment, RoadmapNode, StudentProgress } from '../types';

export const DEMO_FINITE_AUTOMATA: LearningMaterial = {
  id: 'mat-automata-001',
  title: 'Introduction to Finite Automata',
  fileType: 'pdf',
  fileName: 'CS301_Unit2_Finite_Automata.pdf',
  uploadDate: '2026-09-12',
  status: 'ready',
  mainTopic: 'Theory of Computation & Formal Languages',
  summary:
    'Finite Automata are mathematical abstract machines that recognize regular languages. A Finite Automaton consists of a finite set of states and transitions triggered by symbols from an alphabet. This module covers alphabets, strings, formal definitions, Deterministic Finite Automata (DFA), Non-deterministic Finite Automata (NFA), and the 5-tuple transition functions.',
  subtopics: [
    'Alphabets, Strings, and Formal Languages',
    'Deterministic Finite Automata (DFA) Mechanics',
    'The 5-Tuple Mathematical Formalism',
    'Transition Function (δ) and State Tables',
    'Acceptance States and Language Recognition',
    'Non-deterministic Finite Automata (NFA) Overview',
  ],
  prerequisites: [
    'Basic Discrete Mathematics (Sets, Tuples, Relations)',
    'Elementary Logic and Boolean operations',
    'String manipulation and binary alphabet basics',
  ],
  difficultConcepts: [
    'Transition function δ: Q × Σ → Q vs NFA powerset mapping δ: Q × (Σ ∪ {ε}) → 2^Q',
    'Minimization of DFA via Myhill-Nerode equivalence theorem',
    'Trap / Dead state handling in incomplete transition tables',
  ],
  suggestedLearningOrder: [
    'Alphabet (Σ)',
    'Strings & Languages',
    'Deterministic Finite Automaton (DFA)',
    'Transition Function (δ)',
    'Non-deterministic Finite Automaton (NFA)',
    'NFA to DFA Subset Construction',
  ],
  importantDefinitions: [
    {
      term: 'Alphabet (Σ)',
      definition: 'A finite, non-empty set of symbols. For example, binary alphabet Σ = {0, 1}.',
    },
    {
      term: 'String (Word)',
      definition: 'A finite sequence of symbols chosen from an alphabet. Empty string denoted as ε or λ.',
    },
    {
      term: 'Language (L)',
      definition: 'A set of strings chosen from some Σ*. If L is accepted by a DFA, it is a regular language.',
    },
    {
      term: 'Deterministic Finite Automaton (DFA)',
      definition:
        'A 5-tuple (Q, Σ, δ, q0, F) where for each state and input symbol, there is exactly one designated deterministic next state.',
    },
    {
      term: 'Transition Function (δ)',
      definition:
        'A mapping function δ: Q × Σ → Q that describes the machine transition from state q on reading symbol a into state q\'.',
    },
    {
      term: 'Accepting / Final State (F)',
      definition:
        'A subset of states F ⊆ Q such that if the machine halts after processing the input string in one of these states, the string is accepted.',
    },
  ],
  importantFormulas: [
    {
      name: 'DFA Formal 5-Tuple',
      formula: 'M = (Q, Σ, δ, q₀, F)',
      explanation:
        'Q is a finite set of states; Σ is the alphabet; δ is the transition mapping Q × Σ → Q; q₀ ∈ Q is the initial start state; F ⊆ Q is the set of accept states.',
    },
    {
      name: 'Extended Transition Function',
      formula: 'δ̂(q, wa) = δ(δ̂(q, w), a)',
      explanation:
        'Computes the state reached from state q after reading an entire string w followed by symbol a.',
    },
    {
      name: 'Language Recognized by DFA M',
      formula: 'L(M) = { w ∈ Σ* | δ̂(q₀, w) ∈ F }',
      explanation:
        'The set of all strings w over alphabet Σ that drive the automaton from start state q₀ to any accepting state in F.',
    },
  ],
  concepts: [
    {
      id: 'concept-dfa',
      name: 'Deterministic Finite Automaton (DFA)',
      category: 'Core Automata',
      shortSummary: 'A state machine that processes symbols deterministically with exactly one path per input.',
      difficulty: 'Intermediate',
      prerequisites: ['Alphabet (Σ)', 'Strings & Languages'],
      simpleExplanation:
        'A DFA is like a turnstile at a train station or a simple vending machine. It has a finite number of positions (states). When it receives an input (like a coin or a ticket), it follows an exact, single rule to move to its next state. There is never any guesswork or multiple simultaneous branches.',
      detailedExplanation:
        'Formally, a DFA is a 5-tuple M = (Q, Σ, δ, q₀, F). "Deterministic" means that for every current state q ∈ Q and every incoming symbol a ∈ Σ, there is one and only one resulting state δ(q, a). There are no spontaneous moves without input (no ε-transitions). Processing begins at initial state q₀ and reads the input string symbol-by-symbol left-to-right. If the automaton terminates in a state belonging to the set of accepting states F, the string is accepted; otherwise, it is rejected.',
      analogy:
        'Imagine a robotic train running along tracks. At each junction, there is a clear sign pointing to exactly one track based on your ticket color (input symbol). You can never split into two trains or get confused at an unmarked switch. Once all ticket colors are used up, you check if you arrived at the Gold Station (Accept State) or a Siding (Reject).',
      keyPoints: [
        'Total function: Every state must have a defined outgoing transition for every symbol in the alphabet.',
        'No ε-transitions (cannot change state without consuming an input symbol).',
        'Recognizes exactly the class of Regular Languages.',
        'Can be minimized to a unique minimal DFA using state equivalence.',
      ],
      formulaOrSyntax: 'M = (Q, Σ, δ, q₀, F) with δ: Q × Σ → Q',
      example:
        'Alphabet Σ = {0, 1}. Designing a DFA that accepts strings ending with "01": State q0 (start, seen nothing or ending in 00/1), State q1 (just saw 0), State q2 (accept state, just saw 01). Transition δ(q1, 1) = q2.',
    },
    {
      id: 'concept-alphabet',
      name: 'Alphabet (Σ)',
      category: 'Foundations',
      shortSummary: 'A non-empty finite set of elemental symbols from which strings are constructed.',
      difficulty: 'Beginner',
      prerequisites: ['Basic Set Theory'],
      simpleExplanation:
        'An alphabet is the finite collection of characters or symbols you are allowed to use. Just like the English alphabet consists of 26 letters {a, b, ..., z}, in computer science we often use the binary alphabet {0, 1} or ASCII.',
      detailedExplanation:
        'Denoted by uppercase Sigma (Σ). The alphabet must be strictly finite and non-empty. For instance, Σ = {0, 1} represents binary computation. Σ = {a, b, c} represents a 3-character language. Σ* represents the Kleene closure: the infinite set of all possible finite strings formed using symbols from Σ, including the empty string ε.',
      analogy:
        'Think of the alphabet as the box of Lego blocks of different colors available to you. You can only assemble structures using blocks that came in that box.',
      keyPoints: [
        'Must be finite and non-empty.',
        'Symbols are atomic elements.',
        'Prefix Σ* denotes all possible finite combinations.',
      ],
      formulaOrSyntax: 'Σ = {a, b} or Σ = {0, 1}',
      example: 'If Σ = {a, b}, then strings include ε, a, b, aa, ab, ba, bb, aaa, ...',
    },
    {
      id: 'concept-strings',
      name: 'Strings & Formal Languages',
      category: 'Foundations',
      shortSummary: 'Finite sequences of symbols and collections of valid strings forming a language.',
      difficulty: 'Beginner',
      prerequisites: ['Alphabet (Σ)'],
      simpleExplanation:
        'A string is simply words formed by placing alphabet symbols in sequence. A formal language is any set of such strings that follow a specific rule (like "all strings with an even number of zeros").',
      detailedExplanation:
        'The length of a string w, denoted |w|, is the total count of symbols. The empty string is denoted ε with |ε| = 0. String concatenation uv appends string v to string u. A language L over alphabet Σ is a subset of Σ* (L ⊆ Σ*).',
      analogy:
        'If the alphabet is letters {c, a, t}, then "cat" and "tac" are strings. The language could be the dictionary of all valid English words you can spell.',
      keyPoints: [
        'Length |w| is non-negative.',
        'Empty string ε has length 0 and acts as identity for concatenation: wε = εw = w.',
        'A language is any subset L ⊆ Σ*.',
      ],
      formulaOrSyntax: '|w| ≥ 0; ε is empty; L ⊆ Σ*',
      example: 'L = { w ∈ {0, 1}* | |w| is a multiple of 2 } (All even-length binary strings)',
    },
    {
      id: 'concept-transition-function',
      name: 'Transition Function (δ)',
      category: 'Core Automata',
      shortSummary: 'The mathematical rulebook governing state changes for each incoming input symbol.',
      difficulty: 'Intermediate',
      prerequisites: ['Deterministic Finite Automaton (DFA)', 'Alphabet (Σ)'],
      simpleExplanation:
        'The transition function is the navigation compass of the automaton. You tell it "I am currently at state A and just read symbol 1", and it tells you "Go to state B".',
      detailedExplanation:
        'Represented mathematically as δ: Q × Σ → Q for a DFA. It takes a pair (current state, input character) and maps it deterministically to a single destination state. In state transition tables, rows represent states Q and columns represent alphabet symbols Σ. For any cell (q, a), the entry is δ(q, a).',
      analogy:
        'Think of a game rulebook or a GPS turn-by-turn navigation system. When you are at "Intersection 4" and take "Exit B", the route map dictates the exact next intersection you will arrive at.',
      keyPoints: [
        'Must be completely specified for every state q ∈ Q and symbol a ∈ Σ.',
        'Can be visualized as a Transition Table or directed arrows on a State Transition Diagram.',
        'Extended transition function δ̂ handles full strings recursively.',
      ],
      formulaOrSyntax: 'δ: Q × Σ → Q, where Q = states, Σ = alphabet',
      example: 'If Q = {q0, q1} and Σ = {0, 1}: δ(q0, 0) = q0, δ(q0, 1) = q1, δ(q1, 0) = q0, δ(q1, 1) = q1.',
    },
    {
      id: 'concept-nfa',
      name: 'Non-deterministic Finite Automaton (NFA)',
      category: 'Advanced Automata',
      shortSummary: 'An automaton that can branch into multiple possible states or take spontaneous ε-transitions.',
      difficulty: 'Advanced',
      prerequisites: ['Deterministic Finite Automaton (DFA)', 'Transition Function (δ)'],
      simpleExplanation:
        'Unlike a DFA where every step is strictly one path, an NFA is like having multiple clones of yourself exploring different hallways at the same time. If at least one clone reaches a winning room (accept state), the input is accepted!',
      detailedExplanation:
        'An NFA has transition function δ: Q × (Σ ∪ {ε}) → P(Q), mapping to the powerset of Q. This allows zero, one, or multiple transitions for the same symbol, as well as ε-transitions (moves without reading any symbol). Remarkably, every NFA can be converted to an equivalent DFA via the Subset Construction algorithm, meaning both recognize the exact same class of regular languages.',
      analogy:
        'Like playing a video game where you can create a save state before a junction and simultaneously explore all branches at once.',
      keyPoints: [
        'Transition maps to the powerset P(Q) (2^Q states).',
        'Allows ε (epsilon) transitions without consuming input.',
        'Equivalent in expressive power to DFAs, but often exponentially more compact.',
      ],
      formulaOrSyntax: 'δ: Q × (Σ ∪ {ε}) → 2^Q',
      example: 'An NFA recognizing strings containing "001": upon seeing 0 at start state, it can either stay or branch forward.',
    },
  ],
  rawText: `Theory of Computation: Finite Automata Fundamentals
Chapter 2: Finite Automata and Regular Languages

1. Alphabets and Strings
An alphabet Σ is a finite, non-empty set of symbols.
A string over Σ is a finite sequence of symbols from Σ. The empty string is denoted by ε (or λ), with length |ε| = 0.
The set of all strings over Σ is denoted Σ*. A language L over Σ is a subset of Σ*, i.e., L ⊆ Σ*.

2. Deterministic Finite Automata (DFA)
A DFA is a 5-tuple M = (Q, Σ, δ, q₀, F), where:
- Q is a finite set of states.
- Σ is a finite alphabet.
- δ: Q × Σ → Q is the transition function.
- q₀ ∈ Q is the start (initial) state.
- F ⊆ Q is the set of accept (final) states.

3. Determinism and State Transitions
For every state q in Q and every symbol a in Σ, there is exactly one next state given by δ(q, a).
The extended transition function δ̂: Q × Σ* → Q is defined recursively:
- δ̂(q, ε) = q
- δ̂(q, wa) = δ(δ̂(q, w), a) for w in Σ*, a in Σ.
A string w is accepted by M if δ̂(q₀, w) ∈ F. The language recognized by M is L(M) = { w ∈ Σ* | δ̂(q₀, w) ∈ F }.

4. Non-deterministic Finite Automata (NFA)
An NFA allows 0, 1, or multiple transitions for a given state and input symbol, and can also make transitions on the empty string ε.
Its transition function is δ: Q × (Σ ∪ {ε}) → 2^Q.
By subset construction (powerset construction), any NFA with n states can be converted into an equivalent DFA with at most 2^n states. Both DFAs and NFAs recognize regular languages.`,
  chunks: [
    'An alphabet Σ is a finite, non-empty set of symbols. A string over Σ is a finite sequence of symbols from Σ. Empty string is ε with length 0. Kleene star Σ* denotes all finite strings over Σ.',
    'A Deterministic Finite Automaton (DFA) is a 5-tuple M = (Q, Σ, δ, q0, F). Q is finite set of states, Σ is input alphabet, δ: Q × Σ → Q is transition function, q0 is initial start state, and F ⊆ Q is set of accept states.',
    'For every state q and every input symbol a, a DFA has exactly one designated next state δ(q, a). There are no ambiguous choices and no epsilon transitions.',
    'The extended transition function δ̂(q, wa) = δ(δ̂(q, w), a) computes state trajectory for whole string w. A string w is accepted if δ̂(q0, w) ∈ F.',
    'An NFA has transition function δ: Q × (Σ ∪ {ε}) → 2^Q. It can have zero, one, or multiple outgoing edges for a symbol, plus epsilon moves. Subset construction proves NFAs and DFAs have identical language recognition power.',
  ],
};

export const DEMO_VISUAL_LESSONS: Record<string, VisualLesson> = {
  'concept-dfa': {
    id: 'vis-dfa-001',
    conceptId: 'concept-dfa',
    conceptTitle: 'Deterministic Finite Automaton (DFA) Processing Flow',
    diagramType: 'state-machine',
    overview:
      'Watch step-by-step how a DFA reads an input string symbol-by-symbol, transitioning between deterministic states until reaching either an Accept or Reject condition.',
    analogy:
      'Like an automated security turnstile: Locked State → Insert Token → Unlocked State → Push Barrier → Locked State.',
    narrationScript:
      'Welcome to the visual lesson on Deterministic Finite Automata. A DFA starts at the Initial State q-zero. As each symbol in the input string arrives, the machine follows exactly one designated transition arrow. The current state is updated immediately. When all symbols have been consumed, we inspect the final resting state: if it is inside the double circle representing the Accept States, the string is officially accepted. Otherwise, it is rejected.',
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'Initialize Machine at Start State (q₀)',
        description:
          'The automaton initializes in the designated start state q₀ with the input tape positioned at the first symbol.',
        stateLabel: 'State: q₀ (Start)',
        nodeType: 'start',
        highlight: true,
        notes: 'Pointer points to string position 0. No symbols consumed yet.',
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'Read Next Input Symbol from Tape',
        description:
          'The read head scans the current symbol (e.g., "1" or "0") from the input string and feeds it to the transition function.',
        stateLabel: 'Reading: symbol "a" ∈ Σ',
        nodeType: 'process',
        highlight: false,
        notes: 'DFA reads symbols strictly from left to right without rewinding.',
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'Follow Deterministic Transition δ(q, a)',
        description:
          'The transition function δ evaluates the unique designated arrow leaving state q for symbol a.',
        stateLabel: 'δ(q_curr, a) → q_next',
        nodeType: 'action',
        highlight: false,
        notes: 'Determinism guarantees exactly 1 destination state exists.',
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'Update Current State & Advance Tape',
        description:
          'Machine shifts to the new state. The tape head shifts one position to the right.',
        stateLabel: 'Active State: q_next',
        nodeType: 'process',
        highlight: false,
        notes: 'Repeats until all symbols in the string are consumed.',
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'Evaluate Acceptance Criterion (q ∈ F?)',
        description:
          'When input is exhausted, check if current state belongs to the set of accepting states F (double circle).',
        stateLabel: 'Final Check: q ∈ F?',
        nodeType: 'decision',
        highlight: false,
        notes: 'If yes: ACCEPT. If no: REJECT string.',
      },
      {
        id: 'step-6',
        stepNumber: 6,
        title: 'String Accepted or Rejected',
        description:
          'Automaton produces a definitive boolean verdict. If accepted, w ∈ L(M); if rejected, w ∉ L(M).',
        stateLabel: 'Verdict: Accept / Reject',
        nodeType: 'accept',
        highlight: true,
        notes: 'Every string over alphabet Σ produces a conclusive result.',
      },
    ],
    interactiveTips: [
      'Notice that every state in a DFA MUST have an outgoing transition for EVERY symbol in the alphabet.',
      'If an input string can never succeed, the transition routes to a "Trap" or "Dead" state.',
      'Double circles visually indicate accepting states.',
    ],
  },
  'concept-transition-function': {
    id: 'vis-delta-002',
    conceptId: 'concept-transition-function',
    conceptTitle: 'Transition Function (δ) & State Mapping Mechanics',
    diagramType: 'flowchart',
    overview:
      'Explore how the transition function δ maps Cartesian product Q × Σ into destination states in Q.',
    analogy:
      'Like looking up a row and column in a coordinate grid or a chess move table.',
    narrationScript:
      'The transition function is denoted by lowercase delta. It takes two inputs: your current state, and the incoming symbol. In a transition table, rows correspond to states and columns correspond to symbols. The intersection gives the exact new state.',
    steps: [
      {
        id: 'step-d1',
        stepNumber: 1,
        title: 'Identify Current State (q ∈ Q)',
        description: 'Locate the active state row in the transition table.',
        stateLabel: 'Row: State q',
        nodeType: 'start',
        highlight: true,
      },
      {
        id: 'step-d2',
        stepNumber: 2,
        title: 'Scan Input Symbol (a ∈ Σ)',
        description: 'Identify the column matching the incoming symbol from alphabet.',
        stateLabel: 'Column: Symbol a',
        nodeType: 'process',
        highlight: false,
      },
      {
        id: 'step-d3',
        stepNumber: 3,
        title: 'Matrix Intersection δ(q, a)',
        description: 'Read the cell containing the exact target state.',
        stateLabel: 'Lookup: δ(q, a)',
        nodeType: 'action',
        highlight: false,
      },
      {
        id: 'step-d4',
        stepNumber: 4,
        title: 'Execute State Mutation',
        description: 'The automaton registers the target state as the new current state.',
        stateLabel: 'Transition Complete',
        nodeType: 'accept',
        highlight: true,
      },
    ],
    interactiveTips: [
      'For DFA, each cell in the transition table has exactly one state name.',
      'For NFA, cells can contain a set of states (e.g. {q0, q1}) or empty set ∅.',
    ],
  },
};

export const DEMO_PRELOADED_QUIZ: QuizAssessment = {
  id: 'quiz-dfa-101',
  materialId: 'mat-automata-001',
  conceptId: 'concept-dfa',
  conceptTitle: 'Deterministic Finite Automaton (DFA)',
  questions: [
    {
      id: 'q1',
      question: 'In the formal 5-tuple definition of a DFA M = (Q, Σ, δ, q₀, F), what does δ represent?',
      options: [
        'The set of all possible input strings',
        'The transition function mapping Q × Σ → Q',
        'The subset of final accepting states',
        'The length of the longest recognized string',
      ],
      correctAnswerIndex: 1,
      explanation:
        'δ is the transition function δ: Q × Σ → Q, which specifies the unique destination state for any given state and input symbol.',
      conceptTested: 'DFA definition & 5-tuple',
      difficulty: 'easy',
    },
    {
      id: 'q2',
      question: 'Which of the following is TRUE about state transitions in a DFA?',
      options: [
        'A state can have multiple outgoing transitions labeled with the exact same symbol.',
        'A state can transition spontaneously to another state without reading an input symbol (ε-move).',
        'For every state and every alphabet symbol, there is exactly one defined next state.',
        'A DFA does not require an initial start state.',
      ],
      correctAnswerIndex: 2,
      explanation:
        'By definition of determinism, for every state q ∈ Q and every symbol a ∈ Σ, there must be exactly one designated next state.',
      conceptTested: 'DFA Determinism',
      difficulty: 'medium',
    },
    {
      id: 'q3',
      question: 'When is an input string w officially ACCEPTED by a DFA?',
      options: [
        'If the machine visits every state in Q at least once.',
        'If after reading the entire string, the DFA halts in a state that belongs to F (accept states).',
        'If the string contains only zeros and ones.',
        'If the transition function produces an error.',
      ],
      correctAnswerIndex: 1,
      explanation:
        'A string w is accepted if and only if the state reached after consuming all characters of w belongs to the set F of accepting states.',
      conceptTested: 'DFA Acceptance Condition',
      difficulty: 'easy',
    },
    {
      id: 'q4',
      question:
        'If a DFA transition table has a state from which no path leads to any accepting state, this state is commonly known as a:',
      options: [
        'Pivot state',
        'Super state',
        'Trap or Dead state',
        'Epsilon state',
      ],
      correctAnswerIndex: 2,
      explanation:
        'A Dead or Trap state is an absorbing non-accepting state that self-loops on all symbols, ensuring the machine remains total while discarding non-conforming inputs.',
      conceptTested: 'Trap / Dead State',
      difficulty: 'medium',
    },
    {
      id: 'q5',
      question:
        'How does the transition function of an NFA differ mathematically from that of a DFA?',
      options: [
        'DFA maps Q × Σ → Q, whereas NFA maps Q × (Σ ∪ {ε}) → 2^Q (powerset).',
        'NFA cannot read symbols from alphabet Σ.',
        'DFA uses probabilities between 0 and 1.',
        'NFA has no initial start state.',
      ],
      correctAnswerIndex: 0,
      explanation:
        'An NFA transition function maps each state and optional epsilon transition into a subset of states (the powerset 2^Q), allowing non-deterministic branching.',
      conceptTested: 'Transition Function Comparison (DFA vs NFA)',
      difficulty: 'hard',
    },
  ],
};

export const DEMO_QUIZ_ASSESSMENT = DEMO_PRELOADED_QUIZ;

export const DEMO_ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'road-1',
    title: 'Foundations: Alphabets & Symbols (Σ)',
    description: 'Understand basic sets, alphabet definition, and elemental symbols.',
    level: 'Foundation',
    order: 1,
    status: 'Completed',
    prerequisites: [],
    conceptId: 'concept-alphabet',
    estimatedMinutes: 15,
  },
  {
    id: 'road-2',
    title: 'Strings & Formal Languages',
    description: 'String length, concatenation, empty string ε, and language definition (L ⊆ Σ*).',
    level: 'Foundation',
    order: 2,
    status: 'Completed',
    prerequisites: ['Foundations: Alphabets & Symbols (Σ)'],
    conceptId: 'concept-strings',
    estimatedMinutes: 20,
  },
  {
    id: 'road-3',
    title: 'Finite Automata Concepts',
    description: 'State machines, state transitions, and finite memory limitations.',
    level: 'Core',
    order: 3,
    status: 'Completed',
    prerequisites: ['Strings & Formal Languages'],
    estimatedMinutes: 25,
  },
  {
    id: 'road-4',
    title: 'Deterministic Finite Automaton (DFA)',
    description: 'The 5-tuple (Q, Σ, δ, q₀, F), determinism, and language recognition.',
    level: 'Core',
    order: 4,
    status: 'In Progress',
    prerequisites: ['Finite Automata Concepts'],
    conceptId: 'concept-dfa',
    estimatedMinutes: 35,
  },
  {
    id: 'road-5',
    title: 'Transition Functions & State Tables (δ)',
    description: 'Total mapping δ: Q × Σ → Q, state tables, and dead/trap state mechanics.',
    level: 'Core',
    order: 5,
    status: 'Recommended',
    prerequisites: ['Deterministic Finite Automaton (DFA)'],
    conceptId: 'concept-transition-function',
    estimatedMinutes: 30,
  },
  {
    id: 'road-6',
    title: 'Non-deterministic Finite Automaton (NFA)',
    description: 'Powerset mapping δ: Q × (Σ ∪ {ε}) → 2^Q and epsilon transitions.',
    level: 'Advanced',
    order: 6,
    status: 'Locked',
    prerequisites: ['Deterministic Finite Automaton (DFA)', 'Transition Functions & State Tables (δ)'],
    conceptId: 'concept-nfa',
    estimatedMinutes: 40,
  },
  {
    id: 'road-7',
    title: 'NFA to DFA Subset Construction',
    description: 'Converting any NFA into an equivalent DFA using powerset construction.',
    level: 'Advanced',
    order: 7,
    status: 'Locked',
    prerequisites: ['Non-deterministic Finite Automaton (NFA)'],
    estimatedMinutes: 45,
  },
  {
    id: 'road-8',
    title: 'DFA State Minimization',
    description: 'Myhill-Nerode theorem and table filling algorithm for minimal DFA.',
    level: 'Mastery',
    order: 8,
    status: 'Locked',
    prerequisites: ['NFA to DFA Subset Construction'],
    estimatedMinutes: 40,
  },
  {
    id: 'road-9',
    title: 'Comprehensive Automata Assessment',
    description: 'Capstone assessment covering DFA design, regular expressions, and pumping lemma.',
    level: 'Mastery',
    order: 9,
    status: 'Locked',
    prerequisites: ['DFA State Minimization'],
    estimatedMinutes: 50,
  },
];

export const DEMO_STUDENT_PROGRESS: StudentProgress = {
  overallPercentage: 68,
  conceptsCompleted: 4,
  totalConcepts: 6,
  quizzesTaken: 5,
  quizAverage: 84,
  learningStreakDays: 6,
  studyTimeHours: 14.5,
  strongTopics: ['Alphabet & Strings', 'DFA 5-Tuple Structure', 'Acceptance States'],
  weakTopics: ['Transition Function Matrix', 'Trap / Dead State Handling', 'NFA ε-moves'],
  recentActivities: [
    {
      id: 'act-1',
      type: 'quiz',
      title: 'DFA Core Assessment',
      timestamp: '2 hours ago',
      score: 80,
    },
    {
      id: 'act-2',
      type: 'lesson',
      title: 'Visual Step-by-Step DFA Walkthrough',
      timestamp: 'Yesterday',
    },
    {
      id: 'act-3',
      type: 'chat',
      title: 'AI Tutor Session on "What is a DFA?"',
      timestamp: '2 days ago',
    },
    {
      id: 'act-4',
      type: 'upload',
      title: 'Analyzed CS301_Unit2_Finite_Automata.pdf',
      timestamp: '3 days ago',
    },
  ],
};
