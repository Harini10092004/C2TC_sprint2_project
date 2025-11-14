const TOKEN_KEY = "ps_mock_token";

export function loginMock(username, password) {
  // very simple mock: accept any non-empty credentials
  if (username && password) {
    const token = btoa(`${username}:${Date.now()}`);
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}
