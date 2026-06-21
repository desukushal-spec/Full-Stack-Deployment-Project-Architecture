// ======================================
// ShopEasy - Home Page JavaScript
// app.js
// ======================================

let allProducts = [];

// ===============================
// Load Featured Products
// ===============================

async function loadFeaturedProducts() {

    allProducts = await fetchProducts();

    const container = document.getElementById("featured-products");

    if (!container) return;

    // Display first 8 products
    const featured = allProducts.slice(0, 8);

    displayProducts(featured);
}

// ===============================
// Display Products
// ===============================

function displayProducts(products) {

    const container = document.getElementById("featured-products");

    if (!container) return;

    if (products.length === 0) {

        container.innerHTML = `
            <h2>No Products Found</h2>
        `;

        return;
    }

    container.innerHTML = products
        .map(product => createProductCard(product))
        .join("");

}

// ===============================
// Search Products
// ===============================

function searchProducts(keyword) {

    keyword = keyword.toLowerCase();

    const filtered = allProducts.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword) ||

        product.description.toLowerCase().includes(keyword)

    );

    displayProducts(filtered);

}

// ===============================
// Search Input Event
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", (e) => {

        searchProducts(e.target.value);

    });

}

// ===============================
// Initialize Home Page
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadFeaturedProducts();

    updateCartCount();

});
