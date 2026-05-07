function Question({ data, onAnswer, selectedAnswer }) {
   
  if (!data || !data.question || !data.options) {
    return <div className="text-white">Loading question...</div>;
  }
  
  return (
    <div className="space-y-3 sm:space-y-4">
      <h2 className="text-white font-bold mb-5 text-lg sm:text-xl md:text-2xl ml-8 mt-7">{data.question}</h2>

    <div className="space-y-2 sm:space-y-3 ml-6 sm:ml-8 mr-6 sm:mr-8 text-amber-100  text-[20px] sm:text-[40px]">
      {data.options.map((option, index) => (
       <button 
       key={index}
       onClick={() => onAnswer(index)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all
              ${selectedAnswer === index 
                ? 'border-yellow-300 bg-blue-500' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-600'
              }`} 
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
          </button>
      ))}
    </div>
    </div>
  );
}
export default Question;