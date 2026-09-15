'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

type Answer = { label: string; course: string };

const questions: Array<{ question: string; help: string; answers: Answer[] }> =
  [
    {
      question: 'What would you most enjoy creating?',
      help: 'Choose the result that sounds most exciting—not the subject you already know.',
      answers: [
        { label: 'Useful apps and games', course: 'python-foundations' },
        {
          label: 'Systems that predict and classify',
          course: 'ai-machine-learning',
        },
        { label: 'AI assistants that plan and act', course: 'agentic-ai-lab' },
        {
          label: 'Stories and insights from data',
          course: 'data-science-studio',
        },
      ],
    },
    {
      question: 'How comfortable are you with Python?',
      help: 'There is no wrong answer. This helps us recommend the right starting point.',
      answers: [
        { label: 'I am completely new', course: 'python-foundations' },
        { label: 'I know the basics', course: 'ai-machine-learning' },
        { label: 'I can build small projects', course: 'agentic-ai-lab' },
        {
          label: 'I mainly want to analyse data',
          course: 'data-science-studio',
        },
      ],
    },
    {
      question: 'Which learning style sounds most like you?',
      help: 'Your answer helps break a tie between two possible paths.',
      answers: [
        {
          label: 'Start slowly and build confidence',
          course: 'python-foundations',
        },
        { label: 'Experiment with models', course: 'ai-machine-learning' },
        { label: 'Build ambitious AI workflows', course: 'agentic-ai-lab' },
        { label: 'Investigate real datasets', course: 'data-science-studio' },
      ],
    },
  ];

const courses: Record<string, { title: string; copy: string }> = {
  'python-foundations': {
    title: 'Python Foundations',
    copy: 'Start with strong coding fundamentals and finish with working applications.',
  },
  'ai-machine-learning': {
    title: 'AI & Machine Learning',
    copy: 'Learn how models work, how to evaluate them and how to build responsible predictions.',
  },
  'agentic-ai-lab': {
    title: 'Agentic AI Lab',
    copy: 'Create AI systems that use tools, retain context and complete multi-step tasks.',
  },
  'data-science-studio': {
    title: 'Data Science Studio',
    copy: 'Turn raw information into clear analysis, visual stories and useful decisions.',
  },
};

export function LearningQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const finished = step === questions.length;
  const recommendation = Object.keys(courses).reduce(
    (best, slug) => ((scores[slug] ?? 0) > (scores[best] ?? 0) ? slug : best),
    'python-foundations',
  );

  function choose(course: string) {
    setScores((current) => ({
      ...current,
      [course]: (current[course] ?? 0) + 1,
    }));
    setStep((current) => current + 1);
  }

  function reset() {
    setScores({});
    setStep(0);
  }

  return (
    <div className="quiz-card">
      {!finished ? (
        <>
          <div
            className="quiz-progress"
            aria-label={`Question ${step + 1} of ${questions.length}`}
          >
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <div>
              <i
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <h3>{questions[step].question}</h3>
          <p>{questions[step].help}</p>
          <div className="quiz-options">
            {questions[step].answers.map((answer) => (
              <button
                type="button"
                key={answer.label}
                onClick={() => choose(answer.course)}
              >
                <span>{answer.label}</span>
                <ArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-result" aria-live="polite">
          <span className="result-icon">
            <Sparkles aria-hidden="true" />
          </span>
          <small>Your suggested starting point</small>
          <h3>{courses[recommendation].title}</h3>
          <p>{courses[recommendation].copy}</p>
          <div className="result-actions">
            <Link
              className="primary-button"
              href={`/courses/${recommendation}`}
            >
              Explore this course <ArrowRight aria-hidden="true" />
            </Link>
            <button type="button" className="reset-button" onClick={reset}>
              <RotateCcw aria-hidden="true" /> Retake quiz
            </button>
          </div>
          <p className="quiz-disclaimer">
            <CheckCircle2 aria-hidden="true" /> Not sure? The free demo includes
            a personal course recommendation.
          </p>
        </div>
      )}
    </div>
  );
}
