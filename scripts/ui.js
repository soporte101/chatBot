//Formulario pirnipal chatbot

// LLenamos variables globales con lo realizado  en services

import { getQuestions } from "./services.js";

let questions = [];
let filters = [];

export const getData = () => {
  getQuestions().then((res) => {
    questions = res.questions;
    filters = res.filters;
    console.log([questions, filters]);
    //Llama las funciones para pintar las tarjetas
  });
};
