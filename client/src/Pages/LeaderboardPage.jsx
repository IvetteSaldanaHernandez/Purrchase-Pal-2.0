import { useEffect, useState } from "react"
import { fetchLeaderboard } from "../lib/api"
import "./LeaderboardPage.css"

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard()
        setLeaders(data)
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  if (loading) {
    return <div className="leaderboard-page">Loading leaderboard...</div>
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard">
        <div className="leaderboard-banner">
          <h2>Savings Leaderboard</h2>
        </div>

        <div className="rankings">
          <h3>Full Rankings</h3>

          {leaders.length === 0 ? (
            <p>No leaderboard data yet.</p>
          ) : (
            leaders.map((person, index) => (
              <div className="ranking-row" key={person.name}>
                <span>{index + 1}</span>
                <span>{person.name}</span>
                <span>{person.score}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}