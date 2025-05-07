// src/pages/FontTypeUsageDrag.js
import React, { useState } from 'react';
import './../App.css';

const options = [
  { id: '1', text: 'Sans Serif' },
  { id: '2', text: 'Script' },
  { id: '3', text: 'Serif' }, 
  { id: '4', text: 'Handwriting' }
];

export default function FontTypeUsageDrag({ onNext }) {
  const [matched, setMatched] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const correctAnswerId = '3';

  const handleDragStart = (e, option) => {
    setDraggedId(option.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedOption = options.find((o) => o.id === draggedId);
    setMatched(droppedOption);
    setFeedback(droppedOption.id === correctAnswerId);
    setDraggedId(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async () => {
    await fetch('/api/quiz/3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: matched ? matched.text : null })
    });
    onNext();
  };

  return (
    <section className="hero min-h-screen">
      <div className="quiz-container">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Font Type Usage</h2>
        <p className="mb-2 text-gray-700 text-lg">Drag the correct font type into the answer box.</p>
        <p className="mb-8 text-xl text-gray-700">
          What type of font is usually used for official documents and books?
        </p>

        <div className="flex justify-center items-start gap-10">
          <div className="flex flex-col gap-6">
            {options
              .filter((o) => !matched || matched.id !== o.id)
              .map((option) => (
                <div
                  key={option.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, option)}
                  className="p-4 bg-gray-200 rounded cursor-grab"
                >
                  <p>{option.text}</p>
                </div>
              ))}
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`p-8 rounded border-2 border-dashed min-w-[250px] min-h-[100px] flex justify-center items-center ${
              matched
                ? feedback
                  ? 'border-green-500'
                  : 'border-red-500'
                : 'border-gray-300'
            }`}
          >
            {matched ? (
              <div className="p-2 rounded bg-blue-100 text-lg">{matched.text}</div>
            ) : (
              <span className="text-gray-500">Drop your answer here</span>
            )}
          </div>
        </div>

        {matched && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Next Question
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div className="fixed bottom-4 left-4 w-1/4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
