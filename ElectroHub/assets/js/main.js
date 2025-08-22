// Global variables
let cart = JSON.parse(localStorage.getItem('electrohub-cart')) || [];
let isCartOpen = false;

// Sample product data
const sampleProducts = [
    {
        id: 1,
        name: "Premium Smartphone X1",
        category: "smartphones",
        price: 899.99,
        originalPrice: 1199.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
        description: "Latest flagship smartphone with advanced camera and AI features",
        featured: true
    },
    {
        id: 2,
        name: "Gaming Laptop Pro",
        category: "laptops",
        price: 1499.99,
        originalPrice: 1899.99,
        image: "https://images.unsplash.com/photo-1525373612132-b3e820b87cea?w=300&h=300&fit=crop",
        description: "High-performance gaming laptop with RTX graphics",
        featured: true
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "accessories",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300&h=300&fit=crop",
        description: "Premium noise-cancelling wireless headphones",
        featured: true
    },
    {
        id: 4,
        name: "Gaming Console Z",
        category: "gaming",
        price: 499.99,
        originalPrice: 599.99,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
        description: "Next-gen gaming console with 4K gaming support",
        featured: true
    },
    {
        id: 5,
        name: "Smart Watch Elite",
        category: "accessories",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        description: "Advanced fitness tracking and smart features",
        featured: false
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        category: "accessories",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
        description: "Portable speaker with amazing sound quality",
        featured: false
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize cart
    updateCartDisplay();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load featured products if on homepage
    if (document.getElementById('products-carousel')) {
        loadFeaturedProducts();
    }
    
    // Setup smooth scrolling for anchor links
    setupSmoothScrolling();
});

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Cart sidebar toggle
    const cartButton = document.getElementById('cart-button');
    const floatingCart = document.getElementById('floating-cart');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartButton) {
        cartButton.addEventListener('click', openCart);
    }
    
    if (floatingCart) {
        floatingCart.addEventListener('click', openCart);
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('section input[type="email"]');
    if (newsletterForm) {
        const subscribeBtn = newsletterForm.nextElementSibling;
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', handleNewsletterSignup);
        }
    }
}

// Cart functionality
function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
        isCartOpen = true;
        document.body.style.overflow = 'hidden';
    }
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        isCartOpen = false;
        document.body.style.overflow = '';
    }
}

function addToCart(productId, quantity = 1) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('electrohub-cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('electrohub-cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('electrohub-cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const floatingCartCount = document.getElementById('floating-cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Calculate totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update cart count badges
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('hidden', totalItems === 0);
    }
    
    if (floatingCartCount) {
        floatingCartCount.textContent = totalItems;
        floatingCartCount.classList.toggle('hidden', totalItems === 0);
    }
    
    // Update cart items display
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-400 text-center py-8">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="flex items-center space-x-3 bg-dark-accent rounded-lg p-3">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate">${item.name}</p>
                        <p class="text-xs text-gray-400">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                                class="w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-xs">
                            -
                        </button>
                        <span class="text-sm w-8 text-center">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                                class="w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center text-xs">
                            +
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update cart total
    if (cartTotal) {
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

// Load featured products for homepage carousel
function loadFeaturedProducts() {
    const carousel = document.getElementById('products-carousel');
    if (!carousel) return;
    
    const featuredProducts = sampleProducts.filter(product => product.featured);
    
    carousel.innerHTML = featuredProducts.map(product => `
        <div class="flex-none w-80 bg-dark-bg rounded-xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 group">
            <div class="relative overflow-hidden rounded-t-xl">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                ${product.originalPrice > product.price ? 
                    `<div class="absolute top-3 left-3 bg-neon-green text-black px-2 py-1 rounded-full text-xs font-bold">
                        ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>` : ''
                }
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold mb-2 group-hover:text-neon-blue transition-colors">${product.name}</h3>
                <p class="text-gray-400 text-sm mb-4">${product.description}</p>
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <span class="text-xl font-bold text-neon-blue">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="text-sm text-gray-400 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>` : ''
                        }
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" 
                        class="w-full bg-neon-blue hover:bg-neon-blue/80 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Setup carousel navigation
    setupCarouselNavigation();
}

// Setup carousel navigation
function setupCarouselNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carousel = document.getElementById('products-carousel');
    
    if (prevBtn && nextBtn && carousel) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -320, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Newsletter signup
function handleNewsletterSignup(e) {
    e.preventDefault();
    const email = e.target.previousElementSibling.value;
    
    if (email && isValidEmail(email)) {
        showNotification('Thank you for subscribing to our newsletter!');
        e.target.previousElementSibling.value = '';
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-neon-green text-black' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Search functionality
function performSearch(query) {
    // This would typically make an API call
    // For demo purposes, we'll filter sample products
    const results = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    return results;
}

// Export functions for use in other files
window.ElectroHub = {
    cart,
    sampleProducts,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    updateCartDisplay,
    showNotification,
    performSearch
};
