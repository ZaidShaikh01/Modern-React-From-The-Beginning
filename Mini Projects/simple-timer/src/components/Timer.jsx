import { useState, useRef } from 'react';
import TimerDisplay from './TimerDisplay';
import Button from './Button';
const Timer = () => {
  const timerRef = useRef(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    if (isRunning) {
      // Clear the interval to stop the timer
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      // start timer
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      // console.log(time);
      // console.log(isRunning);
    }
    setIsRunning(!isRunning);
  };

  // Reset TImer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    timerRef.current = null;
  };

  return (
    <div>
      <TimerDisplay time={time} />
      <Button type='Start' isRunning={isRunning} onClick={toggleTimer} />

      <Button type='Reset' onClick={resetTimer} />
    </div>
  );
};

export default Timer;
