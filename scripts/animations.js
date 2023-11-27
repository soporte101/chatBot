export const showQuitAnimation = (element, op, animation) => {
  if (op) {
    element.classList.remove("hidden");
    element.classList.add(`${animation}`);

    element.addEventListener("animationend", () => {
      element.classList.remove(`${animation}`);
    });
  } else {
    element.classList.add(`${animation}`);

    setTimeout(() => {
      element.classList.remove(`${animation}`);
      element.classList.add("hidden");
    }, 200);
  }
};
