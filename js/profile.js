// Profile/Story page JavaScript functionality
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    const carouselImages = document.querySelectorAll('.carousel-image');
    
    function showImage(index) {
        // Hide all images
        carouselImages.forEach(img => img.classList.remove('active'));
        
        // Show current image
        if (carouselImages[index]) {
            carouselImages[index].classList.add('active');
        }
    }
    
    // Auto-play carousel
    setInterval(function() {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        showImage(currentImageIndex);
    }, 5000); // Change image every 5 seconds
    
    // Touch/swipe support for mobile carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    nextImage();
                } else {
                    // Swipe right - previous image
                    prevImage();
                }
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.story-main-content, .experience-section, .safari-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

function nextImage() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    showImage(currentImageIndex);
}

function prevImage() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(currentImageIndex);
}

function showImage(index) {
    const carouselImages = document.querySelectorAll('.carousel-image');
    // Hide all images
    carouselImages.forEach(img => img.classList.remove('active'));
    
    // Show current image
    if (carouselImages[index]) {
        carouselImages[index].classList.add('active');
    }
}
