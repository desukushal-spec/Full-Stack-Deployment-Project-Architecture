// ======================================
// ShopEasy - Products Page
// products.js
// ======================================

let products = [];
let filteredProducts = [];

// ===============================
// Load Products
// ===============================

async function loadProducts() {

    products = await fetchProducts();

    filteredProducts = [...products];

    displayAllProducts(filteredProducts);

    setupFilters();

}

// ===============================
// Display Products
// ===============================

function displayAllProducts(productList) {

    const container = document.getElementById("products-container");

    if (!container) return;

    if (productList.length === 0) {

        container.innerHTML = `
            <h2 class="text-center">
                No Products Found
            </h2>
        `;

        return;

    }

    container.innerHTML = productList
        .map(product => createProductCard(product))
        .join("");

}

// ===============================
// Search Products
// ===============================

function searchProducts(keyword) {

    keyword = keyword.toLowerCase();

    filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword) ||

        product.description.toLowerCase().includes(keyword)

    );

    displayAllProducts(filteredProducts);

}

// ===============================
// Search Event
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", (e) => {

        searchProducts(e.target.value);

    });

}

// ===============================
// Category Filter
// ===============================

function setupFilters() {

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category = button.dataset.category;

            if (category === "all") {

                filteredProducts = [...products];

            } else {

                filteredProducts = products.filter(product =>

                    product.category === category

                );

            }

            displayAllProducts(filteredProducts);

        });

    });

}

// ===============================
// Initialize Product Page
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    loadProducts();

});
// ======================================
// PRODUCT DETAILS PAGE
// ======================================

// Get product ID from URL
function getProductId() {

    const params = new URLSearchParams(window.location.search);

    return Number(params.get("id"));

}

// Load selected product
async function loadProductDetails() {

    const productId = getProductId();

    if (!productId) return;

    const products = await fetchProducts();

    const product = products.find(item => item.id === productId);

    if (!product) {

        document.querySelector(".product-details").innerHTML =
        `
        <h2>Product not found.</h2>
        `;

        return;

    }

    displayProduct(product);

    loadRelatedProducts(products, product);

}

// ======================================
// DISPLAY PRODUCT
// ======================================

function displayProduct(product) {

    const image = document.getElementById("product-image");
    const name = document.getElementById("product-name");
    const category = document.getElementById("product-category");
    const price = document.getElementById("product-price");
    const description = document.getElementById("product-description");
    const button = document.getElementById("add-to-cart");

    if (!image) return;

    image.src = product.image;
    image.alt = product.name;

    name.textContent = product.name;

    category.textContent =
        product.category.toUpperCase();

    price.textContent =
        formatPrice(product.price);

    description.textContent =
        product.description;

    button.onclick = () => {

        addToCart(product);

    };

}

// ======================================
// RELATED PRODUCTS
// ======================================

function loadRelatedProducts(products, currentProduct) {

    const container =
        document.getElementById("related-products");

    if (!container) return;

    const related = products
        .filter(product =>

            product.category === currentProduct.category &&
            product.id !== currentProduct.id

        )
        .slice(0, 4);

    container.innerHTML = related
        .map(product => createProductCard(product))
        .join("");

}

// ======================================
// INITIALIZE PRODUCT PAGE
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    loadProductDetails();

});