import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import GreenhouseDetails from "./pages/GreenhouseDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />  
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/greenhouses/:id" element={<GreenhouseDetails />} />
    </Routes>
  );
}

export default App;
