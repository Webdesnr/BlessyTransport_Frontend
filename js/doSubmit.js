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

formData.addEventListener("submit", async function (e) {
  e.preventDefault();
  for (const element of e.target.elements) {
    const { name, value } = element;
    if (name) handleError(name, value);
  }
  if (isError()) return;

  showLoader();

  try {
    const data = await callApi();
    inputs.forEach((input) => (input.value = ""));
    showStatus(data.name);
  } catch (error) {
    showStatus("");
  } finally {
    hideLoader();
  }
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

async function callApi() {
  const res = await fetch("https://blessytransport.onrender.com/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
}

function showStatus(userName) {
  const status = document.createElement("div");
  status.className = "status";
  status.innerText = userName
    ? `Hi, ${userName} Receivied the Quote`
    : "Sorry! , Try Again";
  formData.append(status);
  status.classList.add(userName ? "success" : "warning");
  setTimeout(() => {
    status.remove();
  }, 3000);
}

function showLoader() {
  const loader = document.createElement("span");
  loader.className = "loader";
  formData.append(loader);
}

function hideLoader() {
  document.querySelector(".loader").remove();
}
