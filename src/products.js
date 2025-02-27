var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export async function getProducts() {
  try {
    const data = await fetch("/es6-project-iti-ecommerce/src/products.json", requestOptions);
    const response = await data.json();
    return response;
  } catch (error) {
    console.log("Error fetching products:", error);
    return { data: [] };
  }
}
