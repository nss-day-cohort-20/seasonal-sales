{
  let products = null;
  let categories = null;

  let factory = Object.create(null);

  function setProducts(callback) {
    products = JSON.parse(event.target.responseText).products;
    console.log("products", products, categories);
    callback(products, categories);
  };

  function setCategories() {
    categories = JSON.parse(event.target.responseText).categories;
  };

  factory.fetchData = function(callback) {
    let reqCategories = new XMLHttpRequest();
    let reqProducts = new XMLHttpRequest();
    reqCategories.addEventListener("load", function() {
      setCategories();
      // We call `reqProducts.send()` here, so that `categories` is already defined and we can safely 
      // call our passed-in callback function at the end of `setProducts` and pass that callback two arguments:
      // The newly created `products` and `categories` arrays.
      reqProducts.send();
    });
    reqProducts.addEventListener("load", function() {
      setProducts(callback);
    });
    reqCategories.open("GET", "data/categories.json");
    reqProducts.open("GET", "data/products.json");
    reqCategories.send();
  };

  factory.getCategories = function() {
    return categories;
  }

  window.SeasonalSales = window.SeasonalSales || {};
  SeasonalSales.Factory = factory;
}

