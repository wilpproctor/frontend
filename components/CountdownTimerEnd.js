import { useDispatch } from 'react-redux';
import  StudentContext  from '.././lib/StudentContext';
import { useContext, useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { getUserDetails } from ".././lib/login";
import { onSnapshot } from "firebase/firestore";
import { db } from ".././lib/firestore";
// const CountdownTimerEnd = ({ examDate, examTime, totalTimeInSeconds }) => {
//   const [remainingTime, setRemainingTime] = useState(null);
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     //console.log("examDate",examDate,"examTime", examTime,"totalTimeInSeconds", totalTimeInSeconds);
//     const interval = setInterval(() => {
//       const now = new Date();

//       const [day, month, year] = examDate.split('-').map(Number);
//       const [time, period] = examTime.split(' ');
//       const [hours, minutes] = time.split(':').map(Number);

//       let targetDate = new Date(year, month - 1, day, hours, minutes);
//       //console.log(targetDate,"targetDate");
//       if (period === 'PM' && hours !== 12) {
//         targetDate.setHours(targetDate.getHours() + 12);
//       } else if (period === 'AM' && hours === 12) {
//         targetDate.setHours(0);
//       }
//       //console.log(targetDate,"targetDate1");
//       //console.log(targetDate.getTime(),"targetDate.getTime()");
//       const examEndTime = new Date(targetDate.getTime() + totalTimeInSeconds * 1000);
//       //console.log('examEndTime',examEndTime);
//       const timeDiff = examEndTime - now;
//       //console.log('timeDiff',timeDiff);
//       if (timeDiff > 0) {
//         // dispatch({ type: 'SET_IS_EXAM_STARTED', payload: true });
//         const totalSeconds = Math.floor(timeDiff / 1000);
//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;

//         setRemainingTime({ hours, minutes, seconds });
//       } else {
//         console.log("I am in less than timeDiff")
//         clearInterval(interval);
//         setRemainingTime({ hours: 0, minutes: 0, seconds: 0 });

//         // Dispatch action when exam ends
//         dispatch({ type: 'SET_IS_EXAM_ENDED', payload: true });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [examDate, examTime, totalTimeInSeconds]);

//   useEffect(()=>{
//     //console.log("remaining time is : ", remainingTime)
//     if (remainingTime!==null&&!remainingTime) {
//       //console.log("I am in not remaining time")
//       dispatch({ type: 'SET_IS_EXAM_ENDED', payload: true });
//     }else{
//       dispatch({ type: 'SET_IS_EXAM_ENDED', payload: false });
//     }
  
//   },[remainingTime]);

  
  
//   return (
//     <div>
//       {remainingTime?<div>Time until exam ends: {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</div>:<div>Exam has ended!</div>}
      
//     </div>
//   );
// };

const CountdownTimerEnd = ({examDate, examTime, totalTimeInSeconds}) => {
  const { backend } = useContext(StudentContext);

  const [ minutes, setMinutes ] = useState(totalTimeInSeconds/60);
  const [seconds, setSeconds ] =  useState(totalTimeInSeconds%60);
  const currentUser = getUserDetails();
  console.log("email here::",currentUser.email);
  const dispatch = useDispatch();
  let pause_check = false;
  useEffect(()=>{
  let myInterval = setInterval(() => {
      let tempCheck = true;
      let em = currentUser.email;
    backend.emit("check-pause", (em) => {
        backend.on("check-pause2",function(tempCheck){
            console.log("pause reached student side",tempCheck);
          });
    });
          if(tempCheck){if (seconds > 0) {
              setSeconds(seconds - 1);
          }
          if (seconds === 0) {
              if (minutes === 0) {
                  dispatch({ type: 'SET_IS_EXAM_ENDED', payload: true })
                  clearInterval(myInterval)
              } else {
                  setMinutes(minutes - 1);
                  setSeconds(59);
              }
          } }
      }, 1000)
      return ()=> {
          dispatch({ type: 'SET_IS_EXAM_ENDED', payload: true })
          clearInterval(myInterval);
        };
  });

  return (
      <div>
      { minutes === 0 && seconds === 0
          ? <h1>Exam has ended!</h1>
          : <div>Time until exam ends: {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
      }
      </div>
  )
}

export default CountdownTimerEnd;
