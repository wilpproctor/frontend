import Link from "next/link";
import FirstPageFooter from "../../components/FirstPageFooter";
import LoginPageHeader from "../../components/LoginPageHeader";
import campus from "../../assets/campus.png";
import styles from "../../styles/Display.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../components/Card/Card";

export default function ExamSelect() {
  // const [arr, setArr] = useState([]);

  // // Function to fetch data from the API
  // const fetchDataFromAPI = async () => {
  //   try {
  //     const response = await axios.get("YOUR_API_ENDPOINT");
  //     // Assuming the API returns an array of exam data in response.data
  //     setArr(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data from the API:", error);
  //   }
  // };
  const arr=[
    {
      company: "Cummins",
      subject: "Engineering Materials",
      exam_type: "EC1",
      time: "10:30 am",
      date: "07/08/2023"
    },
    {
      company: "Cummins",
      subject: "Engineering Materials",
      exam_type: "EC1",
      time: "10:30 am",
      date: "07/08/2023"
    },
    {
      company: "Cummins",
      subject: "Engineering Materials",
      exam_type: "EC1",
      time: "10:30 am",
      date: "07/08/2023"
    },
    {
      company: "Cummins",
      subject: "Engineering Materials",
      exam_type: "EC1",
      time: "10:30 am",
      date: "07/08/2023"
    },
    {
      company: "Cummins",
      subject: "Engineering Materials",
      exam_type: "EC1",
      time: "10:30 am",
      date: "07/08/2023"
    },
  ]
  const router = useRouter();
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
      {arr.map((ele)=>{
        return(
          <>
          <div onClick={() => {
            router.push({
                pathname: "/student/examstart",
                //query: { returnUrl: router.asPath },
              });
          }}
          // onClick={fetchDataFromAPI}
          >
          <Card company={ele.company} subject={ele.subject} exam_type={ele.exam_type} time={ele.time} date={ele.date}/></div>
            {/* <div style={{display: "flex", flexDirection: "row"}}>
              <div>{ele.company}</div>
              <div>{ele.company}</div>
              <div>{ele.company}</div>
              <div>{ele.company}</div>
              <div>{ele.company}</div>
            </div> */}
          </>
        )
         
      })}
{/* 
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            marginRight: "20px",
            marginTop: "20px",
            border: "6px solid #092d4f",
            borderRadius: "2px",
            padding: "20px",
            width: "500px",
            backgroundColor: "#2e8ee8",
            color: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              marginLeft: "40%",
              marginTop: "5%",
            }}
          >
            TACO
          </div>
          <div
            style={{ marginLeft: "auto", marginRight: "auto", width: "25%", marginTop: "5%" }}
          >
            Calculus
          </div>
          <div style={{marginLeft: "40%", marginTop: "5%"}}>EC2</div>
          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "10%", marginTop: "5%"}}>IST 10:00am</div>
            <div style={{marginLeft: "20%", marginTop: "5%"}}>23/07/2023</div>
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            marginRight: "20px",
            marginTop: "20px",
            border: "6px solid #092d4f",
            borderRadius: "2px",
            padding: "20px",
            width: "500px",
            backgroundColor: "#2e8ee8",
            color: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push({
                pathname: "/student/examstart",
                //query: { returnUrl: router.asPath },
              });
          }}
        >
          <div
            style={{
              marginLeft: "40%",
              marginTop: "5%",
            }}
          >
            TACO
          </div>
          <div
            style={{ marginLeft: "30%", marginRight: "10%", width: "60%", marginTop: "5%" }}
          >
            Engineering Materials
          </div>
          <div style={{marginLeft: "40%", marginTop: "5%"}}>EC2</div>
          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "0%", marginTop: "5%"}}>IST 10:00am</div>
            <div style={{marginLeft: "20%", marginTop: "5%"}}>23/07/2023</div>
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            marginRight: "20px",
            marginTop: "20px",
            border: "6px solid #092d4f",
            borderRadius: "2px",
            padding: "20px",
            width: "500px",
            backgroundColor: "#2e8ee8",
            color: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              marginLeft: "40%",
              marginTop: "5%",
            }}
          >
            TACO
          </div>
          <div
            style={{ marginLeft: "25%", marginRight: "15%", width: "70%", marginTop: "5%" }}
          >
            Elec. & Electronics Tech.
          </div>
          <div style={{marginLeft: "40%", marginTop: "5%"}}>EC2</div>
          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "0%", marginTop: "5%"}}>IST 10:00am</div>
            <div style={{marginLeft: "20%", marginTop: "5%"}}>23/07/2023</div>
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            marginRight: "20px",
            marginTop: "20px",
            border: "6px solid #092d4f",
            borderRadius: "2px",
            padding: "20px",
            width: "500px",
            backgroundColor: "#2e8ee8",
            color: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              marginLeft: "40%",
              marginTop: "5%",
            }}
          >
            TACO
          </div>
          <div
            style={{ marginLeft: "15%", marginRight: "5%", width: "70%", marginTop: "5%" }}
          >
            Mechanics Of Solids
          </div>
          <div style={{marginLeft: "40%", marginTop: "5%"}}>EC2</div>
          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "0%", marginTop: "5%"}}>IST 10:00am</div>
            <div style={{marginLeft: "20%", marginTop: "5%"}}>23/07/2023</div>
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            marginRight: "20px",
            marginTop: "20px",
            border: "6px solid #092d4f",
            borderRadius: "2px",
            padding: "20px",
            width: "500px",
            backgroundColor: "#2e8ee8",
            color: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              marginLeft: "25%",
              marginTop: "5%",
            }}
          >
            Practice Tests
          </div>
          <div style={{ marginLeft: "40%", marginTop: "5%" }}>
            (10)
          </div>
          <div style={{marginLeft: "25%", marginTop: "5%"}}>Avail NOW!!</div>
        </div>*/}
      </div> 

      <Footer />
    </>
  );
}
