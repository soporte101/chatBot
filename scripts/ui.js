import { validateName, validateEmail } from "./validators.js";
import {
  getQuestions,
  saveEnLocalStorage,
  getDatalocalStorage,
  getDataNews,
  getDataModule,
} from "./services.js";

//Formulario pirnipal chatbot
const formUser = document.getElementById("register-user");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatbot = document.querySelector(".chatbot");

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
const btnsendQuestion = document.getElementById("btn-sendQuestion");
const btnBack = document.getElementById("btnBack");
const questionforbot = document.querySelector(".questionforbot");
const optionsQuestion2 = document.querySelector(".optionsQuestion2");
// Obtén todos los elementos con la clase "item-question"
const btnOptions = document.querySelectorAll(".menu-question");

//Toast
btnsendQuestion.addEventListener("click", () => {
  Toastify({
    text: "Pregunta enviada con Exito",
    duration: 3000,
    //newWindow: true,
    selector: questionsbyType,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right,  blue,#788bff,)",
    },
    onClick: function () {
      console.log("hola");
    }, // Callback after click
    callback: function () {
      //questionsbyType.style.visibility = "visible";
      containtMain.classList.add("hidden-element");
      questiontypes.style.display = "block";
    },
  }).showToast();
});

//Funcion para obtener las preguntas
const obtainQuestions = async () => {
  const { results } = await getQuestions();
  return results;
};
//Funcion para obtener los filtros
const obtainFilters = async () => {
  const { filters } = await getQuestions();
  return filters;
};

//Variables del formulario
let userMessage = null; // Variable to store user's message
let nameuser = JSON.parse(localStorage.getItem("data"))?.nombre || "User";
let nameModule = "";
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
  if (
    className === "incoming" &&
    message === "Deseas hacer otra pregunta sobre este modulo ?"
  ) {
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
  console.log(getDatalocalStorage());

  if (getDatalocalStorage()) {
    TypescreenQuestions();
  } else {
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
  }
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
function ScreenMainChat(NameModule) {
  btnBack.style.display = "block";
  getDatalocalStorage(nameuser);
  chatBoxInput.style.visibility = "visible";
  if (chatBoxInput.style.visibility == "visible") {
    container_form.style.display = "none";
    container_chatbox.classList.remove("hidden");
    const chatList = document.querySelector(".chatbox");
    chatList.innerHTML = "";
    chatbox.appendChild(
      createChatLi(
        "Hola! " +
          `${nameuser}` +
          `👋 Dime que deseas buscar acerca de ${nameModule} ?. Te recomendamos buscar palabras claves.`,
        "incoming"
      )
    );
  }

  btnBack.addEventListener("click", () => {
    container_chatbox.classList.add("hidden");
    chatBoxInput.style.visibility = "hidden";
    btnBack.style.display = "";
  });
}

// Pantalla de preguntas por tipo
async function TypescreenQuestions() {
  questiontypes.style.display = "block";
  container_form.style.display = "none";
  //loading
  /*   const loadingElement = document.createElement("div");
  loadingElement.innerText = "Cargando..."; */
  showLoadingScreen(containerQuestions);
  const mensaje = document.querySelector("#welcome-message");
  mensaje.innerHTML +=
    "!Hola, " +
    `${nameuser}` +
    " !😄 Explora información importante seleccionando tu módulo de interés. Encuentra respuestas a preguntas frecuentes o déjanos tu propia pregunta. ¿Quieres interactuar con nuestro asistente virtual? <br> Estamos aqui para ayudarte. ¡Bienvenido!";

  const typeQuestion = await obtainFilters();
  typeQuestion.forEach((Tquestion) => {
    const button = document.createElement("button");
    button.id = "item-question";
    button.textContent = Tquestion;

    button.addEventListener("click", () => {
      // Acciones cuando se hace clic en el botón
      questionsbyType.style.display = "block";
      questiontypes.style.display = "none";
      screenQuestions(Tquestion);
    });
    containerQuestions.appendChild(button);
  });
  hideLoadingScreen();
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
  showLoadingScreen(containerQuestions);
  const question = await obtainQuestions();
  const filterQuestionquestion = question.filter(
    (question) => question.rtwo == typeQuestion
  );
  filterQuestionquestion.forEach((question) => {
    const button = document.createElement("button");
    button.id = "item-question";
    button.textContent = question.OData__x006e_qf7;
    button.addEventListener("click", () => {
      createChatAnswer(question.OData__x006e_qf7, question.f68h);
      containtMain.classList.add("hidden-element");
    });
    containerQuestions.appendChild(button);
  });
  hideLoadingScreen();
}

function createChatAnswer(question, answer) {
  chatbox.innerHTML = "";
  container_chatbox.classList.remove("hidden");
  chatbox.appendChild(
    createChatLi(
      "Hola! " + `${nameuser}` + "👋 Hiciste la siguiente pregunta: ",
      "incoming"
    )
  );
  chatbox.appendChild(createChatLi(question, "outgoing"));
  chatbox.appendChild(createChatLi(answer, "incoming"));
  chatbox.appendChild(
    createChatLi("Deseas hacer otra pregunta sobre este modulo ?", "incoming")
  );
}

//Evento para llevar a la screen del chatbot
btnAsistente.addEventListener("click", () => {
  const mensaje = document.querySelector("#title-typeBot");
  mensaje.innerHTML = "";
  mensaje.innerHTML +=
    `${nameuser}` + ", estas son las opciones que te puedo ofrecer: ";

  questiontypes.style.display = "none";
  questionforbot.style.display = "block";
  questionsbyType.style.display = "none";

  // btn options types questions
  btnOptions.forEach((button) => {
    button.addEventListener("click", function () {
      // Lógica o acción específica para cada botón
      const buttonText = this.textContent;
      console.log("clic");
      if (button.classList.contains("volver-menu")) {
        // Lógica específica para el botón "VOLVER AL MENU"
        console.log("Hiciste clic en: VOLVER AL MENU");
        questiontypes.style.display = "block";
        questionforbot.style.display = "none";
        /*         container_chatbox.classList.add("hidden");
        chatBoxInput.style.visibility = "hidden"; */
        // Agrega aquí la lógica específica que deseas para este botón
      } else {
        // Lógica para los otros botones
        console.log(`Hiciste clic en: ${buttonText}`);
        nameModule = buttonText;
        ScreenMainChat(buttonText);
      }
    });
  });
});

//Evento clic del boton del chat
const handleChat = async () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;
  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${chatInput.scrollHeight}px`;
  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Simulate the response
  const botResponse = await generateResponse(userMessage);
  // Mostrar mensaje inicial antes de los resultados
  const initialMessage = "Estos fueron los resultados que encontré:";
  const initialMessageLi = createChatLi(initialMessage, "incoming");
  if (Array.isArray(botResponse)) {
    chatbox.appendChild(initialMessageLi);
    botResponse.forEach(async (botResponse) => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      const titleLink = document.createElement("a");
      titleLink.href = botResponse.metadataUri; // Asigna la URL del enlace
      titleLink.target = "_blank";
      titleLink.textContent = "👉 " + botResponse.title;
      // Elimina el contenido de <p> y agrega el enlace <a>
      const paragraphElement = incomingChatLi.querySelector("p");
      paragraphElement.innerHTML = ""; // Limpiar el contenido actual
      paragraphElement.appendChild(titleLink);
      chatbox.scrollTo(0, chatbox.scrollHeight);
    });
  } else {
    console.log(botResponse);
    chatbox.appendChild(createChatLi(botResponse, "incoming"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
};

export const handleClick = () => {
  chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });
  chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 400) {
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

// Funcion para generar respuesata en el chat
async function generateResponse(userMessage) {
  let results = "";
  if (nameModule == "NOTICIAS Y ACTUALIZACIONES") {
    results = await getDataNews(normalize(userMessage));
  }
  if (nameModule == "TRÁMITES Y SERVICIOS") {
    results = await getDataModule(normalize(userMessage));
  }
  if (results.length > 0) {
    return results;
  } else {
    return "Lo siento, no tenemos resultados para lo consultado, puedes realizar otra pregunta.";
  }
}

//Function por Loading screen
function showLoadingScreen(containerShow) {
  //Container show es donde se mostrara el spinner de carga
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading-screen";
  //loadingElement.textContent = "Cargando...";
  containerShow.appendChild(loadingElement);
}
function hideLoadingScreen() {
  // Lógica para ocultar la pantalla de carga
  const loadingElement = document.getElementById("loading-screen");
  if (loadingElement) {
    loadingElement.parentNode.removeChild(loadingElement);
  }
}
