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
    <div className="pt-20 pb-20 pl-80 pr-80 relative min-h-screen">
      {/* Progress Bar */}
      <div className="fixed bottom-4 left-4 w-1/4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }} />
        </div>
      </div>

      {/* Question + Image */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="text-3xl font-bold text-primaryHover mb-4">
            What part of the letter is this?
          </h2>
          <p className="text-lg mb-6">Click on the correct part of the letter.</p>

          <div className="text-xl space-y-4">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200
                  ${getOptionStyle(option)}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:border-primary'}
                  ${selected === option ? 'border-primary bg-gray-50' : 'border-gray-200'}
                  ${correct && option === correctAnswer ? 'border-green-500 bg-green-50' : ''}
                  ${selected === option && option !== correctAnswer ? 'border-red-500 bg-red-50' : ''}`}
                disabled={disabled}
              >
                <span className="font-medium text-gray-500 mr-2">{String.fromCharCode(97 + idx)}.</span>
                {option}
              </button>
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
