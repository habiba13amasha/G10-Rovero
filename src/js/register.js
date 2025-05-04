import {saveAuth} from "./auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const password = document.getElementById("userPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Reset error messages
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";

    let isValid = true;

    if (typeof name !== "string" || name.length < 3) {
        document.getElementById("nameError").textContent = "Name must be at least 3 characters long";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address";
        isValid = false;
    }

    if (password.length < 8) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match";
        isValid = false;
    }

    if (isValid) {
        const usersData = localStorage.getItem("users");
        let users = usersData ? JSON.parse(usersData) : [];

        // Check if email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            document.getElementById("emailError").textContent = "Email already registered";
            return;
        }

        // Assign unique ID (use max ID + 1 if not sequential)
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

        const newUser = {
            id: newId,
            name: name,
            email: email,
            password: password,
            role: "user",
            created_at: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Save token and redirect
        saveAuth(newUser);

        setTimeout(() => {
            alert("Account created successfully!");
            window.location.href = "landing_page.html";
        }, 1000);
    }
});
