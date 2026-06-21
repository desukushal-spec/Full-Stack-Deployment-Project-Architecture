// ===============================
// Local Storage Helper Functions
// ===============================

const STORAGE_KEY = "shoppingCart";

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {

    let cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    alert(`${product.name} added to cart!`);

}

// Remove product
function removeFromCart(id) {

    let cart = getCart().filter(item => item.id !== id);

    saveCart(cart);

    updateCartCount();

}

// Update Quantity
function updateQuantity(id, action) {

    let cart = getCart();

    cart = cart.map(item => {

        if (item.id === id) {

            if (action === "increase") {

                item.quantity++;

            } else if (action === "decrease" && item.quantity > 1) {

                item.quantity--;

            }

        }

        return item;

    });

    saveCart(cart);

}

// Clear Cart
function clearCart() {

    localStorage.removeItem(STORAGE_KEY);

    updateCartCount();

}

// Cart Count
function updateCartCount() {

    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    const cart = getCart();

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    countElement.textContent = total;

}

document.addEventListener("DOMContentLoaded", updateCartCount);