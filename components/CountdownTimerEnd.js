import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CountdownTimerEnd = ({ examDate, examTime, totalTimeInSeconds }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    //console.log("examDate",examDate,"examTime", examTime,"totalTimeInSeconds", totalTimeInSeconds);
    const interval = setInterval(() => {
      const now = new Date();

      const [day, month, year] = examDate.split('-').map(Number);
      const [time, period] = examTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let targetDate = new Date(year, month - 1, day, hours, minutes);
      //console.log(targetDate,"targetDate");
      if (period === 'PM' && hours !== 12) {
        targetDate.setHours(targetDate.getHours() + 12);
      } else if (period === 'AM' && hours === 12) {
        targetDate.setHours(0);
      }
      //console.log(targetDate,"targetDate1");
      //console.log(targetDate.getTime(),"targetDate.getTime()");
      const examEndTime = new Date(targetDate.getTime() + totalTimeInSeconds * 1000);
      //console.log('examEndTime',examEndTime);
      const timeDiff = examEndTime - now;
      //console.log('timeDiff',timeDiff);
      if (timeDiff > 0) {
        dispatch({ type: 'SET_IS_EXAM_STARTED', payload: true });
        const totalSeconds = Math.floor(timeDiff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setRemainingTime({ hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setRemainingTime({ hours: 0, minutes: 0, seconds: 0 });

        // Dispatch action when exam ends
        dispatch({ type: 'SET_IS_EXAM_OVER', payload: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examDate, examTime, totalTimeInSeconds]);

  if (!remainingTime) {
    dispatch({ type: 'SET_IS_EXAM_ENDED', payload: true });
    return <div>Exam has ended!</div>;
  }

  return (
    <div>
      {remainingTime?<div>Time until exam ends: {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</div>:<div>Exam has ended!</div>}
      
    </div>
  );
};

export default CountdownTimerEnd;
