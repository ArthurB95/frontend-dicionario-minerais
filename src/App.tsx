import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Menu from "../src/pages/Menu/Menu";
import MineralDetails from "../src/components/MineralDetails/MineralDetails";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Dicionário Minerais</h1>
      <br />
      <button className="btn-enter" onClick={() => navigate("/menu")}>
        ENTRAR
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/minerals/:id" element={<MineralDetails />} />
      </Routes>
    </Router>
  );
}
