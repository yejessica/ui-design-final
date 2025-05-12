import { useState } from 'react';
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
// import { useNavigate } from 'react-router-dom';

const letterParts = {
  'Eye': 'The enclosed space in letters like "e" and "a"',
  'Counter': 'The enclosed space in letters like "o" and "d"',
  'Shoulder': 'The curved stroke that connects the stem to the serif in letters like "n" and "m"',
  'Bar': 'The horizontal stroke in letters like "A" and "H"',
  'Bowl': 'The curved part of letters like "b", "d", "p", and "q"',
  'Arm': 'The horizontal stroke that extends from the stem in letters like "T" and "F"',
  'Leg': 'The diagonal stroke in letters like "K" and "R"',
  'Stem': 'The main vertical stroke in letters like "l" and "b"',
  'Descender': 'The part of a letter that extends below the baseline, as in "g" and "y"',
  'Ascender': 'The part of a letter that extends above the x-height, as in "b" and "d"',
  'Serif': 'The small decorative stroke at the end of a letter\'s main stroke'
};

const items = Object.keys(letterParts);

export default function HoverImageSwap({go}) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [clickedItems, setClickedItems] = useState(new Set());
  
    const displayItem = hoveredItem || selectedItem;

    const handleItemClick = (item) => {
      setSelectedItem(item);
      setClickedItems(prev => new Set([...prev, item]));
    };

    const handleMouseLeave = () => {
      setHoveredItem(null);
    };
  
    return (
  <div className="min-h-screen flex relative">

    {/* Instructions */}
    <div className="absolute top-6 left-6 text-[20px] text-black z-40 max-w-sm leading-snug">
      Click a part of the letter in the sidebar to see its definition and illustration.
    </div>


    {/* Image Display */}
    <div className="flex-1 bg-black flex items-center justify-center">
      <img
        src={`/${displayItem ? displayItem : 'original'}.svg`}
        alt={displayItem || 'original'}
        className="w-full h-full object-contain"
      />
    </div>

    {/* Sidebar */}
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="text-[25px] font-semibold text-gray-700 mb-4">Parts of a Letter</h2>
      <ul className="space-y-2 text-[20px]">
        {items.map((item, index) => (
          <li
            key={index}
            className={`px-4 py-2 rounded-lg cursor-pointer transition ${
              selectedItem === item
                ? 'bg-gray-500 text-white'
                : clickedItems.has(item)
                ? 'bg-blue-300 text-blue-800 hover:bg-blue-400'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900'
            }`}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={() => go("quizIntro")}
        className="w-full mt-4 text-white p-3 rounded-lg shadow-lg border border-gray-400
                  hover:bg-primaryLight transition focus:outline-none focus:ring-2 focus:ring-blue-300
                  flex items-center justify-center gap-2"
        aria-label="Go to Quiz Intro page"
      >
        <span className="text-black">Next</span>
        <ArrowRight size={24} color="black" />
      </button>
    </div>

    {/* Floating Arrows */}
    <button
      onClick={() => go("fontTypes")}
      className="fixed left-4 top-1/2 transform -translate-y-1/2
                 text-white p-3 rounded-lg shadow-lg border border-gray-400
                 hover:bg-primaryLight transition focus:outline-none focus:ring-2 focus:ring-blue-300
                 flex items-center justify-center gap-2"
      aria-label="Go back to Font Types page"
    >
      <ArrowLeft size={24} color="black" />
      <span className="text-black">Back</span>
    </button>

    {/* Popup */}
    {selectedItem && (
      <div 
        className="fixed top-24 right-[280px] bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64 z-50"
      >
        <h3 className="font-semibold text-lg mb-2">{selectedItem}</h3>
        <p className="text-gray-700">{letterParts[selectedItem]}</p>
      </div>
    )}

  </div>
);
  }