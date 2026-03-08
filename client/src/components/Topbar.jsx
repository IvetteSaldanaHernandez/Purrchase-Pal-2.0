import { Link } from "react-router-dom"
import logo from "../assets/catonlylogo.webp"
import defaultUserIcon from "../assets/defaultUserIcon.jpg"

export default function Topbar() {
  return (
    <header className="topbar">
      <Link className="topbar-left">
        <img src={logo} alt="PurrchasePal logo" className="topbar-logo" />
        <span className="topbar-title">PurchasePal</span>
      </Link>

      <Link to="/Profile" className="topbar-profile-link">
        <img
          src={defaultUserIcon}
          alt="Profile"
          className="topbar-profile"
        />
      </Link>
    </header>
  )
}