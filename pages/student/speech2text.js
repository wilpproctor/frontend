import Dictaphone from "@/../components/question/Dictaphone";
import React, { useState } from "react";

const Speech2Text = () => {
  const [text, setText] = useState("");
  
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "20px" }}>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Click 'Start Recording' to begin"
        style={{ border: "1px solid #ccc", borderRadius: "4px", flexGrow: 1, resize: "vertical", padding: "10px" }}
      />
      {/* Dictaphone component takes an outputUpdater function as a prop,
          which is called every time the text is updated.
          It also takes an answer prop, which represents the answer to the question. */}
      <Dictaphone outputUpdater={setText} answer="" />
    </div>
  );
};
  

export default Speech2Text;
