// auth.js

// Save user/admin session to localStorage
export function saveAuth(userData) {
    const token = Math.random().toString(36).substring(2);

    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authRole", userData.role); // e.g., 'user' or 'admin'

    console.log("Auth token saved:", token);
    console.log("User data saved:", userData);
    console.log("Role saved:", userData.role);
}

// Check if user is logged in
export function isLoggedIn() {
    return !!localStorage.getItem("authToken");
}

// Get current user's role
export function getRole() {
    return localStorage.getItem("authRole");
}

// Get current user object
export function getAuthUser() {
    const data = localStorage.getItem("authUser");
    return data ? JSON.parse(data) : null;
}

// Get auth token
export function getAuthToken() {
    return localStorage.getItem("authToken");
}

// Logout and redirect to log in
export function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRole");

    window.location.href = "login.html"; // redirect to login page
}
