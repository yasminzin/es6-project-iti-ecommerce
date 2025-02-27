import { getProducts } from "../products.js";

let products;

let fetchProducts = () => {
  async function fetchProductsCart() {
    let response = await getProducts();
    response = response["data"];
    products = response;
  }
  fetchProductsCart();
};
window.fetchProducts = fetchProducts;
fetchProducts();

const loader = document.querySelector(".loader");

let hideLoader = () => {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
};

setTimeout(hideLoader, 1000);

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalCost = localStorage.getItem("totalCost");

let cardContainer = document.querySelector(".card-container");
let aboveCardContainer = document.querySelector(".above-card-container");

const welcomeSpan = document.querySelector(".welcome-span");

let fname = localStorage.getItem("current fname");
let lname = localStorage.getItem("current lname");

welcomeSpan.innerHTML = `<span><i class="fa-solid fa-face-smile pe-2 text-danger fs-5"></i></span><span class="bordered">Wel</span>come ${fname} ${lname}`;

window.onload = () => {
  if (cart[0]) {
    cart.forEach((element) => {
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
      } = element;
      if (element["Quantity"] > 0) {
        let section = document.createElement("section");
        section.setAttribute("class", "col-lg-4 col-md-3 col-sm-4 coll");
        let sectionHTML = `<section class="card-item">
                  <section href="#" class="card-link">
                    <img
                      src="${element["ImageSource"]}"
                      alt="Card Image"
                      class="card-image img-fluid w-75"
                    />
                    
                    <p class="badge developer">${element["ProductName"]}</p>
                    <h5 class="card-title price text-center fs-4 fw-bold pb-3">
                    ${element["Price"]} EGP
                    </h5>`;
        if (
          element["Category"] == "Mobile" ||
          element["Category"] == "Laptop & PC" ||
          element["Category"] == "Tablet"
        ) {
          sectionHTML += `<p class="card-title text-center">
                        CPU : ${element["CPU"]}
                        </p>
                        <p class="card-title text-center">
                        RAM : ${element["RAM"]}
                        </p>
                        <p class="card-title text-center">
                        Storage : ${element["Storage"]}
                        </p>
                        <p class="card-title text-center">
                        Color : ${element["Color"]}
                        </p>`;
        } else if (element["Category"] == "Accessories") {
          sectionHTML += `<p class="card-title text-center">
                        Play Time : ${element["PlayTime"]}
                        </p>
                        <p class="card-title text-center">
                        Charge Time : ${element["ChargeTime"]}
                        </p>
                        <p class="card-title text-center">
                        Connection : ${element["Connection"]}
                        </p>
                        <p class="card-title text-center">
                        Color : ${element["Color"]}
                        </p>`;
        }
        sectionHTML += `
      <section class="cart-buttons d-flex justify-content-center">
                              <button class="card-button mx-2 details">
                                <i class="fa-solid fa-arrow-right"></i>
                              </button>
                              <button class="card-button mx-2" onclick="addToCart(event, '${element["ProductId"]}')">
                                <i class="fa-solid fa-plus"></i>
                              </button>
                              <span class="cart-qnt mx-2">${element["Quantity"]} </span>
                              <button class="card-button mx-2" onclick="removeFromCart(event, '${element["ProductId"]}')">
                                <i class="fa-solid fa-minus"></i>
                              </button>
                            </section>
          </section>
        </section>
      `;
        section.innerHTML = sectionHTML;
        cardContainer.append(section);
      }
    });

    let total = document.createElement("section");
    total.setAttribute("class", "container coll proceed-form");
    total.innerHTML = `<p class="fw-bold fs-4 text-center">Total Cost: <span class="text-danger total-cost">${totalCost}</span></p>
    <form class="shadow p-4 mt-5 rounded-3" method="post">
  <div class="mb-3">
    <label for="exampleInputFullName1" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="exampleInputFullName1" aria-describedby="fullNameHelp" required>
  </div>
  <div class="mb-3">
    <label for="exampleInputFullNumber1" class="form-label">Full Number</label>
    <input type="number" class="form-control" id="exampleInputFullNumber1" aria-describedby="fullNumberHelp" required>
  </div>
  <div class="mb-3">
    <label for="exampleInputAddress1" class="form-label">Address</label>
    <input type="text" class="form-control" id="exampleInputAddress1" aria-describedby="addressHelp" required>
  </div>
  <div class="mb-3">
    <label for="exampleInputCardNumber1" class="form-label">Card Number</label>
    <input type="number" class="form-control" id="exampleInputCardNumber1" aria-describedby="cardNumberHelp" required>
  </div>
  <div class="mb-3">
    <label for="exampleInputCVV/CVC1" class="form-label">CVV/CVC</label>
    <input type="number" class="form-control" id="exampleInputCVV/CVC1" aria-describedby="CVV/CVCHelp" required>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <button type="submit" class="btn btn-danger" onclick="proceed(event)">Proceed</button>
</form>`;
    aboveCardContainer.append(total);
  } else {
    let section = document.createElement("section");
    section.innerHTML = `<section class="card-item">
    <section href="#" class="card-link">
    <h5 class="card-title price text-center fs-4 fw-bold">
    No Items in the cart
    </section>
    </section>`;
    cardContainer.append(section);
  }
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

  localStorage.setItem("totalCost", totalCost);

  totalCostElement.innerHTML = `${totalCost}`;
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
      let cardItem = e.target.closest(".coll");
      console.log(cardItem);
      cardItem.remove();
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
  }

  let totalCostElement = document.querySelector(".total-cost");

  let totalCost = cart.reduce((acc, value) => {
    let priceWithoutCurrency = value["Price"].replace("EGP", "");
    let priceWithoutDot = priceWithoutCurrency.replace(".", "");
    return (acc = acc + priceWithoutDot * value["Quantity"]);
  }, 0);

  localStorage.setItem("totalCost", totalCost);

  if (totalCostElement) {
    totalCostElement.innerHTML = `${totalCost}`;
  }
};
window.removeFromCart = removeFromCart;

let proceed = (e) => {
  e.preventDefault();

  location.assign("../order/index.html");
};
window.proceed = proceed;

let replace = () => {
  localStorage.removeItem("current userId");
  localStorage.removeItem("current email");
  localStorage.removeItem("current fname");
  localStorage.removeItem("current lname");
  localStorage.removeItem("cart");
  localStorage.removeItem("totalCost");
  localStorage.removeItem("users");
  localStorage.removeItem("productDetails");
  location.replace("../index.html");
};
window.replace = replace;
