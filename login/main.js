const loader = document.querySelector(".loader");

function hideLoader() {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
}

setTimeout(hideLoader, 1000);

const notes = document.querySelector(".notes");

let check = (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const pass = document.querySelector("#pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let emailMatch = users.find(
    (user) => user.email == email && user.pass == pass
  );

  if (emailMatch) {
    localStorage.setItem("current userId", emailMatch.userId);
    localStorage.setItem("current email", emailMatch.email);
    localStorage.setItem("current fname", emailMatch.fname);
    localStorage.setItem("current lname", emailMatch.lname);
    notes.innerHTML = "Logged In Successfully";
    location.replace("../user/index.html");
  } else {
    notes.innerHTML = "Wrong Password or Email*";
  }
};

document.querySelector("button[name='login']").addEventListener("click", check);

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
