//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Administrador from './components/Administrador/Administrador';
import Barista from './components/Barista/Barista';
import Cocinero from './components/Cocinero/Cocinero';
import Mesero from './components/Mesero/Mesero';
import Cliente from './components/Cliente/Cliente';



function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Administrador" element={<Administrador />} />
          <Route path="/Barista" element={<Barista />} />
          <Route path="/Cocinero" element={<Cocinero />} />
          <Route path="/Mesero" element={<Mesero />} />
          <Route path="/Cliente" element={<Cliente />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
