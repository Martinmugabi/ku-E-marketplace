// Mobile menu functionality
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');
        
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close on resize if needed
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });





// DOM Elements
const nav = document.getElementById('nav');
const headerActions = document.getElementById('headerActions');
const navLinks = document.querySelectorAll('.nav-link');
const faqItems = document.querySelectorAll('.faq-item');
const backToTop = document.getElementById('backToTop');
const orderButtons = document.querySelectorAll('.order-btn');
const closeModal = document.querySelector('.close-modal');
const modalOverlay = document.getElementById('orderModal');
const steps = document.querySelectorAll('.step');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const promoModal = document.getElementById('promoModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const registerCookingBtn = document.getElementById('registerCookingBtn');
const cookingModal = document.getElementById('cookingModal');
const wineTastingBtn = document.getElementById('wineTastingBtn');
const wineModal = document.getElementById('wineModal');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');

// Current step in order process
let currentStep = 1;

// Current testimonial index
let currentTestimonial = 0;

// Toggle Mobile Navigation
toggleBars.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggleBars.classList.toggle('active');
});

// Close mobile nav when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggleBars.classList.remove('active');
    });
});

// FAQ Toggle functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        item.classList.toggle('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Order Button Functionality
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const desc = button.getAttribute('data-desc');
        const price = button.getAttribute('data-price');
        const img = button.getAttribute('data-img');
        
        // Set order details in modal
        document.getElementById('orderItem').textContent = item;
        document.getElementById('orderDesc').textContent = desc;
        document.getElementById('orderPrice').textContent = 'UGX ' + parseInt(price).toLocaleString();
        document.getElementById('orderImg').src = img;
        
        // Show modal
        modalOverlay.style.display = 'flex';
        
        // Reset to first step
        setStep(1);
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Order Process Navigation
function nextStep() {
    if (validateStep(currentStep)) {
        setStep(currentStep + 1);
    }
}

function prevStep() {
    setStep(currentStep - 1);
}

function setStep(stepNumber) {
    // Hide all steps
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
    
    // Update order summary if on payment step
    if (stepNumber === 3) {
        updateOrderSummary();
    }
}

function validateStep(step) {
    switch(step) {
        case 1:
            const quantity = document.getElementById('orderQty').value;
            if (!quantity || quantity < 1) {
                alert('Please enter a valid quantity');
                return false;
            }
            return true;
        case 2:
            const name = document.getElementById('deliveryName').value;
            const email = document.getElementById('deliveryEmail').value;
            const phone = document.getElementById('deliveryPhone').value;
            const address = document.getElementById('deliveryAddress').value;
            const date = document.getElementById('deliveryDate').value;
            const payment = document.getElementById('paymentMethod').value;
            
            if (!name || !email || !phone || !address || !date || !payment) {
                alert('Please fill all required fields');
                return false;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return false;
            }
            
            return true;
        default:
            return true;
    }
}

function updateOrderSummary() {
    const item = document.getElementById('orderItem').textContent;
    const priceText = document.getElementById('orderPrice').textContent;
    const price = parseInt(priceText.replace('UGX ', '').replace(/,/g, ''));
    const quantity = document.getElementById('orderQty').value;
    const total = price * quantity;
    
    document.getElementById('summaryItem').textContent = `Product: ${item}`;
    document.getElementById('summaryQty').textContent = `Quantity: ${quantity}`;
    document.getElementById('summaryTotal').textContent = `Total: UGX ${total.toLocaleString()}`;
}

function placeOrder() {
    if (validateStep(3)) {
        const item = document.getElementById('orderItem').textContent;
        const priceText = document.getElementById('orderPrice').textContent;
        const price = parseInt(priceText.replace('UGX ', '').replace(/,/g, ''));
        const quantity = document.getElementById('orderQty').value;
        const total = price * quantity;
        const name = document.getElementById('deliveryName').value;
        const email = document.getElementById('deliveryEmail').value;
        
        // Generate order number
        const orderNumber = 'KU' + Date.now();
        
        // Update confirmation details
        document.getElementById('confOrderNumber').textContent = orderNumber;
        document.getElementById('confItem').textContent = `${item} (x${quantity})`;
        document.getElementById('confTotal').textContent = total.toLocaleString();
        
        // Move to confirmation step
        setStep(4);
        
        // Send confirmation email (simulated)
        simulateEmailConfirmation(name, email, orderNumber, item, quantity, total);
    }
}

function simulateEmailConfirmation(name, email, orderNumber, item, quantity, total) {
    console.log(`Sending confirmation email to ${email}`);
    console.log(`Order Details: ${item} x ${quantity} = UGX ${total}`);
    console.log(`Order Number: ${orderNumber}`);
    
    // In a real application, you would send an actual email here
}

function downloadReceipt() {
    const receiptContent = document.getElementById('receiptContent');
    
    // Create a temporary element for the receipt
    const receiptElement = document.createElement('div');
    receiptElement.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #003366; text-align: center;">KU E-Marketplace Receipt</h2>
            <hr>
            <p><strong>Order Number:</strong> ${document.getElementById('confOrderNumber').textContent}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Item:</strong> ${document.getElementById('confItem').textContent}</p>
            <p><strong>Total:</strong> UGX ${document.getElementById('confTotal').textContent}</p>
            <p><strong>Payment Method:</strong> ${document.getElementById('paymentMethod').value}</p>
            <hr>
            <p style="text-align: center;">Thank you for your order!</p>
            <p style="text-align: center;">Kampala University E-Marketplace</p>
        </div>
    `;
    
    // Generate PDF
    const options = {
        margin: 10,
        filename: 'KU_Order_Receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(receiptElement).set(options).save();
}

// Event Modals
learnMoreBtn.addEventListener('click', () => {
    promoModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    promoModal.style.display = 'none';
});

registerCookingBtn.addEventListener('click', () => {
    cookingModal.style.display = 'flex';
});

wineTastingBtn.addEventListener('click', () => {
    wineModal.style.display = 'flex';
});

// Close modals when clicking outside
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modals with X buttons
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal-overlay').style.display = 'none';
    });
});

// Testimonial Slider
function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show selected testimonial
    testimonialCards[index].classList.add('active');
    currentTestimonial = index;
}

sliderPrev.addEventListener('click', () => {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) {
        newIndex = testimonialCards.length - 1;
    }
    showTestimonial(newIndex);
});

sliderNext.addEventListener('click', () => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonialCards.length) {
        newIndex = 0;
    }
    showTestimonial(newIndex);
});

// Auto-rotate testimonials
setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonialCards.length) {
        newIndex = 0;
    }
    showTestimonial(newIndex);
}, 5000);

// Form Submissions
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    console.log('Contact form submitted:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    console.log(`Newsletter subscription: ${email}`);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    newsletterForm.reset();
});

// Cooking Class Registration Form
const cookingForm = document.getElementById('cookingForm');
if (cookingForm) {
    cookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate registration
        alert('Registration successful! We look forward to seeing you at the cooking class.');
        cookingModal.style.display = 'none';
    });
}

// Wine Tasting Booking Form
const wineBookingForm = document.getElementById('wineBookingForm');
if (wineBookingForm) {
    wineBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate booking
        alert('Booking confirmed! Thank you for reserving your spot at our wine tasting event.');
        wineModal.style.display = 'none';
    });
}

// Payment Method Toggle
const paymentMethod = document.getElementById('paymentMethod');
if (paymentMethod) {
    paymentMethod.addEventListener('change', () => {
        // Hide all payment fields
        document.querySelectorAll('.payment-fields').forEach(field => {
            field.style.display = 'none';
        });
        
        // Show selected payment fields
        const selectedMethod = paymentMethod.value;
        if (selectedMethod) {
            document.getElementById(selectedMethod + 'Fields').style.display = 'block';
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('KU E-Marketplace loaded successfully');
    
    // Show first testimonial
    showTestimonial(0);
    
    // Initialize payment method fields
    if (paymentMethod) {
        paymentMethod.dispatchEvent(new Event('change'));
    }
});


// Function to scroll to content
        function scrollToContent() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }

        // Add additional animations on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Animate buttons with slight delay
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach((btn, index) => {
                btn.style.animationDelay = `${0.8 + (index * 0.2)}s`;
                btn.style.opacity = '0';
                btn.style.animation = 'fadeInUp 0.8s ease forwards';
            });
            
            // Parallax effect on scroll
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.hero-section::before');
                parallaxElements.forEach(element => {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
            
            // Add hover effect to buttons
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });
        




