// pages/ResultPage.js
import React from "react";

const ResultPage = ({ responseData }) => {
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
          {responseData.userResponse.map((item) => (
            <tr key={item.quesId}>
              <td>{item.quesId}</td>
              <td>{item.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;
