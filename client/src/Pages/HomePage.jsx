import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/catonlylogo.webp"
import defaultUserIcon from "../assets/defaultUserIcon.jpg"
import "./HomePage.css"

export default function HomePage({ user, purchases = [], onVote }) {
  const [activeTab, setActiveTab] = useState("all")
  const navigate = useNavigate()

  const filteredPurchases = useMemo(() => {
    if (activeTab === "all") return purchases
    return purchases.filter(
      (purchase) => (purchase.smart_votes || 0) + (purchase.wasteful_votes || 0) === 0
    )
  }, [activeTab, purchases])

  return (
    <div className="feed-page">
      <div className="feed-content">
        <div className="feed-tabs">
          <button
            className={`feed-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Purchases
          </button>

          <button
            className={`feed-tab ${activeTab === "vote" ? "active" : ""}`}
            onClick={() => setActiveTab("vote")}
          >
            Needs Your Vote
          </button>
        </div>

        <div className="feed-list">
          {filteredPurchases.length === 0 ? (
            <div className="empty-state">
              <h2>No purchases yet</h2>
              <p>Once your group starts posting purchases, they’ll show up here.</p>
            </div>
          ) : (
            filteredPurchases.map((purchase) => (
              <PurchaseCard
                key={purchase.id || purchase._id}
                purchase={purchase}
                onVote={onVote}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function PurchaseCard({ purchase, onVote }) {
  const totalVotes = (purchase.smart_votes || 0) + (purchase.wasteful_votes || 0)

  return (
    <div className="purchase-card">
      <div className="purchase-header">
        <div className="purchase-user">
          <img
            src="/default-avatar.png"
            alt="User"
            className="purchase-avatar"
          />
          <div>
            <h3>{purchase.user_id || "Unknown User"}</h3>
            <p>{purchase.category || "General"}</p>
          </div>
        </div>

        <div className="purchase-amount">
          ${Number(purchase.amount || 0).toFixed(2)}
        </div>
      </div>

      <div className="purchase-body">
        <h2>{purchase.title}</h2>

        {purchase.description && (
          <p className="purchase-description">{purchase.description}</p>
        )}

        {purchase.ai_feedback && (
          <div className="ai-box">
            <div className="ai-header">
              <span>AI Feedback</span>
            </div>
            <p>{purchase.ai_feedback}</p>
          </div>
        )}

        <div className="vote-row">
          <div className="vote-buttons">
            <button onClick={() => onVote?.(purchase._id, "smart")}>
              👍 {purchase.smart_votes || 0}
            </button>

            <button onClick={() => onVote?.(purchase._id, "wasteful")}>
              👎 {purchase.wasteful_votes || 0}
            </button>
          </div>

          <span className="vote-total">{totalVotes} votes</span>
        </div>
      </div>
    </div>
  )
}