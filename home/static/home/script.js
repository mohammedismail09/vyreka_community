// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Counter animation logic when stats section is visible
            if (entry.target.classList.contains('counter') && !entry.target.dataset.animated) {
                entry.target.dataset.animated = true;
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                
                let currentCount = 0;
                const timer = setInterval(() => {
                    currentCount += increment;
                    if (currentCount >= target) {
                        entry.target.innerText = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.innerText = Math.floor(currentCount) + '+';
                    }
                }, 16);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal, .counter').forEach(el => observer.observe(el));

// --- THEME TOGGLE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        themeIcon.innerText = 'dark_mode';
        
        // --- LIGHT MODE OVERRIDES ---
        document.body.style.backgroundColor = '#f8fafc'; 
        document.body.style.color = '#0f172a'; 
        
        // Section Colors
        document.querySelector('header').style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        document.querySelector('header').style.borderColor = '#e2e8f0';
        document.querySelector('.stats-section').style.backgroundColor = '#f1f5f9';
        document.querySelector('.timeline-section').style.backgroundColor = '#f1f5f9';
        document.querySelector('.team-section').style.backgroundColor = '#f8fafc';
        document.querySelector('.contact-section').style.backgroundColor = '#f1f5f9';
        document.querySelector('.footer-section').style.backgroundColor = '#e2e8f0';
        document.querySelector('.footer-section').style.borderColor = '#cbd5e1';
        document.querySelector('.spotlight-box').style.backgroundColor = '#f3e8ff';
        document.querySelector('.spotlight-box').style.borderColor = '#e9d5ff';
        
        // Logo text & navbar links
        document.querySelector('.header-logo-text').style.color = '#1e1b4b'; 
        document.querySelector('.header-logo-icon').style.color = '#4338ca';
        themeToggle.style.color = '#0f172a';
        document.querySelector('.home-link').style.color = '#4f46e5';
        document.querySelector('.home-link').style.borderColor = '#4f46e5';
        document.querySelectorAll('.other-nav-link').forEach(el => el.style.color = '#0f172a');

        // Hero banner title + Dynamic Light Mode Gradient Button Adjustments
document.querySelector('.hero-title').style.backgroundImage = 'linear-gradient(to right, #312e81, #4338ca)'; // Deep Indigo to Bold Violet        document.querySelector('.hero-main-cta').style.backgroundImage = 'linear-gradient(to right, #4f46e5, #2563eb)';
        document.querySelector('.hero-desc').style.color = '#334155'; 
        document.querySelector('.hero-secondary-btn').style.color = '#0f172a';
        document.querySelector('.hero-secondary-btn').style.borderColor = '#cbd5e1';

        // Targeted Light Mode Counter Updates (Jewel Tones for Contrast)
        document.querySelector('.stat-num-1').style.color = '#4338ca'; 
        document.querySelector('.stat-num-2').style.color = '#1d4ed8'; 
        document.querySelector('.stat-num-3').style.color = '#b45309'; 
        document.querySelector('.stat-num-4').style.color = '#be123c'; 

        // Targeted Light Mode Spotlight Text Color Enhancement
        document.querySelector('.spotlight-p').style.color = '#1e293b'; 

        // Contact section details & form icons
        document.querySelector('.email-icon').style.color = '#4f46e5';
        document.querySelector('.email-icon-box').style.backgroundColor = '#e0e7ff';
        document.querySelector('.share-icon').style.color = '#0284c7';
        document.querySelector('.share-icon-box').style.backgroundColor = '#e0f2fe';

        // Vyreka brand name in footer
        document.querySelector('.footer-logo-text').style.color = '#0f172a';
        document.querySelector('.footer-logo-icon').style.color = '#4f46e5';

        // Structural Layout Text Enhancements
        document.querySelector('.grid-title').style.color = '#0f172a';
        document.querySelector('.grid-desc').style.color = '#334155';
        document.querySelector('.spotlight-title').style.color = '#0f172a';
        document.querySelector('.timeline-title').style.color = '#0f172a';
        document.querySelector('.timeline-desc').style.color = '#334155';
        document.querySelector('.ecosystem-title').style.color = '#0f172a';
        document.querySelector('.ecosystem-desc').style.color = '#334155';
        document.querySelector('.team-title').style.color = '#0f172a';
        document.querySelector('.team-desc').style.color = '#334155';
        document.querySelector('.testimonials-title').style.color = '#0f172a';
        document.querySelector('.contact-left-text').style.color = '#0f172a';
        document.querySelector('.contact-desc').style.color = '#334155';
        
        document.querySelectorAll('.card-title').forEach(el => el.style.color = '#0f172a');
        document.querySelectorAll('.countdown-num').forEach(el => el.style.color = '#6b21a8'); 
        document.querySelectorAll('.countdown-box').forEach(el => { el.style.backgroundColor = '#ffffff'; el.style.borderColor = '#e2e8f0'; });
        document.querySelectorAll('.countdown-lbl').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.stats-label').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.bento-p').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.timeline-p').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.timeline-date').forEach(el => el.style.color = '#4f46e5'); 
        document.querySelectorAll('.timeline-action-btn').forEach(el => el.style.color = '#4f46e5');
        document.querySelectorAll('.ecosystem-p').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.testimonial-quote').forEach(el => el.style.color = '#1e293b');
        document.querySelectorAll('.testimonial-sub').forEach(el => el.style.color = '#475569');
        document.querySelectorAll('.contact-subp').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.footer-desc').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.copyright-text').forEach(el => el.style.color = '#475569');
        document.querySelectorAll('.timeline-dot').forEach(el => el.style.backgroundColor = '#ffffff');
        document.querySelectorAll('.input-fields').forEach(el => { el.style.backgroundColor = '#ffffff'; el.style.border = '1px solid #cbd5e1'; el.style.color = '#0f172a'; });
        document.querySelectorAll('.form-lbl').forEach(el => el.style.color = '#1e293b');
        document.querySelectorAll('.footer-links a').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.footer-header-text').forEach(el => el.style.color = '#6b21a8');
        document.querySelectorAll('.social-links a').forEach(el => el.style.color = '#334155');
        document.querySelectorAll('.footer-icon-circle').forEach(el => { el.style.backgroundColor = '#ffffff'; el.style.border = '1px solid #cbd5e1'; el.style.color = '#1e293b'; });
        document.querySelectorAll('.tracking-stars').forEach(el => el.style.color = '#d97706'); 
        document.querySelectorAll('.team-role-p').forEach(el => el.style.color = '#7c3aed');
        document.querySelectorAll('.team-role-s').forEach(el => el.style.color = '#2563eb');
        document.querySelectorAll('.team-role-t').forEach(el => el.style.color = '#d97706');
        document.querySelectorAll('.team-role-e').forEach(el => el.style.color = '#dc2626');
        document.querySelectorAll('.overlay-gradient').forEach(el => { el.classList.remove('from-background'); el.classList.add('from-slate-200'); });
        
    } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        themeIcon.innerText = 'light_mode';
        
        // --- RESET ALL STYLES BACK TO ORIGINAL STYLES ---
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.querySelector('header').style.backgroundColor = '';
        document.querySelector('header').style.borderColor = '';
        document.querySelector('.stats-section').style.backgroundColor = '';
        document.querySelector('.timeline-section').style.backgroundColor = '';
        document.querySelector('.team-section').style.backgroundColor = '';
        document.querySelector('.contact-section').style.backgroundColor = '';
        document.querySelector('.footer-section').style.backgroundColor = '';
        document.querySelector('.footer-section').style.borderColor = '';
        document.querySelector('.spotlight-box').style.backgroundColor = '';
        document.querySelector('.spotlight-box').style.borderColor = '';
        
        document.querySelector('.header-logo-text').style.color = '';
        document.querySelector('.header-logo-icon').style.color = '';
        themeToggle.style.color = '';
        document.querySelector('.home-link').style.color = '';
        document.querySelector('.home-link').style.borderColor = '';
        document.querySelectorAll('.other-nav-link').forEach(el => el.style.color = '');
        document.querySelector('.hero-title').style.backgroundImage = '';
        document.querySelector('.hero-main-cta').style.backgroundImage = '';
        document.querySelector('.hero-desc').style.color = '';
        document.querySelector('.hero-secondary-btn').style.color = '';
        document.querySelector('.hero-secondary-btn').style.borderColor = '';

        document.querySelector('.stat-num-1').style.color = '';
        document.querySelector('.stat-num-2').style.color = '';
        document.querySelector('.stat-num-3').style.color = '';
        document.querySelector('.stat-num-4').style.color = '';
        document.querySelector('.spotlight-p').style.color = '';

        document.querySelector('.email-icon').style.color = '';
        document.querySelector('.email-icon-box').style.backgroundColor = '';
        document.querySelector('.share-icon').style.color = '';
        document.querySelector('.share-icon-box').style.backgroundColor = '';
        document.querySelector('.footer-logo-text').style.color = '';
        document.querySelector('.footer-logo-icon').style.color = '';

        document.querySelector('.grid-title').style.color = '';
        document.querySelector('.grid-desc').style.color = '';
        document.querySelector('.spotlight-title').style.color = '';
        document.querySelector('.timeline-title').style.color = '';
        document.querySelector('.timeline-desc').style.color = '';
        document.querySelector('.ecosystem-title').style.color = '';
        document.querySelector('.ecosystem-desc').style.color = '';
        document.querySelector('.team-title').style.color = '';
        document.querySelector('.team-desc').style.color = '';
        document.querySelector('.testimonials-title').style.color = '';
        document.querySelector('.contact-left-text').style.color = '';
        document.querySelector('.contact-desc').style.color = '';
        
        document.querySelectorAll('.card-title').forEach(el => el.style.color = '');
        document.querySelectorAll('.countdown-num').forEach(el => el.style.color = '');
        document.querySelectorAll('.countdown-box').forEach(el => { el.style.backgroundColor = ''; el.style.borderColor = ''; });
        document.querySelectorAll('.countdown-lbl').forEach(el => el.style.color = '');
        document.querySelectorAll('.stats-label').forEach(el => el.style.color = '');
        document.querySelectorAll('.bento-p').forEach(el => el.style.color = '');
        document.querySelectorAll('.timeline-p').forEach(el => el.style.color = '');
        document.querySelectorAll('.timeline-date').forEach(el => el.style.color = '');
        document.querySelectorAll('.timeline-action-btn').forEach(el => el.style.color = '');
        document.querySelectorAll('.ecosystem-p').forEach(el => el.style.color = '');
        document.querySelectorAll('.testimonial-quote').forEach(el => el.style.color = '');
        document.querySelectorAll('.testimonial-sub').forEach(el => el.style.color = '');
        document.querySelectorAll('.contact-subp').forEach(el => el.style.color = '');
        document.querySelectorAll('.footer-desc').forEach(el => el.style.color = '');
        document.querySelectorAll('.copyright-text').forEach(el => el.style.color = '');
        document.querySelectorAll('.timeline-dot').forEach(el => el.style.backgroundColor = '');
        document.querySelectorAll('.input-fields').forEach(el => { el.style.backgroundColor = ''; el.style.border = ''; el.style.color = ''; });
        document.querySelectorAll('.form-lbl').forEach(el => el.style.color = '');
        document.querySelectorAll('.footer-links a').forEach(el => el.style.color = '');
        document.querySelectorAll('.footer-header-text').forEach(el => el.style.color = '');
        document.querySelectorAll('.social-links a').forEach(el => el.style.color = '');
        document.querySelectorAll('.footer-icon-circle').forEach(el => { el.style.backgroundColor = ''; el.style.border = ''; el.style.color = ''; });
        document.querySelectorAll('.tracking-stars').forEach(el => el.style.color = '');
        document.querySelectorAll('.team-role-p').forEach(el => el.style.color = '');
        document.querySelectorAll('.team-role-s').forEach(el => el.style.color = '');
        document.querySelectorAll('.team-role-t').forEach(el => el.style.color = '');
        document.querySelectorAll('.team-role-e').forEach(el => el.style.color = '');
        document.querySelectorAll('.overlay-gradient').forEach(el => { el.classList.remove('from-slate-200'); el.classList.add('from-background'); });
    }
});