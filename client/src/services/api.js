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

export async function loginUser(credentials) {
  // Accepts object { email, password } or arguments (email, password)
  const body = typeof credentials === 'object' && credentials !== null
    ? credentials
    : { email: arguments[0], password: arguments[1] };

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function googleLogin(idToken) {
  const res = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  return await res.json();
}

export async function registerUser(userData) {
  // Accepts object { name, email, password, selectedMascot } or individual arguments
  const body = typeof userData === 'object' && userData !== null
    ? userData
    : { name: arguments[0], email: arguments[1], password: arguments[2], selectedMascot: arguments[3] };

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function forgotPassword(data) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function resetPassword(data) {
  const res = await fetch(`${API_BASE}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateProfile(data) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updatePreferences(data) {
  const res = await fetch(`${API_BASE}/auth/preferences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}
