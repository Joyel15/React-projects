function Score({score,total,currentQuestion}){
  return (
    <div className="bg-green-400 flex flex-col sm:flex-row justify-between  p-4 sm:p-5 mx-4 my-3  rounded-3xl">
        <div className="text-center sm:text-left">
          <p className="text-gray-900 p-4  mx-6 font-serif text-2xl sm:text-3xl">Current Score</p>
          <p className="text-white mx-16 font-extrabold text-2xl sm:text-3xl">{score}</p>
        </div>
        <div className="text-center sm:text-left"> 
          <p className="text-gray-900 p-4 font-serif mr-8 text-2xl sm:text-3xl">Question</p>
          <p className="text-shadow-amber-100 mx-14 font-bold text-[20px] sm:text-[26px]">{currentQuestion + 1}/{total}</p>
        </div>
    </div>
  );
}
export default Score;
