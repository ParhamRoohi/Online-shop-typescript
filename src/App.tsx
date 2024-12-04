
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CardDetail from "./pages/CardDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;