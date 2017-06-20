console.log("Yup, it loaded");

let products = null;
let categories = null;

function displayProducts(prodArr) {
  let productWrapper = document.getElementById('product-wrapper')
  let cardArr = prodArr.map( function(product) {
    return buildCard(product);
  });
  cardArr.forEach( function(card) {
    // console.log("card ready for DOM", card );
    let cardWrapper = document.createElement("article");
    cardWrapper.innerHTML = card
    productWrapper.appendChild(cardWrapper);
  })
}

function buildDOMObj() {
  // loop through products and categories to grab Prod name, Dept, Price, and cat ID
  let productArr = products.map( function(currentProduct) {
    // inside this loop we need to loop again, but this time through
    // the categories array to find the one category whose id matches
    // the "category_id" of the currentProduct. Maybe a .filter()?
    // That returned array will contain one object. We can set "Dept" on the new obj
    // we are making with the "name" property of that one object
    let categoryItem = categories.filter( function(category) {
      return category.id === currentProduct.category_id;
    })
    let prodObj = {
      dept: categoryItem[0].name,
      name: currentProduct.name,
      price: currentProduct.price,
      catId: currentProduct.category_id
    }
    return prodObj
  });
  // For now, just see if map worked
  console.log("prod arr", productArr);
  displayProducts(productArr);
}

function buildCard(prodObj) {
  let card = `<div class="prodCard" data-catId="${prodObj.catId}">
                <h2>${prodObj.name}</h2>
                <h3>${prodObj.dept}</h3>
                <p>$${prodObj.price}</p>
              </div>`;
  return card;
}
// Test buildCard:
// let TempObj = {name: "Furby", dept: "Toys", price: 12.75}
// console.log( "card", buildCard(TempObj) );

function setProducts() {
  products = JSON.parse(event.target.responseText).products;
  getCategories();
}

function setCategories() {
  categories = JSON.parse(event.target.responseText).categories;
  buildDOMObj();
}

function getCategories() {
  let reqCategories = new XMLHttpRequest();
  reqCategories.addEventListener("load", setCategories)
  reqCategories.open("GET", "data/categories.json");
  reqCategories.send();
}

function getProducts() {
  let reqProducts = new XMLHttpRequest();
  reqProducts.addEventListener("load", setProducts)
  reqProducts.open("GET", "data/products.json");
  reqProducts.send();
}
getProducts();


