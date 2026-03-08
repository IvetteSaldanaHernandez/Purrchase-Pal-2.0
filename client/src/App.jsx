import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import "./App.css"
import Topbar from "./components/Topbar"
import Bottombar from "./components/Bottombar"
import Home from "./Pages/HomePage"
import Login from "./Pages/LoginPage"
import Purchase from "./Pages/PurchasePage"
import Leaderboard from "./Pages/LeaderboardPage"
import Profile from "./Pages/ProfilePage"
import { fetchPurchases, voteOnPurchase } from "./lib/api"

function AppLayout() {
  const location = useLocation()
  const [purchases, setPurchases] = useState([])

  const hideTopbar = location.pathname === "/" || location.pathname === "/profile"
  const hideBottombar = location.pathname === "/"

  const loadPurchases = async () => {
    try {
      const data = await fetchPurchases()
      setPurchases(data)
    } catch (error) {
      console.error("Failed to load purchases:", error)
    }
  }

  useEffect(() => {
    loadPurchases()
  }, [])

  const handleVote = async (purchaseId, voteType) => {
    try {
      await voteOnPurchase(purchaseId, voteType)
      await loadPurchases()
    } catch (error) {
      console.error("Vote failed:", error)
      alert("Could not record vote.")
    }
  }

  return (
    <>
      {!hideTopbar && <Topbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<Home purchases={purchases} onVote={handleVote} />}
        />
        <Route
          path="/purchase"
          element={<Purchase onPurchaseCreated={loadPurchases} />}
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {!hideBottombar && <Bottombar />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}

export default App