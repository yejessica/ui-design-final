import { useState } from 'react';

const items = [
  'Eye', 'Counter', 'Shoulder', 
  'Bar', 'Bowl', 'Arm', 'Leg', 'Stem', 'Descender', 'Ascender', 'Serif',
];

export default function HoverImageSwap() {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const displayItem = hoveredItem || selectedItem;
  
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
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900'
                }`}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  