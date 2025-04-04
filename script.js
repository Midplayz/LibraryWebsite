function showTab(tab) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-content').forEach(content => content.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add('active');
}

function handleLogin() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorEl = document.getElementById("login-error");

    if (username === "admin" && password === "admin123") {
        errorEl.style.color = "lightgreen";
        errorEl.textContent = "Login successful! Redirecting...";
        
        setTimeout(() => {
            window.location.href = "index.html"; 
        }, 1000);
    } else {
        errorEl.style.color = "#ff6666";
        errorEl.textContent = "Invalid username or password.";
    }
}

function checkPasswordStrength() {
    const password = document.getElementById("reg-password").value;
    const strengthDiv = document.getElementById("password-strength");
    const requirements = [
        { regex: /.{6,}/, label: "6+ characters" },
        { regex: /[A-Z]/, label: "1 uppercase" },
        { regex: /[a-z]/, label: "1 lowercase" },
        { regex: /\d/, label: "1 number" },
        { regex: /[\W_]/, label: "1 special character" },
    ];

    let passed = 0;
    let messages = requirements.map(req => {
        const isValid = req.regex.test(password);
        if (isValid) passed++;
        return `<span style="color:${isValid ? 'lightgreen' : '#ff6666'}">• ${req.label}</span>`;
    });

    strengthDiv.innerHTML = messages.join("<br>");
}

function handleRegister() {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const errorEl = document.getElementById("register-error");

    if (password !== confirmPassword) {
        errorEl.style.color = "#ff6666";
        errorEl.textContent = "Passwords do not match!";
        return;
    }

    const strong = (
        /.{6,}/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[\W_]/.test(password)
    );

    if (!strong) {
        errorEl.style.color = "#ff6666";
        errorEl.textContent = "Password is not strong enough.";
        return;
    }

    errorEl.style.color = "lightgreen";
    errorEl.textContent = "Registration successful! Redirecting...";

    setTimeout(() => {
        window.location.href = "index.html"; 
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            
            startLeafAnimation();
        })
        .catch(error => console.error("Error loading header:", error));
});

function startLeafAnimation() {
    const leafContainer = document.body;
    const navbarHeight = document.querySelector("header").offsetHeight || 50; 

    function createLeaf() {
        for (let i = 0; i < 2; i++) { 
            const leaf = document.createElement("div");
            leaf.classList.add("leaf");

            const leafSize = `${90 + Math.random() * 30}px`; 
            leaf.style.width = leafSize;
            leaf.style.height = leafSize;

            leaf.style.left = `${Math.random() * window.innerWidth}px`;
            leaf.style.top = `${navbarHeight + 10}px`;
            leaf.style.animationDuration = `${3 + Math.random() * 5}s`; 
            leaf.style.animationDelay = `${Math.random() * 2}s`;

            leafContainer.appendChild(leaf);

            setTimeout(() => leaf.remove(), 8000); 
        }
    }

    setInterval(createLeaf, 350); 
}



document.addEventListener("DOMContentLoaded", () => {
    const books = document.querySelectorAll(".book");
    const modal = document.getElementById("book-modal");
    const closeBtn = document.querySelector(".close-button");

    const modalCover = document.getElementById("modal-cover");
    const modalTitle = document.getElementById("modal-title");
    const modalAuthor = document.getElementById("modal-author");
    const modalSynopsis = document.getElementById("modal-synopsis");
    const modalStatus = document.getElementById("modal-status");
    const modalRating = document.getElementById("modal-rating");

    books.forEach(book => {
        book.addEventListener("click", () => {
            modalCover.src = book.querySelector("img").src;
            modalTitle.textContent = book.querySelector("h3").textContent;
            modalAuthor.textContent = book.querySelector("p").textContent;
            modalSynopsis.textContent = book.dataset.synopsis || "No synopsis available.";
            const isAvailable = book.querySelector(".availability").classList.contains("unavailable") ? "Borrowed" : "Available";
            modalStatus.textContent = `Status: ${isAvailable}`;
            modalStatus.style.color = isAvailable === "Available" ? "#4CAF50" : "#e53935";

            const rating = parseFloat(book.dataset.rating) || 0;
            modalRating.innerHTML = "Rating: " + "★".repeat(rating) + "☆".repeat(5 - rating);

            modal.classList.remove("hidden");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
