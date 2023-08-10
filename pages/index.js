import Link from "next/link";
import FirstPageFooter from "../components/FirstPageFooter";
import Footer from "../components/Footer";
import campus from "../assets/campus.png";
import Image from "next/image";
import ExamPage from "./student/exam";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import wilpimage from "../assets/wilpimage.jpg";
import bitslogo from "../assets/bitslogo.jpeg";
import wilplogo from "../assets/wilplogo.png";
import Loader from "../components/loader/Loader";

export default function Home() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const headerURLs = [
    {
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
    const credResp = JSON.stringify(credentialResponse);
    const creds = jwtDecode(credentialResponse.credential);
    const credval = credentialResponse.credential;
    try {
      setLoading(true);
      const response = await fetch(
        "https://exambackend-khqy.onrender.com/api/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: credResp,
        }
      );
      console.log(response);
      setLoading(false); // Stop loading

      if (response.status === 200) {
        const data = await response.json();
        sessionStorage.setItem("cookie", "Bearer " + data.sessionToken);
        const user = {
          email: data.email,
          username: data.username,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
        router.push({
          pathname: "/student/examselect",
        });
      } else {
        alert("Login Error");
      }
    } catch (e) {
      setLoading(false);
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
    <>
      <header
        className="text-gray-400 bg-600 body-font"
        style={{ backgroundColor: "#16192c" }}
      >
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <div style={{ width: "200px" }}>
                <Image src={bitslogo} alt="Picture of the author" />
              </div>
            </div>
          </div>
          <nav className="md:ml-auto flex flex-wrap items-center text-white justify-center"></nav>
          <button className="inline-flex items-center bg-blue-500 border-0 focus:outline-none hover:bg-orange-700 rounded text-white mt-4 md:mt-0">
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
          </button>
        </div>
      </header>
       {loading ? (
          <Loader /> // Display the loader while loading
        ) : (<>
      <div
        className="flex justify-center items-center h-screen"
        style={{ maxHeight: "75vh" }}
      >
        <Image
          src={campus}
          alt="Picture of the author"
          //   width="200px"
          //   height="300px"
        />
      </div>
      <FirstPageFooter />
      </>
      )}
    </>
  );
}
