import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MineralsGrid from "../../components/MineralsGrid/MineralsGrid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../Menu/Menu.css";

interface Mineral {
  id: number;
  name: string;
  crystallographicSystem: string;
  relief: string;
  color: string;
  habit: string;
  cleavage: string;
  extinction: string;
  paragenesis: string;
  similarDiagnosticAndMineralProperties: string;
  imageCrossed: string;
  legendCossed: string;
  imageParallel: string;
  legendParallel: string;
}

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minerals, setMinerals] = useState<Mineral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/minerals")
      .then((res) => res.json())
      .then((data) => {
        setMinerals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar minerais:", err);
        setLoading(false);
      });
  }, []);

  const filteredMinerals = minerals
    .filter((m) =>
      m.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="menu-container">
      <div className="search-bar-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {loading ? (
      <div className="loading">
        <DotLottieReact src="../src/assets/loading.json" loop autoplay />
      </div>
    ) : filteredMinerals.length === 0 ? (
      <div className="loading">
        <DotLottieReact src="../src/assets/nodata.json" loop autoplay />
      </div>
    ) : (
      <MineralsGrid
        minerals={filteredMinerals.map((m) => ({ id: m.id, name: m.name }))}
      />
    )}
    </div>
  );
};

export default Menu;
