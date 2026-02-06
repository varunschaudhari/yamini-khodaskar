/**
 * Personal Website - Yamini Prashant Khodaskar
 * Interactive functionality and smooth scrolling
 */

(function() {
    'use strict';

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // CASE STUDY TOGGLE
    // ============================================
    const caseStudyToggles = document.querySelectorAll('.case-study-toggle');
    const caseStudyDetail = document.getElementById('caseStudyDetail');

    caseStudyToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (caseStudyDetail) {
                const isActive = caseStudyDetail.classList.contains('active');
                
                if (isActive) {
                    caseStudyDetail.classList.remove('active');
                    toggle.textContent = 'View Full Case Study';
                    // Scroll to case study card
                    const caseStudyCard = document.getElementById('caseStudyCard');
                    if (caseStudyCard) {
                        caseStudyCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    caseStudyDetail.classList.add('active');
                    toggle.textContent = 'Close Case Study';
                    // Scroll to case study detail
                    setTimeout(() => {
                        caseStudyDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(`
        .case-study-card,
        .contract-item,
        .expertise-item,
        .education-item,
        .standard-item
    `);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // DOWNLOAD PROFILE FUNCTIONALITY
    // ============================================
    const downloadProfileBtn = document.getElementById('downloadProfile');
    
    if (downloadProfileBtn) {
        downloadProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Open PDF in new tab for download
            const link = document.createElement('a');
            link.href = 'Yamini Prashant Khodaskar.pdf';
            link.download = 'Yamini_Prashant_Khodaskar_Resume.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ============================================
    // HERO SCROLL INDICATOR FADE
    // ============================================
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (heroScrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                heroScrollIndicator.style.opacity = '0';
                heroScrollIndicator.style.pointerEvents = 'none';
            } else {
                heroScrollIndicator.style.opacity = '1';
                heroScrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // ============================================
    // FORM VALIDATION (if contact form is added later)
    // ============================================
    // Placeholder for future contact form functionality

    // ============================================
    // PERFORMANCE: Lazy load images (if added)
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%cYamini Prashant Khodaskar - Transportation Engineer', 
        'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cProfessional Portfolio Website', 
        'color: #64748b; font-size: 12px;');

})();
