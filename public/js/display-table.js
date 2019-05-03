console.log("display table");
let tableId = {};

$(".tables").on("click", event => {
  tableId = {
    table: event.target.getAttribute("value")
  };
  $("#tableID").attr("value", tableId.table);
  console.log("clicked", tableId);
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
    console.log("clicked, ", event.target.getAttribute("title"));
    let addToOrder = {
      item: event.target.getAttribute("title"),
      itemQty: 1,
      price: 12
    };
    let url = "/api/orders/" + tableId.table;
    console.log("url", url);
    $.post(url, addToOrder).then(result => {
      console.log("success", result);
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
