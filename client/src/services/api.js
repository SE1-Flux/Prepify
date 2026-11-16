const API_BASE = '/api';

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}

export async function fetchMaterials() {
  const res = await fetch(`${API_BASE}/materials`);
  return await res.json();
}

export async function fetchDemoMaterial() {
  const res = await fetch(`${API_BASE}/materials/demo`);
  return await res.json();
}

export async function uploadMaterial(formData) {
  const res = await fetch(`${API_BASE}/materials/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to upload and process study material');
  }
  return await res.json();
}

export async function fetchLeaderboard() {
  const res = await fetch(`${API_BASE}/game/leaderboard`);
  return await res.json();
}

export async function submitGameScore(scoreData) {
  const res = await fetch(`${API_BASE}/game/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoreData),
  });
  return await res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export async function registerUser(name, email, password, selectedMascot) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, selectedMascot }),
  });
  return await res.json();
}
