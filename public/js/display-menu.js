console.log("displaying");

let displayButtons = () => {
  $.get("/api/menu").then(res => {
    res.forEach(element => {
      if (!element.restaurantId) {
        alert("Your session time run out");
      }
      let button = $("<button>");
      button.attr("class", "btn btn-info menu-item flex-wrap top-margin");
      button.attr("value", element.id);
      button.text(element.name);
      $("#resultDiv").append(button);
    });
  });
};

displayButtons();
