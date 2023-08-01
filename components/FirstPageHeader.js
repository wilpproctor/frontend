import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import wilpimage from "../assets/wilpimage.jpg";
import bitslogo from "../assets/bitslogo.jpeg";
import wilplogo from "../assets/wilplogo.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";


export default function FirstPageHeader() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
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
  const handleGoogleSignInSuccess = async (credentialResponse) => {
    console.log(credentialResponse.json());
    const credResp = credentialResponse.json()
    const creds = jwtDecode(credentialResponse.credential);
    const credval=credentialResponse.credential;
    console.log(creds);
    console.log('credval',credval);
    try {
      const response = await fetch(
        "https://exambackend-khqy.onrender.com/api/auth/googleLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {credResp},
        }
      );
      console.log(response);
      if (response.status === 200){
        sessionStorage.setItem("cookie", response.data.token)
        router.push({
          pathname: "/student/examselect",
        });
      }
      else {
        alert("Login Error")
      }
      
    } catch (e) {
      console.log(e);
    }
    
  };
  useEffect(() => {
    let timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  });
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
        <button className="inline-flex items-center bg-blue-500 border-0 focus:outline-none hover:bg-orange-700 rounded text-white mt-4 md:mt-0">
          {/* <Link
            className="px-4 py-2 text-lg bg-rose-600 text-white rounded drop-shadow"
            href="/proctor/login"
          > */}
          {/* <Link href="/homenew">
            <div>Hi</div>
            </Link> */}
            <GoogleOAuthProvider clientId="580012478864-r2u2irsnn7o9qog66r437lcrsuk4s0dl.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleSignInSuccess(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
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
        </button>
      </div>
    </header>
    // <></>
  );
}
