document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const forgotPasswordLink = document.getElementById('forgot-password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Here you would typically send a request to your server to authenticate the user
        // For this example, we'll just simulate a successful login
        console.log('Login attempt:', { email, password });
        alert('Login successful! Redirecting to dashboard...');
        // Redirect to home page or dashboard
        window.location.href = 'index.html';
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically implement a forgot password flow
        // For this example, we'll just show an alert
        alert('Forgot password functionality coming soon!');
    });
});