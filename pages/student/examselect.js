import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card/Card";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loader from "../../components/loader/Loader"; // Import the shared Loader component

export default function ExamSelect() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState(null);
  const storedUserJSON = sessionStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  const email = storedUser.email;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://exambackend-khqy.onrender.com/api/student/examFromUser`;
    const bearerToken = sessionStorage.getItem("cookie");

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data["examsForStudent"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleExamStart = (examId,time,date,duration,openBook,compiler,excel,calculator) => {
    dispatch({ type: "SET_EXAM_ID", payload: examId });
    dispatch({ type: "SET_EXAM_TIME", payload: time});
    dispatch({type: "SET_EXAM_DATE", payload: date});
    dispatch({type:"SET_EXAM_DURATION", payload: duration});
    dispatch({type:"SET_OPEN_BOOK", payload: openBook});
    dispatch({type:"SET_COMPILER", payload: compiler});
    dispatch({type:"SET_EXCEL", payload: excel});
    dispatch({type:"SET_CALCULATOR", payload: calculator});
    router.push({
      pathname: `/student/examstart`,
    });
  };

  return (
    <>
      <Header countertimer={"no"}/>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? ( // Use Loader component when loading
          <Loader />
        ) : data ? (
          data.map((ele) => (
            <div key={ele._id} onClick={() => handleExamStart(ele._id, ele.time, ele.date,ele.totalTime,ele.openBook,ele.compiler,ele.excel,ele.calculator)}>
              <Card
                company={ele.company}
                subject={ele.subject}
                exam_type={ele.year+", Sem: "+ele.sem+", "+ele.examType}
                time={ele.totalTime + " minutes"}
                date={ele.date}
                timing={ele.time}
              />
            </div>
          ))
        ) : (
          <div>No exams available.</div>
        )}
      </div>
      <Footer />
    </>
  );
}
