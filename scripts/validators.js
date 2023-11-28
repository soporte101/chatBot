const objectValidate = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  email2: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  nombre: /^.+$/,
};

export const validateEmail = (email) => {
  if (objectValidate.email2.test(email)) {
    return true;
  }
  return false;
};

export const validateName = (name) => {
  if (objectValidate.nombre.test(name)) {
    return true;
  }
  return false;
};
