import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

import "./LoginPage.css"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate("/home")
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    alert("Account created. Check email for confirmation.")
  }

  return (
    <div className="login-page">

      <div className="img1"></div>
      <div className="img2"></div>
      <div className="img3"></div>
      <div className="img44"></div>
      <div className="img4"></div>
      <div className="img5"></div>
      <div className="img6"></div>

      <div className="login-card">
        <div className="img"></div>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button className="button1" onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <button className="button2" onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>

      </div>
    </div>
  )
}