const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span><i class='bx bx-bot'></i></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}
// Función para normalizar el texto (quitar tildes y convertir a minúsculas)
const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "");
};

const generateResponse = (userMessage) => {
    // Simula una respuesta basada en el mensaje del usuario
    const responses = {
        [normalize("Hola")]: "¡Hola! ¿En qué puedo ayudarte?",
        [normalize("¿Cómo estás?")]: "Estoy bien, gracias por preguntar.",
        [normalize("Adiós")]: "¡Hasta luego! Si tienes más preguntas, estaré aquí.",
        [normalize("Bien")]: "¡Me alegra que estes bien, cuentame cual es tu pregunta ?",
        [normalize("ok")]: "Espero haya sido de utilidad",

        // Agrega más respuestas predefinidas según sea necesario
    };

    return responses[normalize(userMessage)] || "Lo siento, no entendí eso. ¿Puedes reformular? o escribe a email@dominio.com";
};

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${chatInput.scrollHeight}px`;
    
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Simulate the response
        const botResponse = generateResponse(userMessage);
        incomingChatLi.querySelector("p").textContent = botResponse;

        // Scroll to the bottom after receiving the response
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

/* FORM */
const continuarBtn = document.querySelector(".input-field.button input[type='button']");
const chatBoxInput = document.querySelector(".chat-input")
const container_form = document.querySelector('.register-chat');
const container_chatbox = document.querySelector('.hidden');

continuarBtn.addEventListener("click", function() {
    chatBoxInput.style.visibility = "visible"

    if (chatBoxInput.style.visibility == "visible") {
        container_form.style.display = 'none';
        container_chatbox.classList.remove("hidden")
    }
  });