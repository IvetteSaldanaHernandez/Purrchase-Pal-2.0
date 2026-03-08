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
import { fetchPurchases, fetchUserProfile, voteOnPurchase } from "./lib/api"
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
  const [authUser, setAuthUser] = useState(null)
  const [appUser, setAppUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const hideTopbar = location.pathname === "/" || location.pathname === "/profile"
  const hideBottombar = location.pathname === "/"

  const loadPurchases = async () => {
    if (!appUser?.group_id) {
      setPurchases([])
      return
    }

    const data = await fetchPurchases(appUser.group_id)
    setPurchases(data)
  }

  useEffect(() => {
    loadPurchases()
  }, [appUser])

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

  useEffect(() => {
    const loadAppUser = async () => {
      if (!authUser) {
        setAppUser(null)
        return
      }

      const profile = await fetchUserProfile(authUser.id)
      setAppUser(profile)
    }

    loadAppUser()
  }, [authUser])

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

  const refreshAppUser = async (authUser = user) => {
    if (!authUser) {
      setAppUser(null)
      return
    }

    try {
      const profile = await fetchUserProfile(authUser.id)
      setAppUser(profile)
    } catch (error) {
      console.error("Failed to load app user:", error)
      setAppUser(null)
    }
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
              <Home user={user} appUser={appUser} purchases={purchases} onVote={handleVote} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase"
          element={
            <ProtectedRoute user={user}>
              <Purchase user={user} appUser={appUser} onPurchaseCreated={loadPurchases} />
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
              <Profile user={user} appUser={appUser} refreshAppUser={refreshAppUser} />
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