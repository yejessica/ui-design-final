import React, { useState } from 'react';
import './../App.css';

const fontSamples = [
  { id: '1', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'montserrat', type: 'Sans Serif' },
  { id: '2', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'georgia', type: 'Serif' },
  { id: '3', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'pacifico', type: 'Script' },
  { id: '4', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'firacode', type: 'Monospace' }
];

export default function SansSerifIdentify({ onNext }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelect = async (sample) => {
    if (isCorrect) return; // stop if already correct

    setSelectedId(sample.id);
    const correct = sample.type === 'Sans Serif';
    setIsCorrect(correct);

    if (correct) {
      try {
        await fetch('/api/quiz/4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: sample.id })
        });
      } catch (err) {
        console.error('Error submitting quiz response:', err);
      }
    }
  };

  const getCardStyle = (sample) => {
    if (isCorrect && sample.id === selectedId) return 'border-2 border-green-500 bg-green-50';
    if (!isCorrect && sample.id === selectedId) return 'border-2 border-red-500 bg-red-50';
    return 'cursor-pointer hover:bg-gray-100';
  };

  return (
    <section className="hero min-h-screen p-10">
      <div className="quiz-container max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-primaryHover mb-4">Which font is Sans Serif?</h2>
        <p className="text-lg text-gray-700 mb-8">Click the sample below that represents a Sans Serif font.</p>

        <div className="grid gap-6">
          {fontSamples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSelect(sample)}
              className={`p-4 rounded bg-white shadow-md ${getCardStyle(sample)}`}
            >
              <p className={`typing-text ${sample.fontClass}`}>{sample.text}</p>
            </div>
          ))}
        </div>

        {isCorrect !== null && (
          <div className="mt-6 text-lg">
            {isCorrect ? (
              <p className="text-green-600 font-medium">Correct! This is a Sans Serif font.</p>
            ) : (
              <p className="text-red-600 font-medium">Try again — that's not Sans Serif.</p>
            )}
          </div>
        )}

        {isCorrect && (
          <div className="mt-8">
            <button
              onClick={onNext}
              className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-6 rounded"
            >
              Next Question
            </button>
          </div>
        )}

        <div className="fixed bottom-4 left-4 w-1/4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '80%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
