// js/navbar.js
import {getAuthUser, logout} from './auth.js'; // Only if you're using auth features

export async function loadNavbar(targetId = "navbar-placeholder") {
    const container = document.getElementById(targetId);
    if (!container) return;

    try {
        const response = await fetch("components/navbar.html");
        container.innerHTML = await response.text();

        // Auth logic (if applicable)
        const authBtn = document.getElementById("auth-btn");
        if (authBtn) {
            const user = getAuthUser?.();
            if (user) {
                authBtn.textContent = "Logout";
                authBtn.addEventListener("click", logout);
            } else {
                authBtn.addEventListener("click", () => {
                    window.location.href = "login.html";
                });
            }
        }
    } catch (err) {
        console.error("Failed to load navbar:", err);
    }
}
