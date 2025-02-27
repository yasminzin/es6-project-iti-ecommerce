const welcomeSpan = document.querySelector(".welcome-span");

let fname = localStorage.getItem("current fname");
let lname = localStorage.getItem("current lname");

welcomeSpan.innerHTML = `<span><i class="fa-solid fa-face-smile pe-2 text-danger fs-5"></i></span><span class="bordered">Wel</span>come ${fname} ${lname}`;


const loader = document.querySelector(".loader");

let hideLoader = () => {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
};

setTimeout(hideLoader, 1000);

let replace = () => {
    localStorage.removeItem("current userId");
    localStorage.removeItem("current email");
    localStorage.removeItem("current fname");
    localStorage.removeItem("current lname");
    localStorage.removeItem("cart");
    localStorage.removeItem("totalCost");
    localStorage.removeItem("productDetails")
    location.replace("../index.html");
  };