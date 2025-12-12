// Inject chatbot HTML into the page, then load chatbot JS
fetch("chatbot.html")
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    // Now load chatbot JS AFTER elements exist
    const chatbotScript = document.createElement("script");
    chatbotScript.src = "chatbot.js";
    document.body.appendChild(chatbotScript);
  })
  .catch(err => console.error("Chatbot failed to load:", err));
