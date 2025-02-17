 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var productsContainer = document.getElementById('products-container');
var products = [];
// Fetch products from API using fetch
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://fakestoreapi.com/products')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log('Fetched products:', data); // Log to verify the data
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching products:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Display product cards
function displayProductCards(products) {
    productsContainer.innerHTML = ''; // Clear previous products
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products available.</p>';
    }
    products.forEach(function (product) {
        var productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = "\n            <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n            <h2>").concat(product.title, "</h2>\n            <p>").concat(product.category, "</p>\n            <p>$").concat(product.price, "</p>\n            <button class=\"view-details-btn\" data-id=\"").concat(product.id, "\">View Details</button>\n            <button class=\"add-to-cart-btn\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n        ");
        productsContainer.appendChild(productCard);
    });
    // Open Product Details in a New Tab
    document.querySelectorAll('.view-details-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            var productId = event.target.getAttribute('data-id');
            window.open("product.html?id=".concat(productId), '_blank');
        });
    });
    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            var productId = event.target.getAttribute('data-id');
            var product = products.find(function (p) { return p.id.toString() === productId; });
            if (product) {
                addToCart(product);
            }
        });
    });
}
// Function to add items to cart
function addToCart(product) {
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
}
// Search functionality
var searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', function () {
    var query = searchBar.value.toLowerCase();
    var filteredProducts = products.filter(function (product) {
        return product.title.toLowerCase().includes(query);
    });
    displayProductCards(filteredProducts);
});
// Category filter functionality
var categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', function () {
    var category = categoryFilter.value;
    var filteredProducts = products.filter(function (product) {
        return category ? product.category === category : true;
    });
    displayProductCards(filteredProducts);
});
// Initialize products on page load
function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchProducts()];
                case 1:
                    products = _a.sent();
                    displayProductCards(products);
                    return [2 /*return*/];
            }
        });
    });
}
// Open Cart in New Tab
(_a = document.getElementById('cart-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    window.open('cart.html', '_blank');
});
// Start the initialization process
init();
