import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const MineralDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mineral, setMineral] = useState<Mineral | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);

  fetch(`https://localhost:8080/minerals/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setMineral(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erro ao buscar mineral:", err);
      setLoading(false);
    });
}, [id]);

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ←
      </button>
      <div className="title-minerals">
        {loading ? (
          <Skeleton width="100%" height={40}/>
        ) : (
          <h1>{mineral?.name}</h1>
        )}
      </div>

      <div className="image-section">
        {loading ? (
          <>
            <Skeleton width="100%" height={300} />
            <Skeleton width="100%" height={20} style={{ marginTop: 10 }} />
            <Skeleton width="100%" height={300} style={{ marginTop: 20 }} />
            <Skeleton width="100%" height={20} style={{ marginTop: 10 }} />
          </>
        ) : (
          <>
            <img src={mineral?.imageCrossed} alt={mineral?.legendCossed} />
            <p>
              <i>{mineral?.legendCossed}</i>
            </p>

            <img src={mineral?.imageParallel} alt={mineral?.legendParallel} />
            <p>
              <i>{mineral?.legendParallel}</i>
            </p>
          </>
        )}
      </div>

      <ul>
        {loading ? (
          <>
            <Skeleton width={300} height={20} />
            <Skeleton width={300} height={20} />
            <Skeleton width={300} height={20} />
            <Skeleton width={300} height={20} />
            <Skeleton width={300} height={20} />
          </>
        ) : (
          <>
            <li>
              <b>Cor:</b> {mineral?.color}
            </li>
            <li>
              <b>Hábito:</b> {mineral?.habit}
            </li>
            <li>
              <b>Clivagem:</b> {mineral?.cleavage}
            </li>
            <li>
              <b>Extinção:</b> {mineral?.extinction}
            </li>
            <li>
              <b>Paragênese:</b> {mineral?.paragenesis}
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MineralDetails;
