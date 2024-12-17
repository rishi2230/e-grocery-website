document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Here you would typically send a request to your server to create a new user account
        // For this example, we'll just simulate a successful signup
        console.log('Signup attempt:', { name, email, password });
        alert('Account created successfully! Redirecting to login page...');
        // Redirect to login page
        window.location.href = 'login.html';
    });
});