// Product details page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Load product details
    loadProductDetails();
    
    // Setup quantity controls
    setupQuantityControls();
    
    // Setup image gallery
    setupImageGallery();
    
    // Load related products
    loadRelatedProducts();
});

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

function loadProductDetails() {
    const productId = parseInt(localStorage.getItem('selectedProductId')) || 1;
    const product = extendedProducts.find(p => p.id === productId);
    
    if (!product) {
        // Redirect to products page if product not found
        window.location.href = 'products.html';
        return;
    }
    
    // Update page elements
    updateProductInfo(product);
    updateBreadcrumb(product);
}

function updateProductInfo(product) {
    // Update title and meta
    document.title = `${product.name} - ElectroHub`;
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Update main image
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }
    
    // Update product title
    const title = document.getElementById('product-title');
    if (title) {
        title.textContent = product.name;
    }
    
    // Update product price
    const price = document.getElementById('product-price');
    if (price) {
        price.textContent = `$${product.price.toFixed(2)}`;
        
        // Update original price if discounted
        const originalPriceElement = price.nextElementSibling;
        const discountBadge = originalPriceElement ? originalPriceElement.nextElementSibling : null;
        
        if (product.originalPrice > product.price) {
            if (originalPriceElement) {
                originalPriceElement.textContent = `$${product.originalPrice.toFixed(2)}`;
            }
            if (discountBadge) {
                const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);
                discountBadge.textContent = `${discountPercent}% OFF`;
            }
        }
    }
    
    // Update description
    const description = document.getElementById('product-description');
    if (description) {
        description.textContent = getExtendedDescription(product);
    }
    
    // Setup add to cart functionality
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.onclick = function() {
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            window.ElectroHub.addToCart(product.id, quantity);
        };
    }
}

function getExtendedDescription(product) {
    const descriptions = {
        1: "Experience the pinnacle of mobile technology with the Premium Smartphone X1. This flagship device combines cutting-edge AI processing, professional-grade photography capabilities, and all-day battery life in a sleek, premium design. Features include a 108MP triple-camera system, 5G connectivity, wireless charging, and the latest security features.",
        2: "Dominate the competition with the Gaming Laptop Pro. Powered by the latest RTX graphics and high-performance processors, this laptop delivers exceptional gaming performance and content creation capabilities. Features a 144Hz display, advanced cooling system, customizable RGB keyboard, and premium build quality.",
        3: "Immerse yourself in crystal-clear audio with these premium wireless headphones. Advanced noise-cancellation technology blocks out distractions while delivering rich, detailed sound. Perfect for music, calls, and content consumption with up to 30 hours of battery life and quick charging.",
        4: "Step into the next generation of gaming with Console Z. Experience lightning-fast loading times, stunning 4K visuals, and immersive gameplay. Features backward compatibility, ray tracing support, and exclusive game titles that push the boundaries of interactive entertainment.",
        5: "Stay connected and healthy with the Smart Watch Elite. Advanced fitness tracking, heart rate monitoring, GPS, and smart notifications keep you informed and motivated throughout your day. Features include sleep tracking, workout detection, and seamless smartphone integration.",
        6: "Take your music anywhere with this portable Bluetooth speaker. Despite its compact size, it delivers surprisingly powerful and clear sound. Waterproof design makes it perfect for outdoor adventures, while the long-lasting battery ensures the party never stops."
    };
    
    return descriptions[product.id] || product.description;
}

function updateBreadcrumb(product) {
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
}

function setupQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentValue + 1;
        });
        
        quantityInput.addEventListener('change', () => {
            const value = parseInt(quantityInput.value);
            if (isNaN(value) || value < 1) {
                quantityInput.value = 1;
            }
        });
    }
}

function setupImageGallery() {
    const thumbnails = document.querySelectorAll('[class*="border-2"]');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Remove active state from all thumbnails
            thumbnails.forEach(thumb => {
                thumb.classList.remove('border-neon-blue');
                thumb.classList.add('border-transparent', 'hover:border-neon-blue/50');
            });
            
            // Add active state to clicked thumbnail
            thumbnail.classList.remove('border-transparent', 'hover:border-neon-blue/50');
            thumbnail.classList.add('border-neon-blue');
            
            // Update main image
            if (mainImage) {
                const img = thumbnail.querySelector('img');
                if (img) {
                    mainImage.src = img.src.replace('150x150', '600x600');
                }
            }
        });
    });
    
    // Add click-to-zoom functionality
    if (mainImage) {
        mainImage.addEventListener('click', () => {
            // Simple zoom implementation - you could use a modal or lightbox here
            const isZoomed = mainImage.style.transform === 'scale(1.5)';
            mainImage.style.transform = isZoomed ? 'scale(1)' : 'scale(1.5)';
            mainImage.style.cursor = isZoomed ? 'zoom-in' : 'zoom-out';
        });
    }
}

function loadRelatedProducts() {
    const currentProductId = parseInt(localStorage.getItem('selectedProductId')) || 1;
    const currentProduct = extendedProducts.find(p => p.id === currentProductId);
    
    if (!currentProduct) return;
    
    // Get related products from the same category, excluding current product
    const relatedProducts = extendedProducts
        .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
        .slice(0, 4);
    
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p class="text-center text-gray-400 col-span-full">No related products found.</p>';
        return;
    }
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="bg-dark-bg rounded-xl overflow-hidden border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 group cursor-pointer"
             onclick="viewRelatedProduct(${product.id})">
            <div class="relative overflow-hidden">
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
                <button onclick="event.stopPropagation(); addToCart(${product.id})" 
                        class="w-full bg-neon-blue hover:bg-neon-blue/80 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

function viewRelatedProduct(productId) {
    localStorage.setItem('selectedProductId', productId);
    window.location.reload();
}

// Make functions available globally
window.addToCart = window.ElectroHub.addToCart;
window.viewRelatedProduct = viewRelatedProduct;
