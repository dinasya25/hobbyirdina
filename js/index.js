// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage + '-page').classList.add('active');
        });
    });

    // Carousel functionality
    const carouselImages = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;

    function showImage(index) {
        carouselImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        carouselImages[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        showImage(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
        showImage(currentImageIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentImageIndex = index;
            showImage(currentImageIndex);
        });
    });

    setInterval(nextImage, 5000);

    const formBtns = document.querySelectorAll('.form-btn');
    formBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent;
            alert(`${btnText} clicked! You can implement actual form functionality here.`);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

function openExternalLink(url) {
    window.open(url, '_blank');
}

// Touch support
let touchStartX = 0;
let touchEndX = 0;
const carouselContainer = document.querySelector('.carousel-container');

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    }
}

// Keyboard nav
document.addEventListener('keydown', function(e) {
    const currentPage = document.querySelector('.page.active').id;
    if (currentPage === 'story-page') {
        if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
    }
    if (e.key >= '1' && e.key <= '4') {
        const pageIndex = parseInt(e.key) - 1;
        const navBtn = document.querySelectorAll('.nav-btn')[pageIndex];
        if (navBtn) navBtn.click();
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.sketch-item, .timeline-item, .social-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
