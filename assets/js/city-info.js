// global variables

//use localStorage to getItems
//create two variables for the latitude and longitude (FROM LOCAL STORAGE)
//use those variables in the api url to insert the coordinates for the selected city
var city = localStorage.getItem("cityName");

console.log(city);


window.addEventListener("load", function () {
  var cityUrl = "https://api.amadeus.net/v1/reference-data/locations/cities/keyword=" + city;
  // work with teammates to create the fetch for the city long and lat coordinates
});

// API URL's

function safetyStats(lat, lon) {
  var safetyApiUrl =
    "https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=" +
    lat +
    "&longitude=" +
    lon +
    "&radius=10&page%5Blimit%5D=3";

  fetch(safetyApiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (safety) {
        console.log(safety);
      });
    }
  });
  // add fetch ()
  // add.then(function (response){
  // return response.json();
  // })
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

  // }
};
