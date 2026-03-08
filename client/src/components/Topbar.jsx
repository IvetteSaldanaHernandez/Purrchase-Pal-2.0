import logo from "../assets/catonlylogo.webp"
import defaultUserIcon from "../assets/defaultUserIcon.jpg"

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src={logo} alt="PurchasePal logo" className="topbar-logo" />
        <span className="topbar-title">PurchasePal</span>
      </div>

      <img
        src={defaultUserIcon}
        alt="Profile"
        className="topbar-profile"
      />
    </header>
  )
}