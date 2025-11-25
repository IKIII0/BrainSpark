import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Quiz = () => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sample quiz data
  const quiz = {
    title: "Kuis Pengetahuan Umum",
    questions: [
      {
        id: 1,
        question: "Berapakah hasil dari 15 + 27?",
        options: ["40", "42", "43", "45"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Siapakah presiden pertama Indonesia?",
        options: ["Soekarno", "Soeharto", "B.J. Habibie", "Megawati"],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "Planet manakah yang paling dekat dengan Matahari?",
        options: ["Venus", "Mars", "Merkurius", "Bumi"],
        correctAnswer: 2,
      },
    ],
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-quiz-light to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div
                className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4 ${
                  score >= 80
                    ? "bg-green-100 text-green-600"
                    : score >= 60
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {score}%
              </div>
              <h2 className="text-3xl font-bold text-quiz-dark">
                Kuis Selesai!
              </h2>
              <p className="text-xl text-quiz-dark/70 mt-2">
                {score >= 80
                  ? "Excellent! Kamu hebat!"
                  : score >= 60
                  ? "Bagus! Terus tingkatkan!"
                  : "Jangan menyerah, coba lagi!"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-quiz-light/30 p-4 rounded-lg">
                <p className="text-quiz-dark/70">Total Pertanyaan</p>
                <p className="text-2xl font-bold text-quiz-dark">
                  {quiz.questions.length}
                </p>
              </div>
              <div className="bg-quiz-blue/10 p-4 rounded-lg">
                <p className="text-quiz-dark/70">Benar</p>
                <p className="text-2xl font-bold text-quiz-blue">
                  {
                    quiz.questions.filter(
                      (_, index) =>
                        answers[index] === quiz.questions[index].correctAnswer
                    ).length
                  }
                </p>
              </div>
              <div className="bg-quiz-brown/10 p-4 rounded-lg">
                <p className="text-quiz-dark/70">Skor Akhir</p>
                <p className="text-2xl font-bold text-quiz-brown">{score}%</p>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="bg-quiz-blue hover:bg-quiz-blue/90 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-light to-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-quiz-blue to-quiz-brown p-6 text-white">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-white/90">Selamat datang, {user?.name}!</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm">
                Pertanyaan {currentQuestion + 1} dari {quiz.questions.length}
              </div>
              <div className="w-full max-w-xs bg-white/20 rounded-full h-2 ml-4">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / quiz.questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-quiz-dark mb-6">
              {quiz.questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? "border-quiz-blue bg-quiz-blue/10 text-quiz-blue"
                      : "border-gray-200 hover:border-quiz-blue/50 hover:bg-quiz-blue/5"
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sebelumnya
              </button>

              <button
                onClick={goToNextQuestion}
                disabled={answers[currentQuestion] === undefined}
                className="px-6 py-2 rounded-lg bg-quiz-blue text-white hover:bg-quiz-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestion === quiz.questions.length - 1
                  ? "Selesai"
                  : "Selanjutnya"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
