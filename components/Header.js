import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios'
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

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [backTimer, setBackTimer] = useState(null);

  useEffect(() => {
    console.log("jdncsjn")
    const timer = setInterval(() => {
      setTime(new Date());
      fetchBackTimer();
    }, 1000);
    console.log("jd==csjn")
    fetchBackTimer();
    console.log("jdncinininijninsjn")
    return () => {
      clearInterval(timer);
    };
  }, []);
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    console.log("Time: ", `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const fetchBackTimer = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/back-timer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json(); // Parse the response JSON
      const { remainingTime } = data;
      console.log(data)
      setBackTimer(remainingTime);
    } catch (error) {
      console.error('Error fetching back timer:', error);
    }
  };
  return (
    <header className="text-gray-400 bg-blue-600 body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
            viewBox="0 0 24 24"
          >
            {/*<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>*/}
          </svg>
          <span className="ml-3 text-xl">WILP BITS Pilani</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-white justify-center">
          {headerURLs.map(({ name, url }, i) => (
            <Link key={i} className="mr-5 hover:text-white" href={url}>
              {name}
            </Link>
          ))}
          <div className="mr-5 hover:text-white">
          {backTimer && formatTime(backTimer)}
          </div>
        </nav>
        {/* <button className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-orange-700 rounded text-white mt-4 md:mt-0">
          Logout
          {
            //  <svg
            //   fill="none"
            //   stroke="currentColor"
            //   strokeLinecap="round"
            //   strokeLinejoin="round"
            //   strokeWidth="2"
            //   className="w-4 h-4 ml-1"
            //   viewBox="0 0 24 24"
            // >
            //   <path d="M5 12h14M12 5l7 7-7 7"></path>
            // </svg>
          }
        </button> */}
      </div>
    </header>
    // <></>
  );
}
