import { NavLink } from "react-router-dom"
export default function Bottombar() {
  return (
    <nav className="bottombar">
      <NavLink to="/" className="nav-btn" aria-label="Home">⌂</NavLink>
      <NavLink to="/Leaderboard" className="nav-btn" aria-label="Leaderboard">↗</NavLink>
      <NavLink to="/Purchase" className="nav-btn" aria-label="Add Purchase">+</NavLink>
    </nav>
  )
}