import React, { useState, useEffect } from 'react';
import allQuestions from './data/questions.json';

function App() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [questions, setQuestions] = useState<typeof allQuestions>([]);

  // Sélectionner 10 questions aléatoires au démarrage
  const startQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setStarted(true);
  };

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setStarted(false);
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setSelected(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
        {/* 🔁 Vidéo en fond */}
        <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>

        {/* 💡 Contenu principal */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6 bg-black/50">
        <h1 className="text-4xl font-bold mb-4">🌱 Quiz Écologique</h1>
        <p className="text-lg">Teste tes connaissances pour mieux agir</p>

        {!started ? (
            <button
            onClick={startQuiz}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
            Commencer le quiz
            </button>
        ) : showResult ? (
            <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md">
            <p className="text-xl mb-2">Score : {score} / {questions.length}</p>
            <p className="mb-4">
                {score < 5
                ? "Continue à t’informer pour devenir un champion de l’écologie !"
                : "Excellent ! Tu es sur la bonne voie pour protéger notre planète."}
            </p>
            <button
                onClick={restartQuiz}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Rejouer
            </button>
            </div>
        ) : (
            <div className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full">
            <p className="font-semibold mb-2 text-gray-700">
                Question {currentIndex + 1} / {questions.length}
            </p>
            <h2 className="text-lg font-medium mb-4 text-gray-700">{currentQuestion.question}</h2>
            <ul>
                {currentQuestion.options.map((option, index) => (
                <li
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`p-3 mb-2 border rounded cursor-pointer transition-colors duration-200 text-gray-700
                    ${selected === null ? 'hover:bg-green-100' :
                        selected === index
                        ? index === currentQuestion.answer
                            ? 'bg-green-300'
                            : 'bg-red-300'
                        : 'opacity-50'}`}
                >
                    {option}
                </li>
                ))}
            </ul>

            {selected !== null && (
                <>
                <p className="mt-4 italic text-sm">
                    {currentQuestion.feedback}
                </p>
                <button
                    onClick={handleNext}
                    className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                >
                    Question suivante
                </button>
                </>
            )}
            </div>
        )}
        </div>
    </div>
  );
}

export default App;
