const baseURL = "../data/data.json";

const URL_ENDPOINTS = {
  ListQuestions: "Test_Lista", //Nombre de La lista donde se alojan las preguntas
  Noticias: "NuestraAlcaldia/SaladePrensa",
  Questions: "Ciudadanos", // Lugar donde se encuentra la lista de preguntas.
  Tramites: "",
};

const url = `http://192.168.20.219:22470/${URL_ENDPOINTS.Questions}/_api/lists/getbytitle('${URL_ENDPOINTS.ListQuestions}')/items`;

const headers = {
  Accept: "application/json;odata=verbose",
  "Content-Type": "application/json;odata=verbose",
};

export const getQuestions = async () => {
  try {
    const { data } = await axios.get(url, { headers });
    const { results } = data.d;
    console.log(results);
    let filters = [];
    results.forEach((element) => {
      if (!filters.includes(element.rtwo)) {
        filters.push(element.rtwo);
      }
    });
    const response = {
      results,
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
    return true
  }else {
    return false
  }
}

async function fetchData() {
  try {
    const response = await axios.get(url, { headers });
    // Manejar la respuesta aquí
    let filters = [];
    response.data.d.results.forEach((element) => {
      if (!filters.includes(element.rtwo)) {
        filters.push(element.rtwo);
      }
    });
    console.log(filters);
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
  }
}

export async function getDataNews(userMessage) {
  try {
    const response = await axios.get(
      `http://192.168.20.219:22470/${URL_ENDPOINTS.Noticias}/_api/lists/getbytitle('Páginas')/items?$top=5000`,
      { headers }
    );
    // Extraer y mapear los datos específicos que necesitas
    const transformedData = response.data.d.results.map((item) => {
      const slug = item.Title.replace(/\s+/g, "-");
      const baseUrl = `http://192.168.20.219:22470/${URL_ENDPOINTS.Noticias}/Paginas/`;

      return {
        metadataUri: `${baseUrl}${slug}.aspx`, //Url de la pagina
        title: item.Title,
        Date: item.Modified,
      };
    });
    return MatchingItem(userMessage, transformedData);
  } catch (error) {
    console.log(error);
  }
}

export async function getDataModule(userMessage) {
  try {
    const response = await axios.get(
      `http://192.168.20.219:22470/${URL_ENDPOINTS.Questions}/_api/lists/getbytitle('TramitesyServicios')/items?$top=5000`,
      { headers }
    );
    const transformedData = response.data.d.results.map((item) => {
      return {
        title: item.Title,
        metadataUri: item.Categor_x00ed_a_x0020_SUIT?.Url,
        Date: item.Modified,
      };
    });
    return MatchingItem(userMessage,transformedData)
  } catch (error) {
    console.log(error);
  }
}
const MatchingItem = (userMessage, searchData) => {
  // Encuentra coincidencias entre el mensaje del usuario y los datos de la API
  const matchingItem = searchData.filter((item) =>
    item.title.toLowerCase().includes(userMessage.toLowerCase())
  ).sort((a,b) => {
    // Ordena por fecha en orden ascendente (la más cercana primero)
    const dateA = new Date(a.Date); 
    const dateB = new Date(b.Date);
    return dateA - dateB;
  })
  .slice(0, 5); // Toma los primeros 5 elementos después de ordenar
  return matchingItem;
};
