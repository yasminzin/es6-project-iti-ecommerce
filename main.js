import { getProducts } from "../products.js";

let products = [];

const cardContainer = document.querySelector(".card-container");

const categButton = [...document.querySelectorAll(".categ-button")];

const categoriesSelect = document.querySelector("#categories");

const mobileButton = document.querySelector(".mobileButton");
const laptopButton = document.querySelector(".laptopButton");
const accessoriesButton = document.querySelector(".accessoriesButton");
const tabletButton = document.querySelector(".tabletButton");
const AllButton = document.querySelector(".allButton");

window.onload = () => {
  allFunction();
};

categoriesSelect.addEventListener("change", () => {
  if (categoriesSelect.value == "Tablet") {
    tabletsFunction(event);
  } else if (categoriesSelect.value == "Mobile") {
    mobilesFunction(event);
  } else if (categoriesSelect.value == "Laptop & PC") {
    laptopsFunction(event);
  } else if (categoriesSelect.value == "Accessories") {
    accessoriesFunction(event);
  } else if (categoriesSelect.value == "All") {
    allFunction(event);
  }
});

let categButtonColor = (target) => {
  categButton.forEach((element) => {
    element.classList.remove("active-categories-button");
  });
  target.classList.add("active-categories-button");
};

let redundant = (e, response, category) => {
  categButtonColor(e);
  cardContainer.innerHTML = "";
  response.forEach((element) => {
    if (element["Category"] == category) {
      categoriesSelect.value = element["Category"];
      showProducts(element);
    }
  });
};

let allFunction = () => {
  async function getAllHome() {
    const response = await getProducts();
    products = response["data"];
    categButtonColor(AllButton);
    cardContainer.innerHTML = "";
    response["data"].forEach((element) => {
      categoriesSelect.value = "All";
      showProducts(element);
    });
  }
  getAllHome();
};
window.allFunction = allFunction;

let showProducts = (element) => {
  let section = document.createElement("section");
  section.setAttribute("class", "col-lg-4 col-md-3 col-sm-4 coll");
  section.innerHTML = `<section class="card-item">
                        <section href="#" class="card-link">
                          <img
                            src="${element["ImageSource"]}"
                            alt="Card Image"
                            class="card-image img-fluid w-75"
                          />
                          <p class="badge developer">${element["ProductName"]}</p>
                          <h5 class="card-title price text-center fs-4 fw-bold">
                          ${element["Price"]} EGP
                          </h5>
                          <section class="cart-buttons d-flex justify-content-center">
                            <button class="card-button mx-2 details">
                              <i class="fa-solid fa-arrow-right" onclick="showDetails(${element["ProductId"]})"></i>
                            </button>
                            <button class="card-button mx-2" onclick="mustLog(event)">
                              <i class="fa-solid fa-plus"></i>
                            </button>
                            <span class="cart-qnt mx-2">0</span>
                            <button class="card-button mx-2" onclick="mustLog(event)">
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          </section>
                        </section>
                      </section>`;
  cardContainer.append(section);
};
window.showProducts = showProducts;

let tabletsFunction = () => {
  async function getTabletsHome() {
    const response = await getProducts();
    const category = "Tablet";
    redundant(tabletButton, response["data"], category);
  }
  getTabletsHome();
};
window.tabletsFunction = tabletsFunction;

let mobilesFunction = () => {
  async function getMobilesHome() {
    const response = await getProducts();
    const category = "Mobile";
    redundant(mobileButton, response["data"], category);
  }
  getMobilesHome();
};
window.mobilesFunction = mobilesFunction;

let accessoriesFunction = () => {
  async function getAccessoriesHome() {
    const response = await getProducts();
    const category = "Accessories";
    redundant(accessoriesButton, response["data"], category);
  }
  getAccessoriesHome();
};
window.accessoriesFunction = accessoriesFunction;

let laptopsFunction = () => {
  async function getLaptopsHome() {
    const response = await getProducts();
    const category = "Laptop & PC";
    redundant(laptopButton, response["data"], category);
  }
  getLaptopsHome();
};
window.laptopsFunction = laptopsFunction;

const loader = document.querySelector(".loader");

let hideLoader = () => {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
};

setTimeout(hideLoader, 1000);

const backCols = [...document.getElementsByClassName("back-image")];

var count = 0;

let showSlide = () => {
  backCols[count].classList.remove("active");
  count++;
  if (count >= backCols.length) {
    count = 0;
  }
  backCols[count].classList.add("active");
};

let slider = setInterval(showSlide, 5000);

let forImageNext = () => {
  backCols.forEach((element) => {
    element.classList.remove("active");
  });
  count++;
  if (count >= backCols.length) {
    count = 0;
  }
  backCols[count].classList.add("active");
};
window.forImageNext = forImageNext;

let forImagePrevious = () => {
  backCols.forEach((element) => {
    element.classList.remove("active");
  });
  count--;
  if (count < 0) {
    count = backCols.length - 1;
  }
  backCols[count].classList.add("active");
};
window.forImagePrevious = forImagePrevious;

const sliderElement = document.querySelector(".slider");

sliderElement.addEventListener("mouseover", () => {
  clearInterval(slider);
});

sliderElement.addEventListener("mouseleave", () => {
  slider = setInterval(showSlide, 5000);
});

let mustLog = (event) => {
  event.preventDefault();
  event.stopPropagation();
  alert("You Must Login First");
};
window.mustLog = mustLog;

const searchInput = document.querySelector("#search");

let search = (e) => {
  async function getAll() {
    if (categoriesSelect.value == "Mobile") {
      const response = await getProducts();
      let filteredArray = response["data"].filter(
        (element) =>
          element["Category"] == "Mobile" &&
          (element["ProductName"].includes(searchInput.value) ||
            element["Brand"].includes(searchInput.value))
      );
      redundant(mobileButton, filteredArray, "Mobile");
    } else if (categoriesSelect.value == "Laptop & PC") {
      const response = await getProducts();
      let filteredArray = response["data"].filter(
        (element) =>
          element["Category"] == "Laptop & PC" &&
          (element["ProductName"].includes(searchInput.value) ||
            element["Brand"].includes(searchInput.value))
      );
      redundant(mobileButton, filteredArray, "Laptop & PC");
    } else if (categoriesSelect.value == "Accessories") {
      const response = await getProducts();
      let filteredArray = response["data"].filter(
        (element) =>
          element["Category"] == "Accessories" &&
          (element["ProductName"].includes(searchInput.value) ||
            element["Brand"].includes(searchInput.value))
      );
      redundant(mobileButton, filteredArray, "Accessories");
    } else if (categoriesSelect.value == "Tablet") {
      const response = await getProducts();
      let filteredArray = response["data"].filter(
        (element) =>
          element["Category"] == "Tablet" &&
          (element["ProductName"].includes(searchInput.value) ||
            element["Brand"].includes(searchInput.value))
      );
      redundant(mobileButton, filteredArray, "Tablet");
    } else {
      const response = await getProducts();
      let filteredArray = response["data"].filter(
        (element) =>
          element["ProductName"].includes(searchInput.value) ||
          element["Brand"].includes(searchInput.value)
      );
      cardContainer.innerHTML = "";
      filteredArray.forEach((element) => {
        showProducts(element);
      });
    }
  }

  getAll();
};
window.search = search;

let showDetails = (productId) => {
  let product = products.filter((element) => element["ProductId"] == productId);

  localStorage.setItem("productDetails", JSON.stringify(...product));
  window.open("./productHome/index.html", "_blank");
};
window.showDetails = showDetails;
