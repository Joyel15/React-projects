import { useState } from 'react';
import Score from './components/Score';
import Question from './components/Question';
import Result from './components/Result';

export default function App() {
  // Fixed: All lowercase for state variables, uppercase for setters
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const categories = [
    { id: '9', name: 'General Knowledge' },
    { id: '18', name: 'Computers' },
    { id: '21', name: 'Sports' },
    { id: '23', name: 'History' },
    { id: '22', name: 'Geography' },
    { id: '27', name: 'Animals' },
    { id: '17', name: 'Science' },
    { id: '11', name: 'Movies' },
  ];

  const fetchQuizData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      
      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions');
      }

      // Fixed: Complete formatting logic with proper return
      const formattedQuestions = data.results.map((question) => {
        const decodeHTML = (html) => {
          const txt = document.createElement('textarea');
          txt.innerHTML = html;
          return txt.value;
        };

        const allAnswers = [
          ...question.incorrect_answers,
          question.correct_answer
        ].map(decodeHTML);

        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

        return {
          question: decodeHTML(question.question),
          options: shuffledAnswers,
          correct: shuffledAnswers.indexOf(decodeHTML(question.correct_answer))
        };
      });

      setQuizData(formattedQuestions);
      setQuizStarted(true);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };
  
  const handleNext = () => {
    if (selectedAnswer === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizStarted(false);
    setQuizData([]);
  };

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl border border-gray-700'>
        <h1 className='text-gray-200 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8'>
          QUIZ WIZ
        </h1>

        {/* Setup Screen */}
        {!quizStarted && !showResult && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Number of Questions</label>
              <select
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-300 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={fetchQuizData}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading Questions...' : 'Start Quiz'}
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-300">Loading quiz questions...</p>
          </div>
        )}

        {/* Quiz Screen */}
        {quizStarted && !showResult && !loading && quizData.length > 0 && (
          <>
            <Score 
              score={score} 
              total={quizData.length} 
              currentQuestion={currentQuestion}
            />
            
            <Question
              data={quizData[currentQuestion]}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
            />
            
            <div className='flex justify-center mt-4 sm:mt-6'>
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all
                  ${selectedAnswer !== null
                    ? 'bg-orange-400 text-white hover:bg-orange-600'
                    : 'bg-red-500 text-white cursor-not-allowed'
                  }`}
              >
                {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            </div>
          </>
        )}

        {/* Result Screen */}
        {showResult && (
          <Result 
            score={score} 
            total={quizData.length} 
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}