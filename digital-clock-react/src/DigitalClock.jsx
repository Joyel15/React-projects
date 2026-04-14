import React, {useState,useEffect} from "react";

function DigitalClock(){

const [time,setTime] = useState(new Date());

useEffect(() => {
  const intervalId = setInterval(()=>{
    setTime(new Date());
  },1000);

  return () => {
  clearInterval(intervalId);
}
},[]);

function formatTime(){
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const merediam = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12 ;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${merediam}`;
}

function padZero(number){
  return (number < 10 ? "0" : "") + number;
}

return(
  <div className="bg-[url('./assets/background.jpeg')] bg-cover bg-center bg-no-repeat min-h-screen w-full m-0 flex justify-center items-center">
      <div>
        <span className="text-9xl text-white font-mono font-bold">{formatTime()}</span>
      </div>
  </div>
)
}

export default DigitalClock;