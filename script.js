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

    // Phone validation
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                showError(this.id, 'Please enter a valid phone number');
            } else {
                clearError(this.id);
            }
        });
    });

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

// Chatbot System - Updated with FastAPI integration
class ChatbotSystem {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.apiEndpoint = 'http://localhost:8000/chat'; // Update with your FastAPI endpoint
        this.responses = {
            greetings: [
                "Hello! Welcome to Fast & Furious Car Showroom! 🏎️ How can I help you today?",
                "Hi there! I'm here to assist you with any questions about our premium vehicles!",
                "Welcome! Looking for your dream car? I'm here to help!"
            ],
            cars: [
                "We have an amazing collection of sports cars, luxury sedans, supercars, and classic vehicles. What type of car interests you?",
                "Our inventory includes Ferrari, Lamborghini, Porsche, McLaren, Aston Martin, and Bentley. Which brand catches your eye?",
                "From high-performance sports cars to elegant luxury sedans, we have something for every automotive enthusiast!"
            ],
            services: [
                "We offer comprehensive services including car sales, maintenance & repair, financing options, and extended warranties. What would you like to know more about?",
                "Our services include new and pre-owned vehicle sales, certified maintenance, flexible financing, and complete warranty coverage.",
                "We provide full automotive solutions: sales, service, financing, and protection plans. How can we assist you?"
            ],
            testDrive: [
                "I'd be happy to help you schedule a test drive! You can book one through our contact page or I can guide you through the process.",
                "Test drives are available for all our vehicles! Would you like me to help you schedule one for a specific car?",
                "Ready to experience the thrill? Let's get you behind the wheel! Which vehicle would you like to test drive?"
            ],
            financing: [
                "We offer competitive financing options with flexible terms. Our finance team can help you find the perfect payment plan for your budget.",
                "Our financing options include auto loans, lease programs, and insurance assistance. Would you like to speak with our finance specialist?",
                "We work with multiple lenders to get you the best rates. Our finance team can pre-approve you in minutes!"
            ],
            contact: [
                "You can reach us at +977-9876543210 or visit us at Fast & Furious Car Showroom, New Road, Kathmandu. We're open Sun-Fri 6AM-6PM, Saturday Closed.",
                "Our showroom is located at Fast & Furious Car Showroom, New Road, Kathmandu. You can also email us at info@ffshowroom.com or call +977-9876543210",
                "We're here to help! Visit our contact page for all our details, or call us directly at +977-9876543210. Our showroom is located at New Road, Kathmandu."
            ],
            default: [
                "I'm checking our resources for you...",
                "Let me look that up for you...",
                "I'll find the best information about that..."
            ]
        };
        
        this.quickReplies = [
            "View Cars",
            "Schedule Test Drive",
            "Financing Options",
            "Contact Info",
            "Services"
        ];

        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.setupEventListeners();
        this.addWelcomeMessage();
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

        toggle.addEventListener('click', () => this.toggleChatbot());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        send.addEventListener('click', () => this.sendMessage());

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chatbot-container') && this.isOpen) {
                this.toggleChatbot();
            }
        });
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

    addWelcomeMessage() {
        const welcomeMessage = this.getRandomResponse('greetings');
        this.addMessage('bot', welcomeMessage, this.quickReplies);
    }

    addMessage(sender, content, quickReplies = null) {
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
        
        if (quickReplies && sender === 'bot') {
            const repliesContainer = document.createElement('div');
            repliesContainer.className = 'quick-replies';
            
            quickReplies.forEach(reply => {
                const replyButton = document.createElement('button');
                replyButton.className = 'quick-reply';
                replyButton.textContent = reply;
                replyButton.addEventListener('click', () => {
                    this.handleQuickReply(reply);
                });
                repliesContainer.appendChild(replyButton);
            });
            
            messageContent.appendChild(repliesContainer);
        }
        
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
            // First try to get a response from the FastAPI backend
            const apiResponse = await this.getAPIResponse(message);
            
            if (apiResponse && apiResponse.answer) {
                this.hideTypingIndicator();
                this.addMessage('bot', apiResponse.answer);
            } else {
                // If no API response, use the local response system
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.generateResponse(message);
                }, 1000 + Math.random() * 1000);
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to local responses if API fails
            setTimeout(() => {
                this.hideTypingIndicator();
                this.generateResponse(message);
            }, 1000 + Math.random() * 1000);
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
            return null;
        }
    }

    handleQuickReply(reply) {
        this.addMessage('user', reply);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateResponse(reply);
        }, 800);
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

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        let response;
        let quickReplies = null;
        
        if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon'])) {
            response = this.getRandomResponse('greetings');
            quickReplies = this.quickReplies;
        } else if (this.containsKeywords(lowerMessage, ['car', 'vehicle', 'ferrari', 'lamborghini', 'porsche', 'sports car', 'luxury'])) {
            response = this.getRandomResponse('cars');
            quickReplies = ['Schedule Test Drive', 'View Inventory', 'Financing Options'];
        } else if (this.containsKeywords(lowerMessage, ['service', 'maintenance', 'repair', 'warranty'])) {
            response = this.getRandomResponse('services');
            quickReplies = ['Book Service', 'Warranty Info', 'Contact Service'];
        } else if (this.containsKeywords(lowerMessage, ['test drive', 'drive', 'schedule', 'book', 'appointment'])) {
            response = this.getRandomResponse('testDrive');
            quickReplies = ['Contact Page', 'Call Now', 'View Cars'];
        } else if (this.containsKeywords(lowerMessage, ['finance', 'financing', 'loan', 'payment', 'lease', 'price'])) {
            response = this.getRandomResponse('financing');
            quickReplies = ['Get Pre-Approved', 'Contact Finance', 'View Cars'];
        } else if (this.containsKeywords(lowerMessage, ['contact', 'phone', 'address', 'location', 'hours', 'email'])) {
            response = this.getRandomResponse('contact');
            quickReplies = ['Call Now', 'Get Directions', 'Send Email'];
        } else if (this.containsKeywords(lowerMessage, ['thank', 'thanks', 'bye', 'goodbye'])) {
            response = "Thank you for visiting Fast & Furious Car Showroom! Feel free to reach out anytime. Have a great day! 🏎️";
        } else {
            response = this.getRandomResponse('default');
            quickReplies = this.quickReplies;
        }
        
        this.addMessage('bot', response, quickReplies);
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
    setupFormHandlers();
    setupDatePickers();
    setupScrollAnimations();
    
    // Initialize chatbot with FastAPI integration
    new ChatbotSystem();
});

// Loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
});

// Performance optimization: Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Call lazy loading setup
setupLazyLoading();

// Accessibility improvements
function setupAccessibility() {
    // Add keyboard navigation for custom elements
    document.querySelectorAll('.car-card, .category-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Announce form errors to screen readers
    document.querySelectorAll('.error-message').forEach(error => {
        error.setAttribute('aria-live', 'polite');
    });
}

// Initialize accessibility features
setupAccessibility();

// Console welcome message
console.log('%c🏎️ Welcome to Fast & Furious Car Showroom! 🏎️', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cExperience the thrill of premium automotive excellence', 'color: #ff4757; font-size: 14px;');
console.log('%c🤖 Chatbot system initialized and ready to assist!', 'color: #00d9ff; font-size: 14px;');