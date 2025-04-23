import React, { useState } from 'react';
import './../App.css'

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

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = (type) => {
    const dragged = fontData.find((f) => f.id === draggedId);
    if (dragged) {
      if (dragged.answer === type) {
        setMatched((prev) => ({ ...prev, [type]: dragged }));
        setFeedback((prev) => ({ ...prev, [type]: 'correct' }));
      } else {
        setFeedback((prev) => ({ ...prev, [type]: 'incorrect' }));
        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, [type]: null }));
        }, 800);
      }
    }
    setDraggedId(null);
  };

  const isComplete = fontTypes.every((type) => matched[type]);

  return (
    <div className="quiz-container p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-2">Mix & Match</h2>
      <p className="mb-8 text-xl text-gray-700">Match each font to the correct spot!</p>

      <div className="flex justify-center items-start gap-10">
        <div className="flex flex-col gap-6">
          {fontData.filter((f) => !Object.values(matched).includes(f)).map((font) => (
            <div
              key={font.id}
              draggable
              onDragStart={() => handleDragStart(font.id)}
              className={`bg-blue-100 p-4 rounded-xl cursor-move text-lg text-center ${font.fontClass}`}

            >
              {font.text}
            </div>
          ))}
        </div>

        
        <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
          {fontTypes.map((type) => (
            <div
              key={type}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(type)}
              className={`rounded-xl p-4 min-h-[100px] text-center shadow transition-all duration-300 ${
                feedback[type] === 'correct'
                  ? 'bg-green-200'
                  : feedback[type] === 'incorrect'
                  ? 'bg-red-200'
                  : 'bg-gray-200'
              }`}
            >
              <div className="font-semibold mb-2 text-lg">
                {type}
              </div>
              {matched[type] && (
                <div className={`bg-blue-100 p-2 rounded typing-text ${matched[type].fontClass}`}>
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
            onClick={onNext || (() => alert('Next question coming soon!'))}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
