import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ examDate, examTime, totalTimeInSeconds, dispatch }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const [day, month, year] = examDate.split('/').map(Number);
      const [time, period] = examTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let targetDate = new Date(year, month - 1, day, hours, minutes);

      if (period === 'PM' && hours !== 12) {
        targetDate.setHours(targetDate.getHours() + 12);
      } else if (period === 'AM' && hours === 12) {
        targetDate.setHours(0);
      }

      const examEndTime = new Date(targetDate.getTime() + totalTimeInSeconds * 1000);
      const timeDiff = examEndTime - now;
      
      if (timeDiff > 0) {
        const totalSeconds = Math.floor(timeDiff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setRemainingTime({ hours, minutes, seconds });

        // Dispatch action when exam starts
        if (totalSeconds === totalTimeInSeconds) {
          dispatch({ type: 'SET_IS_EXAM_STARTED', payload: true });
        }
      } else {
        clearInterval(interval);
        setRemainingTime({ hours: 0, minutes: 0, seconds: 0 });

        // Dispatch action when exam ends
        dispatch({ type: 'SET_IS_EXAM_OVER', payload: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examDate, examTime, totalTimeInSeconds, dispatch]);

  if (!remainingTime) {
    return <div>Exam has ended!</div>;
  }

  return (
    <div>
      <div>Exam ends in: {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</div>
    </div>
  );
};

export default CountdownTimer;
