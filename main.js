console.log("Yup, it loaded");

let products = null;
let categories = null;
let productWrapper = document.getElementById('product-wrapper');

// TODO function to populate DOM
function displayProducts(productArr) {
  let cardArr = productArr.map( function(product) {
    return buildCard(product)
  })
  // console.log("cardArr ready to go into DOM", cardArr);
  cardArr.forEach( function(card) {
    let cardWrapper = document.createElement("article");
    cardWrapper.innerHTML = card;
    productWrapper.appendChild(cardWrapper);
  });
}

// TODO function to respond to dropdown selection
document.getElementById("dropdown").addEventListener("change", function() {
  let selectedSeason = event.target.value
  console.log("selected Season", selectedSeason);
  let seasonCategory = categories.filter( function(category) {
    return category.season_discount.toLowerCase() === selectedSeason.toLowerCase();
  });
  let catId = seasonCategory[0].id
  // grab all the product cards from the DOM
  let prodCards = document.getElementsByClassName("prodCard")
  for( let i = 0; i < prodCards.length; i++) {
    if ( parseInt(prodCards[i].getAttribute("data-catId")) === catId) {
      console.log("product card", prodCards[i]);
      let pTags = prodCards[i].getElementsByTagName("p");
      for ( let i = 0; i < pTags.length; i++) {
        pTags[i].classList.toggle("isHidden");
      }
    }
  }

});

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
      catId: currentProduct.category_id,
      discountedPrice: calculateDiscountPrice(currentProduct.price, categoryItem[0].discount)
    }
    return prodObj
  });
  // For now, just see if map worked
  console.log("prod arr", productArr);
  // TODO call a function to populate DOM
  displayProducts(productArr)
}

function buildCard(prodObj) {
  let card = `<div class="prodCard" data-catId=${prodObj.catId}>
                <h2>${prodObj.name}</h2>
                <h3>${prodObj.dept}</h3>
                <p>$${prodObj.price}</p>
                <p class="isHidden">$${prodObj.discountedPrice}</p>
              </div>`;
  return card;
}

// Test buildCard:
// let TempObj = {name: "Furby", dept: "Toys", price: 12.75}
// console.log( "card", buildCard(TempObj) );

function calculateDiscountPrice(origPrice, discount) {
  return +(origPrice * (1.00 - discount)).toFixed(2)
}
// Test of calculation with dummy data
console.log("discounted price", calculateDiscountPrice(3.99, .25));

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


