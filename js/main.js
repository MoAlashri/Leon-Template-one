/* ==== Sticky Header ==== */
const header = document.getElementById('header');
window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ==== Mobile Menu Toggle ==== */
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
menuToggle.addEventListener('click', function () {
    navList.classList.toggle('active');
});

/* ==== Scroll Reveal Animation ==== */
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(function (el) {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

/* ==== Back to Top ==== */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==== Smooth Scroll for Anchor Links ==== */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navList.classList.remove('active');
        }
    });
});
