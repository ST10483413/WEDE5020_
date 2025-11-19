// Booking form with EmailJS only (No database)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    (function(){
        emailjs.init("u1BTCDNObEu3ocxqY");
    })();
    
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message')?.value || '';
            
            const selectedSlot = document.querySelector('.slot.selected');
            const timeSlot = selectedSlot ? selectedSlot.textContent : 'Not selected';
            
            // Generate booking ID
            const bookingId = 'LB' + Date.now();
            
            // Send email notification
            emailjs.send("service_zq8y61e", "template_gpq50ao", {
                customer_name: name,
                customer_phone: phone,
                to_email: email,
                service: service,
                time_slot: timeSlot,
                message: message,
                booking_id: bookingId
            })
            .then(function(response) {
                alert('✅ Booking Request Sent!\nReference ID: ' + bookingId + '\nConfirmation email sent to ' + email + '\n\nWe\'ll contact you shortly to confirm your appointment.');
                contactForm.reset();
                if (selectedSlot) selectedSlot.classList.remove('selected');
            }, function(error) {
                alert('❌ Error: ' + error.text + '\n\nDetails: ' + JSON.stringify(error));
                console.error('Full EmailJS Error:', error);
            });
        });
    }
});