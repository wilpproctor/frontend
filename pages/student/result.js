import React from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ResultPage = () => {
  const response = useSelector((state) => state.response);
  const questions = useSelector((state) => state.questions);
  const router = useRouter();

  if (!response || !questions) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    // Perform any necessary actions before submission

    router.push({
      pathname: "/",
    });
  };
  console.log("Questions",questions);
  return (
    questions&&response&&
    <>
      <Header />
      <div>
        <h1 style={{ marginTop: "5%", textAlign: "center", fontSize: "40px", color: "black" }}>Exam Result</h1>
        <table style={{ marginLeft: "auto", marginRight: "auto", width: "70%", borderCollapse: "collapse", border: "1px solid black" }}>
          <thead>
            <tr>
              <th style={{ width: "50%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Question</th>
              <th style={{ width: "25%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Options</th>
              <th style={{ width: "25%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Response</th>
            </tr>
          </thead>
          <tbody>
            {response.map((item, index) => (
              <tr key={item.quesId}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{questions[index]["content"]}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {/* Extract and render options */}
                  {questions[index]["options"]&&Object.keys(questions[index]["options"]).map(optionKey => (
                    <div key={optionKey}>{optionKey}: {questions[index]["options"][optionKey]}</div>
                  ))}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{item.response}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Centered Submit Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResultPage;
