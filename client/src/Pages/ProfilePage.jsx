import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProfilePage.css"
import logo from "../assets/catonlylogo.webp"
import defaultUserIcon from "../assets/defaultUserIcon.jpg"
import { supabase } from "../lib/supabase"
import { createGroup, joinGroup } from "../lib/api"

export default function ProfilePage({ user, appUser, refreshAppUser }) {
  const navigate = useNavigate()

  const [editName, setEditName] = useState("")
  const [editUsername, setEditUsername] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editIcon, setEditIcon] = useState(defaultUserIcon)
  const [isSaving, setIsSaving] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [joinCode, setJoinCode] = useState("")
  const [newGroupName, setNewGroupName] = useState("")

  useEffect(() => {
    if (!user) return

    setEditName(user.user_metadata?.full_name || "")
    setEditUsername(user.user_metadata?.username || "")
    setEditEmail(user.email || "")
    setEditIcon(user.user_metadata?.avatar_url || defaultUserIcon)
  }, [user])

  const handleSave = async () => {
    try {
      setIsSaving(true)

      const { error } = await supabase.auth.updateUser({
        email: editEmail,
        data: {
          full_name: editName,
          username: editUsername,
          avatar_url: editIcon,
        },
      })

      if (error) {
        alert(error.message)
        return
      }

      alert("Profile saved successfully!")
    } catch (error) {
      console.error("Save profile error:", error)
      alert("Something went wrong while saving your profile.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleIconUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    const fileExt = file.name.split(".").pop()
    const filePath = `${user.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error(uploadError)
      alert("Could not upload photo.")
      return
    }

    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath)

    setEditIcon(data.publicUrl)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const handleCreateGroup = async () => {
    try {
      const result = await createGroup({
        name: newGroupName,
        owner_user_id: user.id,
      })

      alert(`Group created! Join code: ${result.join_code}`)
      setIsCreateModalOpen(false)
      setNewGroupName("")
      await refreshAppUser?.()
    } catch (error) {
      console.error(error)
      alert("Could not create group.")
    }
  }

  const handleJoinGroup = async () => {
    try {
      await joinGroup({
        user_id: user.id,
        join_code: joinCode,
      })

      alert("Joined group successfully!")
      setIsModalOpen(false)
      setJoinCode("")
      await refreshAppUser?.()
    } catch (error) {
      console.error(error)
      alert("Could not join group.")
    }
  }

  const displayName = editName || "No name yet"
  const displayUsername = editUsername || "username"
  const displayIcon = editIcon || defaultUserIcon

  return (
    <div className="profile-page">
      <div className="top-nav">
        <div className="nav-left">
          <img src={logo} className="nav-logo" alt="Logo" />
          <h2>Edit Profile</h2>
        </div>
      </div>

      <div className="user-info">
        <div
          className="user-icon"
          style={{ backgroundImage: `url(${displayIcon})` }}
        ></div>
        <h1>{displayName}</h1>
        <p className="username">@{displayUsername}</p>
        <p className="points">Email: {editEmail}</p>
        <p className="points">Group: {appUser?.group_id ? "Joined" : "No group yet"}</p>
      </div>

      <div className="edit-section">
        <label>Change Icon</label>
        <input type="file" accept="image/*" onChange={handleIconUpload} />

        <label>Name</label>
        <input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Username</label>
        <input
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
          placeholder="Enter a username"
        />

        <label>Email</label>
        <input
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <button className="button1" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

        <div className="join-group-section">
          <button className="button2" onClick={() => setIsModalOpen(true)}>
            Join Group
          </button>

          <button className="button2" onClick={handleLogout}>
            Log Out
          </button>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>

                <h3>Join or Create a Group</h3>

                <div className="modal-buttons">
                  <button
                    onClick={() => {
                      setIsModalOpen(false)
                      setIsCreateModalOpen(true)
                    }}
                  >
                    Create Group
                  </button>
                </div>

                <div className="join-code-section">
                  <input
                    type="text"
                    placeholder="Enter group code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  <button onClick={handleJoinGroup}>Join</button>
                </div>
              </div>
            </div>
          )}

          {isCreateModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-modal"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  ✕
                </button>

                <h3>Create a New Group</h3>

                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    width: "100%",
                    marginTop: "15px",
                  }}
                />

                <div className="modal-buttons" style={{ marginTop: "15px" }}>
                  <button onClick={handleCreateGroup}>Create</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}