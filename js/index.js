
(() => {
    "use strict";

    const init = () => {
        const navbar = document.querySelector(".lux-navbar");
        const navCollapse = document.querySelector("#luxNavbar");
        const navLinks = document.querySelectorAll(".lux-nav-links .nav-link");
        const sections = document.querySelectorAll("section[id], header[id]");

        const handleNavbarScroll = () => {
            if (!navbar) return;

            const isScrolled = window.scrollY > 80;
            navbar.classList.toggle("lux-scrolled", isScrolled);
        };

        window.addEventListener("scroll", handleNavbarScroll, {
            passive: true
        });

        handleNavbarScroll();

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (!navCollapse) return;

                const instance = bootstrap.Collapse.getInstance(navCollapse);

                if (instance && navCollapse.classList.contains("show")) {
                    instance.hide();
                }
            });
        });

        if (navCollapse) {
            navCollapse.addEventListener("show.bs.collapse", () => {
                navbar?.classList.add("lux-menu-open");
            });

            navCollapse.addEventListener("hidden.bs.collapse", () => {
                navbar?.classList.remove("lux-menu-open");
            });
        }

        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 160;
            let currentSection = "home";

            sections.forEach(section => {
                if (scrollPosition >= section.offsetTop) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(link => {
                const target = link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    target === `#${currentSection}`
                );
            });
        };

        window.addEventListener("scroll", updateActiveLink, {
            passive: true
        });

        updateActiveLink();

        const revealElements = document.querySelectorAll(
            ".lux-brands-heading, .lux-brand-item, .lux-services-heading, .lux-service-card, .lux-contact-info"
        );

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("lux-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -30px 0px"
                }
            );

            revealElements.forEach((element, index) => {
                element.classList.add("lux-reveal");
                element.style.transitionDelay = `${(index % 4) * 90}ms`;
                observer.observe(element);
            });
        }

        const heroContent = document.querySelector(".lux-hero-content");

        if (heroContent) {
            const heroElements = [
                ".lux-hero-eyebrow",
                ".lux-hero-tag",
                ".lux-hero-title",
                ".lux-hero-description",
                ".lux-hero-features",
                ".lux-hero-actions",
                ".lux-hero-bottom"
            ];

            if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                heroElements.forEach((selector, index) => {
                    const element = heroContent.querySelector(selector);

                    if (!element) return;

                    element.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(30px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 750,
                            delay: 150 + index * 130,
                            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                            fill: "both"
                        }
                    );
                });
            }
        }

        const brandItems = document.querySelectorAll(".lux-brand-item");

        brandItems.forEach(item => {
            item.addEventListener("mouseenter", () => {
                const icon = item.querySelector("i");

                if (!icon) return;

                icon.style.transform = "scale(1.15)";
                icon.style.transition = "transform 0.3s ease";
            });

            item.addEventListener("mouseleave", () => {
                const icon = item.querySelector("i");

                if (!icon) return;

                icon.style.transform = "scale(1)";
            });
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
       const initLuxAbout = () => {
        const section = document.querySelector(".lux-about-section");

        if (!section) return;

        const elements = [
            section.querySelector(".lux-about-visual"),
            section.querySelector(".lux-about-eyebrow"),
            section.querySelector(".lux-about-title"),
            section.querySelector(".lux-about-lead"),
            ...section.querySelectorAll(".lux-about-description"),
            section.querySelector(".lux-about-divider"),
            ...section.querySelectorAll(".lux-about-feature"),
            section.querySelector(".lux-about-actions"),
            section.querySelector(".lux-about-bottom")
        ].filter(Boolean);

        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        elements.forEach((element, index) => {
            element.classList.add("lux-about-animate");
            element.style.transitionDelay = `${Math.min(index * 75, 450)}ms`;
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("lux-about-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        elements.forEach(element => observer.observe(element));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxAbout);
    } else {
        initLuxAbout();
    }


    const initLuxServices = () => {
        const section = document.querySelector(".lux-services-section");

        if (!section) return;

        const whatsappNumber = "966598319299";

        const serviceButtons = section.querySelectorAll(
            ".lux-service-whatsapp"
        );

        serviceButtons.forEach(button => {
            const serviceName = button.dataset.service;

            if (!serviceName) return;

            const message = [
                "السلام عليكم ورحمة الله وبركاته",
                "",
                "أرغب في طلب خدمة صيانة لسيارتي.",
                "",
                `الخدمة المطلوبة: ${serviceName}`,
                "",
                "نوع السيارة:",
                "موديل السيارة:",
                "وصف المشكلة:",
                "",
                "أرجو التواصل معي لتحديد موعد الصيانة.",
                "وشكرًا لكم."
            ].join("\n");

            const whatsappUrl =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            button.href = whatsappUrl;
            button.target = "_blank";
            button.rel = "noopener noreferrer";
        });

        const animatedElements = [
            section.querySelector(".lux-services-heading"),
            ...section.querySelectorAll(".lux-service-card"),
            section.querySelector(".lux-services-bottom")
        ].filter(Boolean);

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) {
            return;
        }

        animatedElements.forEach((element, index) => {
            element.classList.add("lux-service-reveal");
            element.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("lux-service-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        animatedElements.forEach(element => observer.observe(element));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxServices);
    } else {
        initLuxServices();
    }
        const initLuxBrandsMarquee = () => {
        const marquee = document.querySelector(".lux-brands-marquee");
        const track = document.querySelector(".lux-brands-track");

        if (!marquee || !track) return;

        const originalItems = [...track.children];

        if (!originalItems.length) return;

        const originalCount = originalItems.length;

        const createCopy = () => {
            const fragment = document.createDocumentFragment();

            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                fragment.appendChild(clone);
            });

            track.appendChild(fragment);
        };

        const setupMarquee = () => {
            track.querySelectorAll('[aria-hidden="true"]').forEach(item => {
                item.remove();
            });

            const gap = parseFloat(getComputedStyle(track).gap) || 0;

            const originalWidth = originalItems.reduce((total, item) => {
                return total + item.getBoundingClientRect().width + gap;
            }, 0);

            const copiesNeeded = Math.max(
                2,
                Math.ceil(marquee.clientWidth / originalWidth) + 1
            );

            for (let i = 0; i < copiesNeeded; i++) {
                createCopy();
            }

            track.style.setProperty("--lux-loop-distance", `${originalWidth}px`);
            track.style.setProperty("--lux-loop-duration", `${originalWidth / 65}s`);
        };

        setupMarquee();

        let resizeFrame;

        window.addEventListener("resize", () => {
            cancelAnimationFrame(resizeFrame);

            resizeFrame = requestAnimationFrame(setupMarquee);
        }, { passive: true });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxBrandsMarquee);
    } else {
        initLuxBrandsMarquee();
    }
        const initLuxWhy = () => {
        const section = document.querySelector(".lux-why-section");

        if (!section) return;

        const elements = [
            section.querySelector(".lux-why-heading"),
            ...section.querySelectorAll(".lux-why-card"),
            section.querySelector(".lux-why-bottom")
        ].filter(Boolean);

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) return;

        elements.forEach((element, index) => {
            element.classList.add("lux-why-reveal");
            element.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("lux-why-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        elements.forEach(element => observer.observe(element));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxWhy);
    } else {
        initLuxWhy();
    }
        const initLuxTips = () => {
        const section = document.querySelector(".lux-tips-section");

        if (!section) return;

        const elements = [
            section.querySelector(".lux-tips-heading"),
            section.querySelector(".lux-tips-featured"),
            ...section.querySelectorAll(".lux-tips-card"),
            section.querySelector(".lux-tips-bottom")
        ].filter(Boolean);

        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) return;

        elements.forEach((element, index) => {
            element.classList.add("lux-tips-reveal");
            element.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("lux-tips-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        elements.forEach(element => observer.observe(element));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxTips);
    } else {
        initLuxTips();
    }

    const initLuxProcess = () => {
        const section = document.querySelector(".lux-process-section");

        if (!section) return;

        const timeline = section.querySelector(".lux-process-timeline");
        const steps = [...section.querySelectorAll(".lux-process-step")];

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) {
            timeline.classList.add("lux-process-active");
            steps.forEach(step => step.classList.add("lux-process-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    timeline.classList.add("lux-process-active");

                    steps.forEach((step, index) => {
                        step.style.transitionDelay = `${index * 150}ms`;
                        step.classList.add("lux-process-visible");
                    });

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15
            }
        );

        observer.observe(timeline);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxProcess);
    } else {
        initLuxProcess();
    }
       const initLuxStats = () => {
        const section = document.querySelector(".lux-stats-section");

        if (!section) return;

        const counters = [...section.querySelectorAll(".lux-stats-counter")];
        const cards = [...section.querySelectorAll(".lux-stats-card")];

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const formatNumber = number =>
            new Intl.NumberFormat("en-US").format(number);

        const animateCounter = (element, duration = 2000) => {
            const target = Number(element.dataset.target);

            if (!Number.isFinite(target) || target < 0) return;

            if (reducedMotion) {
                element.textContent = formatNumber(target);
                return;
            }

            let startTime = null;

            const animate = timestamp => {
                if (startTime === null) startTime = timestamp;

                const progress = Math.min(
                    (timestamp - startTime) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 4);

                const current = Math.floor(target * eased);

                element.textContent = formatNumber(current);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = formatNumber(target);
                }
            };

            requestAnimationFrame(animate);
        };

        if (!("IntersectionObserver" in window)) {
            cards.forEach(card => card.classList.add("lux-stats-visible"));
            counters.forEach(counter => animateCounter(counter));
            return;
        }

        if (reducedMotion) {
            cards.forEach(card => card.classList.add("lux-stats-visible"));
            counters.forEach(counter => animateCounter(counter));
            return;
        }

        cards.forEach(card => card.classList.add("lux-stats-reveal"));

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    cards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 100}ms`;
                        card.classList.add("lux-stats-visible");
                    });

                    counters.forEach((counter, index) => {
                        setTimeout(() => {
                            animateCounter(counter, 2000);
                        }, index * 150);
                    });

                    observer.disconnect();
                });
            },
            {
                threshold: 0.25
            }
        );

        observer.observe(section);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxStats);
    } else {
        initLuxStats();
    }
       const initLuxContact = () => {
        const form = document.getElementById("luxContactForm");

        if (!form) return;

        const whatsappNumber = "966598319299";

        form.addEventListener("submit", event => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            const name = form.querySelector("#luxContactName").value.trim();
            const phone = form.querySelector("#luxContactPhone").value.trim();
            const brand = form.querySelector("#luxContactBrand").value;
            const service = form.querySelector("#luxContactService").value;
            const message = form.querySelector("#luxContactMessage").value.trim();

            if (!name || !phone || !brand || !service) return;

            const whatsappMessage = [
                "السلام عليكم، أرغب في حجز موعد صيانة",
                "",
                `الاسم: ${name}`,
                `رقم الجوال: ${phone}`,
                `ماركة السيارة: ${brand}`,
                `نوع الخدمة: ${service}`,
                `تفاصيل الطلب: ${message || "لم يتم إضافة تفاصيل"}`
            ].join("\n");

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            const newWindow = window.open(url, "_blank");

            if (newWindow) {
                newWindow.opener = null;
                form.reset();
            } else {
                window.location.href = url;
            }
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxContact);
    } else {
        initLuxContact();
    }
        const initLuxFooter = () => {
        const yearElement = document.getElementById("luxFooterYear");
        const backTopButton = document.getElementById("luxFooterBackTop");

        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        if (!backTopButton) return;

        const updateBackTop = () => {
            backTopButton.classList.toggle(
                "lux-footer-back-top-visible",
                window.scrollY > 450
            );
        };

        updateBackTop();

        window.addEventListener("scroll", updateBackTop, {
            passive: true
        });

        backTopButton.addEventListener("click", () => {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "instant" : "smooth"
            });
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLuxFooter);
    } else {
        initLuxFooter();
    }
})();
