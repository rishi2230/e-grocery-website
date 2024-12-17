document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            updateCartSummary();
            disableCheckout();
        } else {
            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price">₹${item.price.toFixed(2)}</p>
                        <div class="item-quantity">
                            <button class="decrease-quantity" data-id="${item.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="increase-quantity" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            updateCartSummary();
            enableCheckout();
        }
        updateCartCount();
    }

    function updateCartSummary() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0;
        const total = subtotal + shipping;

        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    function handleQuantityChange(id, change) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity += change;
            if (cartItems[itemIndex].quantity < 1) {
                cartItems.splice(itemIndex, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }
    }

    function enableCheckout() {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('disabled');
    }

    function disableCheckout() {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('disabled');
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('decrease-quantity')) {
            handleQuantityChange(e.target.dataset.id, -1);
        } else if (e.target.classList.contains('increase-quantity')) {
            handleQuantityChange(e.target.dataset.id, 1);
        } else if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const id = e.target.dataset.id || e.target.closest('.remove-item').dataset.id;
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.id !== id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'number') {
            const id = e.target.dataset.id;
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const itemIndex = cartItems.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    cartItems[itemIndex].quantity = newQuantity;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartSummary();
                    updateCartCount();
                }
            } else {
                e.target.value = 1;
            }
        }
    });

    checkoutBtn.addEventListener('click', (e) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            e.preventDefault();
            alert('Your cart is empty. Add some items before checking out.');
        }
    });

    renderCartItems();
});
