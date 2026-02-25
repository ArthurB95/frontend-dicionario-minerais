import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MineralsGrid from "../../components/MineralsGrid/MineralsGrid";
import SkeletonLoader from "../../components/Skeleton/SkeletonLoader";
import { ChevronRight, Info, Search, X } from "lucide-react";
import "../Menu/Menu.css";
import { Link } from "react-router-dom";

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

export interface MacroMinerals {
  id?: number;
  name: string;
  classe: string;
  dureza: string;
  cor: string;
  habito: string;
  fratura: string;
  diafaneidade: string;
  brilho: string;
  clivagem: string;
  genese: string;
  grupo: string;
  subgrupo: string;
  sistema: string;
  classe_cristalografica: string;
  tenacidade: string;
  traco: string;
  macroMineral: boolean;
  imagem: string;
}

interface DisplayItem {
  uniqueId: string;
  originalId: number;
  name: string;
  type: "Macro" | "Micro";
  routePrefix: string;
  color?: string;
}

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minerals, setMinerals] = useState<Mineral[]>([]);
  const [macroMinerals, setMacroMinerals] = useState<MacroMinerals[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [mineralsRes, macroRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL_STAGING}/minerals`),
          fetch(`${import.meta.env.VITE_API_URL_STAGING}/macro-minerals`),
        ]);

        if (!mineralsRes.ok || !macroRes.ok) {
          throw new Error("Erro na requisição das APIs");
        }

        const mineralsData: Mineral[] = await mineralsRes.json();
        const macroData: MacroMinerals[] = await macroRes.json();

        setMinerals(mineralsData);
        setMacroMinerals(macroData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const combinedList: DisplayItem[] = [
    ...macroMinerals.map((m) => ({
      uniqueId: `macro-${m.id}`,
      originalId: m.id!,
      name: m.name,
      type: "Macro" as const,
      routePrefix: "macro-minerals",
      color: m.cor,
    })),
    ...minerals.map((m) => ({
      uniqueId: `micro-${m.id}`,
      originalId: m.id,
      name: m.name,
      type: "Micro" as const,
      routePrefix: "minerals",
      color: m.color,
    })),
  ];

  const filteredItems = combinedList
    .filter((item) => {
      if (filter === "Macro") return item.type === "Macro";
      if (filter === "Micro") return item.type === "Micro";
      return true;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-white pt-12 pb-4 px-6 shadow-sm sticky top-0 z-10">
      {/* Header Personalizado */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dicionário Minerais
          </h1>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-3 border border-gray-100 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-inner"
          placeholder="Buscar por nome ou símbolo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Barra de Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["Todos", "Macro", "Micro"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border
                ${
                  filter === type
                    ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
          >
            {type === "Todos" ? "Todos" : `${type}minerais`}
          </button>
        ))}
      </div>

      {/* Lista de Cards */}
      <div className="p-4 space-y-3 pb-20 overflow-y-auto bg-gray-50 flex-1">
        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : (
          filteredItems.map((item) => (
            <Link
              key={item.uniqueId}
              to={`/${item.routePrefix}/${item.originalId}`}
              className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Descomentei a etiqueta discreta para ajudar o usuário a ver a diferença visualmente! */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                    item.type === "Macro"
                      ? "border-orange-200 text-orange-600 bg-orange-50"
                      : "border-teal-200 text-teal-600 bg-teal-50"
                  }`}
                >
                  {item.type}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
