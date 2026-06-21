// ===============================
// Fetch Products
// ===============================

async function fetchProducts() {

    try {

        const response = await fetch("data/products.json");

        const products = await response.json();

        return products;

    }

    catch(error){

        console.error("Unable to load products.", error);

        return [];

    }

}

// ===============================
// Currency
// ===============================

function formatPrice(price){

    return "₹" + price.toLocaleString("en-IN");

}

// ===============================
// Star Rating
// ===============================

function createStars(rating){

    let stars = "";

    for(let i=1;i<=5;i++){

        if(i<=Math.floor(rating)){

            stars += `<i class="fas fa-star"></i>`;

        }

        else{

            stars += `<i class="far fa-star"></i>`;

        }

    }

    return stars;

}

// ===============================
// Product Card
// ===============================

function createProductCard(product){

    return `

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h3>${product.name}</h3>

<p class="product-category">${product.category}</p>

<div class="rating">

${createStars(product.rating)}

</div>

<h2 class="product-price">

${formatPrice(product.price)}

</h2>

<p class="product-description">

${product.description}

</p>

<div class="product-buttons">

<a href="product.html?id=${product.id}" class="btn view-btn">

View

</a>

<button class="btn add-cart"

onclick='addToCart(${JSON.stringify(product)})'>

Add To Cart

</button>

</div>

</div>

</div>

`;

}