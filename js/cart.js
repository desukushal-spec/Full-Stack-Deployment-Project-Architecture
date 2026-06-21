// ======================================
// ShopEasy - Cart Page
// cart.js
// ======================================

// Load cart when page opens
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadCart();
});

// ===============================
// Load Cart
// ===============================

function loadCart() {

    const cart = getCart();

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any products yet.</p>
                <a href="products.html" class="btn">
                    Continue Shopping
                </a>
            </div>
        `;

        updateSummary([]);

        return;

    }

    cartContainer.innerHTML = cart.map(item => createCartItem(item)).join("");

    updateSummary(cart);

}

// ===============================
// Create Cart Item
// ===============================

function createCartItem(item) {

    return `

<div class="cart-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="cart-item-info">

        <h3>${item.name}</h3>

        <p>${item.category}</p>

        <div class="cart-price">
            ${formatPrice(item.price)}
        </div>

        <div class="quantity">

            <button onclick="changeQuantity(${item.id}, -1)">
                -
            </button>

            <span>${item.quantity}</span>

            <button onclick="changeQuantity(${item.id}, 1)">
                +
            </button>

        </div>

        <button
            class="remove-btn"
            onclick="deleteItem(${item.id})">

            Remove

        </button>

    </div>

</div>

`;

}

// ===============================
// Change Quantity
// ===============================

function changeQuantity(id, value) {

    let cart = getCart();

    cart = cart.map(item => {

        if (item.id === id) {

            item.quantity += value;

            if (item.quantity < 1)
                item.quantity = 1;

        }

        return item;

    });

    saveCart(cart);

    updateCartCount();

    loadCart();

}

// ===============================
// Delete Item
// ===============================

function deleteItem(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);

    updateCartCount();

    loadCart();

}

// ===============================
// Cart Summary
// ===============================

function updateSummary(cart) {

    const totalItems = document.getElementById("total-items");

    const subtotal = document.getElementById("subtotal");

    const totalPrice = document.getElementById("total-price");

    if (!totalItems) return;

    const items = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    totalItems.textContent = items;

    subtotal.textContent = formatPrice(total);

    totalPrice.textContent = formatPrice(total);

}

// ===============================
// Clear Cart
// ===============================

const clearBtn = document.getElementById("clear-cart-btn");

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        if (confirm("Clear the cart?")) {

            clearCart();

            loadCart();

        }

    });

}

// ===============================
// Checkout
// ===============================

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        const cart = getCart();

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        alert("Thank you for shopping with ShopEasy!");

        clearCart();

        loadCart();

    });

}