// src/pages/FontMatchQuestion.js
import React, { useState } from 'react';
import './../App.css';

const fontData = [
  { id: '1', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'montserrat', answer: 'Sans Serif' },
  { id: '2', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'georgia', answer: 'Serif' },
  { id: '3', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'pacifico', answer: 'Script' },
  { id: '4', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'firacode', answer: 'Monospace' }
];

const fontTypes = ['Sans Serif', 'Script', 'Serif', 'Monospace'];

export default function FontMatchQuestion({ onNext }) {
  const [matched, setMatched] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const [feedback, setFeedback] = useState({});

  const handleDragStart = (e, font) => {
    setDraggedId(font.id);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const font = fontData.find((f) => f.id === draggedId);
    setMatched({ ...matched, [type]: font });
    setFeedback({ ...feedback, [type]: font.answer === type });
    setDraggedId(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const isComplete = fontTypes.every((type) => matched[type]);

  const handleSubmit = async () => {
    const matchesPayload = Object.fromEntries(
      Object.entries(matched).map(([fontType, fontObj]) => [fontType, fontObj.id])
    );

    await fetch('/api/quiz/1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matches: matchesPayload })
    });
    onNext();
  };

  return (
    <section className="hero min-h-screen">
      <div className="quiz-container">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Mix &amp; Match</h2>
        <p className="mb-2 text-gray-700 text-lg">Hover over and drag each sentence to the correct font category.</p>
        <p className="mb-8 text-xl text-gray-700">Match each font to the correct spot!</p>

        <div className="flex justify-center items-start gap-10">
          <div className="flex flex-col gap-6">
            {fontData
              .filter((f) => !Object.values(matched).includes(f))
              .map((font) => (
                <div
                  key={font.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, font)}
                  className="p-4 bg-gray-200 rounded cursor-grab"
                >
                  <p className={`typing-text ${font.fontClass}`}>{font.text}</p>
                </div>
              ))}
          </div>

          <div className="flex flex-col gap-6">
            {fontTypes.map((type) => (
              <div
                key={type}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, type)}
                className={`p-4 rounded border-2 border-dashed ${
                  matched[type]
                    ? feedback[type]
                      ? 'border-green-500'
                      : 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <div className="font-semibold mb-2 text-lg">{type}</div>
                {matched[type] && (
                  <div className={`p-2 rounded typing-text ${matched[type].fontClass}`}>
                    {matched[type].text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isComplete && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Next Question
            </button>
          </div>
        )}

        {/* Progress bar in the lower-left */}
        <div className="fixed bottom-4 left-4 w-1/4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '33.33%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
