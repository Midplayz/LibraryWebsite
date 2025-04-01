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

    // Add 'active' class to the clicked tab and its respective content
    document.getElementById(tab).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add('active');
}
