// navbar toggler function
const toggler = document.querySelector(".nav-toggler");
const collapsible = document.querySelector(".collapsible");

toggler.addEventListener("click", function () {
  collapsible.classList.toggle("collapsible--expand");
});

// set phone input to maxLength 10
const phoneNumber = document.querySelector("input[name=phone]");
const maxLength = 10;

phoneNumber.addEventListener("input", function () {
  if (phoneNumber.value.length > maxLength)
    phoneNumber.value = phoneNumber.value.slice(0, maxLength);
});
