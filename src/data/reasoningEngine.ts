import {
  QuizQuestion,
  ReasoningCategory,
  QuestionReasoningEvaluation,
  AdaptiveTeachingRecommendation,
  ConceptReasoningProfile,
} from '../types';

export const REASONING_CATEGORY_META: Record<
  ReasoningCategory,
  { label: string; badgeColor: string; description: string; icon: string }
> = {
  correct_sound: {
    label: 'Sound Reasoning & Correct Answer',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'You selected the right answer and articulated sound conceptual logic.',
    icon: '✅',
  },
  correct_incomplete: {
    label: 'Correct Answer, Incomplete Reasoning',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    description: 'The answer is right, but a key intermediate step or governing rule was unstated.',
    icon: '💡',
  },
  incorrect_conceptual: {
    label: 'Conceptual Misunderstanding',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'The approach relies on a plausible but mistaken principle that we can clarify.',
    icon: '🔍',
  },
  incorrect_procedural: {
    label: 'Sound Reasoning with Minor Procedural/Calculation Error',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Your fundamental setup was on target; a specific arithmetic or execution slip occurred.',
    icon: '📐',
  },
  incorrect_misinterpretation: {
    label: 'Question Premise Misinterpretation',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    description: 'You correctly solved for an assumption different from what was asked.',
    icon: '🎯',
  },
  partially_correct: {
    label: 'Partially Correct Reasoning with Incomplete Conclusion',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    description: 'The initial steps are valid, but the final deduction stopped short.',
    icon: '🧩',
  },
  insufficient_evidence: {
    label: 'Insufficient Evidence to Diagnose',
    badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
    description: 'We need a brief clarifying question to see how you reached this option.',
    icon: '💬',
  },
  unsure_needs_guidance: {
    label: 'Unsure & Needs Guided Walkthrough',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    description: 'Honest hesitation is a great starting point for guided mastery!',
    icon: '🤝',
  },
};

/**
 * Intelligent client-side fallback reasoning engine if API server is offline
 */
export function evaluateStudentReasoningLocally(params: {
  question: QuizQuestion;
  selectedOptionIndex: number;
  reasoningText: string;
  isUnsure?: boolean;
  subject?: string;
  topic?: string;
}): QuestionReasoningEvaluation {
  const { question, selectedOptionIndex, reasoningText, isUnsure, subject = '', topic = '' } = params;
  const isCorrect = selectedOptionIndex === question.correctAnswerIndex;
  const cleanedText = (reasoningText || '').trim().toLowerCase();
  const wordCount = cleanedText.split(/\s+/).filter(Boolean).length;

  const sLower = subject.toLowerCase();
  const tLower = topic.toLowerCase();
  const isProbStat = sLower.includes('prob') || sLower.includes('stat') || tLower.includes('prob') || tLower.includes('mean') || tLower.includes('deviation');
  const isAutomata = sLower.includes('comp') || tLower.includes('automata') || tLower.includes('dfa') || tLower.includes('toc');
  const isBio = sLower.includes('bio') || tLower.includes('photo') || tLower.includes('cell') || tLower.includes('digest');
  const isPhys = sLower.includes('physic') || tLower.includes('newton') || tLower.includes('force');
  const isChem = sLower.includes('chem') || tLower.includes('bond') || tLower.includes('electroneg');

  // Case H: Unsure
  if (isUnsure || cleanedText.includes("not sure") || cleanedText.includes("don't know") || cleanedText.includes("dont know") || cleanedText.includes("guessing") || cleanedText === 'unsure') {
    return {
      questionId: question.id,
      conceptTested: question.conceptTested,
      selectedOptionIndex,
      correctAnswerIndex: question.correctAnswerIndex,
      isAnswerCorrect: isCorrect,
      studentReasoning: reasoningText || "I'm not sure",
      reasoningCategory: 'unsure_needs_guidance',
      categoryLabel: REASONING_CATEGORY_META.unsure_needs_guidance.label,
      whatWasUnderstood: 'You acknowledged the uncertainty without guessing blindly, which is the best foundation for real learning.',
      stepNeedingAttention: 'Starting with the first fundamental principle',
      whyItMatters: 'Breaking a complex problem into its very first step removes cognitive overload.',
      matchedExplanation: isProbStat
        ? 'Let us begin with the first principle: identify the total sample space of all possible outcomes, then count how many outcomes satisfy the event.'
        : isAutomata
        ? 'Let us trace the machine one step at a time: find the start state q₀ and see where the first symbol on the tape takes you.'
        : isBio
        ? 'Let us ground this in cell biology: determine the specific organelle and the substrate entering the reaction.'
        : isPhys
        ? 'Start by drawing a free-body diagram and listing all given vector forces before calculating.'
        : `Let's break ${question.conceptTested} down to its core definition and build forward step-by-step.`,
      targetedExampleOrVisual: isProbStat
        ? '🎲 For rolling a die: Sample Space = {1, 2, 3, 4, 5, 6}. If event is {4}, favorable = 1, so P(4) = 1/6.'
        : isAutomata
        ? 'State Trace: (q₀) --[0]--> (q₁) --[1]--> (q₂ [Accepting State])'
        : 'Step 1: Identify baseline input. Step 2: Apply the governing law.',
      clarifyingOrGuidingQuestion: 'What is the very first piece of information given in this problem that you feel confident about?',
      teachingRecommendation: {
        approach: 'guiding_question',
        approachLabel: 'Guided First Step',
        guidanceText: 'Prompt the student to state the first known quantity or definition before attempting the full calculation.',
        suggestedAction: 'Walk through a simplified step-by-step example with immediate scaffolding.',
      },
      confidence: 'High',
    };
  }

  // Case G: Insufficient Evidence
  if (wordCount < 3) {
    return {
      questionId: question.id,
      conceptTested: question.conceptTested,
      selectedOptionIndex,
      correctAnswerIndex: question.correctAnswerIndex,
      isAnswerCorrect: isCorrect,
      studentReasoning: reasoningText || '(Brief selection)',
      reasoningCategory: 'insufficient_evidence',
      categoryLabel: REASONING_CATEGORY_META.insufficient_evidence.label,
      whatWasUnderstood: isCorrect
        ? 'You selected the correct option, which shows positive intuition.'
        : 'You chose an option that highlights a common area of focus.',
      stepNeedingAttention: 'Connecting the choice to an explicit rule or calculation step',
      whyItMatters: 'Articulating why an answer is true transforms recognition into durable conceptual mastery.',
      matchedExplanation: `Because your explanation was very brief, we want to make sure your thinking is completely solid rather than making assumptions about your thought process.`,
      clarifyingOrGuidingQuestion: isCorrect
        ? 'Could you describe in one short sentence what rule or formula confirmed this was the right choice?'
        : 'What key word or condition in the question prompted you to pick this option?',
      teachingRecommendation: {
        approach: 'guiding_question',
        approachLabel: 'Clarifying Check',
        guidanceText: 'Ask a targeted follow-up question to distinguish genuine mastery from memorized guesswork.',
        suggestedAction: 'Ask for a one-sentence rationale before advancing.',
      },
      confidence: 'Tentative',
    };
  }

  // If Correct
  if (isCorrect) {
    // Check if reasoning demonstrates thorough understanding or incomplete
    const hasRuleOrFormula =
      cleanedText.includes('formula') ||
      cleanedText.includes('because') ||
      cleanedText.includes('equal') ||
      cleanedText.includes('/') ||
      cleanedText.includes('+') ||
      cleanedText.includes('*') ||
      cleanedText.includes('rule') ||
      cleanedText.includes('state') ||
      cleanedText.includes('transition') ||
      cleanedText.includes('sample space') ||
      cleanedText.includes('favorable') ||
      cleanedText.includes('divide') ||
      cleanedText.includes('force') ||
      cleanedText.includes('membrane') ||
      cleanedText.includes('bond') ||
      wordCount >= 10;

    if (hasRuleOrFormula) {
      return {
        questionId: question.id,
        conceptTested: question.conceptTested,
        selectedOptionIndex,
        correctAnswerIndex: question.correctAnswerIndex,
        isAnswerCorrect: true,
        studentReasoning: reasoningText,
        reasoningCategory: 'correct_sound',
        categoryLabel: REASONING_CATEGORY_META.correct_sound.label,
        whatWasUnderstood: `Your reasoning accurately identified the core governing principle of ${question.conceptTested}.`,
        whyItMatters: 'Sound conceptual reasoning allows you to generalize this rule to novel and harder problems.',
        matchedExplanation: `Excellent work! Your explanation matches the formal principle: ${question.explanation}`,
        targetedExampleOrVisual: isProbStat
          ? 'Data Tabulation: Σx = 150, N = 5 ⟹ μ = 30. Deviations sum to exactly 0.'
          : isAutomata
          ? 'δ(q₀, 0) = q₁, δ(q₁, 1) = q₂ ∈ F. String successfully recognized.'
          : 'Principle verified and reinforced.',
        teachingRecommendation: {
          approach: 'challenge_application',
          approachLabel: 'Challenge Application',
          guidanceText: 'Reinforce success with a more rigorous edge-case application or advance to the next roadmap milestone.',
          suggestedAction: 'Advance to the next concept milestone with confidence.',
        },
        confidence: 'High',
      };
    } else {
      return {
        questionId: question.id,
        conceptTested: question.conceptTested,
        selectedOptionIndex,
        correctAnswerIndex: question.correctAnswerIndex,
        isAnswerCorrect: true,
        studentReasoning: reasoningText,
        reasoningCategory: 'correct_incomplete',
        categoryLabel: REASONING_CATEGORY_META.correct_incomplete.label,
        whatWasUnderstood: `You arrived at the right answer, showing good intuition for ${question.conceptTested}.`,
        stepNeedingAttention: 'Making the formal mathematical or conceptual rule explicit',
        whyItMatters: 'Intuition is valuable, but exams and advanced topics require stating the exact mechanism so you don\'t get tripped up by edge cases.',
        matchedExplanation: `You have the right conclusion, but let's connect the final piece: ${question.explanation}`,
        clarifyingOrGuidingQuestion: 'Can you state what specific rule or formula connects your first step to this final answer?',
        teachingRecommendation: {
          approach: 'step_by_step',
          approachLabel: 'Deepen the Missing Step',
          guidanceText: 'Prompt the student to explain the bridging step between their intuition and the formal rule.',
          suggestedAction: 'Ask for the missing mechanism step rather than marking the answer wrong.',
        },
        confidence: 'Moderate',
      };
    }
  }

  // If Incorrect
  // Check for procedural/calculation slip
  const indicatesMathError =
    (cleanedText.includes('added') || cleanedText.includes('divided') || cleanedText.includes('got') || cleanedText.includes('calculated')) &&
    (cleanedText.includes('sum') || cleanedText.includes('total') || cleanedText.includes('multiply') || cleanedText.includes('subtracted'));

  if (indicatesMathError && isProbStat) {
    return {
      questionId: question.id,
      conceptTested: question.conceptTested,
      selectedOptionIndex,
      correctAnswerIndex: question.correctAnswerIndex,
      isAnswerCorrect: false,
      studentReasoning: reasoningText,
      reasoningCategory: 'incorrect_procedural',
      categoryLabel: REASONING_CATEGORY_META.incorrect_procedural.label,
      whatWasUnderstood: 'Your conceptual formulation was sound: you correctly recognized which quantities needed to be summed and divided.',
      stepNeedingAttention: 'Arithmetic verification during quotient or summation',
      whyItMatters: 'You don\'t need to reteach the whole concept—your mathematical logic was right, just double-check the arithmetic!',
      matchedExplanation: `Your formula setup was correct! For instance, if summing [10, 20, 30, 40, 50], check that the sum is 150, and dividing by N=5 yields 30.`,
      targetedExampleOrVisual: 'Calculation Check: Sum = 150. Count = 5. Quotient = 150 / 5 = 30.',
      clarifyingOrGuidingQuestion: 'If you recompute the division step carefully, what value do you get?',
      teachingRecommendation: {
        approach: 'step_by_step',
        approachLabel: 'Calculation Recalibration',
        guidanceText: 'Highlight the arithmetic step without reteaching the concept from scratch.',
        suggestedAction: 'Offer a 1-click re-try focused purely on the calculation verification.',
      },
      confidence: 'Moderate',
    };
  }

  // Misinterpretation of question
  const indicatesMisinterpretation =
    cleanedText.includes('thought it asked') ||
    cleanedText.includes('assumed') ||
    cleanedText.includes('thought the question') ||
    cleanedText.includes('opposite') ||
    cleanedText.includes('not');

  if (indicatesMisinterpretation) {
    return {
      questionId: question.id,
      conceptTested: question.conceptTested,
      selectedOptionIndex,
      correctAnswerIndex: question.correctAnswerIndex,
      isAnswerCorrect: false,
      studentReasoning: reasoningText,
      reasoningCategory: 'incorrect_misinterpretation',
      categoryLabel: REASONING_CATEGORY_META.incorrect_misinterpretation.label,
      whatWasUnderstood: 'Your logic was internally consistent for the scenario you had in mind.',
      stepNeedingAttention: 'Parsing the exact constraint in the question prompt',
      whyItMatters: 'In technical fields, subtle condition words like "at least", "mutually exclusive", or "accepting state" drastically change the valid solution set.',
      matchedExplanation: `Take a look at the phrasing: the question asked for ${question.conceptTested}, not its complement or unconstrained variant. ${question.explanation}`,
      targetedExampleOrVisual: 'Condition Contrast: What the question asked vs What was assumed.',
      clarifyingOrGuidingQuestion: 'Notice the constraint in the prompt: how does re-reading that change the set of valid outcomes?',
      teachingRecommendation: {
        approach: 'contrast_misconception',
        approachLabel: 'Premise Contrast',
        guidanceText: 'Contrast the student\'s assumed premise with the exact prompt requirements side-by-side.',
        suggestedAction: 'Re-read the question condition together and retry.',
      },
      confidence: 'Moderate',
    };
  }

  // Default Incorrect: Conceptual Misunderstanding
  return {
    questionId: question.id,
    conceptTested: question.conceptTested,
    selectedOptionIndex,
    correctAnswerIndex: question.correctAnswerIndex,
    isAnswerCorrect: false,
    studentReasoning: reasoningText,
    reasoningCategory: 'incorrect_conceptual',
    categoryLabel: REASONING_CATEGORY_META.incorrect_conceptual.label,
    whatWasUnderstood: `I can see how you approached this based on your reasoning: "${reasoningText.slice(0, 80)}${reasoningText.length > 80 ? '...' : ''}".`,
    stepNeedingAttention: `Distinguishing the governing principle of ${question.conceptTested}`,
    whyItMatters: `Understanding the difference between the actual rule and this assumption ensures you can solve all related problems.`,
    matchedExplanation: `Here is the key insight: ${question.explanation}`,
    targetedExampleOrVisual: isProbStat
      ? '🎲 Distinction: Total Sample Space S vs Favorable Event E. P(E) = n(E) / n(S).'
      : isAutomata
      ? 'State Transition δ: A string is only accepted if the final state reached is in the accepting set F.'
      : isBio
      ? 'Biological Function: Enzymes do not alter equilibrium; they lower the activation energy barrier.'
      : 'Targeted visual principle breakdown.',
    clarifyingOrGuidingQuestion: isProbStat
      ? 'What is the full list of all possible outcomes before we count the favorable ones?'
      : 'What is the final state reached after consuming the last symbol of the string?',
    teachingRecommendation: {
      approach: 'contrast_misconception',
      approachLabel: 'Targeted Concept Contrast',
      guidanceText: 'Present a clear real-world analogy and contrast the mistaken assumption with the true principle.',
      suggestedAction: 'Explore a targeted example, then try a similar question to verify understanding.',
    },
    confidence: 'Moderate',
  };
}

/**
 * Generate a follow-up verification question testing the exact same underlying concept
 */
export function generateFollowUpVerificationQuestion(params: {
  originalQuestion: QuizQuestion;
  reasoningCategory: ReasoningCategory;
  subject: string;
  topic: string;
}): QuizQuestion {
  const { originalQuestion, subject, topic } = params;
  const sLower = subject.toLowerCase();
  const tLower = topic.toLowerCase();
  const qLower = originalQuestion.question.toLowerCase();

  // Probability & Statistics Follow-up
  if (sLower.includes('prob') || sLower.includes('stat') || tLower.includes('prob') || tLower.includes('mean') || tLower.includes('deviation')) {
    if (qLower.includes('die') || qLower.includes('dice') || qLower.includes('favorable') || qLower.includes('probability')) {
      return {
        id: `followup-${Date.now()}`,
        question: `Follow-up Check: In rolling a fair 6-sided die, what is the probability of rolling an EVEN number {2, 4, 6}?`,
        options: [
          '3/6 = 1/2 (50%)',
          '1/6 (≈ 16.7%)',
          '2/6 = 1/3 (≈ 33.3%)',
          '4/6 = 2/3 (≈ 66.7%)',
        ],
        correctAnswerIndex: 0,
        explanation: 'The sample space S has 6 total outcomes {1, 2, 3, 4, 5, 6}. Favorable event E = {2, 4, 6} has 3 outcomes. P(Even) = 3 / 6 = 1/2.',
        conceptTested: 'Sample Space & Favorable Outcomes',
        difficulty: 'easy',
      };
    }
    if (qLower.includes('mean') || qLower.includes('average')) {
      return {
        id: `followup-${Date.now()}`,
        question: `Follow-up Check: A student scored 20, 30, and 40 on three tests. What is the mean score?`,
        options: [
          '30',
          '25',
          '90',
          '35',
        ],
        correctAnswerIndex: 0,
        explanation: 'Sum = 20 + 30 + 40 = 90. Count N = 3. Mean = 90 / 3 = 30.',
        conceptTested: 'Arithmetic Mean Calculation',
        difficulty: 'easy',
      };
    }
    if (qLower.includes('deviation') || qLower.includes('spread') || qLower.includes('variance')) {
      return {
        id: `followup-${Date.now()}`,
        question: `Follow-up Check: If every student in a class scores exactly 85 out of 100 on an exam, what is the standard deviation?`,
        options: [
          '0 (Zero spread because all values equal the mean)',
          '85',
          '1',
          'Cannot be calculated',
        ],
        correctAnswerIndex: 0,
        explanation: 'When every observation is identical, deviation from the mean (85 - 85) is 0 for all students. σ = √0 = 0.',
        conceptTested: 'Standard Deviation Definition of Spread',
        difficulty: 'medium',
      };
    }
  }

  // Automata / Computer Science Follow-up
  if (sLower.includes('comp') || tLower.includes('automata') || tLower.includes('dfa')) {
    return {
      id: `followup-${Date.now()}`,
      question: `Follow-up Check: In a DFA, what condition must be true for a string w to be formally accepted?`,
      options: [
        'The transition path halts in an accepting (final) state after reading all symbols of w',
        'The transition path visits every state in Q at least once',
        'The transition path loops infinitely',
        'The input string w is empty',
      ],
      correctAnswerIndex: 0,
      explanation: 'Language acceptance requires that after the machine reads the entire input string from start state q₀, the final state reached is in F (accepting states).',
      conceptTested: 'DFA String Acceptance Criteria',
      difficulty: 'easy',
    };
  }

  // Biology Follow-up
  if (sLower.includes('bio') || tLower.includes('photo') || tLower.includes('cell')) {
    return {
      id: `followup-${Date.now()}`,
      question: `Follow-up Check: Which specialized cellular organelle contains chlorophyll thylakoids where the light-dependent reactions take place?`,
      options: [
        'Chloroplast',
        'Mitochondria',
        'Ribosome',
        'Golgi Apparatus',
      ],
      correctAnswerIndex: 0,
      explanation: 'Photosynthesis takes place within plant chloroplasts, with light reactions embedded in thylakoid membranes.',
      conceptTested: 'Photosynthetic Organelle Structure',
      difficulty: 'easy',
    };
  }

  // Generic fallback follow-up
  return {
    id: `followup-${Date.now()}`,
    question: `Follow-up Check: Which statement best reflects the fundamental principle of ${originalQuestion.conceptTested}?`,
    options: [
      `Applying the core definition systematically from baseline conditions.`,
      `Ignoring boundary conditions and guessing the output.`,
      `Assuming every problem shares the same fixed numerical answer.`,
      `Treating all variables as completely interchangeable.`,
    ],
    correctAnswerIndex: 0,
    explanation: originalQuestion.explanation,
    conceptTested: originalQuestion.conceptTested,
    difficulty: 'easy',
  };
}

/**
 * Update the persistent concept reasoning profile
 */
export function updateConceptReasoningProfile(
  existingProfile: ConceptReasoningProfile | undefined,
  evaluation: QuestionReasoningEvaluation,
  conceptId: string,
  conceptTitle: string,
  subject: string,
  topic: string
): ConceptReasoningProfile {
  const profile: ConceptReasoningProfile = existingProfile
    ? { ...existingProfile }
    : {
        conceptId,
        conceptTitle,
        subject,
        topic,
        lastAssessedAt: new Date().toISOString(),
        totalAttempts: 0,
        soundReasoningCount: 0,
        demonstratedWithSoundReasoning: false,
        understandsNeedsPractice: false,
        possibleMisconceptionsToVerify: [],
        repeatedProceduralDifficulties: [],
        recommendedNextStep: '',
        confidenceLevel: 'Tentative',
        evaluations: [],
      };

  profile.totalAttempts += 1;
  profile.lastAssessedAt = new Date().toISOString();
  profile.recentReasoningCategory = evaluation.reasoningCategory;
  profile.evaluations = [evaluation, ...(profile.evaluations || []).slice(0, 9)];

  if (evaluation.reasoningCategory === 'correct_sound') {
    profile.soundReasoningCount += 1;
  }

  // Determine demonstrated mastery status
  if (profile.soundReasoningCount >= 2) {
    profile.demonstratedWithSoundReasoning = true;
    profile.understandsNeedsPractice = false;
    profile.confidenceLevel = 'High';
    profile.recommendedNextStep = `Advance to next roadmap milestone for ${conceptTitle}`;
  } else if (evaluation.isAnswerCorrect || evaluation.reasoningCategory === 'correct_incomplete') {
    profile.understandsNeedsPractice = true;
    profile.confidenceLevel = 'Moderate';
    profile.recommendedNextStep = `Practice explaining the formal intermediate step in ${conceptTitle}`;
  } else {
    profile.confidenceLevel = 'Moderate';
    if (evaluation.reasoningCategory === 'incorrect_procedural') {
      if (!profile.repeatedProceduralDifficulties.includes(evaluation.conceptTested)) {
        profile.repeatedProceduralDifficulties.push(evaluation.conceptTested);
      }
      profile.recommendedNextStep = `Verify calculation and arithmetic execution in ${conceptTitle}`;
    } else if (evaluation.reasoningCategory === 'incorrect_conceptual') {
      if (!profile.possibleMisconceptionsToVerify.includes(evaluation.conceptTested)) {
        profile.possibleMisconceptionsToVerify.push(evaluation.conceptTested);
      }
      profile.recommendedNextStep = `Review conceptual distinction in ${conceptTitle} with an everyday analogy`;
    } else {
      profile.recommendedNextStep = `Walk through step 1 of ${conceptTitle} with the AI Tutor`;
    }
  }

  return profile;
}
