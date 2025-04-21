import "./App.css";
import { Route, Routes } from "react-router-dom";
import Prices from "./pages/Prices";
import Menu from "./components/menu";

function App() {

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<div>Welcome to the Home Page!</div>} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
    </>
  );
}

export default App;
