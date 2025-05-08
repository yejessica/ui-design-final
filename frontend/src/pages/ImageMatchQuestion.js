import React, { useState } from 'react';
import './../App.css';

const imageData = [
  {
    id: '1',
    imageUrl: '/ascender.svg',
    description: 'Ascender',
    answer: 'The part of a lowercase letter that extends above the x-height'
  },
  {
    id: '2',
    imageUrl: '/descender.svg',
    description: 'Descender',
    answer: 'The part of a lowercase letter that extends below the baseline'
  },
  {
    id: '3',
    imageUrl: '/counter.svg',
    description: 'Counter',
    answer: 'The enclosed or partially enclosed space within a letter'
  },
  {
    id: '4',
    imageUrl: '/bar.svg',
    description: 'Bar',
    answer: 'The horizontal stroke in letters like A, H, and e'
  }
];

const descriptions = [
  'The part of a lowercase letter that extends above the x-height',
  'The part of a lowercase letter that extends below the baseline',
  'The enclosed or partially enclosed space within a letter',
  'The horizontal stroke in letters like A, H, and e'
];

export default function ImageMatchQuestion({ onNext }) {
  const [matched, setMatched] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const [feedback, setFeedback] = useState({});

  const handleDragStart = (e, image) => {
    setDraggedId(image.id);
  };

  const handleDrop = (e, description) => {
    e.preventDefault();
    const image = imageData.find((img) => img.id === draggedId);
    setMatched({ ...matched, [description]: image });
    setFeedback({ ...feedback, [description]: image.answer === description });
    setDraggedId(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const isComplete = descriptions.every((desc) => matched[desc]);

  const handleSubmit = async () => {
    const matchesPayload = Object.fromEntries(
      Object.entries(matched).map(([description, imageObj]) => [description, imageObj.id])
    );

    await fetch('/api/quiz/2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matches: matchesPayload })
    });
    onNext();
  };

  return (
    <section className="hero min-h-screen">
      <div className="quiz-container">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Match the Parts</h2>
        <p className="mb-2 text-gray-700 text-lg">Drag each image to its correct description.</p>
        {/* <p className="mb-8 text-xl text-gray-700">Learn about typography anatomy!</p> */}

        <div className="flex justify-center items-start gap-10">
          <div className="flex flex-col gap-6">
            {imageData
              .filter((img) => !Object.values(matched).includes(img))
              .map((image) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image)}
                  className="p-4 bg-gray-200 rounded cursor-grab hover:bg-gray-300 transition-colors"
                >
                  <img 
                    src={image.imageUrl} 
                    alt={image.description}
                    className="w-48 h-48 object-contain"
                  />
                  <p className="text-center mt-2 font-semibold">{image.description}</p>
                </div>
              ))}
          </div>

          <div className="flex flex-col gap-6">
            {descriptions.map((description) => (
              <div
                key={description}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, description)}
                className={`p-4 rounded border-2 border-dashed min-h-[200px] flex items-center justify-center ${
                  matched[description]
                    ? feedback[description]
                      ? 'border-green-500'
                      : 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <div className="text-center">
                  <p className="font-semibold mb-2 text-lg">{description}</p>
                  {matched[description] && (
                    <img 
                      src={matched[description].imageUrl}
                      alt={matched[description].description}
                      className="w-32 h-32 object-contain mx-auto"
                    />
                  )}
                </div>
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
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
      </div>
    </section>
  );
} 