document.addEventListener("DOMContentLoaded", () => {
    //login and signup forms
    const loginForm = document.getElementById("loginForm");
    const loginLink = document.getElementById("loginLink");
    const loginContainer = document.getElementById("login-form");
    const loginButton = document.getElementById("loginButton");

    const signupLink = document.getElementById("signupLink");
    const signupContainer = document.getElementById("signup-form");
    const signupForm = document.getElementById("signupForm");
    const signupButton = document.getElementById("signupButton");

    const message = document.getElementById("message");
//login functionality
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
     //signup 
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
    // slide show implementation
    // Select all slideshow containers
    const slideshowContainers = document.querySelectorAll(".slideshow-container");

    // Iterate over each slideshow container
    slideshowContainers.forEach(container => {
        let slideIndex = 0;
        const slides = container.querySelectorAll(".slide");

        // Function to show slides
        function showSlides() {
            slides.forEach(slide => {
                slide.style.display = "none";
            });
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 10000); // Change image every 10 seconds
        }

        showSlides(); // Initial call to start the slideshow
    });
    //booking form
    const bookBtns = document.querySelectorAll(".bookbtn");
    const bookContainer = document.getElementById("bookcontainer");
    const bookingForm = document.getElementById("bookingform");
    
    bookBtns.forEach(bookBtn =>{
        bookBtn.addEventListener("click",()=>{
            bookContainer.style.display = "block";
        });
    });
    bookingForm.addEventListener("submit",()=>{

    });
    // close form icon function
    function closeform(container){
        container.style.display = "none";
    }
    function closeButton(container){
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "X";
        closeBtn.classList.add("closebtn");
        closeBtn.addEventListener("click",()=>{
            closeform(container); 
        });
        container.appendChild(closeBtn)
    }
    //add book,login and signup
    closeButton(bookContainer);
    closeButton(signupContainer);
    closeButton(loginContainer);
});
