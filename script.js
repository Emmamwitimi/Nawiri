document.addEventListener("DOMContentLoaded", () => {
    // Login and signup forms
    const loginForm = document.getElementById("loginForm");
    const loginLink = document.getElementById("loginLink");
    const loginContainer = document.getElementById("login-form");
    const loginButton = document.getElementById("loginButton");

    const signupLink = document.getElementById("signupLink");
    const signupContainer = document.getElementById("signup-form");
    const signupForm = document.getElementById("signupForm");
    const signupButton = document.getElementById("signupButton");

    const message = document.getElementById("message");

    // Login functionality
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

    // Signup functionality
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

    // Slide show implementation
    const slideshowContainers = document.querySelectorAll(".slideshow-container");

    slideshowContainers.forEach(container => {
        let slideIndex = 0;
        const slides = container.querySelectorAll(".slide");

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

    // Booking form
    const bookBtns = document.querySelectorAll(".bookbtn");
    const bookContainer = document.getElementById("bookcontainer");
    const bookingForm = document.getElementById("bookingform");
    
    bookBtns.forEach(bookBtn => {
        bookBtn.addEventListener("click", () => {
            bookContainer.style.display = "block";
        });
    });

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Handle booking form submission logic here
    });

    // Close form icon function
    function closeForm(container) {
        container.style.display = "none";
    }

    function closeButton(container) {
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "X";
        closeBtn.classList.add("closebtn");
        closeBtn.addEventListener("click", () => {
            closeForm(container); 
        });
        container.appendChild(closeBtn);
    }

    // Add book, login, and signup close buttons
    closeButton(bookContainer);
    closeButton(signupContainer);
    closeButton(loginContainer);

    // Fetch houses data and display
    async function fetchAndDisplayHouses() {
        try {
            const response = await fetch("http://localhost:3000/houses");
            const houses = await response.json();

            const housesContainer = document.querySelector(".main-content");
            housesContainer.innerHTML = ''; // Clear existing content

            houses.forEach(house => {
                const houseElement = document.createElement("div");
                houseElement.classList.add("houses");

                // Create slideshow container for house images
                const slideshowContainer = document.createElement("div");
                slideshowContainer.classList.add("slideshow-container");

                house.images.forEach((image, index) => {
                    const slide = document.createElement("div");
                    slide.classList.add("slide");
                    if (index === 0) slide.style.display = "block"; // Show first slide initially

                    const img = document.createElement("img");
                    img.src = image;
                    img.alt = house.name;

                    slide.appendChild(img);
                    slideshowContainer.appendChild(slide);
                });

                houseElement.appendChild(slideshowContainer);

                const houseTitle = document.createElement("h2");
                houseTitle.textContent = house.name;
                houseElement.appendChild(houseTitle);

                const houseDescription = document.createElement("p");
                houseDescription.textContent = house.description;
                houseElement.appendChild(houseDescription);

                const bookButton = document.createElement("button");
                bookButton.classList.add("bookbtn");
                bookButton.textContent = "Book Now";
                houseElement.appendChild(bookButton);

                housesContainer.appendChild(houseElement);
            });

            // Initialize slideshows
            const slideshowContainers = document.querySelectorAll(".slideshow-container");
            slideshowContainers.forEach(container => {
                let slideIndex = 0;
                const slides = container.querySelectorAll(".slide");

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
        } catch (error) {
            console.error('Error fetching houses:', error);
        }
    }

    fetchAndDisplayHouses(); // Call function to fetch and display houses
});
