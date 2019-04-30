// $(".tables").on("click", event => {
//   let tableNumber = event.target.value;
//   console.log("tableNumber ", tableNumber);
//   $(".guestQty").on("click", event2 => {
//     let guestQty = event2.target.value;
//     console.log("Guest QTY ", guestQty);
//   });
//   $("#openTable").on("click", event => {
//     console.log("In order");
//   });
// });

let addToOrder = () => {
  let length = $(".item").lenght;
  console.log("Length ", length);
  for (let i = 0; i < length; i++) {
    let newOrder = {
      item: $(".item").value,
      itemQty: 1,
      price: $(".right-price").value
    };
    $.post("/api/orders", newOrder).then(res => {
      console.log("Succes ", res);
    });
  }
};
