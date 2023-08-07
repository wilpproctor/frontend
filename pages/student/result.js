// pages/ResultPage.js
import React from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'; // Import the useRouter hook

const ResultPage = () => {
  const response = useSelector((state) => state.response);
  const router = useRouter(); // Initialize the router

  if (!response) {
    return <div>Loading...</div>;
  }

  // Define the handleSubmit function
  const handleSubmit = () => {
    // Perform any necessary actions before submission

    // Navigate to a different page after submission
    router.push({
        pathname: "/student/examselect",
      }); // Replace with the actual URL of the submitted page
  };

  return (
    <div>
      <h1>Exam Result</h1>
      <table>
        <thead>
          <tr>
            <th>Question ID</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {response.map((item) => (
            <tr key={item.quesId}>
              <td>{item.quesId}</td>
              <td>{item.response}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ResultPage;
