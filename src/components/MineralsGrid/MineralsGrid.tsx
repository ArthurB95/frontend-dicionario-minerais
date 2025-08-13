import React from "react";
import { Link } from "react-router-dom";

interface Mineral {
  id: number;
  name: string;
}

interface MineralsGridProps {
  minerals: Mineral[];
}

const MineralsGrid: React.FC<MineralsGridProps> = ({ minerals }) => {
  return (
    <div className="minerals-grid">
      {minerals.map((m) => (
        <Link key={m.id} to={`/minerals/${m.id}`} className="mineral-card">
          {m.name.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default MineralsGrid;