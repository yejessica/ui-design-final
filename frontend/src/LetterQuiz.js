import React, { useState } from 'react';
import letterImage from './letterquiz.png';

const LetterQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [explanationShown, setExplanationShown] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const correctAnswer = 'Leg';

  const options = ['Leg', 'Arm', 'Ear', 'Shoulder'];

  const handleSelect = (option) => {
    if (disabled || correct) return;
    setSelected(option);
    if (option === correctAnswer) {
      setCorrect(true);
      setExplanationShown(true);
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
    <div className="p-8">
      {/* 题干 + 图片 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            1. What part of the letter is this?
          </h2>

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
          src={letterImage}
          alt="letter part"
          className="w-[250px] h-[250px] object-contain"
        />
      </div>

      {/* 答案解释 */}
      {explanationShown && (
        <div className="text-lg mt-6">
          ✅ This part of the letter is the <strong>leg</strong>, which extends downward and is attached at one end and free at the other.
        </div>
      )}
    </div>
  );
};

export default LetterQuiz;