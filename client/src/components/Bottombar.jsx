import { NavLink } from "react-router-dom"
export default function Bottombar() {
  return (
    <nav className="bottombar">
      <NavLink to="/home" className="nav-btn" aria-label="Home">⌂</NavLink>
      <NavLink to="/leaderboard" className="nav-btn" aria-label="Leaderboard">↗</NavLink>
      <NavLink to="/purchase" className="nav-btn" aria-label="Add Purchase">+</NavLink>
    </nav>
  )
}