import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [assignment, setAssignment] = useState(null); // Store the assignment data separately
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState([]);

  const studentId = '66e5d3880b22ee87ceb264d6'; // Dummy student ID

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/education/getAssignment');
        if (response.status === 200 && response.data.length > 0) {
          setAssignment(response.data[0]); // Store assignment data separately
          setQuestions(response.data[0].questions); // Extract the questions
          console.log(response.data[0])
        }
      } catch (error) {
        console.error('Error fetching quiz questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.options[currentQuestion.correctOptionIndex];

      // Update score and answers array
      if (isCorrect) setScore((prevScore) => prevScore + 1);
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionText: currentQuestion.questionText, selectedOption: selectedAnswer }
      ]);

      setAttemptedQuestions((prevCount) => prevCount + 1);
      setSelectedAnswer(null);

      // Move to the next question or submit quiz if it’s the last question
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        await submitQuiz();
        setShowResult(true);
      }
    } else {
      // Increment attempted questions if skipped
      setAttemptedQuestions((prevCount) => prevCount + 1);
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        await submitQuiz();
        setShowResult(true);
      }
    }
  };

  const submitQuiz = async () => {
    try {
      const postStudentAssignment = await axios.post('http://localhost:8080/student/submit', {
        assignmentId: assignment._id,
        studentId,
        answers,
        correctAnswers: score,
        startTime
      });
      // if(postStudentAssignment.status === 409) {
      //   alreadySubmitted = true;
      // }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlreadySubmitted(true);
        console.log(alreadySubmitted)
      } else {
        console.error('Error submitting quiz:', error);
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAttemptedQuestions(0);
    setAnswers([]);
  };

  if (!assignment) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Assignment - {assignment.title}</h1>
      {showResult ? (
        <>
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
        <Leaderboard assignmentId={assignment._id} />
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <div className="text-xl font-semibold mb-6 flex justify-center">{questions[currentQuestionIndex]?.questionText}</div>
          <ul className="space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSelection(option)}
                  className={`w-full px-4 py-2 rounded-lg ${selectedAnswer === option ? 'bg-blue-300' : 'bg-blue-500'} text-white hover:bg-blue-600 transition duration-300`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {alreadySubmitted ? <p>Assignment already submitted</p> : <></>}
      {!showResult ? <p className="text-lg mt-5">Questions Attempted: {attemptedQuestions} / {questions.length}</p> : <></>}
    </div>
  );
}

export default Quiz;
