// ======================================
// ShopEasy - Router
// router.js
// ======================================

// Navigate to another page
function navigate(page) {
    window.location.href = page;
}

// Go Back
function goBack() {
    window.history.back();
}

// Reload Current Page
function reloadPage() {
    window.location.reload();
}

// Highlight Active Navigation Link
document.addEventListener("DOMContentLoaded", () => {

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

});

// Scroll to Top
function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// Scroll Button
const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "↑";

scrollBtn.id = "scrollTopBtn";

document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.padding = "12px 16px";
scrollBtn.style.background = "#2563eb";
scrollBtn.style.color = "#fff";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,.3)";
scrollBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollBtn.style.display = "block";

    } else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", scrollToTop);