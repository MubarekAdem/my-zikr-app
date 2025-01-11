import { useState } from "react";

const duaWhileEating = [
  { text: "Bismillah", count: 1 },
  { text: "Alhamdulillah", count: 1 },
  // Add more dua here
];

export default function DuaEating() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(duaWhileEating[0].count);

  const nextDua = () => {
    if (currentCount > 1) {
      setCurrentCount(currentCount - 1);
    } else if (currentIndex < duaWhileEating.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentCount(duaWhileEating[currentIndex + 1].count);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mt-10">Dua While Eating</h1>
      <div className="mt-8">
        <button
          onClick={nextDua}
          className="p-4 text-white bg-green-500 rounded-lg"
        >
          Next Dua
        </button>
        <div className="p-6 mt-4 bg-white shadow-lg text-2xl font-semibold rounded-lg">
          {duaWhileEating[currentIndex].text} (Repeat {currentCount} times)
        </div>
      </div>
    </div>
  );
}
