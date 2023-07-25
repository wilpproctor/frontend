import React from "react";
// import "./styles/Display.css";
import styles from "../../styles/Display.module.css"


const Display = ({ input, setInput, answer }) => {
  const onChangeTagInput = (e) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  return (
    <div>
      <div className={styles["display"]}>
        {answer === "" ? (
          <>
            <input
              type="text"
              name="input"
              className={styles["input"]}
              style={{ padding: "15px" }}
              value={input}
              placeholder="0"
              maxLength={12}
              // disabled
              onChange={onChangeTagInput}
              autoComplete="off"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="input"
              className={styles["value"]}
              value={input}
              placeholder="0"
              maxLength={12}
              disabled
            />
            <input
              type="text"
              name="value"
              className={styles["input"]}
              value={answer}
              disabled
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Display;