const objectValidate = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  nombre: /^.+$/,
};

export const validateEmail = (email) => {
  if (objectValidate.email.test(email)) {
    return true;
  }
  return false;
};

export const validateName = (name) => {
  if (objectValidate.name.test(name)) {
    return true;
  }
  return false;
};
