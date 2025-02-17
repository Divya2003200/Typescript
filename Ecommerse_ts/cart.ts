/// <reference lib="es2015.promise" />

interface Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

let cart: Product[] = [];

 
function loadCart(): void {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart) as Product[];
    }
    updateCart();
}

 
function saveCart(): void {
    localStorage.setItem("cart", JSON.stringify(cart));
}

 
function updateCart(): void {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("total-price");

    if (!cartContainer || !cartTotal) return;

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

 
function updateQuantity(index: number, change: number): void {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

 
function removeFromCart(index: number): void {
    cart.splice(index, 1);
    updateCart();
}
 function addToCart(product: Product) {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

 
    let existingProduct: Product | undefined;

for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
        existingProduct = cart[i];
        break;
    }
}

if (existingProduct) {
    existingProduct.quantity += 1;
} else {
    cart.push({ id: product.id, title: product.title, price: product.price, quantity: 1 });
}

localStorage.setItem('cart', JSON.stringify(cart));
alert('Item added to cart!');

}



function checkout(): void {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Order placed! Total amount: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
}


document.getElementById("checkout-btn")?.addEventListener("click", checkout);

 
window.onload = loadCart;
