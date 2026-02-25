import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../MineralDetails/MineralDetails.css";

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

type MineralType = Mineral | MacroMinerals;

const MineralDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [mineral, setMineral] = useState<MineralType | null>(null);
  const [loading, setLoading] = useState(true);

  const isMacro = location.pathname.includes("macro-minerals");

  useEffect(() => {
    const fetchMineral = async () => {
      setLoading(true);
      try {
        const endpoint = isMacro ? `/macro-minerals/${id}` : `/minerals/${id}`;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL_PRD}${endpoint}`,
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }

        const data: MineralType = await response.json();
        setMineral(data);
      } catch (error) {
        console.error("Erro ao buscar mineral:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMineral();
  }, [id, isMacro]);

  const isMacroData = (data: MineralType): data is MacroMinerals => {
    return 'macroMineral' in data || 'classe' in data;
  };

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ←
      </button>
      <div className="title-minerals">
        {loading ? (
          <Skeleton width="100%" height={40} />
        ) : (
          <h1>{mineral?.name}</h1>
        )}
      </div>

      {/* SESSÃO DE IMAGENS E DADOS */}
      {loading || !mineral ? (
        <>
          <div className="image-section">
            <Skeleton width="100%" height={300} />
            <Skeleton width="100%" height={20} style={{ marginTop: 10 }} />
          </div>
          <ul>
            <Skeleton count={5} height={20} style={{ marginTop: 10 }} />
          </ul>
        </>
      ) : isMacroData(mineral) ? (
        /* =========================================
           RENDERIZAÇÃO PARA MACROMINERAIS
           ========================================= */
        <>
          <div className="image-section">
            <img src={mineral.imagem} alt={`Imagem de ${mineral.name}`} />
          </div>
          <ul>
            <li><b>Classe:</b> {mineral.classe}</li>
            <li><b>Classe Cristalográfica:</b> {mineral.classe_cristalografica}</li>
            <li><b>Sistema:</b> {mineral.sistema}</li>
            <li><b>Grupo/Subgrupo:</b> {mineral.grupo} / {mineral.subgrupo}</li>
            <li><b>Dureza:</b> {mineral.dureza}</li>
            <li><b>Cor:</b> {mineral.cor}</li>
            <li><b>Hábito:</b> {mineral.habito}</li>
            <li><b>Fratura:</b> {mineral.fratura}</li>
            <li><b>Diafaneidade:</b> {mineral.diafaneidade}</li>
            <li><b>Brilho:</b> {mineral.brilho}</li>
            <li><b>Clivagem:</b> {mineral.clivagem}</li>
            <li><b>Tenacidade:</b> {mineral.tenacidade}</li>
            <li><b>Traço:</b> {mineral.traco}</li>
            <li><b>Gênese:</b> {mineral.genese}</li>
          </ul>
        </>
      ) : (
        /* =========================================
           RENDERIZAÇÃO PARA MICROMINERAIS (MINERAL)
           ========================================= */
        <>
          <div className="image-section">
            <img src={mineral.imageCrossed} alt={mineral.legendCossed} />
            <p><i>{mineral.legendCossed}</i></p>

            <img src={mineral.imageParallel} alt={mineral.legendParallel} />
            <p><i>{mineral.legendParallel}</i></p>
          </div>
          <ul>
            <li><b>Sistema Cristalográfico:</b> {mineral.crystallographicSystem}</li>
            <li><b>Cor:</b> {mineral.color}</li>
            <li><b>Hábito:</b> {mineral.habit}</li>
            <li><b>Clivagem:</b> {mineral.cleavage}</li>
            <li><b>Extinção:</b> {mineral.extinction}</li>
            <li><b>Paragênese:</b> {mineral.paragenesis}</li>
            <li><b>Relevo:</b> {mineral.relief}</li>
            <li><b>Propriedades Similares:</b> {mineral.similarDiagnosticAndMineralProperties}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MineralDetails;
