import React, { useEffect } from "react";
// import "./styles/Buttons.css";
import styles from "@/../styles/Buttons.module.css"

const Buttons = ({ inputHandler, clearInput, backspace, changePlusMinus, calculateAns }) => {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("equalbtn").click();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <div className={styles["show-btn"]}>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        ^
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        (
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        )
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        √
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        x<sup>2</sup>
      </button>
      <button className={styles["btn clr"]} onClick={clearInput}>
        AC
      </button>
      <button className={styles["btn clr"]} onClick={backspace}>
        ⌫
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        log
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        ÷
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        %
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        7
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        8
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        9
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        x
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        x<sup>3</sup>
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        4
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        5
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        6
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        -
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        <sup>3</sup>√
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        1
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        2
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        3
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        +
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        !
      </button>
      <button className={styles["btn exp"]} onClick={changePlusMinus}>
        ±
      </button>
      <button className={styles["btn"]} onClick={inputHandler}>
        0
      </button>
      <button className={styles["btn exp"]} onClick={inputHandler}>
        .
      </button>
      <button className={styles["btn exp equal"]} id="equalbtn" onClick={calculateAns}>
        =
      </button>
    </div>
  );
};

export default Buttons;

// Don't say, I'll work on a particular tech stack; Shows your collaboration
// Well Plan before you start coding, be very clear with the problem statement before coding
// Make sure that the mentors approves
// NGOs should agree, align your thoughts with the NGOs and Mentors
// Importance is on the solution, less on the code