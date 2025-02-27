import { getProducts } from "./src/products.js";

let products = [];

const cardContainer = document.querySelector(".card-container");

const categButton = [...document.querySelectorAll(".categ-button")];

const categoriesSelect = document.querySelector("#categories");

const mobileButton = document.querySelector(".mobileButton");
const laptopButton = document.querySelector(".laptopButton");
const accessoriesButton = document.querySelector(".accessoriesButton");
const tabletButton = document.querySelector(".tabletButton");
const AllButton = document.querySelector(".allButton");

const welcomeSpan = document.querySelector(".welcome-span");

let fname = localStorage.getItem("current fname");
let lname = localStorage.getItem("current lname");

welcomeSpan.innerHTML = `<span><i class="fa-solid fa-face-smile pe-2 text-danger fs-5"></i></span><span class="bordered">Wel</span>come ${fname} ${lname}`;

window.onload = () => {
  allFunction();
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
  let qnt;
  let ordered = cart.find(
    (product) => element["ProductId"] == product["ProductId"]
  );
  if (ordered) {
    qnt = ordered["Quantity"];
  } else {
    qnt = 0;
  }
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
                            <button class="card-button mx-2" onclick="addToCart(event, '${element["ProductId"]}')">
                              <i class="fa-solid fa-plus"></i>
                            </button>
                            <span class="cart-qnt mx-2">${qnt}</span>
                            <button class="card-button mx-2" onclick="removeFromCart(event, '${element["ProductId"]}')">
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

let replace = () => {
  localStorage.removeItem("current userId");
  localStorage.removeItem("current email");
  localStorage.removeItem("current fname");
  localStorage.removeItem("current lname");
  localStorage.removeItem("cart");
  localStorage.removeItem("totalCost");
  localStorage.removeItem("productDetails");
  location.replace("../index.html");
};
window.replace = replace;

// CART

// 1. check if the product already in the cart
//          if it's in the cart we will increase quantity of object by 1
//          if it's not in the cart we will set the object of the product with quantity 0 in the cart
// 2. update the cart by removing the item in the cart and add it again

let addToCart = (e, productId) => {
  e.preventDefault();
  let button = e.target.closest("button");
  let qnt = button.parentElement.querySelector(".cart-qnt");

  // get the product info according to the product id
  let productInfo = products.find((product) => {
    return product["ProductId"] == productId;
  });

  // check if the product in the cart or not
  let productInCart = cart.find((product) => {
    return product["ProductId"] == productId;
  });

  // if the product is not in the cart
  if (!productInCart) {
    // set the quantity to 1 instead of 0
    productInfo.Quantity = 1;
    // change the quantity in screen
    qnt.innerText = `${productInfo.Quantity}`;
    // push the value in cart
    cart.push(productInfo);

    // if the product in the cart
  } else {
    // increase the value of quantity of productInCart (already in the cart with its info) by 1
    productInCart.Quantity++;
    // change the quantity in screen
    qnt.innerText = `${productInCart.Quantity}`;
  }

  // replace the cart in the local storage with the new cart
  localStorage.setItem("cart", JSON.stringify(cart));

  let totalCost = cart.reduce((acc, value) => {
    let priceWithoutCurrency = value["Price"].replace("EGP", "");
    let priceWithoutDot = priceWithoutCurrency.replace(".", "");
    return (acc = acc + priceWithoutDot * value["Quantity"]);
  }, 0);

  if (totalCost > 900000) {
    alert("You Reached the limit!");
    return;
  }

  localStorage.setItem("totalCost", totalCost);
};
window.addToCart = addToCart;

let removeFromCart = (e, productId) => {
  e.preventDefault();
  let button = e.target.closest("button");
  let qnt = button.parentElement.querySelector(".cart-qnt");

  let productInfo = products.find((product) => {
    return product["ProductId"] == productId;
  });

  let productInCart = cart.find((product) => {
    return product["ProductId"] == productId;
  });

  if (!productInCart) {
    return;
  } else {
    if (productInCart.Quantity == 0) {
      return;
    }
    productInCart.Quantity--;
    if (productInCart["Quantity"] == 0) {
      let index = cart.findIndex(
        (element) => (element) =>
          element["ProductId"] == productInCart["ProductId"]
      );
      cart.splice(index, 1);
      qnt.innerText = `${productInCart.Quantity}`;
    } else {
      qnt.innerText = `${productInCart.Quantity}`;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  let totalCost = cart.reduce((acc, value) => {
    let priceWithoutCurrency = value["Price"].replace("EGP", "");
    let priceWithoutDot = priceWithoutCurrency.replace(".", "");
    return (acc = acc + priceWithoutDot * value["Quantity"]);
  }, 0);

  localStorage.setItem("totalCost", totalCost);
};
window.removeFromCart = removeFromCart;

let showDetails = (productId) => {
  let product = products.filter((element) => element["ProductId"] == productId);

  localStorage.setItem("productDetails", JSON.stringify(...product));
  window.open("../productUser/index.html", "_blank");
};
window.showDetails = showDetails;
