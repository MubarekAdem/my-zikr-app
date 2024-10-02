import { useState } from "react";

export default function Tasbeeh() {
  const [counter, setCounter] = useState(0);

  // Function to handle swipes
  const handleSwipe = (direction) => {
    if (direction === "up") {
      setCounter(counter + 1);
    } else if (direction === "down" && counter > 0) {
      setCounter(counter - 1);
    }
  };

  // Simple swipe detection logic
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setSwipeStart(touch.clientY);
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const swipeEnd = touch.clientY;

    // Detect swipe direction (up or down)
    const swipeDistance = swipeStart - swipeEnd;
    if (swipeDistance > 50) {
      handleSwipe("up");
    } else if (swipeDistance < -50) {
      handleSwipe("down");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-purple-100 p-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Tasbeeh Text */}
      <div className="text-3xl font-bold mb-8">سبحان الله</div>

      {/* Counter Display */}
      <div className="flex flex-col items-center">
        <div className="text-5xl font-semibold">{counter}</div>

        {/* Circle Indicators */}
        <div className="flex flex-col items-center space-y-4 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-full ${
                i < counter ? "bg-purple-600" : "bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
