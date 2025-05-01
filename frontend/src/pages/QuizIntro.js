// src/pages/QuizIntro.js
import React from 'react';

export default function QuizIntro({ onStart }) {
  return (
    <section className="hero min-h-screen">
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
    </section>
  );
}
