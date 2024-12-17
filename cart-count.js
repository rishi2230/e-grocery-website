function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

document.addEventListener('DOMContentLoaded', updateCartCount);

// Update cart count when localStorage changes
window.addEventListener('storage', function(e) {
    if (e.key === 'cartItems') {
        updateCartCount();
    }
});

