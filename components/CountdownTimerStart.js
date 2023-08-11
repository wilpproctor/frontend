import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CountdownTimerStart = ({ examDate, examTime, totalTimeInSeconds }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const [day, month, year] = examDate.split('-').map(Number);
      const [time, period] = examTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let targetDate = new Date(year, month - 1, day, hours, minutes);

      if (period === 'PM' && hours !== 12) {
        targetDate.setHours(targetDate.getHours() + 12);
      } else if (period === 'AM' && hours === 12) {
        targetDate.setHours(0);
      }

      const timeDiffStart = targetDate - now; // Calculate time difference until exam starts
      //console.log('timeDiffStart',timeDiffStart);
      if (timeDiffStart > 0) {
        const totalSeconds = Math.floor(timeDiffStart / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setRemainingTime({ hours, minutes, seconds });
        //console.log('bholla112');
        // Dispatch action when exam starts
            //console.log('bholla111');
          
        
      } else {
        //console.log("I am here right")
        clearInterval(interval);
        setRemainingTime({ hours: 0, minutes: 0, seconds: 0 });
        dispatch({ type: 'SET_IS_EXAM_STARTED', payload: true });
        // Dispatch action when exam ends
        // dispatch({ type: 'SET_IS_EXAM_OVER', payload: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examDate, examTime, totalTimeInSeconds, dispatch]);

  return (
    <div>
      {remainingTime ? (
        <div>
          <div>
            Time until exam starts: {remainingTime.hours}:
            {remainingTime.minutes}:{remainingTime.seconds}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CountdownTimerStart;
