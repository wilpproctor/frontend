import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import SecondPageHeader from "../components/SecondPageHeader";
export default function Home() {
    const router = useRouter();
    const handleButtonClick = (buttonId) => {
        if(buttonId==="student"){
            router.push({
                pathname: "/student/examselect",
                //query: { returnUrl: router.asPath },
              });
        }else if(buttonId==="proctor"){
            router.push({
                pathname: "/proctor/dashboard",
                //query: { returnUrl: router.asPath },
              });
        }else{
            router.push({
                pathname: "/superproctor/dashboard",
                //query: { returnUrl: router.asPath },
              });
        }
        // Handle button click logic based on buttonId
        console.log(`Button ${buttonId} clicked`);
      };
  return (
    <>
      <SecondPageHeader />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            maxWidth: "300px",
            height: "200px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out",
            margin: "200px 50px 200px 50px",
            backgroundColor: "#f2cbb1"
          }}
          onClick={() => handleButtonClick("student")}
        >
          <h3 style={{ textAlign: "center", lineHeight: "200px" }}>
            Student Login
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            maxWidth: "300px",
            height: "200px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out",
            margin: "200px 50px 200px 50px",
            backgroundColor: "#bdf2b1"
          }}
          onClick={() => handleButtonClick("proctor")}
        >
          <h3 style={{ textAlign: "center", lineHeight: "200px" }}>
            Proctor Login
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            maxWidth: "300px",
            height: "200px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out",
            margin: "200px 50px 200px 50px",
            backgroundColor: "#99def0"
          }}
          onClick={() => handleButtonClick("superproctor")}
        >
          <h3 style={{ textAlign: "center", lineHeight: "200px" }}>
            Super Proctor Login
          </h3>
        </div>
      </div>
      <Footer />
    </>
  );
}
