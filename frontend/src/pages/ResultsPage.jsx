// src/pages/ResultsPage.jsx
import React, { useEffect, useState } from 'react';

export default function ResultsPage({ onRestart }) {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('/api/results')
      .then(r => r.json())
      .then(({ score, total }) => {
        setScore(score);
        setTotal(total);
      });
  }, []);

  return (
    <section className="hero min-h-screen">
      <div className="p-8 text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Your Score</h1>
        <p className="text-2xl mb-6">
          {score} / {total}
        </p>
        <div className="flex gap-4">
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primaryHover"
            onClick={onRestart}
          >Try Again
          </button>
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primaryHover"
            onClick={onRestart}
          >Return to Home
          </button>
        </div>
        
      </div>
    </section>
  );
}
