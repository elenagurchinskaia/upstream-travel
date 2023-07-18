// global variables

//use localStorage to getItems
//create two variables for the latitude and longitude (FROM LOCAL STORAGE)
//use those variables in the api url to insert the coordinates for the selected city
// var city = localStorage.getItem("city");
// var lon = localStorage.getItem("longitude");
// var lat = localStorage.getItem("latitude");
// console.log(lon);
// console.log(lat);

// -------------------------------------------- SAFETY STATS ---------------------------------------------------------//

function safetyStats() {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer jYLjAG4DNvK0Co47bbRjSparZ6Ps");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


fetch("https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=47.60621&longitude=-122.33207&radius=15&page%5Boffset%5D=0", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
};

safetyStats();

  // add if else conditional statements

  //   for (var i = 0; i <= data.length; i++) {}

  //   loop thru the safety stats items
  //  for (var i = 0; i < ...; i++) {
  // var lgbtq = data[1].lgbtq
  // var medical = data[1].medical
  // var overall = data[1].overall
  // vr physicalHarm = data[2].physicalHarm
  // var politicalFreedom = data[2].politicalFreedom
  // var theft = data[2].theft
  // var women = data[2].women
  // append


  // -------------------------------------------- FOOD ---------------------------------------------------------//

  // -------------------------------------------- PLACES OF INTEREST ---------------------------------------------------------//

  // -------------------------------------------- EXCURSIONS ---------------------------------------------------------//