const API_BASE_URL = "http://localhost:8000"

export async function fetchPurchases() {
  const response = await fetch(`${API_BASE_URL}/purchases`)

  if (!response.ok) {
    throw new Error("Failed to fetch purchases")
  }

  return response.json()
}

export async function createPurchase(purchaseData) {
  const response = await fetch(`${API_BASE_URL}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchaseData),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "Failed to create purchase")
  }

  return response.json()
}

export async function voteOnPurchase(purchaseId, voteType) {
  const response = await fetch(`${API_BASE_URL}/votes/${purchaseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vote_type: voteType }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "Failed to vote")
  }

  return response.json()
}

export async function fetchLeaderboard() {
  const response = await fetch(`${API_BASE_URL}/leaderboard`)

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard")
  }

  return response.json()
}