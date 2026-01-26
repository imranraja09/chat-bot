document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const typingIndicator = document.getElementById('typing-indicator');
    const welcomeScreen = document.getElementById('welcome-screen');
    const promptBtns = document.querySelectorAll('.prompt-btn');
    const refreshBtn = document.getElementById('refresh-btn');

    // Auto-reply logic (Mocking an AI)
    const botResponses = [
        "That's a great question! Let me think...",
        "I can definitely help with that. Can you tell me more?",
        "Interesting! according to my data, this is quite common.",
        "I'm processing your request. One moment please.",
        "Could you please specify which part you'd like me to focus on?",
        "That sounds wonderful! I'm here if you have more questions."
    ];

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            handleBotResponse();
        }
    });

    // Handle quick prompt clicks
    promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.innerText;
            addMessage(message, 'user');
            handleBotResponse();
        });
    });

    // Refresh chat
    refreshBtn.addEventListener('click', () => {
        chatWindow.innerHTML = '';
        chatWindow.appendChild(welcomeScreen);
        welcomeScreen.style.display = 'block';
    });

    function addMessage(text, sender) {
        // Hide welcome screen on first message
        if (welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
        }

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        
        chatWindow.appendChild(messageDiv);
        scrollToBottom();
    }

    function handleBotResponse() {
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        scrollToBottom();

        // Simulate network delay
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse, 'bot');
        }, 1500);
    }

    function scrollToBottom() {
        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Input focus animation hint
    userInput.addEventListener('focus', () => {
        document.querySelector('.input-wrapper').style.borderColor = 'var(--primary-color)';
    });

    userInput.addEventListener('blur', () => {
        document.querySelector('.input-wrapper').style.borderColor = 'var(--glass-border)';
    });
});
