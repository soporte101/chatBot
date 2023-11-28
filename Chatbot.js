const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBoxInput = document.querySelector(".chat-input");
const container_form = document.querySelector(".register-chat");
const container_chatbox = document.querySelector(".hidden");
const continuarBtn = document.querySelector(
  ".input-field.button input[type='button']"
);

let userMessage = null; // Variable to store user's message
let nameuser = JSON.parse(localStorage.getItem("data"))?.nombre || "User";

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span><i class='bx bx-bot'></i></span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};
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
    [normalize("Bien")]:
      "¡Me alegra que estes bien, cuentame cual es tu pregunta ?",
    [normalize("ok")]: "Espero haya sido de utilidad",

    // Agrega más respuestas predefinidas según sea necesario
  };

  return (
    responses[normalize(userMessage)] ||
    "Lo siento, no entendí eso. ¿Puedes reformular? o escribe a email@dominio.com"
  );
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

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
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

/* FORM */

document.addEventListener("DOMContentLoaded", function () {
  const formUser = document.getElementById("register-user");

  formUser.addEventListener("submit", function (event) {
    // Obtener valores del formulario
    const nameuser = document.getElementById("name-user").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const politicaCheckbox = document.getElementById("politicaCheckbox");
    const acuerdosCheckbox = document.getElementById("acuerdosCheckbox");
    const txtcheck1 = document.querySelector(".txt-check1");
    const txtcheck2 = document.querySelector(".txt-check2");

    if (!validateForm()) {
      event.preventDefault();
    } else {
      // Guardar datos en el localStorage
      saveEnLocalStorage(nameuser + " " + lastname, email, ScreenMainChat);
      // Limpiar el formulario
      formUser.reset();
    }

    function validateForm() {
      let isValid = true;

      const nameError = document.getElementById("name-error");
      const lastnameError = document.getElementById("lastname-error");
      const emailError = document.getElementById("email-error");
      // Validación del nombre
      if (nameuser.trim() === "") {
        nameError.textContent = "*El nombre es requerido";
        isValid = false;
      } else {
        nameError.textContent = "";
      }

      // Validación del apellido
      if (lastname.trim() === "") {
        lastnameError.textContent = "*El apellido es requerido";
        isValid = false;
      } else {
        lastnameError.textContent = "";
      }
      // Validación del correo electrónico
      if (email.trim() === "") {
        emailError.textContent = "*El correo electrónico es requerido";
        isValid = false;
      } else if (!isValidEmail(email.trim())) {
        emailError.textContent = "*Ingrese un correo electrónico válido";
        isValid = false;
      } else {
        emailError.textContent = "";
      }
      if (!politicaCheckbox.checked || !acuerdosCheckbox.checked) {
        txtcheck1.style.color = "red";
        txtcheck2.style.color = "red";

        isValid = false;
      } else {
        txtcheck1.style.color = "";
        txtcheck2.style.color = "";
      }

      return isValid;
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });

  function saveEnLocalStorage(nombre, email, callBack) {
    // Crear un objeto con los datos
    const savedData = {
      nombre: nombre,
      email: email,
    };
    // Guardar el objeto en el localStorage
    localStorage.setItem("data", JSON.stringify(savedData));
    if (callBack) {
      callBack();
    }
  }
});

function getDatalocalStorage() {
  // Recuperar datos del localStorage
  const savedData = localStorage.getItem("data");
  // Verificar si hay datos guardados
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    // Acceder a los datos
    nameuser = parsedData.nombre;
    // Llamar a una función y pasar el nombre como argumento
  }
}

function ScreenMainChat() {
  getDatalocalStorage();
  chatBoxInput.style.visibility = "visible";
  if (chatBoxInput.style.visibility == "visible") {
    container_form.style.display = "none";
    container_chatbox.classList.remove("hidden");
    const chatList = document.querySelector(".chatbox");
    const ultimoMensaje = chatList.lastElementChild;
    if (ultimoMensaje.classList.contains("incoming")) {
      const mensaje = ultimoMensaje.querySelector("p");
      mensaje.innerHTML +=
        "Hola! " + `${nameuser}` + "👋<br>Como podemos ayudarte hoy?";
    }
  }
}
