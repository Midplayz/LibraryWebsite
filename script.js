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

function showTab(tab) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-content').forEach(content => content.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add('active');
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
