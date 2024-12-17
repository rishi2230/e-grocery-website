document.addEventListener('DOMContentLoaded', () => {
    const supportForm = document.getElementById('support-form');
    const liveChatBtn = document.getElementById('live-chat-btn');

    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate form submission
        alert('Thank you for your message. We will get back to you soon!');
        supportForm.reset();
    });

    liveChatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Simulate opening a live chat window
        alert('Live chat feature coming soon!');
    });

    // Add hover effect to support cards
    const supportCards = document.querySelectorAll('.support-card');
    supportCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});