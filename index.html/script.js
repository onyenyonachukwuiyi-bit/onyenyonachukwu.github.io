// ============================================
// ATARI FARMS - Frontend JavaScript
// ============================================

const products = [
    // Atari Fresh Products
    {
        id: 1,
        name: "Fresh Avocados (Crate)",
        brand: "atari-fresh",
        category: "Produce",
        price: 45000,
        originalPrice: 55000,
        image: "https://via.placeholder.com/300x300?text=Fresh+Avocados",
        rating: 4.8,
        reviews: 234,
        badge: "Popular",
        description: "Premium fresh avocados directly from our smallholder farmer network",
        features: ["Freshly harvested", "Organic", "Locally sourced", "Fair trade"]
    },
    {
        id: 2,
        name: "Organic Vegetables Bundle",
        brand: "atari-fresh",
        category: "Produce",
        price: 35000,
        originalPrice: 45000,
        image: "https://via.placeholder.com/300x300?text=Vegetables",
        rating: 4.6,
        reviews: 189,
        badge: "New",
        description: "Fresh organic vegetables sourced from certified farmers",
        features: ["Mixed vegetables", "Organic certified", "Weekly supply", "High quality"]
    },
    {
        id: 3,
        name: "Fresh Fruit Selection",
        brand: "atari-fresh",
        category: "Produce",
        price: 40000,
        originalPrice: 50000,
        image: "https://via.placeholder.com/300x300?text=Fresh+Fruits",
        rating: 4.7,
        reviews: 312,
        badge: "Best Seller",
        description: "Seasonal fresh fruits in premium condition",
        features: ["Seasonal selection", "Ripe & ready", "No pesticides", "Direct from farmers"]
    },
    // Avoglow Products
    {
        id: 4,
        name: "Cosmetic-Grade Avocado Oil (500ml)",
        brand: "avoglow",
        category: "Cosmetics",
        price: 65000,
        originalPrice: 85000,
        image: "https://via.placeholder.com/300x300?text=Avocado+Oil",
        rating: 4.9,
        reviews: 567,
        badge: "Premium",
        description: "Pure, cold-pressed cosmetic-grade avocado oil for face and body",
        features: ["Cold-pressed", "100% pure", "No additives", "Certified organic"]
    },
    {
        id: 5,
        name: "Root & Revive Hair Oil (250ml)",
        brand: "avoglow",
        category: "Hair Care",
        price: 55000,
        originalPrice: 70000,
        image: "https://via.placeholder.com/300x300?text=Hair+Oil",
        rating: 4.8,
        reviews: 423,
        badge: "Top Seller",
        description: "Intensive hair restoration oil with avocado and natural botanicals",
        features: ["Deep nourishment", "Scalp health", "Hair strengthening", "Natural formula"]
    },
    {
        id: 6,
        name: "Intensive Hair Butter (200g)",
        brand: "avoglow",
        category: "Hair Care",
        price: 45000,
        originalPrice: 60000,
        image: "https://via.placeholder.com/300x300?text=Hair+Butter",
        rating: 4.7,
        reviews: 298,
        badge: "Popular",
        description: "Rich, creamy hair butter for deep conditioning and repair",
        features: ["Deep conditioning", "Frizz control", "Heat protection", "Shine enhancement"]
    },
    {
        id: 7,
        name: "AvoChai Wellness Tea (50g)",
        brand: "avoglow",
        category: "Wellness",
        price: 25000,
        originalPrice: 35000,
        image: "https://via.placeholder.com/300x300?text=AvoChai+Tea",
        rating: 4.6,
        reviews: 156,
        badge: "New",
        description: "Innovative avocado seed wellness tea for holistic health",
        features: ["Antioxidant rich", "Organic", "Sustainable", "Health boosting"]
    },
    {
        id: 8,
        name: "Avocado Seed Powder (100g)",
        brand: "avoglow",
        category: "Wellness",
        price: 30000,
        originalPrice: 40000,
        image: "https://via.placeholder.com/300x300?text=Seed+Powder",
        rating: 4.5,
        reviews: 87,
        badge: "Organic",
        description: "Pure avocado seed powder for nutrition and wellness",
        features: ["100% natural", "High nutrient density", "Superfood", "Versatile use"]
    },
    {
        id: 9,
        name: "Avocado-Rosemary Oil (250ml)",
        brand: "avoglow",
        category: "Cosmetics",
        price: 55000,
        originalPrice: 70000,
        image: "https://via.placeholder.com/300x300?text=Avocado+Rosemary",
        rating: 4.8,
        reviews: 203,
        badge: "Premium",
        description: "Luxurious blend of avocado and rosemary oils for skincare",
        features: ["Skin rejuvenation", "Anti-aging", "Natural blend", "Professional quality"]
    },
    {
        id: 10,
        name: "Avocado-Lavender Oil (250ml)",
        brand: "avoglow",
        category: "Cosmetics",
        price: 55000,
        originalPrice: 70000,
        image: "https://via.placeholder.com/300x300?text=Avocado+Lavender",
        rating: 4.7,
        reviews: 178,
        badge: "Relaxing",
        description: "Calming blend of avocado and lavender for relaxation and skincare",
        features: ["Calming aroma", "Skin soothing", "Aromatherapy", "Luxury blend"]
    }
];

let cart = JSON.parse(localStorage.getItem('atariFarmsCart')) || [];
let currentProduct = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartCount();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.addEventListener('click', function(e) {
        if (e.target.id === 'cartModal') closeCart();
        if (e.target.id === 'productModal') closeProductModal();
    });
}

// Render products
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">No products found.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price">UGX ${product.price.toLocaleString()}</span>
                    ${product.originalPrice !== product.price ? `
                        <span class="original-price">UGX ${product.originalPrice.toLocaleString()}</span>
                    ` : ''}
                </div>
                <div class="product-actions">
                    <button class="product-actions" onclick="openProductModal(${product.id})" style="background: linear-gradient(135deg, #1b6f3f, #2d9b6f); color: white; flex: 1; padding: 12px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600;">
                        View Details
                    </button>
                    <button class="product-actions" onclick="handleQuickAdd(${product.id})" style="background: #e8f5f1; color: #1b6f3f; flex: 1; padding: 12px; border-radius: 8px; border: 2px solid #1b6f3f; cursor: pointer; font-weight: 600;">
                        Quick Add
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function renderStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rating)) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    return starsHTML;
}

// Filter products
function filterProducts() {
    const brand = document.getElementById('brandFilter').value;
    let filtered = products;

    if (brand) {
        filtered = products.filter(p => p.brand === brand);
    }

    renderProducts(filtered);
}

// Sort products
function sortProducts() {
    const sortValue = document.getElementById('sortFilter').value;
    let sorted = [...products];

    switch (sortValue) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sorted.reverse();
            break;
    }

    renderProducts(sorted);
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    currentProduct = product;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = `UGX ${product.price.toLocaleString()}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalRating').innerHTML = renderStars(product.rating);
    document.getElementById('modalReviews').textContent = `(${product.reviews} reviews)`;
    
    if (product.originalPrice !== product.price) {
        document.getElementById('modalOriginalPrice').textContent = `Was UGX ${product.originalPrice.toLocaleString()}`;
    }
    
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    document.getElementById('quantityInput').value = 1;
    document.getElementById('productModal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    currentProduct = null;
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart
function addToCart() {
    if (!currentProduct) return;
    const quantity = parseInt(document.getElementById('quantityInput').value);
    addToCartInternal(currentProduct, quantity);
    closeProductModal();
}

function addToCartInternal(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

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

    saveCart();
    updateCartCount();
    showNotification('Item added to cart!');
}

function handleQuickAdd(productId) {
    const product = products.find(p => p.id === productId);
    addToCartInternal(product, 1);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInUp 0.3s ease;
    `;
    notification.innerHTML = '<i class="fas fa-check"></i> ' + message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Save cart
function saveCart() {
    localStorage.setItem('atariFarmsCart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Toggle cart
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal.style.display === 'block') {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    renderCartItems();
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        updateCartTotals();
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">UGX ${(item.price * item.quantity).toLocaleString()}</div>
                <small>Qty: ${item.quantity}</small>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotals();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100000 ? 0 : 15000;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `UGX ${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `UGX ${shipping.toLocaleString()}`;
    document.getElementById('tax').textContent = `UGX ${tax.toLocaleString()}`;
    document.getElementById('total').textContent = `UGX ${total.toLocaleString()}`;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const checkoutData = {
        items: cart,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('atariFarmsCheckout', JSON.stringify(checkoutData));
    showNotification('Proceeding to checkout...');
    
    setTimeout(() => {
        alert('Checkout feature coming soon!\nItems: ' + cart.length + '\nTotal: UGX ' + document.getElementById('total').textContent);
    }, 1000);
}

// Search functionality
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function liveSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

function performSearch() {
    liveSearch();
    document.getElementById('searchBar').classList.remove('active');
}

// Mobile menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

function closeMenu() {
    document.getElementById('navMenu').style.display = 'none';
}

// Toggle user menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu && userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    }
}

// Contact form
function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    showNotification('Message sent successfully!');
    form.reset();
}

// Newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    showNotification('Thank you for subscribing!');
    form.reset();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
        }
    });
});