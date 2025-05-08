import { useState } from 'react';
import { ArrowRight } from "lucide-react";
// import { useNavigate } from 'react-router-dom';

const items = [
  'Eye', 'Counter', 'Shoulder', 
  'Bar', 'Bowl', 'Arm', 'Leg', 'Stem', 'Descender', 'Ascender', 'Serif',
];

export default function HoverImageSwap({go}) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [clickedItems, setClickedItems] = useState(new Set());
  
    const displayItem = hoveredItem || selectedItem;

    const handleItemClick = (item) => {
      setSelectedItem(item);
      setClickedItems(prev => new Set([...prev, item]));
    };
  
    return (
      <div className="min-h-screen flex">
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
                    ? 'bg-blue-600 text-white'
                    : clickedItems.has(item)
                    ? 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900'
                }`}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
            <li className="mt-4">
              <button
                onClick={() => go("quizIntro")}
                className="w-full text-white p-3 rounded-lg shadow-lg border border-gray-400
                          hover:bg-[#d3dee7] transition focus:outline-none focus:ring-2 focus:ring-blue-300
                          flex items-center justify-center gap-2"
                aria-label="Go to Parts of Letter page"
              >
                <span className="text-black">Next</span>
                <ArrowRight size={24} color="black" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }