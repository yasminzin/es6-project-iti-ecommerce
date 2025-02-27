import { getProducts } from "../src/products.js";

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
  localStorage.removeItem("users");
  localStorage.removeItem("productDetails");
  location.replace("../home/index.html");
};
window.replace = replace;

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
                          <button class="card-button mx-2" onclick="mustLog(event)">
                            <i class="fa-solid fa-plus"></i>
                          </button>
                          <span class="cart-qnt mx-2">0</span>
                          <button class="card-button mx-2" onclick="mustLog(event)">
                            <i class="fa-solid fa-minus"></i>
                          </button>
                        </section>
      </section>
    </section>
  `;
  section.innerHTML = sectionHTML;
  cardContainer.append(section);
};

let mustLog = (event) => {
  event.preventDefault();
  event.stopPropagation();
  alert("You Must Login First");
};
window.mustLog = mustLog;
