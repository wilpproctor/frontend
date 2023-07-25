import Link from "next/link";
import FirstPageFooter from "@/components/FirstPageFooter";
import LoginPageHeader from "@/components/LoginPageHeader";
//import GoogleSignInButton from "@/components/GoogleSignInButton";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import campus from "../../assets/campus.png";
import styles from "../../styles/Display.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState, useRef, useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] =useState("");
  const [name, setName] =useState("");

  const handleInputUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleInputNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInputEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState("");

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    //event.preventDefault();
    // You can perform any action here with the email, such as submitting it to a backend or performing validation.
    console.log("Email submitted:", email, password);
    try {
        //put hosted url exambackend
        const response = await fetch('https://exambackend-khqy.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username":username,
            "email":email,
            "name" : name,
            "password":password
        }),
        });

        const data = await response.json();
        if(data){
          console.log(data);
          if(data.success===true){
            router.push({
                pathname: "/user/login",
                //query: { returnUrl: router.asPath },
              });
          }
        }
       
      } catch (error) {
        console.error('Error during login:', error);
      }
  };


  const handleGoogleSignInSuccess = (userData) => {
    console.log("Google Sign-In Success:", userData);
    router.push({
      pathname: "/homenew",
      //query: { returnUrl: router.asPath },
    });
    // Handle the successful sign-in here, e.g., send the user data to the server.
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
            Name
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="text"
              value={name}
              onChange={handleInputNameChange}
              placeholder="Enter your name"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            UserName
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="text"
              value={username}
              onChange={handleInputUsernameChange}
              placeholder="Enter your username"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
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
            onClick={handleRegister}
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
            Register
          </button>
          <div style={{ marginTop: "20px", marginLeft: "30%" }}>
          <GoogleOAuthProvider clientId="580012478864-r2u2irsnn7o9qog66r437lcrsuk4s0dl.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
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
