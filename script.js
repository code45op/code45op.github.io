// Parallax Effect
document.addEventListener('DOMContentLoaded', () => {
    const parallaxWrapper = document.querySelector('.parallax-wrapper');
    const layers = document.querySelectorAll('.parallax-layer');
    const cards = document.querySelectorAll('.minecraft-card');
    let scrollPosition = 0;
    let ticking = false;

    function updateParallax() {
        scrollPosition = window.pageYOffset;
        
        // Update background and middle layers
        layers.forEach(layer => {
            const speed = layer.classList.contains('layer-bg') ? 0.5 :
                         layer.classList.contains('layer-mid') ? 0.3 : 0.1;
            const yPos = scrollPosition * speed;
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Update floating blocks
        document.querySelectorAll('.minecraft-block').forEach((block, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = scrollPosition * speed;
            block.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrollPosition * 0.02}deg)`;
        });

        // Update cards with fade and slide effect
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.classList.add('visible');
                const distance = window.innerHeight - rect.top;
                const parallaxSpeed = card.dataset.parallax || 0.2;
                const movement = distance * parallaxSpeed;
                card.style.transform = `translate3d(0, ${movement}px, 0)`;
            } else {
                card.classList.remove('visible');
            }
        });

        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateParallax();
});

// Level Up Animation with improved timing
const observerOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            entry.target.classList.add('level-up');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observe sections with smooth reveal
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) scale(0.95)';
    section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    section.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(section);
});

// Wait for all content to be fully loaded (including images)
window.addEventListener('load', () => {
    // Initialize elements
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.minecraft-card');
    const experienceSection = document.querySelector('.experience');
    
    // Create and initialize Minecraft health bar progress
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'minecraft-health-bar';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'health-progress';
    progressBarContainer.appendChild(progressBar);
    
    document.body.appendChild(progressBarContainer);

    // Ensure experience section is visible
    if (experienceSection) {
        experienceSection.style.opacity = '1';
    }

    // Create Minecraft blocks only after container is available
    function createMinecraftBlocks() {
        const container = document.querySelector('.layer-mid');
        if (container) {
            for (let i = 0; i < 10; i++) {
                const block = document.createElement('div');
                block.className = 'minecraft-block floating';
                block.style.left = `${Math.random() * 100}%`;
                block.style.top = `${Math.random() * 100}%`;
                block.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(block);
            }
        }
    }

    // Call createMinecraftBlocks after DOM is loaded
    createMinecraftBlocks();

    // Update scroll progress like health bar
    function updateProgress() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
        
        // Update health bar color based on progress
        if (scrolled < 30) {
            progressBar.style.backgroundColor = '#ff5555'; // Red
        } else if (scrolled < 60) {
            progressBar.style.backgroundColor = '#ffaa00'; // Orange
        } else {
            progressBar.style.backgroundColor = '#ff5555'; // Back to red for final stretch
        }
    }

    // Create navigation dots
    const nav = document.createElement('div');
    nav.className = 'section-nav';
    document.body.appendChild(nav);
    
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
        nav.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.nav-dot');

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to section and ensure opacity is 1
                entry.target.classList.add('section-enter');
                entry.target.style.opacity = '1';
                
                // Update navigation dots
                const index = Array.from(sections).indexOf(entry.target);
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Initialize sections and cards
    sections.forEach(section => {
        section.style.opacity = '1';
        sectionObserver.observe(section);
    });

    cards.forEach(card => {
        card.classList.add('visible');
        card.style.opacity = '1';
        card.style.transform = 'none';
    });

    // Initialize experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });

    // Add scroll event listener for health bar progress
    window.addEventListener('scroll', updateProgress);
    
    // Initial progress update
    updateProgress();

    // Initialize all hover effects
    initializeHoverEffects();

    // Create and animate Minecraft Ender Dragon
    createEnderDragon();
});

// Separate function for hover effects
function initializeHoverEffects() {
    // Hover effects for cards
    document.querySelectorAll('.minecraft-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 0 30px rgba(68, 189, 50, 0.5)';
        });
        
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 0 20px rgba(68, 189, 50, 0.3)';
        });
    });

    // Hover effects for experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.01)';
            item.style.boxShadow = '0 0 20px rgba(68, 189, 50, 0.3)';
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = 'none';
            item.style.boxShadow = 'none';
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        });
    });

    // Hover effects for skills
    document.querySelectorAll('.skill-category li').forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = 'translateX(10px)';
            skill.style.backgroundColor = 'rgba(68, 189, 50, 0.2)';
        });
        
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'translateX(0)';
            skill.style.backgroundColor = 'rgba(68, 189, 50, 0.1)';
        });
    });

    // Text hover effects
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.addEventListener('mouseover', () => {
            heading.style.textShadow = '4px 4px 0 var(--minecraft-dark)';
            heading.style.color = 'var(--minecraft-green)';
        });
        
        heading.addEventListener('mouseout', () => {
            heading.style.textShadow = '2px 2px 0 var(--minecraft-dark)';
            heading.style.color = '';
        });
    });

    // Background parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            e.currentTarget.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        });
    }
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Background parallax effect
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.hero').style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
});

// Minecraft-style text effect
document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.addEventListener('mouseover', () => {
        heading.style.textShadow = '4px 4px 0 var(--minecraft-dark)';
        heading.style.transition = 'text-shadow 0.3s ease';
    });
    
    heading.addEventListener('mouseout', () => {
        heading.style.textShadow = '2px 2px 0 var(--minecraft-dark)';
    });
});

// Skill progress animation
document.querySelectorAll('.skill-category li').forEach(skill => {
    skill.addEventListener('mouseover', () => {
        skill.style.transform = 'translateX(10px) translateZ(20px)';
        skill.style.transition = 'transform 0.3s ease';
    });
    
    skill.addEventListener('mouseout', () => {
        skill.style.transform = 'translateX(0) translateZ(0)';
    });
});

// Minecraft-style hover effects
// Experience timeline animation
document.querySelectorAll('.experience-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    item.style.transitionDelay = `${index * 0.2}s`;
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    itemObserver.observe(item);
});

// Minecraft-style hover effects
document.querySelectorAll('.minecraft-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.02) translateZ(50px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1) translateZ(0)';
    });
});

// Skill progress animation
document.querySelectorAll('.skill-category li').forEach(skill => {
    skill.addEventListener('mouseover', () => {
        skill.style.transform = 'translateX(10px) translateZ(20px)';
        skill.style.transition = 'transform 0.3s ease';
    });
    
    skill.addEventListener('mouseout', () => {
        skill.style.transform = 'translateX(0) translateZ(0)';
    });
});

// Background parallax effect
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.hero').style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
});

// Minecraft-style text effect
document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.addEventListener('mouseover', () => {
        heading.style.textShadow = '4px 4px 0 var(--minecraft-dark)';
        heading.style.transition = 'text-shadow 0.3s ease';
    });
    
    heading.addEventListener('mouseout', () => {
        heading.style.textShadow = '2px 2px 0 var(--minecraft-dark)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.minecraft-card');
    
    // Create and initialize Minecraft health bar progress
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'minecraft-health-bar';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'health-progress';
    progressBarContainer.appendChild(progressBar);
    
    document.body.appendChild(progressBarContainer);

    // Update scroll progress like health bar
    function updateProgress() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
        
        // Update health bar color based on progress
        if (scrolled < 30) {
            progressBar.style.backgroundColor = '#ff5555'; // Red
        } else if (scrolled < 60) {
            progressBar.style.backgroundColor = '#ffaa00'; // Orange
        } else {
            progressBar.style.backgroundColor = '#ff5555'; // Back to red for final stretch
        }
    }

    // Create navigation dots
    const nav = document.createElement('div');
    nav.className = 'section-nav';
    document.body.appendChild(nav);
    
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
        nav.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.nav-dot');

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to section
                entry.target.classList.add('section-enter');
                
                // Update navigation dots
                const index = Array.from(sections).indexOf(entry.target);
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Initialize sections and cards
    sections.forEach(section => {
        section.style.opacity = '1';
        sectionObserver.observe(section);
    });

    cards.forEach(card => {
        card.classList.add('visible');
        card.style.opacity = '1';
        card.style.transform = 'none';
    });

    document.querySelectorAll('.experience-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });

    // Hover effects for cards
    document.querySelectorAll('.minecraft-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 0 30px rgba(68, 189, 50, 0.5)';
        });
        
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 0 20px rgba(68, 189, 50, 0.3)';
        });
    });

    // Hover effects for experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.01)';
            card.style.boxShadow = '0 0 20px rgba(68, 189, 50, 0.3)';
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        });
        
        item.addEventListener('mouseout', () => {
            item.style.transform = 'none';
            item.style.boxShadow = 'none';
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        });
    });

    // Hover effects for skills
    document.querySelectorAll('.skill-category li').forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = 'translateX(10px)';
            skill.style.backgroundColor = 'rgba(68, 189, 50, 0.2)';
        });
        
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'translateX(0)';
            skill.style.backgroundColor = 'rgba(68, 189, 50, 0.1)';
        });
    });

    // Text hover effects
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.addEventListener('mouseover', () => {
            heading.style.textShadow = '4px 4px 0 var(--minecraft-dark)';
            heading.style.color = 'var(--minecraft-green)';
        });
        
        heading.addEventListener('mouseout', () => {
            heading.style.textShadow = '2px 2px 0 var(--minecraft-dark)';
            heading.style.color = '';
        });
    });

    // Background parallax effect for hero section
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        e.currentTarget.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    // Add scroll event listener for health bar progress
    window.addEventListener('scroll', updateProgress);
    
    // Initial progress update
    updateProgress();
});

// Create and animate Minecraft Ender Dragon
function createEnderDragon() {
    const dragon = document.createElement('div');
    dragon.className = 'minecraft-dragon';
    document.body.appendChild(dragon);

    function animateDragon() {
        // Random position on screen
        const randomX = Math.random() * (window.innerWidth - 100);
        const randomY = Math.random() * (window.innerHeight - 100);
        
        // Random rotation
        const rotation = Math.random() * 360;
        
        // Random scale for "breathing" effect
        const scale = 0.8 + Math.random() * 0.4;
        
        dragon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg) scale(${scale})`;
        
        // Random timing for next movement
        setTimeout(animateDragon, 2000 + Math.random() * 3000);
    }

    // Start animation
    animateDragon();
}

// Add dragon roar on click
document.addEventListener('click', (e) => {
    const dragon = document.querySelector('.minecraft-dragon');
    if (dragon) {
        // Add roar animation class
        dragon.classList.add('roar');
        
        // Move dragon towards click position
        const rect = dragon.getBoundingClientRect();
        const currentX = rect.left;
        const currentY = rect.top;
        const targetX = e.clientX;
        const targetY = e.clientY;
        
        // Calculate angle to click position
        const angle = Math.atan2(targetY - currentY, targetX - currentX) * 180 / Math.PI;
        
        dragon.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${angle}deg)`;
        
        // Remove roar animation after it completes
        setTimeout(() => {
            dragon.classList.remove('roar');
        }, 1000);
    }
}); 