let priceArr = []; //to store all the prices;
let expencesArr = []; //to store all the wholesale prices;
let tax = 0.08875;
let price = 0,
  wholesale = 0,
  taxAmount = 0,
  sum = 0,
  total = 0; //for calculations

let clickConter = 0;
$("#total").html(sum);
$("#tax").html(taxAmount.toFixed(2));
$("#totalAmount").html(total.toFixed(2));

$(".drink-item").on("click", event => {
  let selected = event.target.value;
  console.log("selected, ", selected);
  clickConter++;
  console.log("Clicked", clickConter);
  $.get("/api/drinks").then(res => {
    console.log(res);
    res.forEach(element => {
      if (selected === element.name) {
        let drinkParagraph = $("<p>").text(element.name);
        drinkParagraph.attr("class", "item");
        drinkParagraph.attr("value", element.name);
        let priceParagraph = $("<span>").text(`$${element.retailPrice}.00`);
        priceParagraph.attr("class", "right-price");
        priceParagraph.attr("value", element.retailPrice);
        drinkParagraph.append(priceParagraph);
        $("#result").append(drinkParagraph);
        price += element.retailPrice;
        wholesale += element.wholesalePrice;
      }
    });
    taxAmount = price * tax; //total tax
    total = price + taxAmount; //Final amount

    $("#total").html(price);
    $("#tax").html(taxAmount.toFixed(2));
    $("#totalAmount").html(total.toFixed(2));
  });
});
