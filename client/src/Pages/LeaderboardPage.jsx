import "./LeaderboardPage.css"

export default function LeaderboardPage() {
  return (
    <div className="leaderboard-page">
      <div className="leaderboard">
        <div className="leaderboard-banner">
          <h2>Savings Leaderboard</h2>
        </div>

        <div className="podium">
          <div className="podium-column second">
            <div className="place">2</div>
            <h3>Emily Rodriguez</h3>
            <div className="amount">$750</div>
          </div>

          <div className="podium-column first">
            <div className="place">1</div>
            <h3>Sarah Chen</h3>
            <div className="amount">$890</div>
          </div>

          <div className="podium-column third">
            <div className="place">3</div>
            <h3>You</h3>
            <div className="amount">$680</div>
          </div>
        </div>

        <div className="rankings">
          <h3>Full Rankings</h3>

          <div className="ranking-row">
            <span>1</span>
            <span>Sarah Chen</span>
            <span>$890</span>
          </div>

          <div className="ranking-row">
            <span>2</span>
            <span>Emily Rodriguez</span>
            <span>$750</span>
          </div>

          <div className="ranking-row">
            <span>3</span>
            <span>You</span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>4</span>
            <span>Ivette</span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>5</span>
            <span>Maya</span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>6</span>
            <span>Lien</span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>7</span>
            <span>Yusra</span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>8</span>
            <span>Tiffany</span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>9</span>
            <span></span>
            <span>$680</span>
          </div>

          <div className="ranking-row">
            <span>10</span>
            <span>Yusra</span>
            <span>$680</span>
          </div>
        </div>
      </div>
    </div>
  )
}