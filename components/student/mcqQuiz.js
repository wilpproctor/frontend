import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { examBackendURL } from "../../pages";
import AnswerInput from '../AnswerInput';
import Loader from "../loader/Loader";
import ImagesGallery from "./Images_gallery";

const Quiz = (props) => {
  const dispatch = useDispatch();
  const examId = useSelector((state) => state.examId);
  const [examdata, setExamdata]=useState([]);

  const [currentindex, setCurrentindex] = useState(-1);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers here
  const optionsRef = useRef([]);
  const [questionData,setquestionData]=useState({});
  const isExamEnded =useSelector((state)=>state.isExamEnded);

  function addClickableExamData(data){
    for(let i = 0; i<data.length; i++){
      let quesLink = data[i]["content"].split("http");
      if(quesLink.length > 1){
        data[i]["content"] = <div><p>{quesLink[0]}</p><a href={"http"+quesLink[1]} target="_blank"><u>{"http"+quesLink[1]}</u></a></div>
      }
    }
    return data;
  }

  useEffect( ()=> { 
    const fetchData = async () => {
      console.log("examId: ", examId)
      try {
        const response = await fetch(
          `${examBackendURL}api/exams/questionsForExam/${examId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": sessionStorage.getItem("cookie")
            },
          }
        );
        const data = await response.json();
        console.log("data: ", data["questions"]) // Parse the response JSON
        data["questions"] = addClickableExamData(data["questions"])
        setExamdata(data["questions"])
        dispatch({ type: 'SET_QUESTION', payload: data["questions"] });
        if (currentindex == -1){
          setCurrentindex(0)
          setquestionData(data["questions"][0])
        }
      } catch (e) {   
        // setLoading(false);
        console.log(e);
      }
    };
  
    fetchData();
  }, [examId]);

  useEffect(()=>{
    setquestionData(examdata[currentindex]);
    console.log("questionData",questionData)
    console.log("quesId",questionData.quesId);
  },[currentindex]);

  // useEffect(()=>{
  //   if(isExamEnded)
  //     handleSubmit();
  // },[isExamEnded]);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    
    // For 'Multiple-Correct' type, handle multiple selected options
    if (questionData["questionType"] === "multi_mcq") {
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
  const [savedImages,setSavedImages]=useState(new Map());
  // export the savedImages to redux store
  // const dispatch = useDispatch();
  dispatch({ type: 'SET_IMAGES', payload: savedImages });
  const handleBack = () => {
    if (currentindex > 0) {
      setCurrentindex(currentindex - 1);
    }
    setImages([]);
  };

  const handleNext = () => {
    
    if (currentindex < examdata.length - 1) {
      setCurrentindex(currentindex + 1);
    }
    setImages([]);
  };

  const handleSubmit = async () => {
    // Prepare user response data
    console.log(userAnswers,"userAnswers");
    const userResponseData = userAnswers.map((response, index) => ({
    
      quesId: examdata[index].quesId, // Replace with your question ID property
      response: typeof(response) == 'object'?response.join(""):response,
      image: imageUrls[index] ? imageUrls[index][1] : [],

    }));
    

    console.log(userResponseData,"userResponse");

    const requestData = {
      // course_id:
      examId: examId,
      userResponse: userResponseData,
      images: imageUrls,

    };
    console.log(userResponseData,"userResponse");

    try {
      const response = await fetch(examBackendURL + "api/student/submitResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("cookie")
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
        alert(`Your response has been saved`);
        dispatch({ type: 'SET_RESPONSE', payload: userResponseData });
        props.handleQuizSubmit();
        // Handle error response, maybe show an error message
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      // Handle error
    }
  };
  const [images, setImages] = useState([]);
  const [toUpload,setToUpload]=useState([]);
   const handleMultipleImages =(evnt)=>{
      const selectedFIles =[];
      const sel = [];
      const targetFiles =evnt.target.files;
      const targetFilesObject= [...targetFiles]
      targetFilesObject.map((file)=>{
         return selectedFIles.push(URL.createObjectURL(file))
      })
      setImages(selectedFIles);
      for(let i = 0;i<targetFiles.length;i++){
        sel.push(targetFiles[i]);
      }
      setToUpload(sel);

    }
  const [imageUrls,setImageUrls]=useState([]);
  function handleImageChange(){
    for(let i = 0;i<toUpload.length;i++){
      const file = toUpload[i];
    // upload image to cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wilp007");
    formData.append("cloud_name", "drmjrtb8w");
    fetch("https://api.cloudinary.com/v1_1/drmjrtb8w/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const url = data.url;
        const index = imageUrls.findIndex((entry) => entry[0] === currentindex);
        if (index === -1) {
          setImageUrls((prevUrls) => [...prevUrls, [currentindex, [url]]]);
        } else {
          setImageUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index][1].push(url);
            return updatedUrls;
          });
        }
        console.log("data in image ",data) 
      })
      .catch((err) => console.log(err));
    }
    savedImages.set(examdata[currentindex].quesId,images);
    setSavedImages(savedImages);
    console.log("imageUrls",imageUrls)
  }

  console.log(questionData,"holla");
  //const {questionType, questionType, options } = questionData;

  return (
    questionData?
    <div className="mx-auto bg-white p-8 rounded shadow">
      <Head>
        <script
          type="text/javascript"
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
        />
      </Head>

      <h2 className="text-xl font-semibold mb-4">{questionData["content"]}</h2>
      {questionData["questionType"] === "mcq" && (
        <ul>
          {Object.entries(JSON.parse(questionData["options"])).map(([key, option]) => (
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
      
      {(questionData["questionType"] === "long" || questionData["questionType"] === "short")&& (
        <div style={{ display: "flex", justifyContent: "left", marginTop: "20px"}}>
        <textarea
          style={{width: "100%"}}
          placeholder="Write Your Answer"
          onChange={handleAnswerChange}
          value={userAnswers[currentindex] || ""}
          className="answer-input"
        />
        
    <div className="form-group my-3 mx-3">
    <input type="file" accept="image/*" onChange={handleMultipleImages} multiple/>
    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-7" onClick={handleImageChange}>Upload</button>
    </div>
      
   
      
      </div>
      

      )}
      
      {questionData["questionType"] === "multi_mcq" && (
        <ul>
          {Object.entries(JSON.parse(questionData["options"])).map(([key, option]) => (
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
      <ImagesGallery images={examdata.length && examdata[currentindex].quesId && savedImages.has(examdata[currentindex].quesId) ? savedImages.get(examdata[currentindex].quesId) : images} style={{display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',}}/>
    </div>:<div><Loader/></div>
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
