import { useRouter } from "next/router";
import FirstPageFooter from "../../components/FirstPageFooter";
import ProctorHeaderFirstPage from "../../components/ProctorHeaderFirstPage";
import { useState } from "react";
import Loader from "../../components/loader/Loader"; // Import the Loader component


export default function RegistrationPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleInputEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInputUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    try {
      setLoading(true); // Activate loader during registration process

      // Replace with your registration API endpoint
      const response = await fetch(
        "https://exambackend-khqy.onrender.com/api/auth/signup-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "name":fullName, email, username, password }),
        }
      );

      const data = await response.json();
      if (data.success) {
        router.push("/proctor/login");
      } else {
        alert("Registration failed. Please try again.");
      }
      setLoading(false); // Deactivate loader after registration process
    } catch (error) {
      console.error("Error during registration:", error);
      setLoading(false); // Deactivate loader in case of error
    }
  };

  return (
    <>
      <ProctorHeaderFirstPage buttonAvailable={"none"} />
      <div
        className="flex justify-center items-center h-screen"
        style={{ maxHeight: "75vh", backgroundColor: "#E5E4E2" }}
      > {loading ? (
        <Loader /> // Display the loader while loading
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Full Name
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="text"
              value={fullName}
              onChange={handleInputFullNameChange}
              placeholder="Enter your full name"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
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
          <div style={{ fontSize: "20px", fontWeight: "600" }}>Username</div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="text"
              value={username}
              onChange={handleInputUsernameChange}
              placeholder="Choose a username"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>Password</div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="password"
              value={password}
              onChange={handleInputPasswordChange}
              placeholder="Choose a password"
              style={{ height: "40px", width: "500px", padding: "20px" }}
            />
          </div>
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
            }}
          >
            Register
          </button>
        </div>
         )}
      </div>
      <FirstPageFooter />
    </>
  );
}
