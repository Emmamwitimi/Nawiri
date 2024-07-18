document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginLink = document.getElementById("loginLink");
    const loginContainer = document.getElementById("login-form");
    const loginButton = document.getElementById("loginButton");

    const signupLink = document.getElementById("signupLink");
    const signupContainer = document.getElementById("signup-form");
    const signupForm = document.getElementById("signupForm");
    const signupButton = document.getElementById("signupButton");

    const message = document.getElementById("message");

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        message.textContent = '';
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        // compare the email and password submitted
        if (email === "test@example.com" && password === "password") {
            message.textContent = "Login successful!";
            message.style.color = 'green';
        } else {
            message.textContent = "Login unsuccessful";
            message.style.color = 'red';
            loginForm.reset();
        }
    });

    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupContainer.style.display = "block";
        loginContainer.style.display = 'none';
        message.textContent = '';
    });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;
        if (password === confirmPassword) {
            message.textContent = 'Sign-up successful! Please login.';
            message.style.color = 'green';
            signupForm.reset();
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        } else {
            message.textContent = 'Passwords do not match';
            message.style.color = 'red';
        }
    });
});
