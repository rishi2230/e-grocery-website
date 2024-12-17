document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (!productId) {
        console.error('No product ID specified');
        return;
    }

    const productInfo = document.querySelector(`.product-info[data-product-id="${productId}"]`);

    if (!productInfo) {
        console.error('Product not found');
        return;
    }

    // Hide all other product info sections
    document.querySelectorAll('.product-info').forEach(el => {
        if (el !== productInfo) {
            el.style.display = 'none';
        }
    });

    // Update page title
    const productName = productInfo.querySelector('#product-name').textContent;
    document.title = `${productName} - VOYAGE`;

    // Add to cart functionality
    const addToCartBtn = productInfo.querySelector('#add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(productInfo.querySelector('#quantity').value);
        const price = parseFloat(productInfo.querySelector('#product-price').textContent.replace('₹', ''));
        const image = productInfo.querySelector('#product-image').src;
        const product = {
            id: productId,
            name: productName,
            price: price,
            quantity: quantity,
            image: image
        };
        addToCart(product);
        alert(`Added ${quantity} ${productName}(s) to cart`);
        updateCartCount();
    });

    // Add to wishlist functionality
    const addToWishlistBtn = productInfo.querySelector('#add-to-wishlist');
    addToWishlistBtn.addEventListener('click', () => {
        const price = parseFloat(productInfo.querySelector('#product-price').textContent.replace('₹', ''));
        const image = productInfo.querySelector('#product-image').src;
        const product = {
            id: productId,
            name: productName,
            price: price,
            image: image
        };
        addToWishlist(product);
        alert(`Added ${productName} to wishlist`);
        addToWishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
        addToWishlistBtn.disabled = true;
    });
});

// Function to add item to cart
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cartItems.push(product);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Function to add item to wishlist
function addToWishlist(product) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const existingItem = wishlistItems.find(item => item.id === product.id);
    if (!existingItem) {
        wishlistItems.push(product);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
}

// Function to update cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Call updateCartCount when the page loads
updateCartCount();

// Custom cursor (from script.js)
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Scroll-to-top button (from script.js)
const scrollToTopBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

