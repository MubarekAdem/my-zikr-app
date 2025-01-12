import React from "react";

const DecorativeFrame = ({ children }) => {
  return (
    <div className="relative p-1">
      <div className="absolute inset-0 bg-green-600 opacity-20 rounded-lg" />
      <div className="absolute inset-0 border-8 border-double border-green-600 rounded-lg" />
      <div className="relative bg-white rounded-lg p-6">{children}</div>
      <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-green-600 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-8 border-r-8 border-green-600 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-8 border-l-8 border-green-600 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-8 border-r-8 border-green-600 rounded-br-lg" />
    </div>
  );
};

export default DecorativeFrame;
