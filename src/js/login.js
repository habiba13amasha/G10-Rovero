import {saveAuth} from "./auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();


    const email = document.getElementById("userEmail").value.trim();
    const password = document.getElementById("userPassword").value.trim();


    // Reset error messages

    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";


    let isValid = true;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address";
        isValid = false;
    }

    if (password.length < 8) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters ";
        isValid = false;
    }


    if (isValid) {
        const usersData = localStorage.getItem("users");

        if (!usersData) {
            alert("User data not found. Please reload the page.");
            return;
        }

        const users = JSON.parse(usersData);
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            saveAuth(foundUser)

            if(foundUser.role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else if (foundUser.role === "user") {
                window.location.href = "home.html";
            } else {
                console.log('Error occurred in role');
            }
        } else {
            alert("Invalid email or password! Please try again.");
        }
    }

});
      

