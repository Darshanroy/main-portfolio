// ==========================================
// GSAP ANIMATIONS
// ==========================================

class Animations {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        this.init();
    }

    init() {
        this.animateHero();
        this.animateOnScroll();
        this.animateStats();
        this.setupNavigation();
    }

    animateHero() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-tag', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.3
        })
            .from('.title-line', {
                x: -100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2
            }, '-=0.4')
            .from('.title-main', {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                ease: 'back.out(1.7)'
            }, '-=0.6')
            .from('.hero-description', {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, '-=0.4')
            .from('.hero-buttons .btn', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2
            }, '-=0.4')
            .from('.hero-scroll', {
                opacity: 0,
                duration: 0.8
            }, '-=0.2');
    }

    animateOnScroll() {
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Animate glass cards
        gsap.utils.toArray('.glass-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 80,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                rotationX: -15,
                duration: 1,
                delay: index * 0.15,
                ease: 'power3.out'
            });
        });

        // Animate skill items
        gsap.utils.toArray('.skill-item').forEach((skill, index) => {
            gsap.from(skill, {
                scrollTrigger: {
                    trigger: skill,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0,
                opacity: 0,
                rotation: 180,
                duration: 0.8,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            });
        });

        // Parallax effect for floating elements
        gsap.utils.toArray('.float-item').forEach((item, index) => {
            const speed = item.dataset.speed || 2;
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -100 * speed,
                ease: 'none'
            });
        });
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const target = parseInt(stat.dataset.count);

            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(stat, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out',
                        onUpdate: function () {
                            stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + '+';
                        }
                    });
                },
                once: true
            });
        });
    }

    setupNavigation() {
        const nav = document.getElementById('main-nav');
        const navLinks = document.querySelectorAll('.nav-link');

        // Nav scroll effect
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { targets: nav, className: 'scrolled' }
        });

        // Active link on scroll
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => this.setActiveLink(section.id),
                onEnterBack: () => this.setActiveLink(section.id)
            });
        });
    }

    setActiveLink(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Animations();
    });
} else {
    new Animations();
}
