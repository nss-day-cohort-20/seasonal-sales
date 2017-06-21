{
  let ui = Object.create(null);

  //function to respond to dropdown selection. Will be used as a callback for an event listener, so I have
  // explicitly created a parameter called "event" as a visual cue that this function will be a listener's callback 
  ui.updatePrices = function(event, categories) {
    let selectedSeason = event.target.value
    // categories is no longer a global, so we'll have to have passed it in as an arg.
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
  };

  window.SeasonalSales = window.SeasonalSales  || {}
  window.SeasonalSales.UI = ui;
}
