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

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch(`http://localhost:3000/users?email=${email}`);
            const users = await response.json();
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                message.textContent = "Login successful!";
                message.style.color = 'green';
                loginContainer.style.display = 'none';
            } else {
                message.textContent = "Login unsuccessful";
                message.style.color = 'red';
                loginContainer.style.display = "none";
            }
        } catch (error) {
            console.error('Error:', error);
            message.textContent = 'Error occurred during login!';
            message.style.color = 'red';
        }
    });
     
    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupContainer.style.display = "block";
        loginContainer.style.display = 'none';
        message.textContent = '';
    });

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        if (password === confirmPassword) {
            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                if (response.ok) {
                    message.textContent = 'Sign-up successful! Please login.';
                    message.style.color = 'green';
                    signupForm.reset();
                    signupContainer.style.display = 'none';
                    loginContainer.style.display = 'block';
                } else {
                    message.textContent = 'Sign-up failed!';
                    message.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                message.textContent = 'Error occurred during sign-up!';
                message.style.color = 'red';
            }
        } else {
            message.textContent = 'Passwords do not match';
            message.style.color = 'red';
        }
    });
});
