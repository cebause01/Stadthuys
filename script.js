// Navigation and Interactive Features for The Stadthuys E-Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle scroll for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        const hamburgerIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        const closeIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;

        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change icon when menu is open
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.innerHTML = closeIcon;
            } else {
                mobileMenuToggle.innerHTML = hamburgerIcon;
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        });
    });

    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery modal (lightbox) for images and videos with navigation
    const galleries = document.querySelectorAll('.gallery');

    const openLightbox = (items, startIndex) => {
        let currentIndex = startIndex;

        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const frame = document.createElement('div');
        frame.style.cssText = `
            position: relative;
            max-width: 80%;
            max-height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            border-radius: 6px;
            box-shadow: 0 18px 60px rgba(0, 0, 0, 0.7);
            overflow: hidden;
        `;

        const mediaContainer = document.createElement('div');
        mediaContainer.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const createArrowBtn = (direction) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.innerHTML = `
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4">
                    ${direction === 'prev'
                        ? '<polyline points="15 18 9 12 15 6"></polyline>'
                        : '<polyline points="9 18 15 12 9 6"></polyline>'}
                </svg>
            `;
            btn.style.cssText = `
                position: absolute;
                top: 50%;
                ${direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                border: none;
                border-radius: 999px;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10002;
                transition: background 0.2s ease, transform 0.2s ease;
            `;
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.75)';
                btn.style.transform = 'translateY(-50%) scale(1.06)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.5)';
                btn.style.transform = 'translateY(-50%) scale(1)';
            });
            return btn;
        };

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.innerHTML = `
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        closeBtn.style.cssText = `
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(0, 0, 0, 0.6);
            border: none;
            border-radius: 999px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10003;
            transition: background 0.2s ease, transform 0.2s ease;
        `;
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(0, 0, 0, 0.85)';
            closeBtn.style.transform = 'scale(1.04)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(0, 0, 0, 0.6)';
            closeBtn.style.transform = 'scale(1)';
        });

        frame.appendChild(mediaContainer);
        frame.appendChild(closeBtn);
        const prevBtn = createArrowBtn('prev');
        const nextBtn = createArrowBtn('next');
        frame.appendChild(prevBtn);
        frame.appendChild(nextBtn);
        modal.appendChild(frame);
        document.body.appendChild(modal);

        const render = (index) => {
            mediaContainer.innerHTML = '';
            const item = items[index];
            if (!item) return;

            const img = item.querySelector('img');
            const video = item.querySelector('video');

            if (img && !video) {
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.alt = img.alt || 'Gallery image';
                modalImg.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                `;
                mediaContainer.appendChild(modalImg);
            } else if (video) {
                const modalVideo = document.createElement('video');
                modalVideo.controls = true;
                modalVideo.playsInline = true;
                modalVideo.style.cssText = `
                    max-width: 100%;
                    max-height: 100%;
                    background: #000;
                `;
                const sourceEl = video.querySelector('source');
                if (sourceEl && sourceEl.src) {
                    const newSource = document.createElement('source');
                    newSource.src = sourceEl.src;
                    newSource.type = sourceEl.type || 'video/mp4';
                    modalVideo.appendChild(newSource);
                }
                mediaContainer.appendChild(modalVideo);
            }
        };

        const showPrev = () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            render(currentIndex);
        };

        const showNext = () => {
            currentIndex = (currentIndex + 1) % items.length;
            render(currentIndex);
        };

        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 250);
            document.removeEventListener('keydown', keyHandler);
        };

        const keyHandler = (e) => {
            if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        };

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        document.addEventListener('keydown', keyHandler);
        render(currentIndex);
    };

    galleries.forEach(gallery => {
        const items = Array.from(gallery.querySelectorAll('.gallery-item'));
        if (!items.length) return;

        items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(items, index);
            });
        });
    });

    // Add smooth reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections for animation
    document.querySelectorAll('.content-card, .member-card, .plan-item, .recommendation-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Prevent horizontal scroll on mobile
window.addEventListener('resize', function() {
    document.body.style.overflowX = 'hidden';
});
