/* ==== Particle Canvas Background ==== */
(function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p, i) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(16, 202, 183, ' + p.opacity + ')';
            ctx.fill();

            // Draw connecting lines
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(16, 202, 183, ' + (0.06 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

/* ==== Toggle Password Visibility ==== */
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});

/* ==== Password Strength Indicator ==== */
passwordInput.addEventListener('input', function () {
    const val = this.value;
    const fill = document.getElementById('strength-fill');
    const text = document.getElementById('strength-text');
    const container = document.getElementById('password-strength');

    if (val.length === 0) {
        container.classList.remove('visible');
        return;
    }
    container.classList.add('visible');

    let strength = 0;
    if (val.length >= 6) strength++;
    if (val.length >= 10) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const levels = [
        { width: '15%', color: '#e74c3c', label: 'Very Weak' },
        { width: '30%', color: '#e67e22', label: 'Weak' },
        { width: '50%', color: '#f1c40f', label: 'Fair' },
        { width: '75%', color: '#2ecc71', label: 'Strong' },
        { width: '100%', color: '#10cab7', label: 'Excellent' }
    ];

    const level = levels[Math.min(strength, 4)];
    fill.style.width = level.width;
    fill.style.background = level.color;
    text.textContent = level.label;
    text.style.color = level.color;
});

/* ==== Form Validation & Submission ==== */
const form = document.getElementById('login-form');
const submitBtn = document.getElementById('submit-btn');
const emailInput = document.getElementById('email');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(groupId, errorId, msg) {
    document.getElementById(groupId).classList.add('has-error');
    document.getElementById(errorId).textContent = msg;
}

function clearError(groupId, errorId) {
    document.getElementById(groupId).classList.remove('has-error');
    document.getElementById(errorId).textContent = '';
}

emailInput.addEventListener('blur', function () {
    if (this.value && !validateEmail(this.value)) {
        showError('email-group', 'email-error', 'Please enter a valid email address');
    } else {
        clearError('email-group', 'email-error');
    }
});

emailInput.addEventListener('input', function () {
    if (this.value && validateEmail(this.value)) {
        clearError('email-group', 'email-error');
        document.getElementById('email-group').classList.add('is-valid');
    } else {
        document.getElementById('email-group').classList.remove('is-valid');
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    if (!emailInput.value || !validateEmail(emailInput.value)) {
        showError('email-group', 'email-error', 'Please enter a valid email address');
        valid = false;
    }
    if (!passwordInput.value || passwordInput.value.length < 4) {
        showError('password-group', 'password-error', 'Password must be at least 4 characters');
        valid = false;
    }

    if (!valid) return;

    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    btnText.hidden = true;
    btnIcon.hidden = true;
    btnLoader.hidden = false;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    setTimeout(function () {
        submitBtn.classList.add('success');
        btnLoader.hidden = true;
        btnText.textContent = 'Success!';
        btnText.hidden = false;

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 800);
    }, 2000);
});

/* ==== Input Focus Animations ==== */
document.querySelectorAll('.input-wrapper input').forEach(function (input) {
    input.addEventListener('focus', function () {
        this.closest('.input-wrapper').classList.add('focused');
    });
    input.addEventListener('blur', function () {
        this.closest('.input-wrapper').classList.remove('focused');
        if (this.value) {
            this.closest('.input-wrapper').classList.add('has-value');
        } else {
            this.closest('.input-wrapper').classList.remove('has-value');
        }
    });
});
