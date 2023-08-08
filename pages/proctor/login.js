import { useRouter } from "next/router";
import FirstPageFooter from "../../components/FirstPageFooter";
import ProctorHeaderFirstPage from "../../components/ProctorHeaderFirstPage";
import { useContext, useState, useRef, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleInputEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState("");

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRegister = () => {
    router.push("/proctor/register"); // Redirect to registration page
  };
  const handleLogin = async () => {
    //event.preventDefault();
    // You can perform any action here with the email, such as submitting it to a backend or performing validation.
    console.log("Email submitted:", email, password);
    try {
      //put hosted url exambackend
      const response = await fetch(
        "https://exambackend-khqy.onrender.com/api/auth/login-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      const data = await response.json();
      if (data.success) {
          sessionStorage.setItem("cookie",data.token);
          router.push({
            pathname: "/proctor/dashboard",
            //query: { returnUrl: router.asPath },
          })}
        else {
        alert("Check Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <ProctorHeaderFirstPage firstpage={false}/>
      <div
        className="flex justify-center items-center h-screen"
        style={{ maxHeight: "75vh", backgroundColor: "#E5E4E2" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Email Address
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
          <button
            onClick={handleRegister}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "20px"
            }}
          >
            Not a member? Register here
          </button>
        </div>
      </div>
      <FirstPageFooter />
    </>

  );
}
