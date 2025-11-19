// Main JavaScript for Lifestyle Barbershop
document.addEventListener('DOMContentLoaded', function() {
    
    // Search Bar Toggle
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <button class="search-toggle">🔍</button>
        <div class="search-bar">
            <input type="text" placeholder="Search services..." class="search-input">
            <button class="search-btn">Search</button>
        </div>
    `;
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.appendChild(searchContainer);
        
        const searchToggle = searchContainer.querySelector('.search-toggle');
        const searchBar = searchContainer.querySelector('.search-bar');
        const searchInput = searchContainer.querySelector('.search-input');
        
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Search functionality
        const searchBtn = searchContainer.querySelector('.search-btn');
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
        
        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                const services = ['haircut', 'beard', 'shave', 'styling', 'children', 'senior'];
                const found = services.find(service => service.includes(query));
                if (found) {
                    window.location.href = 'services.html';
                } else {
                    alert('Service not found. Please check our Services page.');
                }
            }
        }
    }
    
    // Mobile Navigation Toggle
    const navLinks = document.querySelector('nav center h1, nav .nav-links, nav .nav-container .nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    if (nav) nav.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks) navLinks.classList.toggle('mobile-active');
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Form Validation (Contact Page)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!name || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple phone validation
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            alert('Thank you! Your appointment request has been submitted.');
            contactForm.reset();
        });
    }
    
    // Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary);
        color: var(--dark);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        font-size: 20px;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Loading Animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add CSS for search and mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            position: relative;
            display: flex;
            align-items: center;
        }
        .search-toggle {
            background: none;
            border: none;
            color: var(--light, #f5f5f5);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        .search-bar {
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--primary, #1a1a1a);
            border: 1px solid var(--secondary, #c9a96e);
            border-radius: 5px;
            padding: 0.5rem;
            display: none;
            min-width: 250px;
        }
        .search-bar.active {
            display: flex;
        }
        .search-input {
            flex: 1;
            padding: 0.5rem;
            border: none;
            background: rgba(255,255,255,0.1);
            color: var(--light, #f5f5f5);
            border-radius: 3px;
        }
        .search-btn {
            background: var(--secondary, #c9a96e);
            color: var(--dark, #121212);
            border: none;
            padding: 0.5rem 1rem;
            margin-left: 0.5rem;
            border-radius: 3px;
            cursor: pointer;
        }
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: var(--light, #f5f5f5);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            .nav-links, nav center h1 {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--primary, #1a1a1a);
                flex-direction: column;
                padding: 1rem;
            }
            .nav-links.mobile-active, nav center h1.mobile-active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            const searchBar = searchContainer.querySelector('.search-bar');
            if (searchBar) searchBar.classList.remove('active');
        }
    });

    // Process Videos - Play on Hover
    const processVideos = document.querySelectorAll('.process-video');
    processVideos.forEach(video => {
        const parent = video.closest('.process-item');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                video.play();
            });
            parent.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});