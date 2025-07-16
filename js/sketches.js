// Sketches page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to sketch items
    const sketchItems = document.querySelectorAll('.sketch-item');
    
    sketchItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.sketch-overlay');
            const label = this.querySelector('.sketch-label');
            
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
            
            if (label) {
                label.style.opacity = '0';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.sketch-overlay');
            const label = this.querySelector('.sketch-label');
            
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(100%)';
            }
            
            if (label) {
                label.style.opacity = '1';
            }
            
            // Reset transform
            this.style.transform = 'scale(1)';
        });
    });
    
    // Intersection Observer for scroll animations
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
    
    // Observe sketch items for scroll animations
    sketchItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add parallax effect to decorative dots
    document.addEventListener('mousemove', function(e) {
        const dots = document.querySelectorAll('.decorative-dot');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        dots.forEach((dot, index) => {
            const speed = (index % 2 + 1) * 0.3;
            const xOffset = (x - 0.5) * speed * 5;
            const yOffset = (y - 0.5) * speed * 5;
            
            dot.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});
