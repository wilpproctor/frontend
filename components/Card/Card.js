import React from 'react';
import styles from './../../styles/Card.module.css'

export default function Card(props) {
  return (
    <div className={styles["card"]}>
      <div className={styles["triangle"]}></div>
      <div className={styles["content"]}>
        <div className={styles["company"]}>{props.company}</div>
        <div className={styles["subject"]}>{props.subject}</div>
        <div className={styles["details"]}>{props.exam_type}</div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["time"]}>{props.time}</div>
        <div className={styles["datetime"]}>
        <div>{props.date}
        </div>
        <div>{props.timing}
        </div>
      </div>
    </div>
    </div>
  );
}
