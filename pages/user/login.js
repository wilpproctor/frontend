import Link from "next/link";
import FirstPageFooter from "../../components/FirstPageFooter";
import LoginPageHeader from "../../components/LoginPageHeader";
import jwtDecode from "jwt-decode";
//import GoogleSignInButton from "@/components/GoogleSignInButton";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import campus from "../../assets/campus.png";
import styles from "../../styles/Display.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState, useRef, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleInputEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState("");

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    //event.preventDefault();
    // You can perform any action here with the email, such as submitting it to a backend or performing validation.
    console.log("Email submitted:", email, password);
    try {
      //put hosted url exambackend
      const response = await fetch(
        "https://exambackend-khqy.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password: password }),
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log(data);
        if (data.role === "superadmin") {
          router.push({
            pathname: "/superproctor/login",
            //query: { returnUrl: router.asPath },
          });
        } else if (data.role === "admin") {
          router.push({
            pathname: "/proctor/login",
            //query: { returnUrl: router.asPath },
          });
        } else {
          router.push({
            pathname: "/student/examselect",
            //query: { returnUrl: router.asPath },
          });
        }
      } else {
        alert("Check Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGoogleSignInSuccess = async(credentialResponse) => {
    console.log(credentialResponse);
    const creds = jwtDecode(credentialResponse.credential);
    console.log(creds);
    try{
      const response = await fetch(
        "https://exambackend-khqy.onrender.com/api/auth/googlelogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: creds,
        }
      );
      console.log(response);
      router.push({
        pathname: "/student/examselect",
      });
    }catch(e){
      console.log(e);
    }
  };

  const handleGoogleSignInSuccessTemp = async(credentialResponse) => {
    console.log(credentialResponse);
    const creds = jwtDecode(credentialResponse.credential);
    console.log(creds);
    router.push({
      pathname: "/student/examselect",
    });
  };

  const handleGoogleSignInFailure = () => {
    console.log("Google Sign-In Failed");  
    // router.push({
    //     pathname: "/homenew",
    //     //query: { returnUrl: router.asPath },
    //   });
    // Handle sign-in failure, show error message, etc.
  };

  return (
    <>
      <LoginPageHeader />
      <div
        className="flex justify-center items-center h-screen"
        style={{ maxHeight: "75vh", backgroundColor: "#E5E4E2" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            BITS Email Address
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="email"
              value={email}
              onChange={handleInputEmailChange}
              placeholder="Enter your email"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>Password</div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="password"
              value={password}
              onChange={handleInputPasswordChange}
              placeholder="Enter your password"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
          <div style={{ marginTop: "20px", marginLeft: "30%" }}>
            <GoogleOAuthProvider clientId="580012478864-r2u2irsnn7o9qog66r437lcrsuk4s0dl.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {handleGoogleSignInSuccess(credentialResponse)}}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
      <FirstPageFooter />
    </>
  );
}
