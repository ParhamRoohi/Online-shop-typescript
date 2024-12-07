import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CardDetail from "./pages/CardDetail";
import SignIn from "./pages/SignIn";
import Shopping from "./pages/Shopping";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

function App() {

  const isAuthenticated = !!localStorage.getItem("userId");

  return (
    <Router>
      <Routes>
        <Route element={<RedirectIfAuthenticated isAuthenticated={isAuthenticated} />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/card/:id" element={<CardDetail />} />
        <Route path="/shopping/:userId" element={<Shopping />} />
      </Routes>
    </Router>
  );
}

export default App;
