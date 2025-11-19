// Functional Chatbot for Lifestyle Barbershop
document.addEventListener('DOMContentLoaded', function() {
    
    const responses = {
        greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
        services: ['service', 'cut', 'haircut', 'beard', 'shave', 'price', 'cost'],
        booking: ['book', 'appointment', 'schedule', 'reserve', 'time'],
        hours: ['hours', 'open', 'close', 'time', 'when'],
        location: ['where', 'address', 'location', 'directions'],
        contact: ['phone', 'number', 'call', 'contact']
    };
    
    const botReplies = {
        greetings: "Hello! Welcome to Lifestyle Barbershop! How can I help you today?",
        services: "We offer:\n• Classic Haircuts - R150\n• Beard Trim - R80\n• Razor Shave - R120\n• Combo Deal - R200\nWhat interests you?",
        booking: "To book an appointment:\n📞 Call us: 082 464 2178\n🌐 Use our contact form\n⏰ We're open Mon-Sat 9AM-7PM",
        hours: "We're open:\n📅 Monday - Saturday\n🕘 9:00 AM - 7:00 PM\n❌ Closed Sundays",
        location: "📍 Find us at:\n196 Shiplake Road, Protea Glen\nSoweto, South Africa\nSee our map on the contact page!",
        contact: "📞 Phone: 082 464 2178\n📧 Email: info@lifestylebarbershop.com\n📍 Address: 196 Shiplake Road, Protea Glen",
        default: "I'm here to help! Ask me about:\n• Services & Prices\n• Booking appointments\n• Opening hours\n• Location & contact info"
    };
    
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (let category in responses) {
            if (responses[category].some(keyword => message.includes(keyword))) {
                return botReplies[category];
            }
        }
        return botReplies.default;
    }
    
    function createFunctionalChatbot() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'functional-chat-widget';
        chatWidget.innerHTML = `
            <button class="chat-toggle">💬</button>
            <div class="chat-box">
                <div class="chat-header">
                    <span>Lifestyle Barbershop</span>
                    <button class="chat-close">×</button>
                </div>
                <div class="chat-messages">
                    <div class="message bot">Hi! I'm here to help with services, booking, and questions. What can I do for you?</div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Ask about services, booking, hours..." maxlength="100">
                    <button class="send-btn">Send</button>
                </div>
                <div class="quick-buttons">
                    <button class="quick-btn" data-msg="services">Services</button>
                    <button class="quick-btn" data-msg="booking">Book Now</button>
                    <button class="quick-btn" data-msg="hours">Hours</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
        
        const toggle = chatWidget.querySelector('.chat-toggle');
        const close = chatWidget.querySelector('.chat-close');
        const box = chatWidget.querySelector('.chat-box');
        const input = chatWidget.querySelector('input');
        const sendBtn = chatWidget.querySelector('.send-btn');
        const messages = chatWidget.querySelector('.chat-messages');
        const quickBtns = chatWidget.querySelectorAll('.quick-btn');
        
        function addMessage(text, isUser = false) {
            const msg = document.createElement('div');
            msg.className = `message ${isUser ? 'user' : 'bot'}`;
            msg.textContent = text;
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        }
        
        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            
            addMessage(text, true);
            input.value = '';
            
            setTimeout(() => {
                const response = getBotResponse(text);
                addMessage(response);
            }, 500);
        }
        
        toggle.addEventListener('click', () => box.classList.add('active'));
        close.addEventListener('click', () => box.classList.remove('active'));
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const msg = btn.dataset.msg;
                addMessage(msg, true);
                setTimeout(() => addMessage(getBotResponse(msg)), 500);
            });
        });
    }
    
    createFunctionalChatbot();
});