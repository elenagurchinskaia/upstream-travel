// ----------- THIS IS OUR PSEUDOCODE-------------//

//user searches for a city
// localStorage.setItem(city);
// localStorage.setItem(lat);
// localStorage.setItem(lon);
//city search api - amadeus
//use data.length to create # of elements(buttons)
//get the value of data[i].name + ", " + data[i].stateCode + ", " + data[i].countryCode
//add eventListener on city option buttons
//on 'click' use object to get the selected city coordinates (make a variable for this value)
//use localStorage to setItem for the coordinates variable
//redirect the user to the city-info.html

// -------------------------------------------- UPDATE THE TOKEN AUTOMATICALLY ---------------------------------------------------------//
var accessToken = ""; // Store the access token
var expirationTime = 0; // Store the expiration time

// Function to check if the token has expired
function isTokenExpired() {
  var currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
  return currentTime >= expirationTime;
}

// Function to obtain a new access token
function getNewToken() {
  fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&client_id=G4Vu52uzLiUQyAVGDnAbEDtLeAtPQOXr&client_secret=TKyTOVRXZ9Eae0oX",
  })
    .then((response) => response.json())
    .then((data) => {
      accessToken = data.access_token;
      expirationTime = Math.floor(Date.now() / 1000) + data.expires_in;
      console.log("New token obtained:", accessToken);
    })
    .catch((error) => {
      console.error("Error fetching new token:", error);
    });
}

// Function to automatically renew the token
function renewToken() {
  if (isTokenExpired()) {
    getNewToken();
  }

  // Schedule the next token renewal
  setTimeout(renewToken, 30 * 60 * 1000);
}

// Start the token renewal process
renewToken();

// make a new request
function makeAPIRequest() {
  // Check if the token is expired and renew it if needed
  if (isTokenExpired()) {
    getNewToken();
  }
}

makeAPIRequest();

// -------------------------------------------- SELECTORS---------------------------------------------------------//
var searchBtn = document.querySelector(".search-btn");
var buttonContainer = document.getElementById("buttons");

// -------------------------------------------- GETS CITY INPUT DATA ---------------------------------------------------------//
var myHeaders = new Headers();

myHeaders.append("Authorization", "Bearer uNVrOG2kQtzWA8VBdTjors1PN1xk");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function getCityInfo(event) {
  event.preventDefault();

  var city = document
    .getElementById("cityName")
    .value.trim()
    .replace(" ", "%20");
  console.log(city);

  fetch(
    "https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=" +
      city +
      "&max=5",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);

      buttonContainer.innerHTML = "";

      for (var i = 0; i < result.data.length; i++) {
        var cityData = result.data[i];
        console.log("Results: ");
        console.log(result.data[i]);
        var cityName = cityData.name;
        var stateCode = cityData.address.stateCode;
        var countryCode = cityData.address.countryCode;
        var latitude = cityData.geoCode.latitude;
        var longitude = cityData.geoCode.longitude;

        // -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//

        createCityButton(cityName, stateCode, countryCode, latitude, longitude);
      }
    })
    .catch((error) => console.log("error", error));
}

function createCityButton(
  cityName,
  stateCode,
  countryCode,
  latitude,
  longitude
) {
  var cityBtn = document.createElement("button");
  cityBtn.textContent = cityName + ", " + stateCode + "; " + countryCode;
  // Add lat and long as data attributes to cityBtn
  cityBtn.dataset.latitude = latitude;
  cityBtn.dataset.longitude = longitude;

  cityBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var selectedCity = {
      cityName: cityName,
      longitude: this.dataset.longitude,
      latitude: this.dataset.latitude,
    };

    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    console.log(selectedCity);

    window.location.href = "city-info.html";
  });

  buttonContainer.appendChild(cityBtn);
}
// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//

searchBtn.addEventListener("click", getCityInfo);

// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instance = M.Sidenav.init(elems, options);
  instance.open();
  instance.close();
  instance.destroy();
});
