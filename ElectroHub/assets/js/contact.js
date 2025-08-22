// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Setup form handling
    setupContactForm();
    
    // Setup FAQ functionality
    setupFAQs();
});

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 mr-2 animate-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in a real app, this would be an API call)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reinitialize Lucide icons
        lucide.createIcons();
    }, 2000);
}

function validateForm(data) {
    const errors = [];
    
    // Required fields
    if (!data.firstName || data.firstName.trim().length === 0) {
        errors.push('First name is required');
    }
    
    if (!data.lastName || data.lastName.trim().length === 0) {
        errors.push('Last name is required');
    }
    
    if (!data.email || data.email.trim().length === 0) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject === '') {
        errors.push('Please select a subject');
    }
    
    if (!data.message || data.message.trim().length === 0) {
        errors.push('Message is required');
    } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Phone validation (optional field)
    if (data.phone && data.phone.trim().length > 0 && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function setupFAQs() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqIndex = button.getAttribute('data-faq');
            const content = button.parentNode.querySelector('.faq-content');
            const chevron = button.querySelector('[data-lucide="chevron-down"]');
            
            // Toggle content
            const isOpen = !content.classList.contains('hidden');
            
            if (isOpen) {
                content.classList.add('hidden');
                chevron.style.transform = 'rotate(0deg)';
            } else {
                content.classList.remove('hidden');
                chevron.style.transform = 'rotate(180deg)';
            }
        });
    });
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 max-w-md ${
        type === 'success' ? 'bg-neon-green text-black' : 'bg-red-500 text-white'
    }`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}
