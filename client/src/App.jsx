import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Purchase from "./pages/PurchasePage";
// import Leaderboard from "./pages/LeaderboardPage";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchase" element={<Purchase />} />
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
      </Routes>
      <Bottombar />
    </Router>
  );
}

export default App;