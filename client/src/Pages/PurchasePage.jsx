import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/catonlylogo.webp"
import defaultUserIcon from "../assets/defaultUserIcon.jpg"
import "./PurchasePage.css"

export default function CreatePurchase() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    photo: null,
  })

  const [previewName, setPreviewName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }))
    setPreviewName(file.name)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Submitting purchase:", formData)

      alert("Purchase submitted for review!")
      navigate("/home")
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-page">
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
        </div>

      <div className="create-card">
        <div className="create-header">
          <h1>Add Purchase for Review</h1>
          <p>Get AI insights and squad feedback before making a purchase</p>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">What are you buying?</label>
            <div className="input-with-icon">
              <span className="input-icon">🏷️</span>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Wireless Headphones, Running Shoes..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount">How much does it cost?</label>
            <div className="input-with-icon">
              <span className="input-icon">$</span>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Shoppinh</option>
              <option value="Food">Groceries</option>
              <option value="Clothing">Food</option>
              <option value="Beauty">Personal</option>
              <option value="School">Entertainment</option>
              <option value="Home">Travel</option>
              <option value="Pets">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Why do you want this?</label>
            <div className="textarea-with-icon">
              <span className="input-icon textarea-icon">✎</span>
              <textarea
                id="description"
                name="description"
                placeholder="Explain why you need this purchase and how it will benefit you..."
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>
            <p className="helper-text">
              Be honest! Your friends will help you decide if it&apos;s worth it.
            </p>
          </div>

          <div className="form-group">
            <label>Add a photo (optional)</label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg"
              className="hidden-file-input"
              onChange={handleFileChange}
            />

            <div className="upload-box" onClick={handleUploadClick}>
              <div className="upload-icon">⌞ + ⌝</div>
              <p className="upload-main">Click to upload or drag and drop</p>
              <p className="upload-sub">PNG, JPG up to 10MB</p>
              {previewName && <p className="upload-file-name">{previewName}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="submit-review-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
      <div className="bottom-nav">
        <div className="side-buttons">
          <button onClick={() => navigate("/home")}>⾕</button>
          <button>↗</button>
        </div>
        <button className="add-button" onClick={() => navigate("/purchase")}>＋</button>
        <div className="side-buttons" style={{ width: 80 }}></div> {/* optional spacer */}
      </div>
    </div>
  )
}