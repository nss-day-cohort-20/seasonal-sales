document.getElementById("dropdown").addEventListener("change", function(){ 
  let cats = SeasonalSales.Factory.getCategories();
  SeasonalSales.UI.updatePrices(event, cats)
});

SeasonalSales.Factory.fetchData(SeasonalSales.Formatter.buildDOMObj);
