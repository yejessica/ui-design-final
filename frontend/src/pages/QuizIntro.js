import React from 'react';

export default function QuizIntro({ onStart }) {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="nav">
            <a href="#">Font Types</a>
            <a href="#">Parts of a Letter</a>
            <button className="learn-btn">Learn</button>
            <button className="quiz-btn" onClick={() => onStart('home')}>Back</button>
          </nav>
        </header>
  
        <div className="flex flex-col items-center justify-center min-h-screen text-center -mt-20">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Quiz</h1>
          <p className="text-xl max-w-xl mb-8 px-4">
            For this quiz, you will be tested on recognizing different types of fonts and the parts of the letter.
          </p>
          <button
            className="bg-blue-500 text-white text-xl px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition"
            onClick={() => onStart('quiz1')}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }
  
