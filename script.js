document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Animated counters
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 200;
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    // Image gallery lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDescription = document.getElementById('lightbox-description');
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxDescription.textContent = img.alt;
            lightbox.style.display = 'flex';
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

    // Scroll-to-top button
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

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.cta-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            if (productCard && e.target.textContent.trim().toLowerCase() === 'add to cart') {
                const productId = productCard.dataset.productId;
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('₹', ''));
                const productImage = productCard.querySelector('img').src;

                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const existingItem = cartItems.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    });
                }

                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                alert(`Added ${productName} to cart`);
            }
        });
    });

    // View Details functionality
    const viewDetailsButtons = document.querySelectorAll('.cta-button');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent.trim().toLowerCase() === 'view details') {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const productId = productCard.dataset.productId;
                    window.location.href = `product-detail.html?product=${productId}`;
                }
            }
        });
    });
});

