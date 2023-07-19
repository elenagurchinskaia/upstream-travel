// ------------------------- SELECTORS -------------------------//
var mapEl = document.getElementById("google-map");

var token = "z6jRGqsaGE4jZGAiD4tmAiR2NA5s"

// ------------------------- CITY COORDINATES -------------------------//

var city = JSON.parse(localStorage.getItem("selectedCity"));
console.log("City:");
console.log(city.cityName);

console.log("Latitude:");
console.log(city.latitude);

console.log("Longitude:");
console.log(city.longitude);

var lat = city.latitude;
var lon = city.longitude;
var APIkey = "AIzaSyBdXT-Im1q-WtbYM6fqm32GLH_ZVCbt2M4";

// -------------------------------------------- MAP ---------------------------------------------------------//

function cityMap() {
  var source =
    "https://www.google.com/maps/embed/v1/place?key=" +
    APIkey +
    "&q=" +
    city.cityName.replace(" ", "%20");
  console.log(source);
  mapEl.setAttribute("src", source);

};


// -------------------------------------------- SAFETY STATS ---------------------------------------------------------//

function safetyStats() {
  var myHeaders = new Headers();


  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };


  fetch(
    "https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=" +
      lat +
      "&longitude=-" +
      lon +
      "&page%5Blimit%5D=1&page%5Boffset%5D=0",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("Safety Stats: ");

      console.log(result);

      var safetyData = result.data[0].safetyScores;
      var overallNum = "Overall: " + safetyData.overall;
      var lgbtqNum = "LGBTQ+: " + safetyData.lgbtq;
      var medicalNum = "Medical: " + safetyData.medical;
      var physicalHarmNum = "Physical Harm: " + safetyData.physicalHarm;
      var politicalFreedomNum =
        "Political Freedom: " + safetyData.politicalFreedom;
      var theftNum = "Theft: " + safetyData.theft;
      var womenNum = "Women's Safety: " + safetyData.women;

      //----------OVERALL SCORE----------//
      var overallScore = document.getElementById("overallScore");
      overallScore.textContent = overallNum;
      console.log(overallNum);

      //----------LGBTQ SCORE----------//
      var lgbtScore = document.getElementById("lgbtqScore");
      lgbtScore.textContent = lgbtqNum;
      console.log(lgbtqNum);

      // //----------MEDICAL SCORE----------//


      var medicalScore = document.getElementById('medicalScore');

      medicalScore.textContent = medicalNum;
      console.log(medicalNum);

      //----------HARM SCORE----------//
      var physicalHarmScore = document.getElementById("harmScore");
      physicalHarmScore.textContent = physicalHarmNum;
      console.log(physicalHarmNum);

      //----------POLITICAL SCORE----------//
      var politicalFreedomScore = document.getElementById("politicalScore");
      politicalFreedomScore.textContent = politicalFreedomNum;
      console.log(politicalFreedomNum);

      //----------THEFT SCORE----------//
      var theftScore = document.getElementById("theftScore");
      theftScore.textContent = theftNum;
      console.log(theftNum);

      //----------WOMEN SCORE----------//
      var womenScore = document.createElement("womenScore");
      womenScore.textContent = womenNum;
      console.log(womenNum);
    })
    .catch((error) => console.log("error", error));
};

// -------------------------------------------- FOOD ---------------------------------------------------------//

function foodOptions() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=15&page%5Blimit%5D=4&page%5Boffset%5D=0&categories=RESTAURANT",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("Food:");
      console.log(result);

      for (var i = 0; i < result.data.length; i++) {
        var foodData = result.data[i];
        console.log("Food Data: " + foodData);

        var type = foodData.category + ": ";
        var foodName = foodData.name;
        var foodRating = foodData.rank + "/5 STARS";

        //----------FOOD OPTIONS----------//
        var foodOptions = document.getElementById("foodOpt" + (i+1));
        foodOptions.textContent = type + " " + foodName + " " + foodRating;
        console.log(type + " " + foodName + " " + foodRating);
      }
    })
    .catch((error) => console.log("error", error));
};

// -------------------------------------------- PLACES OF INTEREST ---------------------------------------------------------//

function sightsOptions() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };


  fetch("https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=" + lat + "&longitude=" + lon + "&radius=20&page%5Blimit%5D=4&page%5Boffset%5D=0&categories=SIGHTS", requestOptions)
    .then(response => response.json())
    .then((result) => {
      console.log("Sights:");
      console.log(result);

      for (var i = 0; i < result.data.length; i++) {
        var poiData = result.data[i];
        console.log("Sights Data: " + poiData);

        var type = poiData.category + ": ";
        var poiName = poiData.name;
        var poiRating = poiData.rank + "/5 STARS";

        //----------SIGHT OPTIONS----------//
        var poiOptions = document.getElementById("poiOpt" + (i+1));
        poiOptions.textContent = type + " " + poiName + " " + poiRating;
        console.log(type + " " + poiName + " " + poiRating);
      }
    })
    .catch((error) => console.log("error", error));
};


// -------------------------------------------- EXCURSIONS ---------------------------------------------------------//

function toursOptions() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://test.api.amadeus.com/v1/shopping/activities?latitude=" + lat + "&longitude=" + lon + "&radius=15", requestOptions)
    .then(response => response.json())
    .then(result => console.log('Excursions: ', result))
    .catch(error => console.log('error', error));
};


// ------------------------------------ CALLING THE FUNCTIONS ------------------------------------//

cityMap();
safetyStats();
foodOptions();
sightsOptions();
// toursOptions();
