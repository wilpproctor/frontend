import Link from "next/link";
import FirstPageFooter from "@/components/FirstPageFooter";
import LoginPageHeader from "@/components/LoginPageHeader";
import Instruction from "../../assets/Intruc_page.jpg";
import styles from "../../styles/Display.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ExamStart() {
  const router = useRouter();
  return (
    <>
      <Header />
      <div style={{}}>
      <Image
        src={Instruction}
        // style={{ width: "80%", marginLeft: "100px", marginTop: "100px" }}
      />
      </div>
      <div style={{ marginTop: "50px", marginLeft: "50%" }}>
        <button
          type="button"
          onclick="alert('Sucess!')"
          style={{
            padding: "10px",
            color: "white",
            backgroundColor: "#007fff",
            cursor: "pointer"
          }}
          onClick={() => {
            router.push({
                pathname: "/student/exam",
                //query: { returnUrl: router.asPath },
              });
          }}
        >
          Accept
        </button>
      </div>
      <Footer />
    </>
  );
}
