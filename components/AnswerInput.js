import React from 'react';

const AnswerInput = ({ onChange, value }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your answer here..."
      style={{width: "400px", height: "200px", border: "2px", boxSizing: "border-box"}}
    />
  );
};

export default AnswerInput;