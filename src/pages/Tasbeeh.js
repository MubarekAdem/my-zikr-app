import { useState } from "react";
import { FaFingerprint } from "react-icons/fa";

export default function Tasbeeh() {
  const [counter, setCounter] = useState(0); // Counter for tasbeeh clicks
  const [textCounter, setTextCounter] = useState(0); // Counter to switch tasbeeh text after 33 counts
  const [clickCount, setClickCount] = useState(0); // Click counter for display

  // Tasbeeh text array
  const tasbeehTexts = ["سبحان الله", "الحمد لله", "الله أكبر"];

  // Handle click event on the fingerprint button
  const handleClick = () => {
    if (counter < 32) {
      setCounter(counter + 1);
      setClickCount(clickCount + 1); // Increment the click counter
    } else {
      setCounter(0); // Reset counter after 33 clicks
      setClickCount(0); // Reset click counter
      setTextCounter((prev) => (prev + 1) % tasbeehTexts.length); // Move to the next tasbeeh text
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 p-4 relative">
      {/* Tasbeeh Text */}
      <div className="text-3xl font-bold mb-2">{tasbeehTexts[textCounter]}</div>

      {/* Click Counter */}
      <div className="text-lg font-medium mb-6">Count: {clickCount}/33</div>

      {/* Circle Indicators */}
      <div className="relative flex flex-col items-center h-60 w-full overflow-hidden">
        {[...Array(4)].map((_, i) => {
          const index = (i + counter) % 4; // Loop through 4 circles
          const yPosition = (index - 1.5) * 70; // Adjust for 4 circles

          const sizeClass = index === 1 ? "w-16 h-16" : "w-12 h-12";
          const colorClass = index === 1 ? "bg-purple-600" : "bg-purple-300";

          return (
            <div
              key={i}
              className={`rounded-full ${sizeClass} ${colorClass} transition-all duration-300`}
              style={{
                transform: `translateY(${yPosition}px)`, // Smooth movement with a consistent offset
                borderRadius: "50%", // Ensure the circles stay circular
                position: "absolute", // Positioning absolutely to avoid distortion
                top: "50%", // Start from the center vertically
              }}
            />
          );
        })}
      </div>

      {/* Fingerprint Icon */}
      <div className="fixed bottom-10">
        <button
          onClick={handleClick}
          className="text-purple-700 text-6xl bg-white p-4 rounded-full shadow-lg"
        >
          <FaFingerprint />
        </button>
      </div>
    </div>
  );
}
