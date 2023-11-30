import { validateName, validateEmail } from "./validators.js";
import {
  getQuestions,
  saveEnLocalStorage,
  getDatalocalStorage,
} from "./services.js";

//Formulario pirnipal chatbot

const formUser = document.getElementById("register-user");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBoxInput = document.querySelector(".chat-input");
const container_form = document.querySelector(".register-chat");
const container_chatbox = document.querySelector(".hidden");
const submitButton = document.querySelector(
  ".input-field.button input[type='button']"
);
const containerQuestions = document.querySelector(".container-questions");
const questionsbyType = document.querySelector(".questionsbyType");
const questiontypes = document.querySelector(".question-types");
const btnAsistente = document.querySelector("#item-question");
const containtMain = document.querySelector(".containt-main");

//Funcion para obtener las preguntas
const obtainQuestions = async () => {
  const { questions } = await getQuestions();
  return questions;
};
//Funcion para obtener los filtros
const obtainFilters = async () => {
  const { filters } = await getQuestions();
  return filters;
};

//Variables del formulario
let userMessage = null; // Variable to store user's message
let nameuser = JSON.parse(localStorage.getItem("data"))?.nombre || "User";

const createChatLi = (message, className) => {
  const messages = chatbox.querySelectorAll(".incoming");
  //identifica si hay 2 mensajes seguido y agrega margin
  messages.forEach((message, index, array) => {
    if (index > 0 && array[index - 1].classList.contains("incoming")) {
      message.style.marginBottom = "10px"; // Ajusta según sea necesario
    }
  });
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span><i class='bx bx-bot'></i></span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;

  // Agregar dos botones al final del mensaje
  if (className === "incoming" && message === "Deseas hacer otra pregunta ?") {
    const button1 = document.createElement("button");
    button1.textContent = "Si";
    button1.id = "item-question";
    button1.style.margin = "10px";
    button1.addEventListener("click", () => {
      container_chatbox.classList.add("hidden");
      containtMain.classList.remove("hidden-element");
    });
    const button2 = document.createElement("button");
    button2.id = "item-question";
    button2.textContent = "Menu Principal";
    button2.addEventListener("click", () => {
      container_chatbox.classList.add("hidden");
      questiontypes.style.display = "block";
    });
    chatLi.querySelector("p").appendChild(document.createElement("br"));
    chatLi.querySelector("p").appendChild(button1);
    chatLi.querySelector("p").appendChild(button2);
  }

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

//Formulario de registro
export const actionForm = () => {
  submitButton.addEventListener("click", function (event) {
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
      saveEnLocalStorage(nameuser + " " + lastname, email);
      event.preventDefault();
      //llamamos funcion para mostrar patanlla principal
      TypescreenQuestions();
      // Limpiar el formulario
      clearForm();
    }

    function validateForm() {
      let isValid = true;
      const nameError = document.getElementById("name-error");
      const lastnameError = document.getElementById("lastname-error");
      const emailError = document.getElementById("email-error");

      // Validación del nombre
      if (validateName(nameuser)) {
        nameError.textContent = "";
      } else {
        nameError.textContent = "*El nombre es requerido";
        isValid = false;
      }

      // Validación del apellido
      if (!validateName(lastname)) {
        lastnameError.textContent = "*El apellido es requerido";
        isValid = false;
      } else {
        lastnameError.textContent = "";
      }
      // Validación del correo electrónico
      if (!validateName(email)) {
        emailError.textContent = "*El correo electrónico es requerido";
        isValid = false;
      } else if (!validateEmail(email)) {
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
  });
};
function clearForm() {
  // Limpiar el formulario
  document.getElementById("name-user").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("politicaCheckbox").checked = false;
  document.getElementById("acuerdosCheckbox").checked = false;
}

//Pantalla del chabot
function ScreenMainChat() {
  getDatalocalStorage(nameuser);
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
// Pantalla de preguntas por tipo
async function TypescreenQuestions() {
  questiontypes.style.display = "block";
  container_form.style.display = "none";
  const typeQuestion = await obtainFilters();
  const mensaje = document.querySelector("#welcome-message");
  mensaje.innerHTML +=
    "!Hola, " +
    `${nameuser}` +
    " !😄 Explora información importante seleccionando tu módulo de interés. Encuentra respuestas a preguntas frecuentes o déjanos tu propia pregunta. ¿Quieres interactuar con nuestro asistente virtual? <br> Estamos aqui para ayudarte. ¡Bienvenido!";
  typeQuestion.forEach((Tquestion) => {
    const button = document.createElement("button");
    button.id = "item-question";
    button.textContent = Tquestion;

    button.addEventListener("click", () => {
      // Acciones cuando se hace clic en el botón
      questionsbyType.style.visibility = "visible";
      questiontypes.style.display = "none";
      screenQuestions(Tquestion);
      console.log("hola");
    });
    containerQuestions.appendChild(button);
  });
}
// Pantalla de seccion de preguntas por el tipo de pregunta  escogida.
async function screenQuestions(typeQuestion) {
  containtMain.classList.remove("hidden-element");
  const containerQuestions = document.querySelector(".question-recent");
  containerQuestions.innerHTML = "";
  const mensaje = document.querySelector("#title-typeQuestion");
  mensaje.innerHTML = "";
  mensaje.innerHTML +=
    `${nameuser}` + ", Bienvenido al modulo de " + `${typeQuestion}`;

  const question = await obtainQuestions();
  const filterQuestionquestion = question.filter(
    (question) => question.type == typeQuestion
  );
  filterQuestionquestion.forEach((question) => {
    const button = document.createElement("button");
    button.id = "item-question";
    button.textContent = question.question;
    button.addEventListener("click", () => {
      createChatAnswer(question.question, question.answer);
      containtMain.classList.add("hidden-element");
    });
    containerQuestions.appendChild(button);
  });
}

function createChatAnswer(question, answer) {
  container_chatbox.classList.remove("hidden");
  const chatList = document.querySelector(".chatbox");
  const ultimoMensaje = chatList.lastElementChild;
  if (ultimoMensaje.classList.contains("incoming")) {
    const mensaje = ultimoMensaje.querySelector("p");
    mensaje.innerHTML +=
      "Hola! " + `${nameuser}` + "👋<br>Hiciste la siguiente pregunta";
  }
  chatbox.appendChild(createChatLi(question, "outgoing"));
  chatbox.appendChild(createChatLi(answer, "incoming"));
  chatbox.appendChild(createChatLi("Deseas hacer otra pregunta ?", "incoming"));
}
//Evento para llevar a la screen del chatbot
btnAsistente.addEventListener("click", () => {
  ScreenMainChat();
});
//Evento clic del boton del chat
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

export const handleClick = () => {
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
  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });
};

function generateResponse(userMessage) {
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
}
