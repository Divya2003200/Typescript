
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
}

const productsContainer = document.getElementById('products-container')!;
let products: Product[] = [];

 
async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data); // Log to verify the data
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

 
function displayProductCards(products: Product[]): void {
    productsContainer.innerHTML = ''; 
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products available.</p>';
    }
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.category}</p>
            <p>$${product.price}</p>
            <button class="view-details-btn" data-id="${product.id}">View Details</button>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });

     
    document.querySelectorAll('.view-details-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = (event.target as HTMLButtonElement).getAttribute('data-id');
            window.open(`product.html?id=${productId}`, '_blank');
        });
    });

 
    document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = (event.target as HTMLButtonElement).getAttribute('data-id');
            let product = products.find(p => p.id.toString() === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}

 
function addToCart(product: Product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}

 
const searchBar = document.getElementById('search-bar') as HTMLInputElement;
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProductCards(filteredProducts);
});

 
const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
categoryFilter.addEventListener('change', () => {
    const category = categoryFilter.value;
    const filteredProducts = products.filter(product =>
        category ? product.category === category : true
    );
    displayProductCards(filteredProducts);
});

 
async function init() {
    products = await fetchProducts();
    displayProductCards(products);
}

 
document.getElementById('cart-btn')?.addEventListener('click', () => {
    window.open('cart.html', '_blank');
});

 
init();
