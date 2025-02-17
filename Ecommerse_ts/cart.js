/// <reference lib="es2015.promise" />
var _a;
let cart = [];

function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("total-price");
    if (!cartContainer || !cartTotal)
        return;
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const price = Number(item.price);
        if (isNaN(price)) {
            console.error("Invalid price for item:", item);
            return;
        }
        const itemTotal = price * item.quantity;
        total += itemTotal;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.title} - $${price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    cartTotal.textContent = total.toFixed(2);
    saveCart();
}
 
function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    }
    else {
        cart.splice(index, 1);
    }
    updateCart();
}
 
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
 
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
   
    let existingProduct;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            existingProduct = cart[i];
            break;
        }
    }
    if (existingProduct) {
        existingProduct.quantity += 1;  
    }
    else {
        cart.push({ id: product.id, title: product.title, price: product.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}
 
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Order placed! Total amount: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
}
 
(_a = document.getElementById("checkout-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", checkout);
 
window.onload = loadCart;
