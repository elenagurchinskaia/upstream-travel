// ------------------------- SELECTORS -------------------------//
var mapEl = document.getElementById("google-map");

// ------------------------- CITY COORDINATES -------------------------//

var city = JSON.parse(localStorage.getItem("selectedCity"));
console.log(city);

var lon = city.longitude;
var lat = city.latitude;
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
}


// -------------------------------------------- SAFETY STATS ---------------------------------------------------------//

function safetyStats() {
  var myHeaders = new Headers();


  myHeaders.append("Authorization", "Bearer nfaIeNfDYGLGVIZ0x4AZcBeYCzit");


  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };



  fetch("https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=" + lat + "&longitude=-" + lon + "&page%5Blimit%5D=1&page%5Boffset%5D=0", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('Safety Stats: ');

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
      var physicalHarmScore = document.getElementById('harmScore');
      physicalHarmScore.textContent = physicalHarmNum;
      console.log(physicalHarmNum);

      //----------POLITICAL SCORE----------//
      var politicalFreedomScore = document.getElementById('politicalScore');
      politicalFreedomScore.textContent = politicalFreedomNum;
      console.log(politicalFreedomNum);

      //----------THEFT SCORE----------//
      var theftScore = document.getElementById('theftScore');
      theftScore.textContent = theftNum;
      console.log(theftNum);

      //----------WOMEN SCORE----------//
      var womenScore = document.createElement('womenScore');
      womenScore.textContent = womenNum;
      console.log(womenNum);


     
    })
    .catch((error) => console.log("error", error));
}

// -------------------------------------------- FOOD ---------------------------------------------------------//

function foodOptions() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 3uYzxaS1z75UzLERv4c4BvAt0x1t");

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
    .then((result) => console.log("Food: ", result))
    .catch((error) => console.log("error", error));
}


// -------------------------------------------- PLACES OF INTEREST ---------------------------------------------------------//

function sightsOptions() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 3uYzxaS1z75UzLERv4c4BvAt0x1t");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };


  fetch("https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=" + lat + "&longitude=" + lon + "&radius=15&page%5Blimit%5D=4&page%5Boffset%5D=0&categories=SIGHTS", requestOptions)
    .then(response => response.json())
    .then(result => console.log('Places of Interest: ', result))
    .catch(error => console.log('error', error));

}

// -------------------------------------------- EXCURSIONS ---------------------------------------------------------//

function toursOptions() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 3uYzxaS1z75UzLERv4c4BvAt0x1t");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://test.api.amadeus.com/v1/shopping/activities?latitude=" + lat + "&longitude=" + lon + "&radius=15", requestOptions)
    .then(response => response.json())
    .then(result => console.log('Excursions: ', result))
    .catch(error => console.log('error', error));
}

// ------------------------------------ CALLING THE FUNCTIONS ------------------------------------//

cityMap();
safetyStats();
foodOptions();
// sightsOptions();
// toursOptions();
