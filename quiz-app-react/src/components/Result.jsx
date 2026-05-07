function Result({score , total, onRestart}){
 const percentage = (score/total) * 100;
 return (
 <div className="text-center space-y-4 sm:space-y-6">
  <div>
    <div className="flex justify-center mt-12 mb-12">
<h2 className="text-2xl sm:text-3xl font-bold text-purple-800 bg-linear-to-br from-blue-500 to-yellow-200 flex justify-center items-center w-[175px] sm:w-[250px] h-[75px] sm:h-[150px]">
        Quiz Completed!
      </h2>
      </div>
      
      <p className="text-xl text-amber-100">
        You scored {score} out of {total} ({percentage.toFixed(0)}%)
      </p>
      
      <div className="pt-4">
        {percentage >= 80 && (
          <p className="text-green-600 font-semibold mb-4 text-2xl">Excellent work!</p>
        )}
        {percentage >= 50 && percentage < 80 && (
          <p className="text-blue-600 font-semibold mb-4 text-2xl">Good job!</p>
        )}
        {percentage < 50 && (
          <p className="text-orange-600 font-semibold mb-4 text-2xl">Keep practicing!</p>
        )}
      </div>
      
      <button
        onClick={onRestart}
        className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Restart Quiz
      </button>
    </div>
    </div>
  );
}
export default Result;