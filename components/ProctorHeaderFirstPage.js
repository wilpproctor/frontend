import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createBackendSocket } from "../lib/sockets";
import Image from "next/image";
import wilpimage from "../assets/wilpimage.jpg";
import bitslogo from "../assets/bitslogo.jpeg";
import wilplogo from "../assets/wilplogo.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";


export default function ProctorHeaderFirstPage(props) {
  const backend = createBackendSocket("/proctor");
  const router = useRouter();

  const login = ()=>{
    router.push("/proctor/login");
  }
  const logout = ()=>{
    router.push("/proctor/login");
    backend.emit("disconnect-proctor", "Closing from proctor side");
    sessionStorage.removeItem("cookie");
    sessionStorage.removeItem("user");
  }


  return (
    <header
      className="text-gray-400 bg-600 body-font"
      style={{ backgroundColor: "#16192c" }}
    >
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        {/* <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">WILP BITS Pilani</span>
        </a> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <div style={{height: "200px", width: "200px"}}> */}
          <div>
            <div style={{ width: "200px" }}>
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
        <nav className="md:ml-auto flex flex-wrap items-center text-white justify-center">
          {/* {headerURLs.map(({ name, url }, i) => (
            <Link key={i} className="mr-5 hover:text-white" href={url}>
              {name}
            </Link>
          ))} */}
          {/* <Link key={10} className="mr-5 hover:text-white" href={"/"}>
            {time.toTimeString().substring(0, 8)}
          </Link> */}
        </nav>
        {(props.buttonAvailable==="login")&&<button className="inline-flex items-center bg-blue-500 border-0 focus:outline-none hover:bg-orange-700 rounded text-white mt-4 md:mt-0">
          {/* <Link
            className="px-4 py-2 text-lg bg-rose-600 text-white rounded drop-shadow"
            href="/proctor/login"
          > */}
          {/* <Link href="/homenew">
            <div>Hi</div>
            </Link> */}
            <button
          className="px-6 py-3 rounded bg-blue-300 font-semibold"
          onClick={login}
        >
          Login
        </button>
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
          {/* </Link> */}
        </button>}
        {(props.buttonAvailable==="logout")&&<button className="inline-flex items-center bg-blue-500 border-0 focus:outline-none hover:bg-orange-700 rounded text-white mt-4 md:mt-0">
          {/* <Link
            className="px-4 py-2 text-lg bg-rose-600 text-white rounded drop-shadow"
            href="/proctor/login"
          > */}
          {/* <Link href="/homenew">
            <div>Hi</div>
            </Link> */}
            <button
          className="px-6 py-3 rounded bg-blue-300 font-semibold"
          onClick={logout}
        >
          Logout
        </button>
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
          {/* </Link> */}
        </button>}
      </div>
    </header>
    // <></>
  );
}
