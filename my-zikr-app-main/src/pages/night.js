import { useState } from "react";

const nightZikr = [
  { text: "La ilaha illallah", count: 5 }, // Example count: 5
  { text: "Astaghfirullah", count: 3 }, // Example count: 3
  { text: "Allahu Akbar", count: 4 }, // Example count: 4
];

export default function NightZikr() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(nightZikr[0].count);

  const nextZikr = () => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    } else if (currentIndex < nightZikr.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentCount(nightZikr[currentIndex + 1].count);
    }
  };

  const prevZikr = () => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentCount(nightZikr[currentIndex - 1].count);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background animation */}
      <div className="background-animation"></div>

      {/* Zikr Content */}
      <h1 className="text-4xl font-bold mb-6 text-white">Night Zikr</h1>
      <div className="flex flex-col items-center">
        {/* Navigation Arrows */}
        <div className="flex justify-between w-64 mb-4">
          <button
            onClick={prevZikr}
            className="p-4 text-white bg-blue-500 rounded-lg"
          >
            ←
          </button>
          <div className="flex items-center justify-center text-xl font-semibold text-white">
            {currentCount}
          </div>
          <button
            onClick={nextZikr}
            className="p-4 text-white bg-blue-500 rounded-lg"
          >
            →
          </button>
        </div>

        {/* Zikr Text */}
        <div className="p-8 bg-white shadow-lg text-2xl font-semibold text-center rounded-lg">
          {nightZikr[currentIndex].text}
        </div>
        <p className="text-gray-300 mt-4">
          Click the arrows {currentCount} times to continue
        </p>
      </div>
    </div>
  );
}
