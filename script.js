// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Allow only letters
document.querySelectorAll('input[pattern="[A-Za-z]+"]').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^a-zA-Z]/g, '');
    });
});

// Allow only numbers
document.querySelectorAll('input[pattern="[0-9]+"]').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
    });
});

// Tab functionality for contact page
window.showTab = (tabName) => {
    // Hide all form contents
    document.querySelectorAll('.form-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected form content
    const selectedForm = document.getElementById(`${tabName}-form`);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
    
    // Clear any existing form errors when switching tabs
    clearFormErrors();
};

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

// Real-time validation
function setupRealTimeValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError(this.id, 'Please enter a valid email address');
            } else {
                clearError(this.id);
            }
        });
    });

   // Remove any non-digit characters and limit input to 10 digits
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        // Prevent typing more than 10 digits (allow control keys)
        input.addEventListener('keydown', function (e) {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
            if (this.value.length >= 10 &&
                !allowedKeys.includes(e.key) &&
                !(e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
            ) {
                e.preventDefault();
            }
        });

    // On input, keep only digits and trim to 10 chars max
    input.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });

    // On blur, validate length and show error if invalid
        input.addEventListener('blur', function () {
            if (this.value.length !== 10) {
                showError(this.id, 'Phone number must be exactly 10 digits');
            } else {
                clearError(this.id);
            }
        });
    });

    // Validation function for phone number (exactly 10 digits)
    function validatePhone(phone) {
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        return /^\d{10}$/.test(cleaned);
    }

    // Show error message helper
    function showError(id, message) {
        const field = document.getElementById(id);
        if (!field) return;

        let error = document.getElementById(id + '-error');
        if (!error) {
            error = document.createElement('div');
            error.id = id + '-error';
            error.className = 'error-message';
            error.style.color = 'red';
            error.style.fontSize = '13px';
            error.style.marginTop = '5px';
            field.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    // Clear error message helper
    function clearError(id) {
        const error = document.getElementById(id + '-error');
        if (error) error.remove();
    }


    // Error display helpers
    function showError(id, message) {
        const field = document.getElementById(id);
        if (!field) return;

        let error = document.getElementById(id + '-error');
        if (!error) {
            error = document.createElement('div');
            error.id = id + '-error';
            error.className = 'error-message';
            error.style.color = 'red';
            error.style.fontSize = '13px';
            error.style.marginTop = '5px';
            field.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    function clearError(id) {
        const error = document.getElementById(id + '-error');
        if (error) error.remove();
    }

    
    // Password validation
    document.querySelectorAll('input[type="password"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'regPassword' || this.id === 'loginPassword') {
                if (this.value && !validatePassword(this.value)) {
                    showError(this.id, 'Password must be at least 8 characters long');
                } else {
                    clearError(this.id);
                }
            }
        });
    });

    // Confirm password validation
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordField = document.getElementById('regPassword');
    if (confirmPasswordField && passwordField) {
        confirmPasswordField.addEventListener('blur', function() {
            if (this.value && this.value !== passwordField.value) {
                showError(this.id, 'Passwords do not match');
            } else {
                clearError(this.id);
            }
        });
    }

    // Required field validation
    document.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showError(this.id, 'This field is required');
            } else {
                clearError(this.id);
            }
        });
    });
}

// Form submission handlers
function setupFormHandlers() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            clearFormErrors();

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'message'];
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && !input.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                }
            });

            // Validate email
            const email = document.getElementById('email');
            if (email && email.value && !validateEmail(email.value)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone if provided
            const phone = document.getElementById('phone');
            if (phone && phone.value && !validatePhone(phone.value)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            clearFormErrors();

            // Validate required fields
            const requiredFields = ['regFirstName', 'regLastName', 'regEmail', 'regPhone', 'regPassword', 'confirmPassword', 'birthDate'];
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && !input.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                }
            });

            // Validate email
            const email = document.getElementById('regEmail');
            if (email && email.value && !validateEmail(email.value)) {
                showError('regEmail', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            const phone = document.getElementById('regPhone');
            if (phone && phone.value && !validatePhone(phone.value)) {
                showError('regPhone', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate password
            const password = document.getElementById('regPassword');
            if (password && password.value && !validatePassword(password.value)) {
                showError('regPassword', 'Password must be at least 8 characters long');
                isValid = false;
            }

            // Validate password confirmation
            const confirmPassword = document.getElementById('confirmPassword');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            // Validate age (must be at least 18)
            const birthDate = document.getElementById('birthDate');
            if (birthDate && birthDate.value) {
                const today = new Date();
                const birth = new Date(birthDate.value);
                const age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
                
                if (age < 18) {
                    showError('birthDate', 'You must be at least 18 years old to register');
                    isValid = false;
                }
            }

            // Validate terms agreement
            const agreeTerms = document.getElementById('agreeTerms');
            if (agreeTerms && !agreeTerms.checked) {
                showError('agreeTerms', 'You must agree to the Terms of Service and Privacy Policy');
                isValid = false;
            }

            if (isValid) {
                // Simulate registration
                alert('Account created successfully! Welcome to F&F Showroom.');
                registerForm.reset();
            }
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            clearFormErrors();

            // Validate required fields
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');

            if (!email.value.trim()) {
                showError('loginEmail', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError('loginEmail', 'Please enter a valid email address');
                isValid = false;
            }

            if (!password.value.trim()) {
                showError('loginPassword', 'Password is required');
                isValid = false;
            }

            if (isValid) {
                // Simulate login
                alert('Login successful! Welcome back.');
                loginForm.reset();
            }
        });
    }
}

// Set minimum date for date pickers (today)
function setupDatePickers() {
    const today = new Date().toISOString().split('T')[0];
    
    // Test drive date picker
    const testDriveDate = document.getElementById('testDriveDate');
    if (testDriveDate) {
        testDriveDate.setAttribute('min', today);
    }

    // Birth date picker (max date should be 18 years ago)
    const birthDate = document.getElementById('birthDate');
    if (birthDate) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 18);
        birthDate.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
}

// Animation on scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .car-card, .service-card, .category-card, .team-member, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Chatbot System
class ChatbotSystem {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.apiEndpoint = 'http://localhost:8000/chat'; // Your FastAPI endpoint
        this.hasWelcomed = false;
        
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.setupEventListeners();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-toggle" id="chatbotToggle">
                    <span class="chatbot-icon">💬</span>
                </button>
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">🤖</div>
                        <div class="chatbot-info">
                            <h3>F&F Assistant</h3>
                            <p>Online • Ready to help</p>
                        </div>
                    </div>
                    <div class="chatbot-messages" id="chatbotMessages"></div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbotInput" placeholder="Type your message...">
                        <button class="chatbot-send" id="chatbotSend">➤</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbotToggle');
        const window = document.getElementById('chatbotWindow');
        const input = document.getElementById('chatbotInput');
        const send = document.getElementById('chatbotSend');

        toggle.addEventListener('click', () => {
            this.toggleChatbot();
            if (this.isOpen && !this.hasWelcomed) {
                this.showWelcomeMessage();
                this.hasWelcomed = true;
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        send.addEventListener('click', () => this.sendMessage());

        // Close chatbot
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chatbot-container') && this.isOpen) {
                this.toggleChatbot();
            }
        });
    }

    showWelcomeMessage() {
        const welcomeMessage = "Welcome to Fast & Furious Car Showroom! 🏎️\nHow can I assist you today?";
        this.addMessage('bot', welcomeMessage);
    }

    toggleChatbot() {
        const toggle = document.getElementById('chatbotToggle');
        const window = document.getElementById('chatbotWindow');
        
        this.isOpen = !this.isOpen;
        toggle.classList.toggle('active');
        window.classList.toggle('active');
        
        if (this.isOpen) {
            document.getElementById('chatbotInput').focus();
        }
    }

    addMessage(sender, content) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(messageContent);
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ sender, content, timestamp: new Date() });
    }

    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const apiResponse = await this.getAPIResponse(message);
            
            if (apiResponse && apiResponse.answer) {
                this.hideTypingIndicator();
                this.addMessage('bot', apiResponse.answer);
            } else {
                this.hideTypingIndicator();
                this.addMessage('bot', "I couldn't get a response. Please try again.");
            }
        } catch (error) {
            console.error('API Error:', error);
            this.hideTypingIndicator();
            this.addMessage('bot', "Sorry, I'm having trouble connecting to the server.");
        }
    }

    async getAPIResponse(message) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message })
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching from API:', error);
            throw error;
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot';
        typingElement.id = 'typingIndicator';
        
        typingElement.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ChatbotSystem();
});

window.addEventListener('DOMContentLoaded', () => {
    setupRealTimeValidation();
    setupFormHandlers();
    setupDatePickers();
    setupScrollAnimations();
});