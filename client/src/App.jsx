import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import Home from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import Purchase from "./Pages/PurchasePage";
import Leaderboard from "./Pages/LeaderboardPage";
import Profile from "./Pages/ProfilePage";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Bottombar />
    </Router>
  );
}

export default App;