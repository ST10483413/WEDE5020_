// Enquiry Form with jQuery validation and quote calculation
$(document).ready(function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    $('#date').attr('min', today);
    
    // Phone number validation
    $('#phone').on('input', function() {
        const phone = $(this).val().replace(/\D/g, '');
        if (phone.length !== 10) {
            $('#phoneError').text('Phone number must be 10 digits').css('color', 'red');
        } else {
            $('#phoneError').text('✓ Valid').css('color', '#4caf50');
        }
    });
    
    // Email validation
    $('#email').on('blur', function() {
        const email = $(this).val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#emailError').text('Please enter a valid email address').css('color', 'red');
        } else {
            $('#emailError').text('✓ Valid').css('color', '#4caf50');
        }
    });
    
    // Date validation
    $('#date').on('change', function() {
        const selectedDate = new Date($(this).val());
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            $('#dateError').text('Please select a future date').css('color', 'red');
            $(this).val('');
        } else if (selectedDate.getDay() === 0) {
            $('#dateError').text('We are closed on Sundays').css('color', 'red');
            $(this).val('');
        } else {
            $('#dateError').text('✓ Date available').css('color', '#4caf50');
        }
    });
    
    // Form submission with jQuery
    $('#enquiryForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val().trim();
        const phone = $('#phone').val().trim();
        const email = $('#email').val().trim();
        const serviceSelect = $('#service');
        const service = serviceSelect.val();
        const date = $('#date').val();
        const message = $('#message').val().trim();
        
        // Validation
        let isValid = true;
        
        if (name.length < 2) {
            $('#nameError').text('Name must be at least 2 characters').css('color', 'red');
            isValid = false;
        } else {
            $('#nameError').text('');
        }
        
        if (phone.replace(/\D/g, '').length !== 10) {
            $('#phoneError').text('Phone number must be 10 digits').css('color', 'red');
            isValid = false;
        }
        
        if (!service) {
            $('#serviceError').text('Please select a service').css('color', 'red');
            isValid = false;
        } else {
            $('#serviceError').text('');
        }
        
        if (!date) {
            $('#dateError').text('Please select a date').css('color', 'red');
            isValid = false;
        }
        
        if (!isValid) {
            return false;
        }
        
        // Get service details
        const selectedOption = serviceSelect.find(':selected');
        const price = selectedOption.data('price');
        const time = selectedOption.data('time');
        const serviceName = selectedOption.text();
        
        // Calculate availability
        const selectedDate = new Date(date);
        const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const availability = (selectedDate.getDay() === 0) ? 'Closed' : 'Available';
        
        // Display quote with animation
        const quoteHTML = `
            <div style="color: var(--light);">
                <p><strong>Customer:</strong> ${name}</p>
                <p><strong>Contact:</strong> ${phone} | ${email}</p>
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Price:</strong> R${price}</p>
                <p><strong>Duration:</strong> ${time} minutes</p>
                <p><strong>Preferred Date:</strong> ${dayName}, ${selectedDate.toLocaleDateString()}</p>
                <p><strong>Availability:</strong> <span style="color: #4caf50;">${availability}</span></p>
                ${message ? `<p><strong>Notes:</strong> ${message}</p>` : ''}
                <hr style="border-color: var(--secondary); margin: 1rem 0;">
                <p style="font-size: 1.2rem; color: var(--secondary);"><strong>Total Cost: R${price}</strong></p>
                <p style="margin-top: 1rem;">📞 Call us at 082 464 2178 to confirm your booking!</p>
            </div>
        `;
        
        $('#quoteDetails').html(quoteHTML);
        $('#quoteResult').slideDown(500);
        
        // Scroll to result
        $('html, body').animate({
            scrollTop: $('#quoteResult').offset().top - 100
        }, 500);
        
        // Success message
        alert('✅ Quote Generated!\n\nService: ' + serviceName + '\nPrice: R' + price + '\nDate: ' + selectedDate.toLocaleDateString() + '\n\nCall 082 464 2178 to confirm your booking!');
    });
    
    // Reset form
    $('#enquiryForm').on('reset', function() {
        $('.error').text('');
        $('#quoteResult').slideUp(300);
    });
});