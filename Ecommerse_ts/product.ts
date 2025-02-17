interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
}

 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    fetchProductDetails(Number(productId));
} else {
    alert('Product not found!');
}

 
async function fetchProductDetails(productId: number) {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product: Product = await response.json();

    displayProductDetails(product);
}

 
function displayProductDetails(product: Product) {
    const productDetailsContainer = document.getElementById('product-details-container')!;
    
    productDetailsContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h1>${product.title}</h1>
        <p>${product.category}</p>
        <p>${product.description}</p>
        <p><strong>$${product.price}</strong></p>
    `;
}
