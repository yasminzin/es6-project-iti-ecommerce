import { getProducts } from "./src/products.js";

let products = [];

let allFunction = () => {
  async function getAllHome() {
    const response = await getProducts();
    products = response["data"];
  }
  getAllHome();
};
window.allFunction = allFunction;
allFunction();

const welcomeSpan = document.querySelector(".welcome-span");

let fname = localStorage.getItem("current fname");
let lname = localStorage.getItem("current lname");

welcomeSpan.innerHTML = `<span><i class="fa-solid fa-face-smile pe-2 text-danger fs-5"></i></span><span class="bordered">Wel</span>come ${fname} ${lname}`;

const loader = document.querySelector(".loader");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalCost = localStorage.getItem("totalCost");

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
  localStorage.removeItem("users");
  localStorage.removeItem("productDetails");
  location.replace("../home/index.html");
};

let productDetails = JSON.parse(localStorage.getItem("productDetails"));

let cardContainer = document.querySelector(".card-container");

const {
  ProductName,
  Color,
  Price,
  Category,
  PlayTime,
  ChargeTime,
  Connection,
  ImageSource,
  CPU,
  RAM,
  Storage,
} = productDetails;

window.onload = () => {
  let qnt;
  let ordered = cart.find(
    (product) => productDetails["ProductId"] == product["ProductId"]
  );
  if (ordered) {
    qnt = ordered["Quantity"];
  } else {
    qnt = 0;
  }
  let section = document.createElement("section");
  section.setAttribute("class", "col-lg-4 col-md-3 col-sm-4 coll");
  let sectionHTML = `<section class="card-item">
                  <section href="#" class="card-link">
                    <img
                      src="${productDetails["ImageSource"]}"
                      alt="Card Image"
                      class="card-image img-fluid w-75"
                    />
                    
                    <p class="badge developer">${productDetails["ProductName"]}</p>
                    <h5 class="card-title price text-center fs-4 fw-bold pb-3">
                    ${productDetails["Price"]} EGP
                    </h5>`;

  if (
    productDetails["Category"] == "Mobile" ||
    productDetails["Category"] == "Laptop & PC" ||
    productDetails["Category"] == "Tablet"
  ) {
    sectionHTML += `<p class="card-title text-center">
                    CPU : ${productDetails["CPU"]}
                    </p>
                    <p class="card-title text-center">
                    RAM : ${productDetails["RAM"]}
                    </p>
                    <p class="card-title text-center">
                    Storage : ${productDetails["Storage"]}
                    </p>
                    <p class="card-title text-center">
                    Color : ${productDetails["Color"]}
                    </p>`;
  } else if (productDetails["Category"] == "Accessories") {
    sectionHTML += `<p class="card-title text-center">
                    Play Time : ${productDetails["PlayTime"]}
                    </p>
                    <p class="card-title text-center">
                    Charge Time : ${productDetails["ChargeTime"]}
                    </p>
                    <p class="card-title text-center">
                    Connection : ${productDetails["Connection"]}
                    </p>
                    <p class="card-title text-center">
                    Color : ${productDetails["Color"]}
                    </p>`;
  }
  sectionHTML += `
  <section class="cart-buttons d-flex justify-content-center">
                          <button class="card-button mx-2" onclick="addToCart(event, '${productDetails["ProductId"]}')">
                            <i class="fa-solid fa-plus"></i>
                          </button>
                          <span class="cart-qnt mx-2">${qnt} </span>
                          <button class="card-button mx-2" onclick="removeFromCart(event, '${productDetails["ProductId"]}')">
                            <i class="fa-solid fa-minus"></i>
                          </button>
                        </section>
      </section>
    </section>
  `;
  section.innerHTML = sectionHTML;
  cardContainer.append(section);
};

let addToCart = (e, productId) => {
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
    productInfo.Quantity = 1;
    qnt.innerText = `${productInfo.Quantity}`;
    cart.push(productInfo);
  } else {
    productInCart.Quantity++;
    qnt.innerText = `${productInCart.Quantity}`;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  let totalCostElement = document.querySelector(".total-cost");

  let totalCost = cart.reduce((acc, value) => {
    let priceWithoutCurrency = value["Price"].replace("EGP", "");
    let priceWithoutDot = priceWithoutCurrency.replace(".", "");
    return (acc = acc + priceWithoutDot * value["Quantity"]);
  }, 0);

  if (totalCost > 900000) {
    alert("You Reached the limit!");
    return;
  }

  totalCost = adjustTotalCost(totalCost);

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
        (element) => element["ProductId"] == productInCart["ProductId"]
      );
      cart.splice(index, 1);
      qnt.innerText = `${productInCart.Quantity}`;
    } else {
      qnt.innerText = `${productInCart.Quantity}`;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length === 0) {
    let proceedForm = document.querySelector(".proceed-form");
    proceedForm.remove();
    cardContainer.innerHTML = `
    <section
          class="row d-flex justify-content-center align-content-center card-container"
        >
        <section class="card-item">
      <section href="#" class="card-link">
        <h5 class="card-title price text-center fs-4 fw-bold">
          No Items in the cart
        </h5>
      </section>
    </section>
        </section>`;
    // let section = document.createElement("section");
    // section.innerHTML = `<section class="card-item">
    //   <section href="#" class="card-link">
    //     <h5 class="card-title price text-center fs-4 fw-bold">
    //       No Items in the cart
    //     </h5>
    //   </section>
    // </section>`;
    // cardContainer.append(section);
  }

  let totalCostElement = document.querySelector(".total-cost");

  let totalCost = cart.reduce((acc, value) => {
    let priceWithoutCurrency = value["Price"].replace("EGP", "");
    let priceWithoutDot = priceWithoutCurrency.replace(".", "");
    return (acc = acc + priceWithoutDot * value["Quantity"]);
  }, 0);

  totalCost = adjustTotalCost(totalCost);

  localStorage.setItem("totalCost", totalCost);
};
window.removeFromCart = removeFromCart;

99.444;
let adjustTotalCost = (totalCost) => {
  if (String(totalCost).length > 3) {
    let rightNumbers = totalCost % 1000;
    let leftNumbers =
      totalCost / 1000 - (totalCost / 1000 - Math.floor(totalCost / 1000));
    totalCost = `${leftNumbers}.${rightNumbers}`;
    return totalCost;
  } else {
    return totalCost;
  }
};
window.adjustTotalCost = adjustTotalCost;
