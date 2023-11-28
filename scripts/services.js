const baseURL = "../data/data.json";

// Enpoints que serviran para consultar información cuando haya una libreria
// const endpoints = {
//   questions: `${baseURL}/questions`,
//   library: `${baseURL}/library`,
// };

export const getQuestions = async () => {
  try {
    const { data } = await axios.get(baseURL);
    const { questions } = data;
    let filters = [];
    questions.forEach((element) => {
      if (!filters.includes(element.type)) {
        filters.push(element.type);
      }
    });
    const response = {
      questions,
      filters,
    };
    return response;
  } catch (error) {
    console.log("a ocurrido un error por: " + error);
  }
};

export function saveEnLocalStorage(nombre, email) {
  // Crear un objeto con los datos
  const savedData = {
    nombre: nombre,
    email: email,
  };
  // Guardar el objeto en el localStorage
  localStorage.setItem("data", JSON.stringify(savedData));
}

export function getDatalocalStorage(nameuser) {
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
