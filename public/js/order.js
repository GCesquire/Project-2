$("#pay").on("click", addToOrder);

let addToOrder = () => {
  let length = $(".item").lenght;
  console.log("Length ", length);
  for (let i = 0; i < length; i++) {
    let newOrder = {
      item: $(".item").val(),
      itemQty: 1,
      price: $(".right-price").val()
    };
    $.post("/api/orders", newOrder).then(res => {
      console.log("Succes ", res);
    });
  }
};
