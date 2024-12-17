document.addEventListener('DOMContentLoaded', () => {
    const wishlistGrid = document.getElementById('wishlist-items');

    function renderWishlistItems() {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        wishlistGrid.innerHTML = '';
        if (wishlistItems.length === 0) {
            wishlistGrid.innerHTML = '<p>Your wishlist is empty.</p>';
        } else {
            wishlistItems.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-item';
                wishlistItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price.toFixed(2)}</p>
                    <div class="actions">
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                        <button class="remove-from-wishlist" data-id="${item.id}">Remove</button>
                    </div>
                `;
                wishlistGrid.appendChild(wishlistItem);
            });
        }
    }

    renderWishlistItems();

    wishlistGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = e.target.getAttribute('data-id');
            const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            const item = wishlistItems.find(item => item.id === itemId);
            if (item) {
                addToCart({ ...item, quantity: 1 });
                alert(`Added ${item.name} to cart!`);
            }
        } else if (e.target.classList.contains('remove-from-wishlist')) {
            const itemId = e.target.getAttribute('data-id');
            let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            wishlistItems = wishlistItems.filter(item => item.id !== itemId);
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
            renderWishlistItems();
        }
    });
});

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

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }
}

