document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    `;
    
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Insert the menu toggle into the nav element
    nav.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        
        if (!isClickInsideNav && navUl.classList.contains('show')) {
            navUl.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 576 && navUl.classList.contains('show')) {
            navUl.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });
    
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance carousel
    setInterval(nextSlide, 4000);
    
    // Make navigation links work
    const navLinks = document.querySelectorAll('nav ul li');
    const sections = ['', 'about', 'services', 'contact'];
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            if (sections[index]) {
                document.getElementById(sections[index]).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking
            if (window.innerWidth <= 576) {
                navUl.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
