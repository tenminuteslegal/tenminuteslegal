const BACKEND_URL = "http://localhost:5000"; // use .env later

/**
 * Generic API client
 * @param {string} path - API endpoint path
 * @param {object} options - fetch options
 * @param {boolean} auth - whether to attach JWT
 */
export async function apiFetch(path, options = {}, auth = true) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (auth) {
    const token = localStorage.getItem("app_token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  return res.json();
}
