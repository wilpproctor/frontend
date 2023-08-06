import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import AnswerInput from '../AnswerInput';

// const questions = [
//   {
//     id: 1,
//     question: 'Find limits.\n $$\\lim_{{x \\to -1}} 3(2x-1)^2$$',
//     options: [
//       '9',
//       '27',
//       '0',
//       '3'
//     ],
//     answer: ['9']
//   },
//   {
//     id: 2,
//     question: 'Find limits.\n $$\\lim_{{h \\to 0}} \\frac{{\\sqrt{5h+4}-2}}{{h}}$$',
//     options: [
//       '0',
//       '∞',
//       '2/5',
//       '5/4'
//     ],
//     answer: ['5/4']
//   },
//   {
//     id: 3,
//     question: 'Find limits.\n $$\\lim_{{u \\to 1}} \\frac{{u^4-1}}{{u^3-1}}$$',
//     options: [
//       '2/3',
//       '0',
//       '3/4',
//       '4/3'
//     ],
//     answer: ['4/3']
//   },
//   {
//     id: 4,
//     question: 'Find the points where the given functions are discontinuous.\n $$y = \\frac{1}{{x-2}} - 3x$$ x is discontinuous at:',
//     options: [
//       '0',
//       '1',
//       '2',
//       '4'
//     ],
//     answer: ['2']
//   },
//   {
//     id: 5,
//     question: 'Find the points where the given functions are discontinuous.\n $$y = \\frac{{x+3}}{{x^2-3x+10}}$$  x is discontinuous at:',
//     options: [
//       '-3',
//       '-2',
//       '2',
//       '5'
//     ],
//     answer: ['-3']
//   },
//   {
//     id: 6,
//     question: 'Find $$y^4 = \\frac{{d^4y}}{{dx^4}}$$; if y = -2 Sinx',
//     options: [
//       '$$\\frac{{d^2y}}{{dx^2}} = 2 Sinx$$',
//       '$$\\frac{{d^2y}}{{dx^2}} = -2 Sinx$$',
//       '$$\\frac{{d^4y}}{{dx^4}} = 2 Sinx$$',
//       '$$\\frac{{d^4y}}{{dx^4}} = -2 Sinx$$',
//       '$$\\frac{{d^3y}}{{dx^3}} = -2 Sinx$$',
//       '$$\\frac{{d^3y}}{{dx^3}} = 2 Cosx$$'
//     ],
//     answer: [
//       '$$\\frac{{d^2y}}{{dx^2}} = -2 Sinx$$',
//       '$$\\frac{{d^4y}}{{dx^4}} = -2 Sinx$$',
//       '$$\\frac{{d^3y}}{{dx^3}} = -2 Sinx$$'
//     ]
//   },
//   {
//     id: 7,
//     question: 'Find $$y^4 = \\frac{{d^4y}}{{dx^4}}$$; if y = 9Cosx',
//     options: [
//       '$$\\frac{{d^3y}}{{dx^3}} = 9 Sinx$$',
//       '$$\\frac{{d^3y}}{{dx^3}} = -9 Cosx$$',
//       '$$\\frac{{d^4y}}{{dx^4}} = 9 Cosx$$',
//       '$$\\frac{{d^4y}}{{dx^4}} = -9 Sinx$$',
//       '$$\\frac{{d^2y}}{{dx^2}} = -9 Sinx$$',
//       '$$\\frac{{d^2y}}{{dx^2}} = -9Cosx$$'
//     ],
//     answer: [
//       '$$\\frac{{d^3y}}{{dx^3}} = -9 Cosx$$',
//       '$$\\frac{{d^4y}}{{dx^4}} = -9 Sinx$$',
//       '$$\\frac{{d^2y}}{{dx^2}} = -9 Sinx$$'
//     ]
//   }
// ];

const Quiz = () => {
  const router = useRouter();
  const { examId } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentid, setCurrentid]=useState("");
  const [perviousid, setPreviousid]=useState("");
  const [nextid, setNextid]=useState("");
  const questionRef = useRef(null);
  const optionsRef = useRef([]);
  const [examdata, setExamdata]=useState({});
  const [currInd, setCurrInd] = useState(0);
  const [loading,setLoading]=useState(true);
  const [question, setQuestion]=useState("");
  const [options, setOptions]=useState("");
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (text) => {
    setAnswer(text);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://exambackend-khqy.onrender.com/api/exams",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": sessionStorage.getItem("cookie")
            },
          }
        );
        const data = await response.json(); // Parse the response JSON
        console.log(data, "Exams");
        console.log(data["scheduledExaminations"][5]["questionsList"],"holla");
        let questiondata=data["scheduledExaminations"][5]["questionsList"];
        setExamdata(questiondata);
        try{
          let questionid=questiondata[currInd];
          setNextid(questiondata[1]);
          const response1 = await fetch(
            "https://exambackend-khqy.onrender.com/api/question/"+questionid,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization": sessionStorage.getItem("cookie")
              },
            }
          );
          const data1 = await response1.json();
            console.log(data1,"data1");
            setCurrentQuestion(data1);
            setQuestion(data1.question.content);
            setOptions(data1.question.options);
            setLoading(false);
        }catch(e){
          setLoading(false);
          console.log(e);
        }
        //response.map(x=>{
          //   if(x.userID["$oid"]===userid){
          //     const questionarr=x["questionsList"];
          //     questionarr.map((question,i)=>{
          //       questionresponse.map(y=>{
          //         if(y["_id"]["$oid"]===x){
          //           let obj;
          //           obj["id"]= i
          //           obj["question"]= y["content"],
          //           options= y[
          //             "options"
          //           ],
          //           answer= ['9']
    
          //         }
                 
          //       })
          //     })
          //   }
          // })
      } catch (e) {   setLoading(false);
        console.log(e);
      }
    };
  
    fetchData();
  }, []);

  const handleOptionChange = (e) => {
    // const { value, checked } = e.target;
    // if (checked) {
    //   setUserAnswers((prevAnswers) => [
    //     ...prevAnswers,
    //     { questionId: questions[currentQuestion].id, answer: value }
    //   ]);
    // } else {
    //   setUserAnswers((prevAnswers) =>
    //     prevAnswers.filter(
    //       (answer) => answer.questionId !== questions[currentQuestion].id
    //     )
    //   );
    // }
  };
  console.log("useranswer",userAnswers);
  const handleNext =async () => {
    setAnswer("");
    setCurrInd((currInd) => {
     return currInd+1; 
    })
    setUserAnswers((prevAnswers) => [
           ...prevAnswers,
           { question: question, answer: answer }
         ]);
         try{
         setLoading(true);
          let questionid=examdata[currInd];
          const response1 = await fetch(
            "https://exambackend-khqy.onrender.com/api/question/"+questionid,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization": sessionStorage.getItem("cookie")
              },
            }
          );
          const data1 = await response1.json();
            console.log(data1,"data1");
            setCurrentQuestion(data1);
            setQuestion(data1.question.content);
            setOptions(data1.question.options);
            setLoading(false);
        }catch(e){
          setLoading(false);
          console.log(e);
        }
    //setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleBack = async() => {
    setAnswer("");
    setCurrInd((currInd) => {
      return currInd-1; 
     })
    // setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: question, answer: answer }
    ]);
    try{
    setLoading(true);
     let questionid=examdata[currInd];
     const response1 = await fetch(
       "https://exambackend-khqy.onrender.com/api/question/"+questionid,
       {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           "authorization": sessionStorage.getItem("cookie")
         },
       }
     );
     const data1 = await response1.json();
       console.log(data1,"data1");
       setCurrentQuestion(data1);
       setQuestion(data1.question.content);
       setOptions(data1.question.options);
       setLoading(false);
   }catch(e){
     setLoading(false);
     console.log(e);
   }
  };

  const handleSubmit = () => {
    let score = 0;
    // userAnswers.forEach((userAnswer) => {
    //   const question = questions.find(
    //     (q) => q.id === userAnswer.questionId
    //   );
    //   if (
    //     question.answer.every((answer) =>
    //       userAnswer.answer.includes(answer)
    //     )
    //   ) {
    //     score++;
    //   }
    // });

    // alert(`Your total score is ${score}/${questions.length}`);
    // router.push({
    //   pathname: "/student/exam",
    //   //query: { returnUrl: router.asPath },
    // });
    alert(`Your response has been saved`);
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


  //const { question, options } = questions[currentQuestion];
  console.log(options,"options111");
  return (
   !loading&&
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded shadow">
      <Head>
        <script
          type="text/javascript"
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
        />
      </Head>
      
      {/* <h2 className="text-xl font-semibold mb-4" ref={questionRef}>
        <span dangerouslySetInnerHTML={{ __html: question }} />
      </h2> */}
      <h2 className="text-xl font-semibold mb-4">
       {question}
      </h2>
      {typeof(options)==="string"&&<div>
      <h1>Write Your Answer</h1>
      <AnswerInput onChange={handleAnswerChange} value={answer} />
    </div>}
      {/* <ul>
        {options&&options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`question-${currentQuestion}`}
                value={option}
                onChange={handleOptionChange}
                checked={true}
                // checked={
                //   userAnswers.some(
                //     (answer) =>
                //       // answer.questionId === questions[currentQuestion].id &&
                //       // answer.answer.includes(option)
                //   )
                // }
                className="mr-2"
              />
              <span ref={(el) => (optionsRef.current[index] = el)}>{option}</span>
            </label>
          </li>
        ))}
      </ul> */}

      <div className="mt-8">
        <button
          disabled={currInd === 0}
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Back
        </button>
        <button
         disabled={currInd === examdata.length - 1}
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Next
        </button>
        {currentQuestion
        //  === questions.length - 1
          && (
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


   // const response= [{
        //   "_id": {
        //     "$oid": "64c62245c5081a4b3747eb76"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c62244c5081a4b3747eb72",
        //     "64c62245c5081a4b3747eb74"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:41:41.182Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:41:41.182Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622a9c5081a4b3747eb7e"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c622a9c5081a4b3747eb7a",
        //     "64c622a9c5081a4b3747eb7c"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:21.695Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:21.695Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb88"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c622b0c5081a4b3747eb84",
        //     "64c622b0c5081a4b3747eb86"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.384Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.384Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb8e"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c622b0c5081a4b3747eb8a",
        //     "64c622b0c5081a4b3747eb8c"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.713Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.713Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eb94"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c622b0c5081a4b3747eb90",
        //     "64c622b0c5081a4b3747eb92"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.065Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.065Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eb9a"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c622b1c5081a4b3747eb96",
        //     "64c622b1c5081a4b3747eb98"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.404Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.404Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eba0"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c622b1c5081a4b3747eb9c",
        //     "64c622b1c5081a4b3747eb9e"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.736Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.736Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b2c5081a4b3747eba6"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c622b1c5081a4b3747eba2",
        //     "64c622b1c5081a4b3747eba4"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:30.085Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:30.085Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62581c5081a4b3747ebe9"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c62581c5081a4b3747ebe5",
        //     "64c62581c5081a4b3747ebe7"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:29.882Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:29.882Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebef"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c62581c5081a4b3747ebeb",
        //     "64c62582c5081a4b3747ebed"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.213Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.213Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebf5"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c62582c5081a4b3747ebf1",
        //     "64c62582c5081a4b3747ebf3"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.546Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.546Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebfb"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c62582c5081a4b3747ebf7",
        //     "64c62582c5081a4b3747ebf9"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.901Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.901Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62583c5081a4b3747ec01"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c62583c5081a4b3747ebfd",
        //     "64c62583c5081a4b3747ebff"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:31.260Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:31.260Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62583c5081a4b3747ec07"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c62583c5081a4b3747ec03",
        //     "64c62583c5081a4b3747ec05"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:31.602Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:31.602Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec5c"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c62653c5081a4b3747ec3e",
        //     "64c62653c5081a4b3747ec40",
        //     "64c62653c5081a4b3747ec42",
        //     "64c62653c5081a4b3747ec44",
        //     "64c62653c5081a4b3747ec46",
        //     "64c62653c5081a4b3747ec48",
        //     "64c62654c5081a4b3747ec4a",
        //     "64c62654c5081a4b3747ec4c",
        //     "64c62654c5081a4b3747ec4e",
        //     "64c62654c5081a4b3747ec50",
        //     "64c62654c5081a4b3747ec52",
        //     "64c62654c5081a4b3747ec54",
        //     "64c62654c5081a4b3747ec56",
        //     "64c62654c5081a4b3747ec58",
        //     "64c62654c5081a4b3747ec5a"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.043Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.043Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec7c"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c62655c5081a4b3747ec5e",
        //     "64c62655c5081a4b3747ec60",
        //     "64c62655c5081a4b3747ec62",
        //     "64c62655c5081a4b3747ec64",
        //     "64c62655c5081a4b3747ec66",
        //     "64c62655c5081a4b3747ec68",
        //     "64c62655c5081a4b3747ec6a",
        //     "64c62655c5081a4b3747ec6c",
        //     "64c62656c5081a4b3747ec6e",
        //     "64c62656c5081a4b3747ec70",
        //     "64c62656c5081a4b3747ec72",
        //     "64c62656c5081a4b3747ec74",
        //     "64c62656c5081a4b3747ec76",
        //     "64c62656c5081a4b3747ec78",
        //     "64c62656c5081a4b3747ec7a"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.801Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.801Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec9c"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c62656c5081a4b3747ec7e",
        //     "64c62657c5081a4b3747ec80",
        //     "64c62657c5081a4b3747ec82",
        //     "64c62657c5081a4b3747ec84",
        //     "64c62657c5081a4b3747ec86",
        //     "64c62657c5081a4b3747ec88",
        //     "64c62657c5081a4b3747ec8a",
        //     "64c62657c5081a4b3747ec8c",
        //     "64c62657c5081a4b3747ec8e",
        //     "64c62657c5081a4b3747ec90",
        //     "64c62658c5081a4b3747ec92",
        //     "64c62658c5081a4b3747ec94",
        //     "64c62658c5081a4b3747ec96",
        //     "64c62658c5081a4b3747ec98",
        //     "64c62658c5081a4b3747ec9a"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.618Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.618Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecbc"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c62658c5081a4b3747ec9e",
        //     "64c62658c5081a4b3747eca0",
        //     "64c62658c5081a4b3747eca2",
        //     "64c62659c5081a4b3747eca4",
        //     "64c62659c5081a4b3747eca6",
        //     "64c62659c5081a4b3747eca8",
        //     "64c62659c5081a4b3747ecaa",
        //     "64c62659c5081a4b3747ecac",
        //     "64c62659c5081a4b3747ecae",
        //     "64c62659c5081a4b3747ecb0",
        //     "64c62659c5081a4b3747ecb2",
        //     "64c62659c5081a4b3747ecb4",
        //     "64c6265ac5081a4b3747ecb6",
        //     "64c6265ac5081a4b3747ecb8",
        //     "64c6265ac5081a4b3747ecba"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.386Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.386Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ecdc"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c6265ac5081a4b3747ecbe",
        //     "64c6265ac5081a4b3747ecc0",
        //     "64c6265ac5081a4b3747ecc2",
        //     "64c6265ac5081a4b3747ecc4",
        //     "64c6265ac5081a4b3747ecc6",
        //     "64c6265bc5081a4b3747ecc8",
        //     "64c6265bc5081a4b3747ecca",
        //     "64c6265bc5081a4b3747eccc",
        //     "64c6265bc5081a4b3747ecce",
        //     "64c6265bc5081a4b3747ecd0",
        //     "64c6265bc5081a4b3747ecd2",
        //     "64c6265bc5081a4b3747ecd4",
        //     "64c6265bc5081a4b3747ecd6",
        //     "64c6265bc5081a4b3747ecd8",
        //     "64c6265cc5081a4b3747ecda"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.148Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.148Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecfc"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c6265cc5081a4b3747ecde",
        //     "64c6265cc5081a4b3747ece0",
        //     "64c6265cc5081a4b3747ece2",
        //     "64c6265cc5081a4b3747ece4",
        //     "64c6265cc5081a4b3747ece6",
        //     "64c6265cc5081a4b3747ece8",
        //     "64c6265cc5081a4b3747ecea",
        //     "64c6265dc5081a4b3747ecec",
        //     "64c6265dc5081a4b3747ecee",
        //     "64c6265dc5081a4b3747ecf0",
        //     "64c6265dc5081a4b3747ecf2",
        //     "64c6265dc5081a4b3747ecf4",
        //     "64c6265dc5081a4b3747ecf6",
        //     "64c6265dc5081a4b3747ecf8",
        //     "64c6265dc5081a4b3747ecfa"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.928Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.928Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed1d"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c6267cc5081a4b3747ecff",
        //     "64c6267dc5081a4b3747ed01",
        //     "64c6267dc5081a4b3747ed03",
        //     "64c6267dc5081a4b3747ed05",
        //     "64c6267dc5081a4b3747ed07",
        //     "64c6267dc5081a4b3747ed09",
        //     "64c6267dc5081a4b3747ed0b",
        //     "64c6267dc5081a4b3747ed0d",
        //     "64c6267dc5081a4b3747ed0f",
        //     "64c6267dc5081a4b3747ed11",
        //     "64c6267ec5081a4b3747ed13",
        //     "64c6267ec5081a4b3747ed15",
        //     "64c6267ec5081a4b3747ed17",
        //     "64c6267ec5081a4b3747ed19",
        //     "64c6267ec5081a4b3747ed1b"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.643Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.643Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed3d"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c6267ec5081a4b3747ed1f",
        //     "64c6267ec5081a4b3747ed21",
        //     "64c6267ec5081a4b3747ed23",
        //     "64c6267fc5081a4b3747ed25",
        //     "64c6267fc5081a4b3747ed27",
        //     "64c6267fc5081a4b3747ed29",
        //     "64c6267fc5081a4b3747ed2b",
        //     "64c6267fc5081a4b3747ed2d",
        //     "64c6267fc5081a4b3747ed2f",
        //     "64c6267fc5081a4b3747ed31",
        //     "64c6267fc5081a4b3747ed33",
        //     "64c6267fc5081a4b3747ed35",
        //     "64c62680c5081a4b3747ed37",
        //     "64c62680c5081a4b3747ed39",
        //     "64c62680c5081a4b3747ed3b"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.410Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.410Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed5d"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c62680c5081a4b3747ed3f",
        //     "64c62680c5081a4b3747ed41",
        //     "64c62680c5081a4b3747ed43",
        //     "64c62680c5081a4b3747ed45",
        //     "64c62680c5081a4b3747ed47",
        //     "64c62681c5081a4b3747ed49",
        //     "64c62681c5081a4b3747ed4b",
        //     "64c62681c5081a4b3747ed4d",
        //     "64c62681c5081a4b3747ed4f",
        //     "64c62681c5081a4b3747ed51",
        //     "64c62681c5081a4b3747ed53",
        //     "64c62681c5081a4b3747ed55",
        //     "64c62681c5081a4b3747ed57",
        //     "64c62682c5081a4b3747ed59",
        //     "64c62682c5081a4b3747ed5b"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.240Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.240Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed7d"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c62682c5081a4b3747ed5f",
        //     "64c62682c5081a4b3747ed61",
        //     "64c62682c5081a4b3747ed63",
        //     "64c62682c5081a4b3747ed65",
        //     "64c62682c5081a4b3747ed67",
        //     "64c62682c5081a4b3747ed69",
        //     "64c62683c5081a4b3747ed6b",
        //     "64c62683c5081a4b3747ed6d",
        //     "64c62683c5081a4b3747ed6f",
        //     "64c62683c5081a4b3747ed71",
        //     "64c62683c5081a4b3747ed73",
        //     "64c62683c5081a4b3747ed75",
        //     "64c62683c5081a4b3747ed77",
        //     "64c62683c5081a4b3747ed79",
        //     "64c62683c5081a4b3747ed7b"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.001Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.001Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed9d"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c62684c5081a4b3747ed7f",
        //     "64c62684c5081a4b3747ed81",
        //     "64c62684c5081a4b3747ed83",
        //     "64c62684c5081a4b3747ed85",
        //     "64c62684c5081a4b3747ed87",
        //     "64c62684c5081a4b3747ed89",
        //     "64c62684c5081a4b3747ed8b",
        //     "64c62684c5081a4b3747ed8d",
        //     "64c62684c5081a4b3747ed8f",
        //     "64c62685c5081a4b3747ed91",
        //     "64c62685c5081a4b3747ed93",
        //     "64c62685c5081a4b3747ed95",
        //     "64c62685c5081a4b3747ed97",
        //     "64c62685c5081a4b3747ed99",
        //     "64c62685c5081a4b3747ed9b"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.758Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.758Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62687c5081a4b3747edbd"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c62685c5081a4b3747ed9f",
        //     "64c62685c5081a4b3747eda1",
        //     "64c62686c5081a4b3747eda3",
        //     "64c62686c5081a4b3747eda5",
        //     "64c62686c5081a4b3747eda7",
        //     "64c62686c5081a4b3747eda9",
        //     "64c62686c5081a4b3747edab",
        //     "64c62686c5081a4b3747edad",
        //     "64c62686c5081a4b3747edaf",
        //     "64c62686c5081a4b3747edb1",
        //     "64c62686c5081a4b3747edb3",
        //     "64c62687c5081a4b3747edb5",
        //     "64c62687c5081a4b3747edb7",
        //     "64c62687c5081a4b3747edb9",
        //     "64c62687c5081a4b3747edbb"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:51.527Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:51.527Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747edde"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c626adc5081a4b3747edc0",
        //     "64c626adc5081a4b3747edc2",
        //     "64c626aec5081a4b3747edc4",
        //     "64c626aec5081a4b3747edc6",
        //     "64c626aec5081a4b3747edc8",
        //     "64c626aec5081a4b3747edca",
        //     "64c626aec5081a4b3747edcc",
        //     "64c626aec5081a4b3747edce",
        //     "64c626aec5081a4b3747edd0",
        //     "64c626aec5081a4b3747edd2",
        //     "64c626aec5081a4b3747edd4",
        //     "64c626afc5081a4b3747edd6",
        //     "64c626afc5081a4b3747edd8",
        //     "64c626afc5081a4b3747edda",
        //     "64c626afc5081a4b3747eddc"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.509Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.509Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747edfe"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c626afc5081a4b3747ede0",
        //     "64c626afc5081a4b3747ede2",
        //     "64c626afc5081a4b3747ede4",
        //     "64c626afc5081a4b3747ede6",
        //     "64c626b0c5081a4b3747ede8",
        //     "64c626b0c5081a4b3747edea",
        //     "64c626b0c5081a4b3747edec",
        //     "64c626b0c5081a4b3747edee",
        //     "64c626b0c5081a4b3747edf0",
        //     "64c626b0c5081a4b3747edf2",
        //     "64c626b0c5081a4b3747edf4",
        //     "64c626b0c5081a4b3747edf6",
        //     "64c626b0c5081a4b3747edf8",
        //     "64c626b1c5081a4b3747edfa",
        //     "64c626b1c5081a4b3747edfc"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.309Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.309Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee1e"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c626b1c5081a4b3747ee00",
        //     "64c626b1c5081a4b3747ee02",
        //     "64c626b1c5081a4b3747ee04",
        //     "64c626b1c5081a4b3747ee06",
        //     "64c626b1c5081a4b3747ee08",
        //     "64c626b1c5081a4b3747ee0a",
        //     "64c626b2c5081a4b3747ee0c",
        //     "64c626b2c5081a4b3747ee0e",
        //     "64c626b2c5081a4b3747ee10",
        //     "64c626b2c5081a4b3747ee12",
        //     "64c626b2c5081a4b3747ee14",
        //     "64c626b2c5081a4b3747ee16",
        //     "64c626b2c5081a4b3747ee18",
        //     "64c626b2c5081a4b3747ee1a",
        //     "64c626b3c5081a4b3747ee1c"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.122Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.122Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee3e"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c626b3c5081a4b3747ee20",
        //     "64c626b3c5081a4b3747ee22",
        //     "64c626b3c5081a4b3747ee24",
        //     "64c626b3c5081a4b3747ee26",
        //     "64c626b3c5081a4b3747ee28",
        //     "64c626b3c5081a4b3747ee2a",
        //     "64c626b3c5081a4b3747ee2c",
        //     "64c626b4c5081a4b3747ee2e",
        //     "64c626b4c5081a4b3747ee30",
        //     "64c626b4c5081a4b3747ee32",
        //     "64c626b4c5081a4b3747ee34",
        //     "64c626b4c5081a4b3747ee36",
        //     "64c626b4c5081a4b3747ee38",
        //     "64c626b4c5081a4b3747ee3a",
        //     "64c626b4c5081a4b3747ee3c"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.985Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.985Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee5e"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c626b5c5081a4b3747ee40",
        //     "64c626b5c5081a4b3747ee42",
        //     "64c626b5c5081a4b3747ee44",
        //     "64c626b5c5081a4b3747ee46",
        //     "64c626b5c5081a4b3747ee48",
        //     "64c626b5c5081a4b3747ee4a",
        //     "64c626b5c5081a4b3747ee4c",
        //     "64c626b5c5081a4b3747ee4e",
        //     "64c626b5c5081a4b3747ee50",
        //     "64c626b6c5081a4b3747ee52",
        //     "64c626b6c5081a4b3747ee54",
        //     "64c626b6c5081a4b3747ee56",
        //     "64c626b6c5081a4b3747ee58",
        //     "64c626b6c5081a4b3747ee5a",
        //     "64c626b6c5081a4b3747ee5c"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.781Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.781Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b8c5081a4b3747ee7e"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c626b6c5081a4b3747ee60",
        //     "64c626b7c5081a4b3747ee62",
        //     "64c626b7c5081a4b3747ee64",
        //     "64c626b7c5081a4b3747ee66",
        //     "64c626b7c5081a4b3747ee68",
        //     "64c626b7c5081a4b3747ee6a",
        //     "64c626b7c5081a4b3747ee6c",
        //     "64c626b7c5081a4b3747ee6e",
        //     "64c626b7c5081a4b3747ee70",
        //     "64c626b7c5081a4b3747ee72",
        //     "64c626b7c5081a4b3747ee74",
        //     "64c626b8c5081a4b3747ee76",
        //     "64c626b8c5081a4b3747ee78",
        //     "64c626b8c5081a4b3747ee7a",
        //     "64c626b8c5081a4b3747ee7c"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:40.564Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:40.564Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee9f"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c626d6c5081a4b3747ee81",
        //     "64c626d6c5081a4b3747ee83",
        //     "64c626d6c5081a4b3747ee85",
        //     "64c626d6c5081a4b3747ee87",
        //     "64c626d6c5081a4b3747ee89",
        //     "64c626d6c5081a4b3747ee8b",
        //     "64c626d6c5081a4b3747ee8d",
        //     "64c626d6c5081a4b3747ee8f",
        //     "64c626d7c5081a4b3747ee91",
        //     "64c626d7c5081a4b3747ee93",
        //     "64c626d7c5081a4b3747ee95",
        //     "64c626d7c5081a4b3747ee97",
        //     "64c626d7c5081a4b3747ee99",
        //     "64c626d7c5081a4b3747ee9b",
        //     "64c626d7c5081a4b3747ee9d"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.794Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.794Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eebf"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c626d7c5081a4b3747eea1",
        //     "64c626d8c5081a4b3747eea3",
        //     "64c626d8c5081a4b3747eea5",
        //     "64c626d8c5081a4b3747eea7",
        //     "64c626d8c5081a4b3747eea9",
        //     "64c626d8c5081a4b3747eeab",
        //     "64c626d8c5081a4b3747eead",
        //     "64c626d8c5081a4b3747eeaf",
        //     "64c626d8c5081a4b3747eeb1",
        //     "64c626d8c5081a4b3747eeb3",
        //     "64c626d9c5081a4b3747eeb5",
        //     "64c626d9c5081a4b3747eeb7",
        //     "64c626d9c5081a4b3747eeb9",
        //     "64c626d9c5081a4b3747eebb",
        //     "64c626d9c5081a4b3747eebd"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.616Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.616Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eedf"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c626d9c5081a4b3747eec1",
        //     "64c626d9c5081a4b3747eec3",
        //     "64c626d9c5081a4b3747eec5",
        //     "64c626dac5081a4b3747eec7",
        //     "64c626dac5081a4b3747eec9",
        //     "64c626dac5081a4b3747eecb",
        //     "64c626dac5081a4b3747eecd",
        //     "64c626dac5081a4b3747eecf",
        //     "64c626dac5081a4b3747eed1",
        //     "64c626dac5081a4b3747eed3",
        //     "64c626dac5081a4b3747eed5",
        //     "64c626dac5081a4b3747eed7",
        //     "64c626dbc5081a4b3747eed9",
        //     "64c626dbc5081a4b3747eedb",
        //     "64c626dbc5081a4b3747eedd"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.383Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.383Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747eeff"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c626dbc5081a4b3747eee1",
        //     "64c626dbc5081a4b3747eee3",
        //     "64c626dbc5081a4b3747eee5",
        //     "64c626dbc5081a4b3747eee7",
        //     "64c626dbc5081a4b3747eee9",
        //     "64c626dcc5081a4b3747eeeb",
        //     "64c626dcc5081a4b3747eeed",
        //     "64c626dcc5081a4b3747eeef",
        //     "64c626dcc5081a4b3747eef1",
        //     "64c626dcc5081a4b3747eef3",
        //     "64c626dcc5081a4b3747eef5",
        //     "64c626dcc5081a4b3747eef7",
        //     "64c626dcc5081a4b3747eef9",
        //     "64c626dcc5081a4b3747eefb",
        //     "64c626ddc5081a4b3747eefd"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.139Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.139Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef1f"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c626ddc5081a4b3747ef01",
        //     "64c626ddc5081a4b3747ef03",
        //     "64c626ddc5081a4b3747ef05",
        //     "64c626ddc5081a4b3747ef07",
        //     "64c626ddc5081a4b3747ef09",
        //     "64c626ddc5081a4b3747ef0b",
        //     "64c626ddc5081a4b3747ef0d",
        //     "64c626dec5081a4b3747ef0f",
        //     "64c626dec5081a4b3747ef11",
        //     "64c626dec5081a4b3747ef13",
        //     "64c626dec5081a4b3747ef15",
        //     "64c626dec5081a4b3747ef17",
        //     "64c626dec5081a4b3747ef19",
        //     "64c626dec5081a4b3747ef1b",
        //     "64c626dec5081a4b3747ef1d"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.943Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.943Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef3f"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c626dfc5081a4b3747ef21",
        //     "64c626dfc5081a4b3747ef23",
        //     "64c626dfc5081a4b3747ef25",
        //     "64c626dfc5081a4b3747ef27",
        //     "64c626dfc5081a4b3747ef29",
        //     "64c626dfc5081a4b3747ef2b",
        //     "64c626dfc5081a4b3747ef2d",
        //     "64c626dfc5081a4b3747ef2f",
        //     "64c626dfc5081a4b3747ef31",
        //     "64c626e0c5081a4b3747ef33",
        //     "64c626e0c5081a4b3747ef35",
        //     "64c626e0c5081a4b3747ef37",
        //     "64c626e0c5081a4b3747ef39",
        //     "64c626e0c5081a4b3747ef3b",
        //     "64c626e0c5081a4b3747ef3d"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.715Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.715Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef62"
        //   },
        //   "userID": {
        //     "$oid": "64ba6b9b11a01a0fd6215177"
        //   },
        //   "questionsList": [
        //     "64c62709c5081a4b3747ef44",
        //     "64c62709c5081a4b3747ef46",
        //     "64c62709c5081a4b3747ef48",
        //     "64c62709c5081a4b3747ef4a",
        //     "64c62709c5081a4b3747ef4c",
        //     "64c62709c5081a4b3747ef4e",
        //     "64c62709c5081a4b3747ef50",
        //     "64c62709c5081a4b3747ef52",
        //     "64c6270ac5081a4b3747ef54",
        //     "64c6270ac5081a4b3747ef56",
        //     "64c6270ac5081a4b3747ef58",
        //     "64c6270ac5081a4b3747ef5a",
        //     "64c6270ac5081a4b3747ef5c",
        //     "64c6270ac5081a4b3747ef5e",
        //     "64c6270ac5081a4b3747ef60"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.846Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.846Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef82"
        //   },
        //   "userID": {
        //     "$oid": "64ba7a7d8b37f05cd18047df"
        //   },
        //   "questionsList": [
        //     "64c6270ac5081a4b3747ef64",
        //     "64c6270bc5081a4b3747ef66",
        //     "64c6270bc5081a4b3747ef68",
        //     "64c6270bc5081a4b3747ef6a",
        //     "64c6270bc5081a4b3747ef6c",
        //     "64c6270bc5081a4b3747ef6e",
        //     "64c6270bc5081a4b3747ef70",
        //     "64c6270bc5081a4b3747ef72",
        //     "64c6270bc5081a4b3747ef74",
        //     "64c6270bc5081a4b3747ef76",
        //     "64c6270cc5081a4b3747ef78",
        //     "64c6270cc5081a4b3747ef7a",
        //     "64c6270cc5081a4b3747ef7c",
        //     "64c6270cc5081a4b3747ef7e",
        //     "64c6270cc5081a4b3747ef80"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.643Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.643Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efa2"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b188b37f05cd18047ea"
        //   },
        //   "questionsList": [
        //     "64c6270cc5081a4b3747ef84",
        //     "64c6270cc5081a4b3747ef86",
        //     "64c6270cc5081a4b3747ef88",
        //     "64c6270dc5081a4b3747ef8a",
        //     "64c6270dc5081a4b3747ef8c",
        //     "64c6270dc5081a4b3747ef8e",
        //     "64c6270dc5081a4b3747ef90",
        //     "64c6270dc5081a4b3747ef92",
        //     "64c6270dc5081a4b3747ef94",
        //     "64c6270dc5081a4b3747ef96",
        //     "64c6270dc5081a4b3747ef98",
        //     "64c6270dc5081a4b3747ef9a",
        //     "64c6270ec5081a4b3747ef9c",
        //     "64c6270ec5081a4b3747ef9e",
        //     "64c6270ec5081a4b3747efa0"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.404Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.404Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efc2"
        //   },
        //   "userID": {
        //     "$oid": "64ba7b328b37f05cd18047ee"
        //   },
        //   "questionsList": [
        //     "64c6270ec5081a4b3747efa4",
        //     "64c6270ec5081a4b3747efa6",
        //     "64c6270ec5081a4b3747efa8",
        //     "64c6270ec5081a4b3747efaa",
        //     "64c6270ec5081a4b3747efac",
        //     "64c6270fc5081a4b3747efae",
        //     "64c6270fc5081a4b3747efb0",
        //     "64c6270fc5081a4b3747efb2",
        //     "64c6270fc5081a4b3747efb4",
        //     "64c6270fc5081a4b3747efb6",
        //     "64c6270fc5081a4b3747efb8",
        //     "64c6270fc5081a4b3747efba",
        //     "64c6270fc5081a4b3747efbc",
        //     "64c6270fc5081a4b3747efbe",
        //     "64c62710c5081a4b3747efc0"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.167Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.167Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efe2"
        //   },
        //   "userID": {
        //     "$oid": "64ba805dbafde2d311df9580"
        //   },
        //   "questionsList": [
        //     "64c62710c5081a4b3747efc4",
        //     "64c62710c5081a4b3747efc6",
        //     "64c62710c5081a4b3747efc8",
        //     "64c62710c5081a4b3747efca",
        //     "64c62710c5081a4b3747efcc",
        //     "64c62710c5081a4b3747efce",
        //     "64c62710c5081a4b3747efd0",
        //     "64c62711c5081a4b3747efd2",
        //     "64c62711c5081a4b3747efd4",
        //     "64c62711c5081a4b3747efd6",
        //     "64c62711c5081a4b3747efd8",
        //     "64c62711c5081a4b3747efda",
        //     "64c62711c5081a4b3747efdc",
        //     "64c62711c5081a4b3747efde",
        //     "64c62711c5081a4b3747efe0"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.934Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.934Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747f002"
        //   },
        //   "userID": {
        //     "$oid": "64c0c1d02c62bda910d74a24"
        //   },
        //   "questionsList": [
        //     "64c62712c5081a4b3747efe4",
        //     "64c62712c5081a4b3747efe6",
        //     "64c62712c5081a4b3747efe8",
        //     "64c62712c5081a4b3747efea",
        //     "64c62712c5081a4b3747efec",
        //     "64c62712c5081a4b3747efee",
        //     "64c62712c5081a4b3747eff0",
        //     "64c62712c5081a4b3747eff2",
        //     "64c62712c5081a4b3747eff4",
        //     "64c62713c5081a4b3747eff6",
        //     "64c62713c5081a4b3747eff8",
        //     "64c62713c5081a4b3747effa",
        //     "64c62713c5081a4b3747effc",
        //     "64c62713c5081a4b3747effe",
        //     "64c62713c5081a4b3747f000"
        //   ],
        //   "totalTime": 0,
        //   "totalMarks": 100,
        //   "calculator": false,
        //   "excel": false,
        //   "compiler": false,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.709Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.709Z"
        //   },
        //   "__v": 0
        // }];
        // const questionresponse=[{
        //   "_id": {
        //     "$oid": "648f536087116e219fef1571"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's First Law",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T18:56:32.541Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T18:56:32.541Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f539287116e219fef1574"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's First Lawssssssssssssss",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T18:57:22.779Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T18:57:22.779Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f53fda2cec001fd0d7f6c"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Second Law?",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T18:59:09.473Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T18:59:09.473Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f547294ab993fad223b97"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Third Law?",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T19:01:06.759Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T19:01:06.759Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f54b3d12424a4661310a1"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Third Law?",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T19:02:11.215Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T19:02:11.215Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f54de9e7463732f670b55"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Third Law?",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T19:02:54.199Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T19:02:54.199Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f54ed0bfc801496768f38"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Third Law?",
        //   "response": " ",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T19:03:09.730Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T19:03:09.730Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f552edf8713eecf5caf3d"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Third Law?",
        //   "response": "For Every action, there is an equal and opposite reaction",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T19:04:14.747Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T19:42:12.119Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "648f554f3525c78659db62a7"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is Newton's Third Law?",
        //   "response": "This is the solution to this question",
        //   "marks": 7,
        //   "negativeMarks": 0,
        //   "createdAt": {
        //     "$date": "2023-06-18T19:04:47.402Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-06-18T19:41:20.373Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62244c5081a4b3747eb72"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:41:40.859Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:41:40.859Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62245c5081a4b3747eb74"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:41:41.067Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:41:41.067Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622a9c5081a4b3747eb7a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:21.474Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:21.474Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622a9c5081a4b3747eb7c"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:21.585Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:21.585Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622a9c5081a4b3747eb80"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:21.805Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:21.805Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb84"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.159Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.159Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb86"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.273Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.273Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb8a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.493Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.493Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb8c"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.603Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.603Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb90"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.837Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.837Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b0c5081a4b3747eb92"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:28.950Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:28.950Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eb96"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.183Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.183Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eb98"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.293Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.293Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eb9c"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.513Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.513Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eb9e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.625Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.625Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eba2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.846Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.846Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c622b1c5081a4b3747eba4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:43:29.973Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:43:29.973Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebb1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.197Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.197Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebb3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the different types of systems available for LPD?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.309Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.309Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebb5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.419Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.419Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebb7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.528Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.528Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebb9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.637Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.637Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebbb"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.746Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.746Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebbd"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.856Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.856Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246cc5081a4b3747ebbf"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:52.967Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:52.967Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246dc5081a4b3747ebc1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:53.081Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:53.081Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246dc5081a4b3747ebc3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:53.191Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:53.191Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246dc5081a4b3747ebc5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:53.300Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:53.300Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6246dc5081a4b3747ebc7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:50:53.410Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:50:53.410Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62542c5081a4b3747ebcb"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:26.912Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:26.912Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebcd"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the different types of systems available for LPD?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.024Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.024Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebcf"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.133Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.133Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebd1"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.244Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.244Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebd3"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.353Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.353Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebd5"
        //   },
        //   "questionType": "mcq",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.465Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.465Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebd7"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.582Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.582Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebd9"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.692Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.692Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebdb"
        //   },
        //   "questionType": "mcq",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.809Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.809Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62543c5081a4b3747ebdd"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:27.919Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:27.919Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62544c5081a4b3747ebdf"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:28.073Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:28.073Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62544c5081a4b3747ebe1"
        //   },
        //   "questionType": "mcq",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:54:28.185Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:54:28.185Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62581c5081a4b3747ebe5"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:29.656Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:29.656Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62581c5081a4b3747ebe7"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:29.770Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:29.770Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62581c5081a4b3747ebeb"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:29.993Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:29.993Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebed"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.103Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.103Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebf1"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.323Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.323Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebf3"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.433Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.433Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebf7"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.681Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.681Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62582c5081a4b3747ebf9"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:30.792Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:30.792Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62583c5081a4b3747ebfd"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:31.013Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:31.013Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62583c5081a4b3747ebff"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:31.141Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:31.141Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62583c5081a4b3747ec03"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:31.370Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:31.370Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62583c5081a4b3747ec05"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ur job",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 1000,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:55:31.489Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:55:31.489Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cdc5081a4b3747ec0a"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:45.353Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:45.353Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cdc5081a4b3747ec0c"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:45.466Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:45.466Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cdc5081a4b3747ec0e"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:45.577Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:45.577Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cdc5081a4b3747ec10"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:45.687Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:45.687Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cdc5081a4b3747ec12"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:45.796Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:45.796Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cdc5081a4b3747ec14"
        //   },
        //   "questionType": "mcq",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:45.906Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:45.906Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cec5081a4b3747ec16"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:46.017Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:46.017Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cec5081a4b3747ec18"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:46.127Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:46.127Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cec5081a4b3747ec1a"
        //   },
        //   "questionType": "mcq",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:46.236Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:46.236Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cec5081a4b3747ec1c"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:46.345Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:46.345Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cec5081a4b3747ec1e"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:46.456Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:46.456Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625cec5081a4b3747ec20"
        //   },
        //   "questionType": "mcq",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:56:46.566Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:56:46.566Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625f9c5081a4b3747ec24"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:29.509Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:29.509Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625f9c5081a4b3747ec26"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:29.620Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:29.620Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625f9c5081a4b3747ec28"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:29.733Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:29.733Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625f9c5081a4b3747ec2a"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:29.842Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:29.842Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625f9c5081a4b3747ec2c"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:29.952Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:29.952Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec2e"
        //   },
        //   "questionType": "mcq",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.074Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.074Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec30"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.188Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.188Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec32"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.303Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.303Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec34"
        //   },
        //   "questionType": "mcq",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.413Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.413Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec36"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.523Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.523Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec38"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.633Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.633Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c625fac5081a4b3747ec3a"
        //   },
        //   "questionType": "mcq",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "no",
        //   "marks": 100,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:57:30.742Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:57:30.742Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62653c5081a4b3747ec3e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:58:59.355Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:58:59.355Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62653c5081a4b3747ec40"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:58:59.473Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:58:59.473Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62653c5081a4b3747ec42"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:58:59.583Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:58:59.583Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62653c5081a4b3747ec44"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:58:59.695Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:58:59.695Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62653c5081a4b3747ec46"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:58:59.804Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:58:59.804Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62653c5081a4b3747ec48"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:58:59.913Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:58:59.913Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec4a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.058Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.058Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec4c"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.170Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.170Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec4e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.279Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.279Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec50"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.389Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.389Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec52"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.498Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.498Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec54"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.606Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.606Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec56"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.715Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.715Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec58"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.825Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.825Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62654c5081a4b3747ec5a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:00.934Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:00.934Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec5e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.152Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.152Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec60"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.262Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.262Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec62"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.376Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.376Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec64"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.486Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.486Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec66"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.594Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.594Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec68"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.703Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.703Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec6a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.813Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.813Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62655c5081a4b3747ec6c"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:01.921Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:01.921Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec6e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.030Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.030Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec70"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.139Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.139Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec72"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.248Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.248Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec74"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.362Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.362Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec76"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.472Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.472Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec78"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.583Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.583Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec7a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.692Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.692Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62656c5081a4b3747ec7e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:02.936Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:02.936Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec80"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.045Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.045Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec82"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.157Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.157Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec84"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.266Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.266Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec86"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.376Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.376Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec88"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.486Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.486Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec8a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.595Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.595Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec8c"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.704Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.704Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec8e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.828Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.828Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62657c5081a4b3747ec90"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:03.937Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:03.937Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec92"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.045Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.045Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec94"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.164Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.164Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec96"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.273Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.273Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec98"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.400Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.400Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec9a"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.510Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.510Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747ec9e"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.727Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.727Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747eca0"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.836Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.836Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62658c5081a4b3747eca2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:04.946Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:04.946Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747eca4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.064Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.064Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747eca6"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.174Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.174Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747eca8"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.284Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.284Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747ecaa"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.393Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.393Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747ecac"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.502Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.502Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747ecae"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.613Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.613Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747ecb0"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.725Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.725Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747ecb2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.834Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.834Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62659c5081a4b3747ecb4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:05.943Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:05.943Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecb6"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.057Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.057Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecb8"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.167Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.167Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecba"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.277Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.277Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecbe"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.495Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.495Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecc0"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.604Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.604Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecc2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.713Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.713Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecc4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.824Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.824Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265ac5081a4b3747ecc6"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:06.933Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:06.933Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecc8"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.043Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.043Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecca"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.151Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.151Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747eccc"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.261Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.261Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecce"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.370Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.370Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecd0"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.479Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.479Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecd2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.594Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.594Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecd4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.704Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.704Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecd6"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.815Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.815Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265bc5081a4b3747ecd8"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:07.927Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:07.927Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ecda"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.038Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.038Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ecde"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.261Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.261Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ece0"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.373Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.373Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ece2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.485Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.485Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ece4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.595Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.595Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ece6"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.713Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.713Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ece8"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.824Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.824Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265cc5081a4b3747ecea"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:08.933Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:08.933Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecec"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.044Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.044Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecee"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.154Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.154Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecf0"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.274Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.274Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecf2"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.382Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.382Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecf4"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.491Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.491Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecf6"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.599Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.599Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecf8"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.708Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.708Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6265dc5081a4b3747ecfa"
        //   },
        //   "questionType": "mcq",
        //   "content": "what is ua name",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:09.819Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:09.819Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267cc5081a4b3747ecff"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:40.954Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:40.954Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed01"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.089Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.089Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed03"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.201Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.201Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed05"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.310Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.310Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed07"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.420Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.420Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed09"
        //   },
        //   "questionType": "mcq",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.533Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.533Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed0b"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.644Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.644Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed0d"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.753Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.753Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed0f"
        //   },
        //   "questionType": "mcq",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.863Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.863Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267dc5081a4b3747ed11"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:41.972Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:41.972Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed13"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.082Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.082Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed15"
        //   },
        //   "questionType": "mcq",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.201Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.201Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed17"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.312Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.312Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed19"
        //   },
        //   "questionType": "mcq",
        //   "content": "Compare the Aerosol Jet process with other Additive Manufacturing techniques, such as Fused Deposition Modeling (FDM).",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.423Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.423Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed1b"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the process of Laser Engineered Net shaping.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.533Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.533Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed1f"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the advantages of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.759Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.759Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed21"
        //   },
        //   "questionType": "mcq",
        //   "content": "How can a LPD head integrated into a CNC milling machine be useful?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.869Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.869Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267ec5081a4b3747ed23"
        //   },
        //   "questionType": "mcq",
        //   "content": "Which materials can be processed through the Directed Energy Deposition method?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:42.978Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:42.978Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed25"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the role of the STL file format in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.089Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.089Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed27"
        //   },
        //   "questionType": "mcq",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.198Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.198Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed29"
        //   },
        //   "questionType": "mcq",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.307Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.307Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed2b"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.418Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.418Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed2d"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.528Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.528Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed2f"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.637Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.637Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed31"
        //   },
        //   "questionType": "mcq",
        //   "content": " What types of materials can be used in Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.746Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.746Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed33"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.861Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.861Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6267fc5081a4b3747ed35"
        //   },
        //   "questionType": "mcq",
        //   "content": "State examples demonstrating the significance of accuracy Improvements in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:43.970Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:43.970Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed37"
        //   },
        //   "questionType": "mcq",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.079Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.079Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed39"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the main limitations regarding direct fabrication for implants and prosthetics through AM? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.193Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.193Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed3b"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the role of Web 2.0 tools in supporting the dissemination of ideas and component designs through AM-based entrepreneurship models.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.301Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.301Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed3f"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.518Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.518Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed41"
        //   },
        //   "questionType": "mcq",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.627Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.627Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed43"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.737Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.737Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed45"
        //   },
        //   "questionType": "mcq",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.845Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.845Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62680c5081a4b3747ed47"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does support material removal impact the final shape, functionality, and surface finish of the printed part?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:44.957Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:44.957Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed49"
        //   },
        //   "questionType": "mcq",
        //   "content": "What challenges can arise when using a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.080Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.080Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed4b"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.260Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.260Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed4d"
        //   },
        //   "questionType": "mcq",
        //   "content": "Discuss the limitations and challenges associated with limited safe polymer materials for medical applications. ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.369Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.369Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed4f"
        //   },
        //   "questionType": "mcq",
        //   "content": "List and briefly explain the factors influence the accuracy of AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.477Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.477Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed51"
        //   },
        //   "questionType": "mcq",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.586Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.586Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed53"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does Additive Manufacturing enable the fabrication of injection molding inserts directly? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.695Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.695Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed55"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.804Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.804Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62681c5081a4b3747ed57"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does Directed energy deposition work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:45.913Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:45.913Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed59"
        //   },
        //   "questionType": "mcq",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.022Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.022Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed5b"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.131Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.131Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed5f"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.349Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.349Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed61"
        //   },
        //   "questionType": "mcq",
        //   "content": "How is the deposition controlled in a typical laser powder deposition (LPD) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.459Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.459Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed63"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does it enable the transformation of digital designs into physical products, promoting the concept of \"design anywhere, build anywhere\"",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.569Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.569Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed65"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, what are the Effect of Support Structure on Part Quality and Integrity?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.678Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.678Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed67"
        //   },
        //   "questionType": "mcq",
        //   "content": "In the context of Direct Writing, why are liquid inks considered a cost-effective and versatile option for creating structures compared to other methods?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.786Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.786Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62682c5081a4b3747ed69"
        //   },
        //   "questionType": "mcq",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:46.896Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:46.896Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed6b"
        //   },
        //   "questionType": "mcq",
        //   "content": "Is non-vertical deposition as effective as vertical deposition in LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.005Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.005Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed6d"
        //   },
        //   "questionType": "mcq",
        //   "content": "What materials can be used in General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.114Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.114Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed6f"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the fundamental principle of Aerosol DW processes used for depositing materials in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.224Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.224Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed71"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, what are the Techniques in Support Material Removal:",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.333Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.333Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed73"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.442Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.442Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed75"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, what are the Challenges in Support Material Removal?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.551Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.551Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed77"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.669Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.669Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed79"
        //   },
        //   "questionType": "mcq",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.779Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.779Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62683c5081a4b3747ed7b"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does Directed Energy Deposition (DED) differ from other additive manufacturing processes?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:47.888Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:47.888Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed7f"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.111Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.111Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed81"
        //   },
        //   "questionType": "mcq",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.221Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.221Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed83"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does it enable the transformation of digital designs into physical products, promoting the concept of \"design anywhere, build anywhere\"",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.330Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.330Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed85"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.439Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.439Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed87"
        //   },
        //   "questionType": "mcq",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.548Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.548Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed89"
        //   },
        //   "questionType": "mcq",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.659Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.659Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed8b"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.771Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.771Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed8d"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.880Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.880Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62684c5081a4b3747ed8f"
        //   },
        //   "questionType": "mcq",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:48.990Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:48.990Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed91"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, what are the Techniques in Support Material Removal:",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.099Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.099Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed93"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.208Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.208Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed95"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.317Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.317Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed97"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.427Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.427Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed99"
        //   },
        //   "questionType": "mcq",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.540Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.540Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed9b"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.648Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.648Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747ed9f"
        //   },
        //   "questionType": "mcq",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.867Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.867Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62685c5081a4b3747eda1"
        //   },
        //   "questionType": "mcq",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:49.977Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:49.977Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747eda3"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.087Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.087Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747eda5"
        //   },
        //   "questionType": "mcq",
        //   "content": "In Additive Manufacturing, what are the Effect of Support Structure on Part Quality and Integrity?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.200Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.200Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747eda7"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.309Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.309Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747eda9"
        //   },
        //   "questionType": "mcq",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.420Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.420Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747edab"
        //   },
        //   "questionType": "mcq",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.532Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.532Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747edad"
        //   },
        //   "questionType": "mcq",
        //   "content": "What materials can be used in General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.641Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.641Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747edaf"
        //   },
        //   "questionType": "mcq",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.749Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.749Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747edb1"
        //   },
        //   "questionType": "mcq",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.861Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.861Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62686c5081a4b3747edb3"
        //   },
        //   "questionType": "mcq",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:50.973Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:50.973Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62687c5081a4b3747edb5"
        //   },
        //   "questionType": "mcq",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:51.084Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:51.084Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62687c5081a4b3747edb7"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does Directed energy deposition work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:51.194Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:51.194Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62687c5081a4b3747edb9"
        //   },
        //   "questionType": "mcq",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:51.309Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:51.309Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62687c5081a4b3747edbb"
        //   },
        //   "questionType": "mcq",
        //   "content": "How does Directed Energy Deposition (DED) differ from other additive manufacturing processes?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T08:59:51.418Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T08:59:51.418Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626adc5081a4b3747edc0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:29.868Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:29.868Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626adc5081a4b3747edc2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:29.977Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:29.977Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edc4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.086Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.086Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edc6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.195Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.195Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edc8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.305Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.305Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edca"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.413Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.413Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edcc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.523Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.523Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edce"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.632Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.632Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edd0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.740Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.740Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edd2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.849Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.849Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626aec5081a4b3747edd4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:30.961Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:30.961Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747edd6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.073Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.073Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747edd8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.182Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.182Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747edda"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Compare the Aerosol Jet process with other Additive Manufacturing techniques, such as Fused Deposition Modeling (FDM).",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.291Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.291Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747eddc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the process of Laser Engineered Net shaping.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.400Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.400Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747ede0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the advantages of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.626Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.626Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747ede2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How can a LPD head integrated into a CNC milling machine be useful?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.735Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.735Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747ede4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Which materials can be processed through the Directed Energy Deposition method?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.844Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.844Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626afc5081a4b3747ede6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of the STL file format in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:31.953Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:31.953Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747ede8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.065Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.065Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edea"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.181Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.181Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edec"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.290Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.290Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edee"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.401Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.401Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edf0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.510Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.510Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edf2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What types of materials can be used in Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.621Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.621Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edf4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.733Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.733Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edf6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State examples demonstrating the significance of accuracy Improvements in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.848Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.848Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b0c5081a4b3747edf8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:32.965Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:32.965Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747edfa"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the main limitations regarding direct fabrication for implants and prosthetics through AM? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.092Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.092Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747edfc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of Web 2.0 tools in supporting the dissemination of ideas and component designs through AM-based entrepreneurship models.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.201Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.201Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747ee00"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.421Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.421Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747ee02"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.532Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.532Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747ee04"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.644Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.644Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747ee06"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.753Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.753Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747ee08"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does support material removal impact the final shape, functionality, and surface finish of the printed part?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.869Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.869Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b1c5081a4b3747ee0a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What challenges can arise when using a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:33.980Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:33.980Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee0c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.101Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.101Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee0e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the limitations and challenges associated with limited safe polymer materials for medical applications. ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.210Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.210Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee10"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the factors influence the accuracy of AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.321Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.321Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee12"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.433Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.433Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee14"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Additive Manufacturing enable the fabrication of injection molding inserts directly? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.560Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.560Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee16"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.674Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.674Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee18"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed energy deposition work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.789Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.789Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b2c5081a4b3747ee1a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:34.898Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:34.898Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee1c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.009Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.009Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee20"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.231Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.231Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee22"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How is the deposition controlled in a typical laser powder deposition (LPD) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.344Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.344Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee24"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does it enable the transformation of digital designs into physical products, promoting the concept of \"design anywhere, build anywhere\"",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.465Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.465Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee26"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Effect of Support Structure on Part Quality and Integrity?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.577Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.577Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee28"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In the context of Direct Writing, why are liquid inks considered a cost-effective and versatile option for creating structures compared to other methods?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.690Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.690Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee2a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.799Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.799Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b3c5081a4b3747ee2c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Is non-vertical deposition as effective as vertical deposition in LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:35.914Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:35.914Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee2e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What materials can be used in General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.025Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.025Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee30"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle of Aerosol DW processes used for depositing materials in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.149Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.149Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee32"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Techniques in Support Material Removal:",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.259Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.259Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee34"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.369Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.369Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee36"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Challenges in Support Material Removal?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.481Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.481Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee38"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.591Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.591Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee3a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.700Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.700Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b4c5081a4b3747ee3c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed Energy Deposition (DED) differ from other additive manufacturing processes?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:36.871Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:36.871Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee40"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.094Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.094Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee42"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How can a LPD head integrated into a CNC milling machine be useful?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.205Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.205Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee44"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.317Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.317Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee46"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.426Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.426Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee48"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In the context of Direct Writing, why are liquid inks considered a cost-effective and versatile option for creating structures compared to other methods?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.537Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.537Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee4a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What challenges can arise when using a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.650Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.650Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee4c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.761Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.761Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee4e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.871Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.871Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b5c5081a4b3747ee50"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:37.982Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:37.982Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee52"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.095Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.095Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee54"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Additive Manufacturing enable the fabrication of injection molding inserts directly? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.210Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.210Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee56"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.322Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.322Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee58"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.433Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.433Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee5a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.548Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.548Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee5c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.670Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.670Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b6c5081a4b3747ee60"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:38.890Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:38.890Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee62"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.001Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.001Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee64"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.111Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.111Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee66"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.222Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.222Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee68"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.332Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.332Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee6a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.442Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.442Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee6c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Is non-vertical deposition as effective as vertical deposition in LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.557Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.557Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee6e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.669Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.669Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee70"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle of Aerosol DW processes used for depositing materials in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.780Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.780Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee72"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.889Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.889Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b7c5081a4b3747ee74"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:39.997Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:39.997Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b8c5081a4b3747ee76"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:40.107Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:40.107Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b8c5081a4b3747ee78"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:40.234Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:40.234Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b8c5081a4b3747ee7a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:40.344Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:40.344Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626b8c5081a4b3747ee7c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of Web 2.0 tools in supporting the dissemination of ideas and component designs through AM-based entrepreneurship models.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:00:40.455Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:00:40.455Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee81"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.096Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.096Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee83"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.207Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.207Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee85"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.317Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.317Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee87"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.434Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.434Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee89"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.543Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.543Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee8b"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.673Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.673Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee8d"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.799Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.799Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d6c5081a4b3747ee8f"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:10.909Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:10.909Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee91"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.022Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.022Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee93"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.131Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.131Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee95"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.240Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.240Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee97"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.353Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.353Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee99"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.465Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.465Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee9b"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Compare the Aerosol Jet process with other Additive Manufacturing techniques, such as Fused Deposition Modeling (FDM).",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.574Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.574Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747ee9d"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the process of Laser Engineered Net shaping.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.685Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.685Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d7c5081a4b3747eea1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the advantages of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:11.904Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:11.904Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eea3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How can a LPD head integrated into a CNC milling machine be useful?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.014Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.014Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eea5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Which materials can be processed through the Directed Energy Deposition method?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.126Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.126Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eea7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of the STL file format in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.251Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.251Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eea9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.365Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.365Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eeab"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.485Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.485Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eead"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.594Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.594Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eeaf"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.703Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.703Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eeb1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.813Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.813Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d8c5081a4b3747eeb3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What types of materials can be used in Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:12.924Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:12.924Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eeb5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.034Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.034Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eeb7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State examples demonstrating the significance of accuracy Improvements in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.173Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.173Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eeb9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.285Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.285Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eebb"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the main limitations regarding direct fabrication for implants and prosthetics through AM? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.394Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.394Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eebd"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of Web 2.0 tools in supporting the dissemination of ideas and component designs through AM-based entrepreneurship models.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.503Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.503Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eec1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.725Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.725Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eec3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.835Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.835Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626d9c5081a4b3747eec5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:13.953Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:13.953Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eec7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.065Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.065Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eec9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does support material removal impact the final shape, functionality, and surface finish of the printed part?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.174Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.174Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eecb"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What challenges can arise when using a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.283Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.283Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eecd"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.394Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.394Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eecf"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the limitations and challenges associated with limited safe polymer materials for medical applications. ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.505Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.505Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eed1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the factors influence the accuracy of AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.614Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.614Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eed3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.723Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.723Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eed5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Additive Manufacturing enable the fabrication of injection molding inserts directly? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.832Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.832Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dac5081a4b3747eed7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:14.941Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:14.941Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eed9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed energy deposition work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.052Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.052Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eedb"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.164Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.164Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eedd"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.274Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.274Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eee1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.496Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.496Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eee3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How is the deposition controlled in a typical laser powder deposition (LPD) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.609Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.609Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eee5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does it enable the transformation of digital designs into physical products, promoting the concept of \"design anywhere, build anywhere\"",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.718Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.718Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eee7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Effect of Support Structure on Part Quality and Integrity?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.826Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.826Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dbc5081a4b3747eee9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In the context of Direct Writing, why are liquid inks considered a cost-effective and versatile option for creating structures compared to other methods?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:15.935Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:15.935Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eeeb"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.045Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.045Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eeed"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Is non-vertical deposition as effective as vertical deposition in LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.153Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.153Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eeef"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What materials can be used in General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.263Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.263Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eef1"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle of Aerosol DW processes used for depositing materials in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.374Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.374Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eef3"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Techniques in Support Material Removal:",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.484Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.484Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eef5"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.594Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.594Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eef7"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Challenges in Support Material Removal?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.702Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.702Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eef9"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.811Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.811Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dcc5081a4b3747eefb"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:16.920Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:16.920Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747eefd"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed Energy Deposition (DED) differ from other additive manufacturing processes?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.029Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.029Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef01"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the advantages of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.247Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.247Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef03"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.359Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.359Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef05"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Which materials can be processed through the Directed Energy Deposition method?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.471Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.471Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef07"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Effect of Support Structure on Part Quality and Integrity?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.600Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.600Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef09"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.710Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.710Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef0b"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.826Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.826Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626ddc5081a4b3747ef0d"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:17.935Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:17.935Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef0f"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.045Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.045Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef11"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.161Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.161Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef13"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.277Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.277Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef15"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.387Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.387Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef17"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Challenges in Support Material Removal?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.497Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.497Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef19"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.607Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.607Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef1b"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Compare the Aerosol Jet process with other Additive Manufacturing techniques, such as Fused Deposition Modeling (FDM).",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.716Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.716Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dec5081a4b3747ef1d"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:18.834Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:18.834Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef21"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.057Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.057Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef23"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How can a LPD head integrated into a CNC milling machine be useful?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.166Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.166Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef25"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.275Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.275Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef27"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of the STL file format in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.384Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.384Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef29"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.492Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.492Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef2b"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.601Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.601Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef2d"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Is non-vertical deposition as effective as vertical deposition in LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.709Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.709Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef2f"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the limitations and challenges associated with limited safe polymer materials for medical applications. ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.818Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.818Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626dfc5081a4b3747ef31"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:19.928Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:19.928Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef33"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What types of materials can be used in Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.039Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.039Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef35"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.148Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.148Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef37"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State examples demonstrating the significance of accuracy Improvements in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.277Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.277Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef39"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.388Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.388Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef3b"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.496Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.496Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c626e0c5081a4b3747ef3d"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the process of Laser Engineered Net shaping.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:01:20.606Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:01:20.606Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef44"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.174Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.174Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef46"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.285Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.285Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef48"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.398Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.398Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef4a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.509Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.509Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef4c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.618Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.618Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef4e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.738Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.738Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef50"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.846Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.846Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62709c5081a4b3747ef52"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:01.961Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:01.961Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef54"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.073Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.073Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef56"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.185Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.185Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef58"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the applications of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.295Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.295Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef5a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What potential applications can benefit from the use of Directed Energy Deposition (DED) systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.404Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.404Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef5c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.515Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.515Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef5e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Compare the Aerosol Jet process with other Additive Manufacturing techniques, such as Fused Deposition Modeling (FDM).",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.627Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.627Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef60"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the process of Laser Engineered Net shaping.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.736Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.736Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ac5081a4b3747ef64"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the advantages of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:02.959Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:02.959Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef66"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How can a LPD head integrated into a CNC milling machine be useful?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.074Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.074Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef68"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Which materials can be processed through the Directed Energy Deposition method?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.201Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.201Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef6a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of the STL file format in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.309Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.309Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef6c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.419Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.419Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef6e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.528Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.528Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef70"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.638Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.638Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef72"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.747Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.747Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef74"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.861Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.861Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270bc5081a4b3747ef76"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What types of materials can be used in Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:03.970Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:03.970Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef78"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.080Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.080Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef7a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State examples demonstrating the significance of accuracy Improvements in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.189Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.189Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef7c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.315Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.315Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef7e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the main limitations regarding direct fabrication for implants and prosthetics through AM? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.424Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.424Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef80"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of Web 2.0 tools in supporting the dissemination of ideas and component designs through AM-based entrepreneurship models.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.533Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.533Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef84"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.751Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.751Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef86"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Illustrate the potential applications of Nozzle-based DW processes in industries.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.865Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.865Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270cc5081a4b3747ef88"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, state some examples on support structure requirements.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:04.986Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:04.986Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef8a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.094Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.094Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef8c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does support material removal impact the final shape, functionality, and surface finish of the printed part?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.203Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.203Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef8e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What challenges can arise when using a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.312Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.312Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef90"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.421Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.421Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef92"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the limitations and challenges associated with limited safe polymer materials for medical applications. ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.529Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.529Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef94"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the factors influence the accuracy of AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.638Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.638Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef96"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.746Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.746Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef98"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Additive Manufacturing enable the fabrication of injection molding inserts directly? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.857Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.857Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270dc5081a4b3747ef9a"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:05.968Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:05.968Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747ef9c"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed energy deposition work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.077Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.077Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747ef9e"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What is a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.186Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.186Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efa0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the choice of energy source affect the performance of a Directed Energy Deposition (DED) system?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.295Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.295Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efa4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle behind nozzle-based Digital Writing (DW) processes for deposition onto a substrate.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.517Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.517Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efa6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How is the deposition controlled in a typical laser powder deposition (LPD) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.626Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.626Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efa8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does it enable the transformation of digital designs into physical products, promoting the concept of \"design anywhere, build anywhere\"",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.734Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.734Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efaa"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Effect of Support Structure on Part Quality and Integrity?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.844Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.844Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270ec5081a4b3747efac"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In the context of Direct Writing, why are liquid inks considered a cost-effective and versatile option for creating structures compared to other methods?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:06.953Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:06.953Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efae"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.061Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.061Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efb0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Is non-vertical deposition as effective as vertical deposition in LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.175Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.175Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efb2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What materials can be used in General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.284Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.284Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efb4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the fundamental principle of Aerosol DW processes used for depositing materials in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.393Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.393Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efb6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Techniques in Support Material Removal:",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.502Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.502Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efb8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are the advantages of using Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.618Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.618Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efba"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Challenges in Support Material Removal?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.727Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.727Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efbc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.836Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.836Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c6270fc5081a4b3747efbe"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:07.946Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:07.946Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efc0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed Energy Deposition (DED) differ from other additive manufacturing processes?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.057Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.057Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efc4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the advantages of Aerosol Direct Write (DW) processes in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.281Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.281Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efc6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How is the deposition controlled in a typical laser powder deposition (LPD) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.392Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.392Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efc8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does it enable the transformation of digital designs into physical products, promoting the concept of \"design anywhere, build anywhere\"",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.501Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.501Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efca"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.610Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.610Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efcc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does additive manufacturing demonstrate versatility in medical applications, and what are the specific areas where it is commonly used? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.719Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.719Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efce"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What were the technological hurdles that early adopters of AM had to overcome to reach the current stage of widespread accessibility?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.829Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.829Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62710c5081a4b3747efd0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:08.941Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:08.941Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efd2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What is \"digiproneurship\" in the context of Additive Manufacturing? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.053Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.053Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efd4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " How does the Directed Energy Deposition process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.164Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.164Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efd6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": " What are some common applications of Directed Energy Deposition systems?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.273Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.273Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efd8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Additive Manufacturing enable the fabrication of injection molding inserts directly? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.382Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.382Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efda"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the advantages of General Directed Energy Deposition (DED) process?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.491Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.491Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efdc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Discuss the cost-saving potential of Additive Manufacturing (AM) models for high-volume production in manufacturing applications.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.600Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.600Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efde"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Compare the Aerosol Jet process with other Additive Manufacturing techniques, such as Fused Deposition Modeling (FDM).",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.715Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.715Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62711c5081a4b3747efe0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the process of Laser Engineered Net shaping.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:09.825Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:09.825Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747efe4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the advantages of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.044Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.044Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747efe6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the different types of systems available for LPD?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.153Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.153Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747efe8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does the General Directed Energy Deposition (DED) process work?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.262Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.262Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747efea"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the role of the STL file format in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.370Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.370Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747efec"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Define the terms: Conceptualization, Creation, Propagation and Digiproneurship.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.481Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.481Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747efee"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State some common post-processing methods are employed to achieve the desired surface finishes in AM parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.593Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.593Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747eff0"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the significance of Surface Texture Improvements in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.705Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.705Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747eff2"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "What are the challenges and limitations of using natural support post-processing in additive manufacturing for medical applications? ",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.815Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.815Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62712c5081a4b3747eff4"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the limitations of Directed Energy Deposition.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:10.925Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:10.925Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747eff6"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "When is it easier to control the motion of the deposition head instead of the substrate?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.035Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.035Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747eff8"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "State the techniques to enhance the accuracy of Additive Manufacturing parts.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.153Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.153Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747effa"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "In Additive Manufacturing, what are the Challenges in Support Material Removal?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.262Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.262Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747effc"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "Explain the effects of post-processing methods of Additive Manufacturing on surface texture.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.381Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.381Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747effe"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "List and briefly explain the five categories of Direct Write (DW) processes used in Additive Manufacturing.",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.490Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.490Z"
        //   },
        //   "__v": 0
        // },
        // {
        //   "_id": {
        //     "$oid": "64c62713c5081a4b3747f000"
        //   },
        //   "questionType": "shortAnswer",
        //   "content": "How does Directed Energy Deposition (DED) differ from other additive manufacturing processes?",
        //   "options": "asdc",
        //   "response": "yes",
        //   "marks": 2,
        //   "createdAt": {
        //     "$date": "2023-07-30T09:02:11.600Z"
        //   },
        //   "updatedAt": {
        //     "$date": "2023-07-30T09:02:11.600Z"
        //   },
        //   "__v": 0
        // }];
        // let userid="64ba6b9b11a01a0fd6215177";
        // response.map(x=>{
        //   if(x.userID["$oid"]===userid){
        //     const questionarr=x["questionsList"];
        //     questionarr.map((question,i)=>{
        //       questionresponse.map(y=>{
        //         if(y["_id"]["$oid"]===x){
        //           let obj;
        //           obj["id"]= i
        //           obj["question"]= y["content"],
        //           options= y[
        //             "options"
        //           ],
        //           answer= ['9']
  
        //         }
               
        //       })
        //     })
        //   }
        // })