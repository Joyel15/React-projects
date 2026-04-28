import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    
    if(isRunning){
      intervalIdRef.current = setInterval(()=> {
        setElapsedTime(Date.now() - startTimeRef.current);
      },10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }
  }, [isRunning]);

  function start(){
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop(){
    setIsRunning(false);
  }

  function reset(){
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime/(1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime/(1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime/(1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milliseconds = String(milliseconds).padStart(2,"0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <div className="flex flex-col items-center justify-center border-2 p-10 rounded-3xl bg-amber-100">
        <div className="text-7xl font-stretch-expanded font-bold">{formatTime()}</div>
        <div className="flex gap-2 mt-4">
          <button onClick={start} className="bg-green-500 p-3 text-2xl text-white font-bold rounded-2xl">Start</button>
          <button onClick={stop} className="bg-red-500 p-3 text-2xl text-white font-bold rounded-2xl">Stop</button>
          <button onClick={reset} className="bg-blue-500 p-3 text-2xl text-white font-bold rounded-2xl">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
