// ==========================================
// MAIN APPLICATION
// ==========================================

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.handleLoading();
        this.setupNavigation();
        this.setupSmoothScroll();
        this.setupContactForm();
        this.setupMobileMenu();
    }

    handleLoading() {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');

            setTimeout(() => {
                loadingScreen.classList.add('hidden');

                // Remove from DOM after transition
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate
            if (!this.validateForm(data)) {
                return;
            }

            // Simulate form submission
            this.submitForm(data);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }

    validateForm(data) {
        let isValid = true;

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            this.showError('name', 'Please enter a valid name');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showError('email', 'Please enter a valid email');
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            this.showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();
        const name = input.name;

        // Remove previous error
        this.clearError(name);

        if (name === 'name' && value.length < 2) {
            this.showError(name, 'Name too short');
        } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this.showError(name, 'Invalid email');
        } else if (name === 'message' && value.length < 10) {
            this.showError(name, 'Message too short');
        }
    }

    showError(inputName, message) {
        const input = document.querySelector(`[name="${inputName}"]`);
        input.style.borderColor = '#ff0055';

        // Create error message if doesn't exist
        let errorEl = input.parentElement.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.style.color = '#ff0055';
            errorEl.style.fontSize = '0.85rem';
            errorEl.style.marginTop = '0.25rem';
            input.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    clearError(inputName) {
        const input = document.querySelector(`[name="${inputName}"]`);
        input.style.borderColor = '';

        const errorEl = input.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }

    submitForm(data) {
        const submitBtn = document.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>SENDING...</span>';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Success feedback
            submitBtn.innerHTML = '<span>✓ SENT!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00f0ff)';

            // Reset form
            document.getElementById('contact-form').reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

            console.log('Form submitted:', data);
        }, 1500);
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// Initialize application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}
