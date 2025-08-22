// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load all products
    loadProducts();
    
    // Setup filters and search
    setupFilters();
    setupSearch();
});

let allProducts = [];
let filteredProducts = [];

// Extended product data
const extendedProducts = [
    ...window.ElectroHub.sampleProducts,
    {
        id: 7,
        name: "Tablet Pro 12",
        category: "smartphones",
        price: 799.99,
        originalPrice: 999.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
        description: "Professional tablet with stylus support and powerful processor",
        featured: false
    },
    {
        id: 8,
        name: "Mechanical Keyboard",
        category: "accessories",
        price: 149.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
        description: "Premium mechanical gaming keyboard with RGB lighting",
        featured: false
    },
    {
        id: 9,
        name: "4K Webcam",
        category: "accessories",
        price: 99.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=300&h=300&fit=crop",
        description: "Ultra HD webcam perfect for streaming and video calls",
        featured: false
    },
    {
        id: 10,
        name: "Gaming Mouse",
        category: "gaming",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop",
        description: "High-precision gaming mouse with customizable DPI",
        featured: false
    },
    {
        id: 11,
        name: "Ultrabook 15",
        category: "laptops",
        price: 1299.99,
        originalPrice: 1599.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
        description: "Lightweight ultrabook perfect for professionals",
        featured: false
    },
    {
        id: 12,
        name: "VR Headset",
        category: "gaming",
        price: 399.99,
        originalPrice: 499.99,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=300&h=300&fit=crop",
        description: "Immersive virtual reality headset with wireless tracking",
        featured: false
    }
];

function loadProducts() {
    allProducts = [...extendedProducts];
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    
    if (!productsGrid) return;
    
    // Hide loading and no results
    if (loading) loading.classList.add('hidden');
    if (noResults) noResults.classList.add('hidden');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="bg-dark-secondary rounded-xl overflow-hidden border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 group">
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                     onclick="viewProductDetails(${product.id})">
                ${product.originalPrice > product.price ? 
                    `<div class="absolute top-3 left-3 bg-neon-green text-black px-2 py-1 rounded-full text-xs font-bold">
                        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>` : ''
                }
                <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="bg-dark-bg/80 backdrop-blur-sm p-2 rounded-full hover:bg-neon-blue hover:text-black transition-colors">
                        <i data-lucide="heart" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-neon-blue uppercase tracking-wide">${product.category}</span>
                    <div class="flex text-yellow-400">
                        ${generateStars(4 + Math.random())}
                    </div>
                </div>
                <h3 class="text-lg font-bold mb-2 group-hover:text-neon-blue transition-colors cursor-pointer"
                    onclick="viewProductDetails(${product.id})">${product.name}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-xl font-bold text-neon-blue">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="text-sm text-gray-400 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>` : ''
                        }
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="addToCart(${product.id})" 
                            class="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                        <i data-lucide="shopping-cart" class="w-4 h-4 mr-2"></i>
                        Add to Cart
                    </button>
                    <button onclick="viewProductDetails(${product.id})"
                            class="bg-dark-accent hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
                        <i data-lucide="eye" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons for new content
    lucide.createIcons();
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i data-lucide="star" class="w-4 h-4 fill-current"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i data-lucide="star" class="w-4 h-4 fill-current opacity-50"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i data-lucide="star" class="w-4 h-4"></i>';
    }
    
    return stars;
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    
    let filtered = [...allProducts];
    
    // Category filter
    if (categoryFilter && categoryFilter.value) {
        filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const priceRange = priceFilter.value;
        if (priceRange === '0-100') {
            filtered = filtered.filter(product => product.price <= 100);
        } else if (priceRange === '100-500') {
            filtered = filtered.filter(product => product.price > 100 && product.price <= 500);
        } else if (priceRange === '500-1000') {
            filtered = filtered.filter(product => product.price > 500 && product.price <= 1000);
        } else if (priceRange === '1000+') {
            filtered = filtered.filter(product => product.price > 1000);
        }
    }
    
    // Search filter
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    if (sortFilter && sortFilter.value) {
        const sortBy = sortFilter.value;
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
    }
    
    filteredProducts = filtered;
    displayProducts(filteredProducts);
}

function viewProductDetails(productId) {
    // Store product ID and redirect to product details page
    localStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-details.html';
}

// Make functions available globally
window.addToCart = window.ElectroHub.addToCart;
window.viewProductDetails = viewProductDetails;
