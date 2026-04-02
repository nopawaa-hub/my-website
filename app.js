document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Navbar Scroll Effect
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // 2. Active Link Highlighting (Intersection Observer)
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(sec => observer.observe(sec));

            // 3. FAQ Accordion Toggle
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    // Close all
                    faqItems.forEach(i => i.classList.remove('active'));
                    // Open clicked if it wasn't active
                    if (!isActive) item.classList.add('active');
                });
            });

            // 4. Form Submission Mock
            document.getElementById('contactForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = e.target.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                setTimeout(() => {
                    btn.innerText = 'Sent Successfully!';
                    btn.style.background = '#10B981'; // Green
                    e.target.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = ''; // Reset
                    }, 3000);
                }, 1500);
            });

            // 5. GSAP Premium Animations
            gsap.registerPlugin(ScrollTrigger);

            // Simple Fade Up
            gsap.utils.toArray('.gs-reveal').forEach(elem => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // Staggered Cards (Features & Testimonials)
            gsap.utils.toArray('.features-grid, .testi-grid').forEach(grid => {
                const cards = grid.querySelectorAll('.gs-stagger');
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                });
            });

            // Left/Right reveals (About section)
            gsap.from('.gs-reveal-left', {
                scrollTrigger: { trigger: '.about-grid', start: "top 80%" },
                x: -60, opacity: 0, duration: 1, ease: "power3.out"
            });
            gsap.from('.gs-reveal-right', {
                scrollTrigger: { trigger: '.about-grid', start: "top 80%" },
                x: 60, opacity: 0, duration: 1, ease: "power3.out"
            });

            // Pricing Cards Up
            gsap.from('.gs-reveal-up', {
                scrollTrigger: { trigger: '.pricing-grid', start: "top 80%" },
                y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)"
            });

            // 6. Animated Counters on Scroll
            const counters = document.querySelectorAll('.stat-number');
            let counted = false;

            ScrollTrigger.create({
                trigger: '.stats-wrap',
                start: "top 85%",
                onEnter: () => {
                    if (!counted) {
                        counters.forEach(counter => {
                            const target = +counter.getAttribute('data-target');
                            // Determine if float or int based on target value
                            const isFloat = target % 1 !== 0;
                            
                            gsap.to(counter, {
                                innerHTML: target,
                                duration: 2,
                                ease: "power2.out",
                                snap: { innerHTML: isFloat ? 0.01 : 1 },
                                onUpdate: function() {
                                    if(isFloat) {
                                        counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(2);
                                    }
                                }
                            });
                        });
                        counted = true;
                    }
                }
            });

        });
