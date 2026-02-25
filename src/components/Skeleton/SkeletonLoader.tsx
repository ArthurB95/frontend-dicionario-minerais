import React from "react";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader: React.FC = () => {
  const skeletonCards = Array(5).fill(0);

  return (
    <div className="w-full space-y-3">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;