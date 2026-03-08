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
    return purchases.filter((purchase) => purchase.needs_vote === true)
  }, [activeTab, purchases])

  return (
    <div className="feed-page">
      {/* HEADER
      <div className="top-nav">
        <div className="nav-left">
          <img src={logo} className="nav-logo" />
          <h2>PurrchasePal</h2>
        </div>

        <img
          src={defaultUserIcon}
          alt="Profile"
          className="nav-profile-icon"
          onClick={() => navigate("/profilepage")}
        />
      </div> */}

      {/* FEED CONTENT */}
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

      {/* BOTTOM NAV */}
      {/* <div className="bottom-nav">
        <button onClick={() => navigate("/home")}>⾕</button>
        <button onClick={() => navigate("/leaderboard")}>↗</button>
        <button onClick={() => navigate("/purchase")}>＋</button>
      </div> */}
    </div>
  )
}

function PurchaseCard({ purchase, onVote }) {
  const totalVotes = (purchase.upvotes || 0) + (purchase.downvotes || 0)

  return (
    <div className="purchase-card">
      <div className="purchase-header">
        <div className="purchase-user">
          <img
            src={purchase.user_avatar || "/default-avatar.png"}
            alt="User"
            className="purchase-avatar"
          />
          <div>
            <h3>{purchase.user_name || "Unknown User"}</h3>
            <p>
              {purchase.time_ago || "Just now"} • {purchase.category || "General"}
            </p>
          </div>
        </div>

        <div className="purchase-amount">
          ${Number(purchase.amount || 0).toFixed(2)}
        </div>
      </div>

      {purchase.image_url && (
        <img
          className="purchase-image"
          src={purchase.image_url}
          alt="Purchase"
        />
      )}

      <div className="purchase-body">
        <h2>{purchase.title}</h2>

        {purchase.description && (
          <p className="purchase-description">{purchase.description}</p>
        )}

        {purchase.ai_verdict && (
          <div className="ai-box">
            <div className="ai-header">
              <span>{purchase.ai_verdict}</span>
              {purchase.ai_confidence && <span>{purchase.ai_confidence}</span>}
            </div>
            {purchase.ai_reason && <p>{purchase.ai_reason}</p>}
          </div>
        )}

        <div className="vote-row">
          <div className="vote-buttons">
            <button onClick={() => onVote?.(purchase.id || purchase._id, "up")}>
              👍 {purchase.upvotes || 0}
            </button>

            <button onClick={() => onVote?.(purchase.id || purchase._id, "down")}>
              👎 {purchase.downvotes || 0}
            </button>
          </div>

          <span className="vote-total">{totalVotes} votes</span>
        </div>
      </div>
    </div>
  )
}