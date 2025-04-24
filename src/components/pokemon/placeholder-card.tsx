import React from 'react';

const PlaceholderCard: React.FC = () => {
  return (
    <div className="rounded-xl shadow-md p-4 animate-pulse 
                    bg-[#ffffff] dark:bg-[#0C1231]">
      <div className="w-full h-32 rounded mb-4 
                      bg-[#e4e9f2] dark:bg-[#58618A]"></div>
      <div className="h-4 rounded w-3/4 mb-2 mx-auto 
                      bg-[#c5cee0] dark:bg-[#7885B0]"></div>
      <div className="h-4 rounded w-1/2 mx-auto 
                      bg-[#c5cee0] dark:bg-[#7885B0]"></div>
    </div>
  );
};

export default PlaceholderCard;
