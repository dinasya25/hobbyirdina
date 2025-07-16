// Home page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects to navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.1)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Microphone hover animation
    const microphone = document.querySelector('.microphone');
    if (microphone) {
        microphone.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        microphone.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add parallax effect to background circles
    document.addEventListener('mousemove', function(e) {
        const circles = document.querySelectorAll('.bg-circle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * speed * 10;
            const yOffset = (y - 0.5) * speed * 10;
            
            circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});
