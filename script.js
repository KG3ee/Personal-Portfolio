(() => {
    'use strict';

    // ──────────────────────────────────────────
    //  DOM references
    // ──────────────────────────────────────────

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    const body          = document.body;
    const navMenu       = $('#nav-menu');
    const hamburger     = $('#hamburger');
    const themeToggle   = $('#theme-toggle');
    const backToTopBtn  = $('#back-to-top');
    const contactForm   = $('#contact-form');

    // ──────────────────────────────────────────
    //  Dark / Light Theme
    // ──────────────────────────────────────────

    const THEME_KEY = 'portfolio-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);

        const icon = themeToggle?.querySelector('i');
        if (!icon) return;

        if (theme === 'light') {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        } else {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Toggle light mode');
        }
    }

    applyTheme(getPreferredTheme());

    themeToggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ──────────────────────────────────────────
    //  Hamburger Menu
    // ──────────────────────────────────────────

    function closeMenu() {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // ──────────────────────────────────────────
    //  Smooth Scroll for anchor links
    // ──────────────────────────────────────────

    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = $(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ──────────────────────────────────────────
    //  Active nav highlight on scroll
    // ──────────────────────────────────────────

    const navLinks = $$('.nav-link');
    const sections = $$('section[id]');
    let navRaf;

    function updateNav() {
        const scrollY = window.scrollY + 150;
        let currentId = '';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    window.addEventListener('scroll', () => {
        if (navRaf) cancelAnimationFrame(navRaf);
        navRaf = requestAnimationFrame(updateNav);
    }, { passive: true });

    // ──────────────────────────────────────────
    //  Scroll Progress Bar
    // ──────────────────────────────────────────

    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    body.appendChild(progressBar);

    function updateProgress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        progressBar.style.width = ((window.scrollY / max) * 100) + '%';
    }

    // ──────────────────────────────────────────
    //  Back to Top
    // ──────────────────────────────────────────

    function updateBackToTop() {
        backToTopBtn?.classList.toggle('visible', window.scrollY > 300);
    }

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Combined scroll handler
    window.addEventListener('scroll', () => {
        updateProgress();
        updateBackToTop();
    }, { passive: true });

    // ──────────────────────────────────────────
    //  Intersection Observer — reveal elements
    // ──────────────────────────────────────────

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.addEventListener('DOMContentLoaded', () => {
        const targets = [
            '.skill-category',
            '.project-card',
            '.testimonial-card',
            '.blog-card',
            '.about-grid',
            '.contact-grid'
        ].join(',');

        $$(targets).forEach(el => {
            el.classList.add('reveal-element');
            revealObserver.observe(el);
        });
    });

    // ──────────────────────────────────────────
    //  Skill Progress Bars — animate on scroll
    // ──────────────────────────────────────────

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = $$('.skill-progress', entry.target);
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.addEventListener('DOMContentLoaded', () => {
        $$('.skill-category').forEach(cat => barObserver.observe(cat));
    });

    // ──────────────────────────────────────────
    //  Stat Counter Animation
    // ──────────────────────────────────────────

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $$('.stat-number', entry.target).forEach(animateCounter);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const stats = $('.about-stats');
        if (stats) statObserver.observe(stats);
    });

    // ──────────────────────────────────────────
    //  Hero Parallax (subtle)
    // ──────────────────────────────────────────

    const hero = $('.hero');

    if (hero) {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        window.addEventListener('scroll', () => {
            if (mediaQuery.matches) return;
            if (window.scrollY > window.innerHeight) return;
            hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }, { passive: true });
    }

    // ──────────────────────────────────────────
    //  Contact Form Validation
    // ──────────────────────────────────────────

    if (contactForm) {
        const validators = {
            name:    (v) => v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
            email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.',
            subject: (v) => v.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters).',
            message: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'
        };

        function validateField(field) {
            const fn = validators[field.name];
            if (!fn) return true;

            const error = fn(field.value);
            const errorEl = field.parentElement.querySelector('.form-error');

            if (error) {
                field.classList.add('error');
                if (errorEl) errorEl.textContent = error;
                return false;
            }

            field.classList.remove('error');
            if (errorEl) errorEl.textContent = '';
            return true;
        }

        $$('input, textarea', contactForm).forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) validateField(field);
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fields = $$('input, textarea', contactForm);
            let valid = true;

            fields.forEach(f => {
                if (!validateField(f)) valid = false;
            });

            if (!valid) return;

            const submitBtn  = contactForm.querySelector('.form-submit');
            const textSpan   = submitBtn.querySelector('.submit-text');
            const loadSpan   = submitBtn.querySelector('.submit-loading');
            const successSpan = submitBtn.querySelector('.submit-success');

            textSpan.hidden    = true;
            loadSpan.hidden    = false;
            submitBtn.disabled = true;

            setTimeout(() => {
                loadSpan.hidden      = true;
                successSpan.hidden   = false;
                submitBtn.classList.add('success');

                contactForm.reset();
                fields.forEach(f => f.classList.remove('error'));

                setTimeout(() => {
                    successSpan.hidden   = true;
                    textSpan.hidden      = false;
                    submitBtn.disabled   = false;
                    submitBtn.classList.remove('success');
                }, 2500);
            }, 1200);
        });
    }

    // ──────────────────────────────────────────
    //  Project link hover effect
    // ──────────────────────────────────────────

    $$('.project-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(4px)';
        });
        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

})();
