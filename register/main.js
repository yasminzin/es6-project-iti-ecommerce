const loader = document.querySelector(".loader");

function hideLoader() {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
}

setTimeout(hideLoader, 1000);

const inputs = document.querySelectorAll("input");

const emailReq = document.querySelector(".email-required");
let emailStatus = false;

let emailValid = (e) => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(inputs[2].value)) {
    emailStatus = true;
    emailReq.innerHTML = "";
  } else {
    emailStatus = false;
    emailReq.innerHTML = "Invalid Email*";
  }
};

const passReq = document.querySelector(".pass-required");
let passStatus = false;

let passValid = (e) => {
  let passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/;
  if (passRegex.test(inputs[3].value)) {
    passStatus = true;
    passReq.innerHTML = "";
  } else {
    passStatus = false;
    passReq.innerHTML = "Invalid Password*";
  }
};

const fnameReq = document.querySelector(".fname-required");
let fnameStatus = false;

let fnameValid = (e) => {
  let fnameRegex = /^[A-Za-z]{3,}$/;
  if (fnameRegex.test(inputs[0].value)) {
    fnameStatus = true;
    fnameReq.innerHTML = "";
  } else {
    fnameStatus = false;
    fnameReq.innerHTML = "The first name must be at least 3 letters long*";
  }
};

const lnameReq = document.querySelector(".lname-required");
let lnameStatus = false;

let lnameValid = (e) => {
  let lnameRegex = /^[A-Za-z]{3,}$/;
  if (lnameRegex.test(inputs[1].value)) {
    lnameStatus = true;
    lnameReq.innerHTML = "";
  } else {
    lnameStatus = false;
    lnameReq.innerHTML = "The last name must be at least 3 letters long*";
  }
};

let togglePassword = (e) => {
  const passwordInput = document.getElementById("pass");
  const passIcon = document.querySelector(".pass-icon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passIcon.innerHTML = `<i class="fa-solid fa-eye-slash text-white"></i>`;
  } else {
    passwordInput.type = "password";
    passIcon.innerHTML = `<i class="fa-solid fa-eye text-white"></i>`;
  }
};

let generateRandomId = () => {
  let randomId = Math.floor(Math.random() * 10000);
  randomId = String(randomId);
  if (randomId.length == 1) {
    randomId = "000" + randomId;
  } else if (randomId.length == 2) {
    randomId = "00" + randomId;
  } else if (randomId.length == 3) {
    randomId = "0" + randomId;
  }
  return randomId;
};

const notes = document.querySelector(".notes");

let register = (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const pass = document.querySelector("#pass").value;
  const fname = document.querySelector("#first-name").value;
  const lname = document.querySelector("#last-name").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (
    fnameStatus &&
    lnameStatus &&
    emailStatus &&
    passStatus &&
    !users.find((user) => user.email === email)
  ) {
    let userId = generateRandomId();
    while (users.find((user) => user.userId == userId)) {
      userId = generateRandomId();
    }
    users.push({ fname, lname, email, pass, userId });
    localStorage.setItem("users", JSON.stringify(users));
    notes.innerHTML = "User Registered Successfuly";
    location.replace("../index.html");
  } else if (users.find((user) => user.email === email)) {
    notes.innerHTML = "Email Already Registered*";
  } else {
    notes.innerHTML = "Please fill all fields correctly*";
  }
};

document
  .querySelector("button[name='register']")
  .addEventListener("click", register);
