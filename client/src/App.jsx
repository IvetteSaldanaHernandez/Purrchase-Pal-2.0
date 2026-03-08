import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"
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
import { supabase } from "./lib/supabase"

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

function AppLayout() {
  const location = useLocation()
  const [purchases, setPurchases] = useState([])
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

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

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUser(session?.user ?? null)
      setAuthLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
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

  if (authLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {!hideTopbar && user && <Topbar user={user} />}

      <Routes>
        <Route path="/" element={<Login user={user} />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home user={user} purchases={purchases} onVote={handleVote} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase"
          element={
            <ProtectedRoute user={user}>
              <Purchase user={user} onPurchaseCreated={loadPurchases} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute user={user}>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideBottombar && user && <Bottombar />}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  )
}