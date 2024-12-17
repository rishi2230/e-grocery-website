document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const razorpayRedirectBtn = document.getElementById('razorpay-redirect');

    // Load cart items and display in order summary
    function loadOrderSummary() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let subtotal = 0;

        orderItems.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderItems.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        // Calculate delivery fee
        const deliveryFee = subtotal >= 1000 ? 0 : 50;
        const total = subtotal + deliveryFee;

        // Add delivery fee display
        const deliveryElement = document.createElement('div');
        deliveryElement.classList.add('order-item', 'delivery-fee');
        deliveryElement.innerHTML = `
            <span>Delivery Fee</span>
            <span>${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
        `;
        orderItems.appendChild(deliveryElement);

        // Update total
        orderTotal.textContent = `₹${total.toFixed(2)}`;
    }

    loadOrderSummary();

    // Handle Razorpay redirect
    razorpayRedirectBtn.addEventListener('click', () => {
        // Redirect to Razorpay payment URL
        window.location.href = 'https://razorpay.me/@voyage4730';
    });
});

