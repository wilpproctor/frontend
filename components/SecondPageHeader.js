import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import wilpimage from "../assets/wilpimage.jpg";
import bitslogo from "../assets/bitslogo.jpeg";
import wilplogo from "../assets/wilplogo.png";

const headerURLs = [
  {
    name: "Compiler",
    url: "/proctor/compiler",
  },
  // {
  //   name: "Dashboard",
  //   url: "/proctor/dashboard",
  // },
  {
    name: "Exam",
    url: "/student/exam",
  },
  {
    name: "speech2text",
    // should connect to the Speect2Text component
    url: "/student/speech2text",
  },
  {
    name: "Material",
    url: "/student/material",
  },
];

export default function SecondPageHeader() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    let timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <header className="text-gray-400 bg-600 body-font" style={{backgroundColor: "#16192c"}}>
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        {/* <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">WILP BITS Pilani</span>
        </a> */}
        <div style={{display: "flex", flexDirection: "row"}}>
        {/* <div style={{height: "200px", width: "200px"}}> */}
        <div>  
            <div style={{width :"200px"}}>
        <Image
          src={bitslogo}
          alt="Picture of the author"
        //   width="200px"
        //   height="300px"
        />
        </div>
       
        </div>
        </div>
        {/* <div style={{display: "flex", flexDirection: "column"}}>
        <div>Work</div>
        <div>Integrated</div>
        <div>Learning</div>
        <div>Program</div>
        </div> */}
      </div>
    </header>
    // <></>
  );
}
