console.log("display table");
let tableId = {};

$(".tables").on("click", event => {
  tableId = {
    table: event.target.getAttribute("value")
  };

  let url = "api/orders/" + tableId.table;
  $.post(url, tableId).then(res => {
    console.log(res);
  });
});

let displayButtons = () => {
  console.log("displaying buttons");
  $.get("/api/menu").then(res => {
    res.forEach(element => {
      if (!element.restaurantId) {
        alert("Your session time run out");
      }
      let button = $("<button>");
      button.attr("class", "btn btn-info menu-item flex-wrap top-margin");
      button.attr("title", element.name);
      button.attr("value", element.id);
      button.text(element.name);
      $("#resultDiv").append(button);
      addToOrder();
    });
  });
};

let addToOrder = () => {
  $(".menu-item").on("click", event => {
    $.get("/api/menu").then(res => {
      res.forEach(element => {
        if (event.target.getAttribute("value") === element.value) {
          let url = "/api/orders/" + tableId.table;
          console.log("url add to order", url);
          let addToOrder = {
            item: element.name,
            itemQty: 1,
            price: element.price
          };
          $.post(url, addToOrder).then(result => {
            console.log("success", result);
          });
        }
      });
    });
  });
};

let displayOrder = () => {
  let url = "/api/orders/" + tableId.table;
  console.log("order url ", url);
  $.get(url).then(res => {
    res.forEach(element => {
      console.log("response ", res);
      let p = $("<p>").attr("class", "left");
      p.text(element.item);
      $("#result").append(p);
    });
  });
};

displayButtons();
displayOrder();

console.log("displaying");
