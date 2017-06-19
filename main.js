console.log("Yup, it loaded");

// get products
function displayProducts() {
  let prodArr = JSON.parse(event.target.responseText).products;
  console.log("products array", prodArr);
}

function displayCategories() {
  let catArr = JSON.parse(event.target.responseText).categories;
  console.log("category array", catArr);
}

function getCategories() {
  let reqCategories = new XMLHttpRequest();
  reqCategories.addEventListener("load", displayCategories)
  reqCategories.open("GET", "data/categories.json");
  reqCategories.send();
}

function getProducts() {
  let reqProducts = new XMLHttpRequest();
  reqProducts.addEventListener("load", displayProducts)
  reqProducts.open("GET", "data/products.json");
  reqProducts.send();
}
getProducts();
getCategories();
