// Wait until chatbot HTML is ready
document.addEventListener("DOMContentLoaded", function () {

    const icon = document.getElementById("chatbot-icon");
    const windowEl = document.getElementById("chatbot-window");
    const sendBtn = document.getElementById("chatbot-send");
    const input = document.getElementById("chatbot-text");
    const messages = document.querySelector(".chatbot-messages");
    const quickButtons = document.querySelectorAll(".chatbot-quick");
    const MAX_QUESTIONS = 5; // hard cap between 3-5 questions per session
    let questionCount = 0;
    let hasShownLimitMessage = false;

    if (!icon || !windowEl) return;

    // Toggle chatbot visibility
    icon.addEventListener("click", () => {
        windowEl.classList.toggle("open");
    });

    // Auto greeting after 3 seconds
    setTimeout(() => {
        botMessage("Hello! 👋 I'm here to help with appointments, services, and clinic info.");
    }, 1500);

    // Send message on click
    sendBtn.addEventListener("click", () => handleUserMessage(input.value));

    // Send message on Enter
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") handleUserMessage(input.value);
    });

    // Quick buttons logic
    quickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            handleUserMessage(btn.dataset.msg);
        });
    });

    function handleUserMessage(rawText) {
        const text = rawText.trim();
        if (text === "") return;
        if (questionCount >= MAX_QUESTIONS) {
            showLimitReached();
            return;
        }

        questionCount += 1;
        userMessage(text);
        input.value = "";

        setTimeout(() => {
            botMessage(autoResponse(text));
            if (questionCount >= MAX_QUESTIONS) showLimitReached();
        }, 500);
    }

    // Add user message to chat
    function userMessage(text) {
        messages.innerHTML += `<div class="chatbot-user-msg">${text}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }

    // Add bot message to chat
    function botMessage(text) {
        messages.innerHTML += `<div class="chatbot-bot-msg">${text}</div>`;
        messages.scrollTop = messages.scrollHeight;
    }

    // Predefined responses (hardcoded)
    function autoResponse(input) {
        const normalized = input.toLowerCase();

        if (normalized.includes("book")) {
            return `✅ You can book an appointment here:<br><a href="BookingDP.html">Click to Book</a>`;
        }

        if (normalized.includes("service")) {
            return `🦷 We offer whitening, implants, braces, root canals and more:<br><a href="ServiceDP.html">View Services</a>`;
        }

        if (normalized.includes("emergency")) {
            return `🚑 Emergency dental care is available:<br><a href="EmergencyDP.html">Emergency Info</a>`;
        }

        if (normalized.includes("hours") || normalized.includes("open")) {
            return `🕒 Our clinic hours:<br>Sat–Thu: 9am – 9pm<br>Friday: Closed`;
        }

        return `I can answer only these questions right now: book an appointment, services offered, emergency care, and clinic hours.`;
    }

    function showLimitReached() {
        if (hasShownLimitMessage) return;
        hasShownLimitMessage = true;
        botMessage(`You've reached the limit of ${MAX_QUESTIONS} questions for this chat. Feel free to call us for more help!`);
        input.disabled = true;
        sendBtn.disabled = true;
        quickButtons.forEach(btn => btn.disabled = true);
    }
});
