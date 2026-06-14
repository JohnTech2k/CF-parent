import { loginUser, createUser, getUserData } from "./userService.js";

/**
 * Get current session
 */
export const getSession = () => {
  const raw = localStorage.getItem("cfp_session");
  return raw ? JSON.parse(raw) : null;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("cfp_session");
  window.location.href = "index.html";
};

/**
 * Legacy compatibility helpers for existing HTML files
 */
window.loginUser = loginUser;
window.registerUser = createUser;
window.logoutUser = logoutUser;
window.getSession = getSession;

export { loginUser, logoutUser, getSession };
