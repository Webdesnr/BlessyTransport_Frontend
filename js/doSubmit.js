const inputs = document.querySelectorAll(".form-input");
const formData = document.querySelector("form");

const user = {
  name: "",
  phone: "",
  email: "",
  from: "",
  to: "",
};

const error = {};

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  for (const element of e.target.elements) {
    const { name, value } = element;
    if (name) handleError(name, value);
  }
  if (isError()) return;
  console.log(user);
});

inputs.forEach((input) => {
  input.addEventListener("input", function (input) {
    const { name, value } = input.target;
    handleError(name, value);
    user[name] = value;
  });
});

function isError() {
  return Object.keys(error).length !== 0;
}

function validateUserInput(name, value) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let type = name == "name" || name == "from" || name == "to";

  if (value.trim() === "") {
    error[name] = `${name.toUpperCase()} is Required`;
    return;
  }

  if (type && value.length < 3) {
    error[name] = `${name.toUpperCase()} is Too Short`;
    return;
  }

  if (name === "email" && !emailRegex.test(value)) {
    error[name] = `${name.toUpperCase()} is Invalid`;
    return;
  }
  delete error[name];
}

function showError(name) {
  const errorBox = document.getElementById(name);
  if (error[name]) {
    errorBox.classList.add("showError");
    errorBox.innerText = error[name];
  } else errorBox.classList.remove("showError");
}

function handleError(name, value) {
  validateUserInput(name, value);
  showError(name);
}
