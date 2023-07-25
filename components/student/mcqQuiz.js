import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";

const questions = [
  {
    id: 1,
    question: 'Find limits.\n $$\\lim_{{x \\to -1}} 3(2x-1)^2$$',
    options: [
      '9',
      '27',
      '0',
      '3'
    ],
    answer: ['9']
  },
  {
    id: 2,
    question: 'Find limits.\n $$\\lim_{{h \\to 0}} \\frac{{\\sqrt{5h+4}-2}}{{h}}$$',
    options: [
      '0',
      '∞',
      '2/5',
      '5/4'
    ],
    answer: ['5/4']
  },
  {
    id: 3,
    question: 'Find limits.\n $$\\lim_{{u \\to 1}} \\frac{{u^4-1}}{{u^3-1}}$$',
    options: [
      '2/3',
      '0',
      '3/4',
      '4/3'
    ],
    answer: ['4/3']
  },
  {
    id: 4,
    question: 'Find the points where the given functions are discontinuous.\n $$y = \\frac{1}{{x-2}} - 3x$$ x is discontinuous at:',
    options: [
      '0',
      '1',
      '2',
      '4'
    ],
    answer: ['2']
  },
  {
    id: 5,
    question: 'Find the points where the given functions are discontinuous.\n $$y = \\frac{{x+3}}{{x^2-3x+10}}$$  x is discontinuous at:',
    options: [
      '-3',
      '-2',
      '2',
      '5'
    ],
    answer: ['-3']
  },
  {
    id: 6,
    question: 'Find $$y^4 = \\frac{{d^4y}}{{dx^4}}$$; if y = -2 Sinx',
    options: [
      '$$\\frac{{d^2y}}{{dx^2}} = 2 Sinx$$',
      '$$\\frac{{d^2y}}{{dx^2}} = -2 Sinx$$',
      '$$\\frac{{d^4y}}{{dx^4}} = 2 Sinx$$',
      '$$\\frac{{d^4y}}{{dx^4}} = -2 Sinx$$',
      '$$\\frac{{d^3y}}{{dx^3}} = -2 Sinx$$',
      '$$\\frac{{d^3y}}{{dx^3}} = 2 Cosx$$'
    ],
    answer: [
      '$$\\frac{{d^2y}}{{dx^2}} = -2 Sinx$$',
      '$$\\frac{{d^4y}}{{dx^4}} = -2 Sinx$$',
      '$$\\frac{{d^3y}}{{dx^3}} = -2 Sinx$$'
    ]
  },
  {
    id: 7,
    question: 'Find $$y^4 = \\frac{{d^4y}}{{dx^4}}$$; if y = 9Cosx',
    options: [
      '$$\\frac{{d^3y}}{{dx^3}} = 9 Sinx$$',
      '$$\\frac{{d^3y}}{{dx^3}} = -9 Cosx$$',
      '$$\\frac{{d^4y}}{{dx^4}} = 9 Cosx$$',
      '$$\\frac{{d^4y}}{{dx^4}} = -9 Sinx$$',
      '$$\\frac{{d^2y}}{{dx^2}} = -9 Sinx$$',
      '$$\\frac{{d^2y}}{{dx^2}} = -9Cosx$$'
    ],
    answer: [
      '$$\\frac{{d^3y}}{{dx^3}} = -9 Cosx$$',
      '$$\\frac{{d^4y}}{{dx^4}} = -9 Sinx$$',
      '$$\\frac{{d^2y}}{{dx^2}} = -9 Sinx$$'
    ]
  }
];

const Quiz = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const questionRef = useRef(null);
  const optionsRef = useRef([]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: questions[currentQuestion].id, answer: value }
      ]);
    } else {
      setUserAnswers((prevAnswers) =>
        prevAnswers.filter(
          (answer) => answer.questionId !== questions[currentQuestion].id
        )
      );
    }
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleBack = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleSubmit = () => {
    let score = 0;
    userAnswers.forEach((userAnswer) => {
      const question = questions.find(
        (q) => q.id === userAnswer.questionId
      );
      if (
        question.answer.every((answer) =>
          userAnswer.answer.includes(answer)
        )
      ) {
        score++;
      }
    });

    alert(`Your total score is ${score}/${questions.length}`);
    // router.push({
    //   pathname: "/student/exam",
    //   //query: { returnUrl: router.asPath },
    // });
    window.location = "/student/examselect";
  };

  useEffect(() => {
    // Update MathJax whenever the current question changes
    if (typeof window !== 'undefined' && window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, questionRef.current]);
    }
    if (optionsRef.current.length > 0) {
      optionsRef.current.forEach((optionRef) => {
        if (optionRef && window.MathJax) {
          window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, optionRef]);
        }
      });
    }
  }, [currentQuestion]);


  const { question, options } = questions[currentQuestion];

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded shadow">
      <Head>
        <script
          type="text/javascript"
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
        />
      </Head>
      
      <h2 className="text-xl font-semibold mb-4" ref={questionRef}>
        <span dangerouslySetInnerHTML={{ __html: question }} />
      </h2>
      
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`question-${currentQuestion}`}
                value={option}
                onChange={handleOptionChange}
                checked={
                  userAnswers.some(
                    (answer) =>
                      answer.questionId === questions[currentQuestion].id &&
                      answer.answer.includes(option)
                  )
                }
                className="mr-2"
              />
              <span ref={(el) => (optionsRef.current[index] = el)}>{option}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <button
          disabled={currentQuestion === 0}
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Back
        </button>
        <button
          disabled={currentQuestion === questions.length - 1}
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Next
        </button>
        {currentQuestion === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
