import React, { useState } from 'react';

const LetterQuiz = ({ onNext }) => {
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [explanationShown, setExplanationShown] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showCheckResults, setShowCheckResults] = useState(false);

  const correctAnswer = 'Leg';
  const options = ['Leg', 'Arm', 'Ear', 'Shoulder'];

  const handleSelect = async (option) => {
    if (disabled || correct) return;
    setSelected(option);

    if (option === correctAnswer) {
      setCorrect(true);
      setExplanationShown(true);
      setShowCheckResults(true);
      try {
        await fetch('/api/quiz/2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: option })
        });
      } catch (err) {
        console.error('Failed to record answer', err);
      }
    } else {
      setDisabled(true);
      setTimeout(() => {
        setSelected(null);
        setDisabled(false);
      }, 3000);
    }
  };

  const getOptionStyle = (option) => {
    if (correct && option === correctAnswer) return 'text-green-600 font-bold';
    if (selected === option && option !== correctAnswer) return 'text-red-600 font-bold';
    return '';
  };

  return (
    <div className="p-8 relative min-h-screen">
      {/* Progress Bar */}
      <div className="fixed bottom-4 left-4 w-1/4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }} />
        </div>
      </div>

      {/* Question + Image */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-primaryHover mb-2">
            What part of the letter is this?
          </h2>
          <p className="text-lg mb-4">Click on the correct part of the letter.</p>

          <div className="text-xl space-y-3">
            {options.map((option, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer ${getOptionStyle(option)}`}
              >
                {String.fromCharCode(97 + idx)}. {option}
              </div>
            ))}
          </div>
        </div>

        <img
          src={`leg_letterquiz.png`}
          alt="letter part"
          className="w-[250px] h-[250px] object-contain"
        />
      </div>

      {/* Explanation */}
      {explanationShown && (
        <div className="text-lg mt-6">
          ✅ This part of the letter is the <strong>leg</strong>, which extends downward and is attached at one end and free at the other.
        </div>
      )}

      {/* Check Result Button */}
      {showCheckResults && (
        <div className="mt-8">
          <button
            onClick={onNext}
            className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterQuiz;
