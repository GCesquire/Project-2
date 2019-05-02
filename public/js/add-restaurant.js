console.log("here");

let createNewRestaurant = () => {
  console.log("creating");
  let newRestaurant = {
    name: $("#title").val(),
    address: $("#address").val(),
    email: $("#email").val(),
    password: $("#passwordSignIn").val()
  };
  $.post("/api/restaurants", newRestaurant).then(res => {
    console.log("sucess ", res);
  });
};

let logIntoAccount = () => {
  console.log("logging");
  $.get("/api/restaurants").then(res => {
    const email = $("#userEmail").val();
    const password = $("#userPassword").val();
    res.forEach(element => {
      if (element.email === email && element.password === password) {
        console.log($("#linkToRestaurant"));
        $("#linkToRestaurant").attr("href", "/tables");
      }
    });
  });
};

$("#create").on("click", createNewRestaurant);
$("#submit").on("click", logIntoAccount);
