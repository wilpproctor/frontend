import React from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImagesGallery from "../../components/student/Images_gallery";

const ResultPage = () => {
  const response = useSelector((state) => state.response);
  const questions = useSelector((state) => state.questions);

  const router = useRouter();
  const images = useSelector((state) => state.images);
  console.log("images", images)

  if (!response || !questions) {
    return <div>Loading...</div>;
  }

  const findResponseForQuestion = (quesId) => {
    const responseItem = response.find((item) => item.quesId === quesId);
    return responseItem ? responseItem.response : ''; // Return an empty string if no response
  }; 

  const handleSubmit = () => {
    // Perform any necessary actions before submission

    router.push({
      pathname: "/",
    });
  };

  return (
    questions&&response&&
    <>
      <Header countertimer={"no"}/>
      <div>
        <h1 style={{ marginTop: "5%", textAlign: "center", fontSize: "40px", color: "black" }}>Exam Result</h1>
        <table style={{ marginLeft: "auto", marginRight: "auto", width: "70%", borderCollapse: "collapse", border: "1px solid black" }}>
          <thead>
            <tr>
              <th style={{ width: "50%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Question</th>
              <th style={{ width: "25%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Options</th>
              <th style={{ width: "25%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Response</th>
              <th style={{ width: "25%", border: "1px solid black", padding: "8px", textAlign: "left" }}>Images</th>

            </tr>
          </thead>
          <tbody>
          {questions.map((question, index) => (
            <tr key={question.quesId}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{question.content}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {JSON.parse(question.options) &&
                  Object.keys(JSON.parse(question.options)).sort().map((optionKey) => (
                    <div key={optionKey}>
                      {optionKey}: {JSON.parse(question.options)[optionKey]}
                    </div>
                  ))}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {findResponseForQuestion(question.quesId)}
              </td>

              <td style={{ border: "1px solid black", padding: "8px" }}>
                {images.has(index) && <ImagesGallery images={images.get(index)} />}
              </td>
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
            Submit All the answers
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResultPage;
