import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i}>
            <Skeleton height={200} borderRadius={10} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;