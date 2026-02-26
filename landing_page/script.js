/* BULLFOLIO — Landing Scripts */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = mobileToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(8px) rotate(45deg)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-8px) rotate(-45deg)' : '';
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.querySelectorAll('span').forEach(s => { s.style.transform = s.style.opacity = ''; });
    });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const index = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
function animateCounter(el, target, suffix = '') {
    const duration = 1800, start = performance.now();
    const update = (ts) => {
        const progress = Math.min((ts - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.hero-stat-value').forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, suffix);
            });
            statObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// Float tag entrance
window.addEventListener('load', () => {
    document.querySelectorAll('.float-tag').forEach((tag, i) => {
        tag.style.cssText = 'opacity:0;transform:scale(0.8) translateY(10px)';
        setTimeout(() => {
            tag.style.transition = 'opacity 0.6s ease,transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
            tag.style.opacity = '1';
            tag.style.transform = '';
        }, 800 + i * 200);
    });
});

// Hero image parallax
const heroImg = document.getElementById('hero-logo-img');
if (heroImg) {
    window.addEventListener('mousemove', (e) => {
        const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        heroImg.style.transform = `translate(${dx * -10}px,${dy * -10}px)`;
    }, { passive: true });
}

// CTA Form
const ctaForm = document.getElementById('cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('cta-email').value;
        const btn = document.getElementById('cta-submit-btn');
        btn.disabled = true; btn.textContent = 'Procesando...';
        setTimeout(() => {
            ctaForm.innerHTML = `<div style="text-align:center;padding:24px 32px;background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);border-radius:20px;color:#00FF88;font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;">✅ ¡Listo! Te notificamos en <strong>${email}</strong> al lanzar.</div>`;
        }, 1200);
    });
}

// Ticker tooltips
const tickers = { SPY: 'S&P 500 ETF', TLT: 'Bonos del Tesoro 20+ años', QQQ: 'NASDAQ 100', GLD: 'Gold ETF', BTC: 'Bitcoin', ETH: 'Ethereum', SOL: 'Solana', AAPL: 'Apple Inc.', MSFT: 'Microsoft Corp.', NVDA: 'NVIDIA Corp.', PFBCOL: 'Bancolombia', ISA: 'Interconexión Eléctrica', NUTRESA: 'Grupo Nutresa', EFA: 'iShares MSCI EAFE', VWO: 'Vanguard Emerging Markets' };
document.querySelectorAll('.chip:not(.chip-muted)').forEach(chip => {
    const t = chip.textContent.trim();
    if (tickers[t]) chip.title = tickers[t];
});

console.log('%c 🐂 BULLFOLIO Robo-Advisor', 'color:#00D4FF;font-size:18px;font-weight:bold;');
console.log('%c Powered by Markowitz + K-Means + yfinance', 'color:#00FF88;font-size:12px;');

// --- HERO CANVAS SCROLL ANIMATION ---
const canvas = document.getElementById("hero-canvas");
if (canvas) {
    const context = canvas.getContext("2d");
    const frameCount = 191; // 191 frames extracted
    const imgFolder = "public/assets/hero/frames/";
    
    // Get container for proper sizing
    const visualContainer = document.querySelector('.hero-visual');

    // Resize canvas properly
    const resizeCanvas = () => {
        if (!visualContainer) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            return;
        }
        
        // Match the container's exact bounded dimensions
        const rect = visualContainer.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };
    
    resizeCanvas();
    
    // We will preload images into this array
    const images = [];
    let imagesLoaded = 0;
    
    const currentFrame = index => `${imgFolder}frame_${index.toString().padStart(4, '0')}.png`;
    
    const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                imagesLoaded++;
                // Draw the first frame when loaded
                if (i === 1) {
                    renderFrame(1);
                }
            };
            images.push(img);
        }
    };
    
    const renderFrame = (index) => {
        if (!images[index - 1] || !images[index - 1].complete) return;
        
        const img = images[index - 1];
        
        // Calculate object-fit: cover equivalent
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }
        
        // Context optimizations
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    
    // Start preloading
    preloadImages();
    
    // Track Scroll Progress for the Hero Section
    const heroSection = document.getElementById("hero");
    let currentScrollFrame = 1;
    let targetScrollFrame = 1;
    let ticking = false;
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        
        // Only run animation if we are within the hero section height (minus viewport height for the stickiness)
        const maxScroll = heroSection.scrollHeight - window.innerHeight;
        
        if (scrollTop <= maxScroll && maxScroll > 0) {
            const scrollFraction = Math.max(0, scrollTop) / maxScroll;
            let frameIndex = Math.min(
                frameCount,
                Math.max(1, Math.ceil(scrollFraction * frameCount))
            );
            
            targetScrollFrame = frameIndex;
            
            if (!ticking) {
                window.requestAnimationFrame(smoothAnimation);
                ticking = true;
            }
        }
    });

    // Smooth animation interpolator
    const smoothAnimation = () => {
        // Easing factor to prevent jitter, makes scrolling feel buttery
        const diff = targetScrollFrame - currentScrollFrame;
        
        if (Math.abs(diff) > 0.1) {
            currentScrollFrame += diff * 0.25; // Easing value
            renderFrame(Math.round(currentScrollFrame));
            window.requestAnimationFrame(smoothAnimation);
        } else {
            currentScrollFrame = targetScrollFrame;
            renderFrame(targetScrollFrame);
            ticking = false;
        }
    };
    
    // Handle Window Resize
    window.addEventListener("resize", () => {
        resizeCanvas();
        renderFrame(Math.round(currentScrollFrame));
    });
}
