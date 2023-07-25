import React, { useState, useEffect } from "react";
import Link from "next/link";

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
  useEffect(() => {
    let timer = setInterval(() => setTime(new Date()), 1000);
    return () => { clearInterval(timer); };
  })
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
          <Link key={10} className="mr-5 hover:text-white" href={"/"}>
            {time.toTimeString().substring(0, 8)}
          </Link>
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
