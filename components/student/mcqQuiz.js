import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnswerInput from '../AnswerInput';

const Quiz = (props) => {
const dispatch = useDispatch();
const examId = useSelector((state) => state.examId);
const [examdata, setExamdata]=useState([]);
// const examdata = [
//   {
//     questionType: "sub",
//     content: "What is the diameter of Venus?",
//     imageUrl: "https://picsum.photos/id/237/200/300",
//     marks: 10,
//     negMarks: 4,
//   },
//   {
//     questionType: "mcc",
//     content: "What is the diameter of Venus?",
//     options: {
//       A: "3000km",
//       B: "4000km",
//       C: "5000km",
//       D: "6000km",
//     },
//     imageUrl: "https://picsum.photos/id/237/200/300",
//     marks: 10,
//     negMarks: 4,
//   },
//   {
//     questionType: "mcc",
//     content: "What is the diameter of balls?",
//     options: {
//       A: "3000km",
//       B: "4000km",
//       C: "5000km",
//       D: "6000km",
//     },
//     imageUrl: "https://picsum.photos/id/237/200/300",
//     marks: 10,
//     negMarks: 4,
//   },
// ];

  const [currentindex, setCurrentindex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers here
  const optionsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://exambackend-khqy.onrender.com/api/exams/questionsForExam/${examId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": sessionStorage.getItem("cookie")
            },
          }
        );
        const data = await response.json(); // Parse the response JSON
        setExamdata(data["questions"]);
      } catch (e) {   
        // setLoading(false);
        console.log(e);
      }
    };
  
    fetchData();
  }, []);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    
    // For 'Multiple-Correct' type, handle multiple selected options
    if (questionType === "Multiple-Correct") {
      const updatedAnswers = [...userAnswers[currentindex] || []];
      const optionIndex = updatedAnswers.indexOf(selectedOption);
      
      if (optionIndex !== -1) {
        updatedAnswers.splice(optionIndex, 1);
      } else {
        updatedAnswers.push(selectedOption);
      }
      
      setUserAnswers((prevAnswers) => {
        const updatedUserAnswers = [...prevAnswers];
        updatedUserAnswers[currentindex] = updatedAnswers;
        return updatedUserAnswers;
      });
    } else {
      // For 'MCQ' type, handle single selected option
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentindex] = selectedOption;
      setUserAnswers(updatedAnswers);
    }
  };

  const handleAnswerChange = (event) => {
    const textAnswer = event.target.value;
    // Update user answers for text-based questions
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentindex] = textAnswer;
    setUserAnswers(updatedAnswers);
  };

  const handleBack = () => {
    if (currentindex > 0) {
      setCurrentindex(currentindex - 1);
    }
  };

  const handleNext = () => {
    if (currentindex < examdata.length - 1) {
      setCurrentindex(currentindex + 1);
    }
  };

  const handleSubmit = async () => {
    // Prepare user response data
    const userResponseData = userAnswers.map((response, index) => ({
      quesId: examdata[index].quesId, // Replace with your question ID property
      response: response,
    }));

    const requestData = {
      examId: examId,
      userResponse: userResponseData,
    };
    console.log(userResponseData,"userResponse");

    try {
      const response = await fetch("https://exambackend-khqy.onrender.com/api/student/submitResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert(`Your response has been saved`);
        dispatch({ type: 'SET_RESPONSE', payload: userResponseData });
        props.handleQuizSubmit();

        //window.location = "/student/examselect";
        // Handle successful response, maybe show a success message
      } else {
        // Handle error response, maybe show an error message
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      // Handle error
    }
  };

  const questionData = examdata[currentindex];
  const { content: question, questionType, options } = questionData;

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded shadow">
      <Head>
        <script
          type="text/javascript"
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
        />
      </Head>

      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      {questionType === "mcq" && (
        <ul>
          {Object.entries(options).map(([key, option]) => (
            <li key={key}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${currentindex}`}
                  value={key}
                  onChange={handleOptionChange}
                  checked={userAnswers[currentindex] === key}
                  className="mr-2"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
      
      {questionType === "shortanswer" && (
        <div>
          <h1>Write Your Answer</h1>
          <input
            type="text"
            onChange={handleAnswerChange}
            value={userAnswers[currentindex] || ""}
          />
        </div>
      )}
      
      {questionType === "mqq" && (
        <ul>
          {Object.entries(options).map(([key, option]) => (
            <li key={key}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name={`question-${currentindex}`}
                  value={key}
                  onChange={handleOptionChange}
                  checked={userAnswers[currentindex]?.includes(key)}
                  className="mr-2"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        {currentindex!==0&&<button
          disabled={currentindex === 0}
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Back
        </button>}
        {currentindex!==examdata.length - 1&& <button
          disabled={currentindex === examdata.length - 1}
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Next
        </button>}
        {currentindex === examdata.length - 1 && (
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




// const examdata = [
//   {
//     questionType: "mcc",
//     content: "What is the diameter of Venus?",
//     options: {
//       A: "3000km",
//       B: "4000km",
//       C: "5000km",
//       D: "6000km",
//     },
//     imageUrl: "https://picsum.photos/id/237/200/300",
//     marks: 10,
//     negMarks: 4,
//   },
//   {
//     questionType: "mcc",
//     content: "What is the diameter of balls?",
//     options: {
//       A: "3000km",
//       B: "4000km",
//       C: "5000km",
//       D: "6000km",
//     },
//     imageUrl: "https://picsum.photos/id/237/200/300",
//     marks: 10,
//     negMarks: 4,
//   },
// ];

// {questionType === "mcc" ? (
//   <ul>
//     {Object.values(options).map((option, index) => (
//       <li key={index}>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name={`question-${currentindex}`}
//             value={option}
//             onChange={handleOptionChange}
//             checked={userAnswers[currentindex] === option}
//             className="mr-2"
//           />
//           {option}
//         </label>
//       </li>
//     ))}
//   </ul>
// ) : (
//   <div>
//     <h1>Write Your Answer</h1>
//     <input
//       type="text"
//       onChange={handleAnswerChange}
//       value={userAnswers[currentindex] || ""}
//     />
//   </div>
// )}