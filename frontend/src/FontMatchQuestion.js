import React, { useState } from 'react';
import './FontMatchQuestion.css'; 

const fontData = [
  { id: '1', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'serif', answer: 'Serif' },
  { id: '2', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'sans', answer: 'Sans Serif' },
  { id: '3', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'handwriting', answer: 'Handwriting' },
  { id: '4', text: 'The quick brown fox jumps over the lazy dog', fontClass: 'script', answer: 'Script' }
];

const fontTypes = ['Serif', 'Sans Serif', 'Script', 'Handwriting'];

export default function FontMatchQuestion() {
  const [matched, setMatched] = useState({});
  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = (type) => {
    const dragged = fontData.find((f) => f.id === draggedId);
    if (dragged) {
      setMatched((prev) => ({ ...prev, [type]: dragged }));
    }
    setDraggedId(null);
  };

  return (
    <div className="quiz-container">
      <h2 className="text-2xl mb-4">Mix & Match</h2>
      <p className="mb-6">Match each font to the correct spot!</p>
      <div className="flex gap-8">
        {/* Draggable sentences */}
        <div className="flex flex-col gap-4">
          {fontData.map((font) => (
            <div
              key={font.id}
              draggable
              onDragStart={() => handleDragStart(font.id)}
              className={`bg-blue-100 p-3 rounded cursor-move font-sample ${font.fontClass}`}
            >
              {font.text}
            </div>
          ))}
        </div>

        {/* Drop targets */}
        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded">
          {fontTypes.map((type) => (
            <div
              key={type}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(type)}
              className="bg-white rounded p-3 min-h-[60px] shadow"
            >
              <div className="font-bold mb-1">{type}</div>
              {matched[type] && (
                <div className={`bg-blue-100 p-2 rounded font-sample ${matched[type].fontClass}`}>
                  {matched[type].text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
