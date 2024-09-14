import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Quiz App Component
function App() {
  const [questions, setQuestions] = useState([]);
  const [res, setRes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);

  useEffect(() => {
    // Fetch quiz questions from the backend
    const fetchQuestions = async () => {
      try {
        var response = await axios.get('http://localhost:8080/education/getAssignment');
        // console.log(response)
        setRes(response);
        if (response.status === 200 && response.data.length > 0) {
          // Assuming the first assignment in the array has the questions
          const fetchedQuestions = response.data[0].questions;
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error('Error fetching quiz questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestionIndex]?.options[questions[currentQuestionIndex]?.correctOptionIndex]) {
        setScore(score + 1);
      }

      setAttemptedQuestions(attemptedQuestions + 1);
      setSelectedAnswer(null);

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setShowResult(true);
      }
    } else {
      // Increment attempted questions even if no answer is selected (for skipping)
      setAttemptedQuestions(attemptedQuestions + 1);

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAttemptedQuestions(0);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Assignment - {res.data[0].title}</h1>
      {showResult ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className='d-flex justify-center'>
            <div className="text-2xl font-semibold mb-4">Your Score: {score} / {questions.length}</div>
          </div>
          <p className="mb-4">Questions Attempted: {attemptedQuestions} / {questions.length}</p>
          <button
            onClick={handleReset}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <div className="text-xl font-semibold mb-6 flex justify-center">{questions[currentQuestionIndex]?.questionText}</div>
          <ul className="space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswer(option)}
                  className={`w-full px-4 py-2 rounded-lg ${selectedAnswer === option ? 'bg-blue-300' : 'bg-blue-500'} text-white hover:bg-blue-600 transition duration-300`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
      <p className="text-lg mt-5">Questions Attempted: {attemptedQuestions} / {questions.length}</p>
    </div>
  );
}

export default App;
