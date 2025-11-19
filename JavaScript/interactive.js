// Interactive Features for Lifestyle Barbershop
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 30);
        });
    }
    
    // 2. Typing Effect for Hero Text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // 3. Parallax Scroll Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero, .gallery-info');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // 4. Interactive Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(201, 169, 110, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotateY(0deg)';
            card.style.boxShadow = 'none';
        });
    });
    
    // 5. Price Calculator
    function createPriceCalculator() {
        const calculator = document.createElement('div');
        calculator.className = 'price-calculator';
        calculator.innerHTML = `
            <h3>💰 Price Calculator</h3>
            <select id="service-select">
                <option value="150">Classic Haircut - R150</option>
                <option value="80">Beard Trim - R80</option>
                <option value="120">Razor Shave - R120</option>
                <option value="200">Combo Deal - R200</option>
            </select>
            <input type="number" id="quantity" value="1" min="1" max="5">
            <div class="total">Total: R<span id="total-price">150</span></div>
        `;
        
        const pricingSection = document.querySelector('.pricing');
        if (pricingSection) {
            pricingSection.appendChild(calculator);
            
            const select = calculator.querySelector('#service-select');
            const quantity = calculator.querySelector('#quantity');
            const total = calculator.querySelector('#total-price');
            
            function updateTotal() {
                const price = parseInt(select.value);
                const qty = parseInt(quantity.value);
                total.textContent = price * qty;
            }
            
            select.addEventListener('change', updateTotal);
            quantity.addEventListener('input', updateTotal);
        }
    }
    
    // 6. Live Chat Widget
    function createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <button class="chat-toggle">💬</button>
            <div class="chat-box">
                <div class="chat-header">Chat with us!</div>
                <div class="chat-messages">
                    <div class="message bot">Hi! How can we help you today?</div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message...">
                    <button>Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(chatWidget);
        
        const toggle = chatWidget.querySelector('.chat-toggle');
        const box = chatWidget.querySelector('.chat-box');
        
        toggle.addEventListener('click', () => {
            box.classList.toggle('active');
        });
    }
    
    // 7. Booking Time Slots
    function createTimeSlots() {
        const timeSlots = document.createElement('div');
        timeSlots.className = 'time-slots';
        timeSlots.innerHTML = `
            <h3>⏰ Available Times Today</h3>
            <div class="slots">
                <button class="slot available">9:00 AM</button>
                <button class="slot available">10:30 AM</button>
                <button class="slot booked">12:00 PM</button>
                <button class="slot available">2:30 PM</button>
                <button class="slot available">4:00 PM</button>
            </div>
        `;
        
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.appendChild(timeSlots);
            
            timeSlots.querySelectorAll('.slot.available').forEach(slot => {
                slot.addEventListener('click', () => {
                    timeSlots.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                });
            });
        }
    }
    
    // 8. Image Zoom on Hover
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.cursor = 'zoom-in';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Initialize features
    setTimeout(animateCounters, 1000);
    createPriceCalculator();
    createChatWidget();
    createTimeSlots();
    
    // Typing effect for hero text
    const heroTitle = document.querySelector('.hero h1, main h1');
    if (heroTitle && heroTitle.textContent.includes('Welcome')) {
        typeWriter(heroTitle, 'Welcome to Lifestyle Barbershop', 80);
    }
});