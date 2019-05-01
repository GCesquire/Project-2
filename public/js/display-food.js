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

$(".food-item").on("click", event => {
  let selected = event.target.value;
  console.log("selected, ", selected);
  clickConter++;
  console.log("Clicked", clickConter);
  $.get("/api/food").then(res => {
    res.forEach(element => {
      if (selected === element.name) {
        let dishParagraph = $("<p>").text(element.name);
        dishParagraph.attr("class", "item");
        dishParagraph.attr("value", element.name);
        let priceParagraph = $("<span>").text(`$${element.retailPrice}.00`);
        priceParagraph.attr("class", "right-price");
        priceParagraph.attr("value", element.retailPrice);
        dishParagraph.append(priceParagraph);
        $("#result").append(dishParagraph);
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
