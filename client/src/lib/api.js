const API_BASE_URL = "http://localhost:8000"

export async function fetchUserProfile(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)
  if (!response.ok) throw new Error("Failed to fetch user profile")
  return response.json()
}

export async function upsertUserProfile(profile) {
  const response = await fetch(`${API_BASE_URL}/users/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })

  if (!response.ok) throw new Error("Failed to save user profile")
  return response.json()
}

export async function fetchPurchases(groupId) {
  const response = await fetch(`${API_BASE_URL}/purchases?group_id=${groupId}`)
  if (!response.ok) throw new Error("Failed to fetch purchases")
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
    throw new Error(errorText || "Failed to vote on purchase")
  }

  return response.json()
}


export async function fetchLeaderboard(groupId) {
  const response = await fetch(`${API_BASE_URL}/leaderboard?group_id=${groupId}`)
  if (!response.ok) throw new Error("Failed to fetch leaderboard")
  return response.json()
}

export async function createGroup(payload) {
  const response = await fetch(`${API_BASE_URL}/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error("Failed to create group")
  return response.json()
}

export async function joinGroup(payload) {
  const response = await fetch(`${API_BASE_URL}/groups/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error("Failed to join group")
  return response.json()
}