{
  let productWrapper = document.getElementById('product-wrapper');
  let dataFormatter = Object.create(null);

  // Why isn't this set as a property of the dataFormatter obj? Because it's not needed outside of this module. It's 
  // a "helper" function for `buildDOMObj` and won't be called by any outside code.
  function calculateDiscountPrice(origPrice, discount) {
    return +(origPrice * (1.00 - discount)).toFixed(2)
  }

  // Another helper
  function buildCard(prodObj) {
    let card = `<div class="prodCard" data-catId=${prodObj.catId}>
                  <h2>${prodObj.name}</h2>
                  <h3>${prodObj.dept}</h3>
                  <p>$${prodObj.price}</p>
                  <p class="isHidden">$${prodObj.discountedPrice}</p>
                </div>`;
    return card;
  }

  //function to populate DOM
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

  // Now that this method is in a separate module from where the products and categories arrays are created, 
  // we have to pass them in when we call it.
  dataFormatter.buildDOMObj = function(products, categories) {
    // loop through products and categories to grab Prod name, Dept, Price, and cat ID
    let productArr = products.map( function(currentProduct) {
      // inside this loop we need to loop again, but this time through
      // the categories array to find the one category whose id matches
      // the "category_id" of the currentProduct.
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
      // the return statment for the `map` method
      return prodObj
    }); // end of `map`. Now we have a new array, productArr, we can pass into `displayProducts`
    // For now, just see if map worked
    console.log("prod arr", productArr);
    displayProducts(productArr)
  }

  window.SeasonalSales = window.SeasonalSales || {};
  SeasonalSales.Formatter = dataFormatter;
}
