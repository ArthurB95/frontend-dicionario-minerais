import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "../src/pages/Menu/Menu";
import MineralDetails from "../src/components/MineralDetails/MineralDetails";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/minerals/:id" element={<MineralDetails />} />
        <Route path="/macro-minerals/:id" element={<MineralDetails />} />
      </Routes>
    </Router>
  );
}
