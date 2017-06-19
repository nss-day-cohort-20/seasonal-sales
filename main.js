console.log("Yup, it loaded");

let reqProducts = new XMLHttpRequest();
let reqCats = new XMLHttpRequest();

function displayProducts() {
  let prodArr = JSON.parse(event.target.responseText).products;

  console.log("products array", prodArr);
}

reqProducts.addEventListener("load", displayProducts)

reqProducts.open("GET", "data/products.json");
reqProducts.send();
