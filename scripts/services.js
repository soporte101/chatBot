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
