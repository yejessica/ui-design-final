// src/pages/QuizIntro.js
import React from 'react';
import { ArrowLeft } from "lucide-react";

export default function QuizIntro({ onStart }) {
  return (
    <section className="hero min-h-screen relative">
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

      {/* Floating Back Arrow */}
      <button
        onClick={() => onStart("partsLetter")}
        className="fixed left-4 top-1/2 transform -translate-y-1/2
                   text-white p-3 rounded-lg shadow-lg border border-gray-400
                   hover:bg-[#d3dee7] transition focus:outline-none focus:ring-2 focus:ring-blue-300
                   flex items-center justify-center gap-2"
        aria-label="Go back to Parts of Letter"
      >
        <ArrowLeft size={24} color="black" />
        <span className="text-black">Back</span>
      </button>
    </section>
  );
}
