import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import logo from "../assets/catonlylogo.webp";
import defaultUserIcon from "../assets/defaultUserIcon.jpg";

export default function ProfilePage() {

  const navigate = useNavigate();

  // Saved user data

  const [user, setUser] = useState({
    name: "John Doe",
    points: 120,
    username: "jdoe123",
    email: "johndoe@example.com",
    icon: defaultUserIcon,
  });

  // Temporary edit state
  const [editName, setEditName] = useState(user.name);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editIcon, setEditIcon] = useState(user.icon);

 // Modal states
const [isModalOpen, setIsModalOpen] = useState(false); // Join Group modal
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Create Group modal
const [joinCode, setJoinCode] = useState("");
const [newGroupName, setNewGroupName] = useState(""); // input for new group

  const handleSave = () => {
    setUser({
      ...user,
      name: editName,
      username: editUsername,
      email: editEmail,
      icon: editIcon,
    });
    alert(
      `Profile saved!\nName: ${editName}\nUsername: ${editUsername}\nEmail: ${editEmail}`
    );
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditIcon(url);
    }
  };

  return (
    <div className="profile-page">
      {/* Top navigation banner matching CreatePurchase style */}
      <div className="top-nav">
        <div className="nav-left">
          <img src={logo} className="nav-logo" alt="Logo" />
          <h2>Edit Profile</h2>
        </div>
        {/* Right profile icon removed */}
      </div>

      {/* User info */}
      <div className="user-info">
        <div
          className="user-icon"
          style={{ backgroundImage: `url(${user.icon})` }}
        ></div>
        <h1>{user.name}</h1>
        <p className="username">@{user.username}</p>
        <p className="points">Points: {user.points}</p>
      </div>

      {/* Edit form */}
      <div className="edit-section">
        <label>Change Icon</label>
        <input type="file" accept="image/*" onChange={handleIconUpload} />

        <label>Name</label>
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />

        <label>Username</label>
        <input
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
        />

        <label>Email</label>
        <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />

        <button className="button1" onClick={handleSave}>
          Save Changes
        </button>
        <div className="join-group-section">
        <button className="button2" onClick={() => setIsModalOpen(true)}>
          Join Group
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
              <h3>Join or Create a Group</h3>

              <div className="modal-buttons">
                <button
                  onClick={() => {
                    setIsModalOpen(false); // close join modal
                    setIsCreateModalOpen(true); // open create modal
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
                <button
                  onClick={() =>
                    alert(`Joining group with code: ${joinCode}`)
                  }
                >
                  Join
                </button>
                
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
                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "100%", marginTop: "15px" }}
                      />
                      <div className="modal-buttons" style={{ marginTop: "15px" }}>
                        <button
                          onClick={() => {
                            alert(`Creating group: ${newGroupName}`);
                            setIsCreateModalOpen(false);
                            setNewGroupName("");
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                )}
</div>
      </div>

      {/* Bottom navigation (same as CreatePurchase) */}
      <div className="bottom-nav">
        <button onClick={() => navigate("/home")}>⾕</button>
        <button>↗</button>
        <button onClick={() => navigate("/purchase")}>＋</button>
      </div>
    </div>
  );
}