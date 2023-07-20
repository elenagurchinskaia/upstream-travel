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

// -------------------------------------------- SELECTORS---------------------------------------------------------//
var searchBtn = document.querySelector(".search-btn");
var buttonContainer = document.getElementById("buttons");

// -------------------------------------------- UPDATE THE TOKEN AUTOMATICALLY ---------------------------------------------------------//
var accessToken = sessionStorage.getItem("accessToken") || ""; // Store the access token
var expirationTime = 0; // Store the expiration time

// Function to check if the token has expired
function isTokenExpired() {
  var currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
  return currentTime >= expirationTime;
}

async function getNewToken() {
  try {
    var response = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=TNLOG5XIHDMeZzAVHk978untusOcm8Ez&client_secret=y4pSgTSVZRbT6EFE",
      }
    );
    var data = await response.json();
    accessToken = data.access_token;
    sessionStorage.setItem("accessToken", accessToken);
    expirationTime = Math.floor(Date.now() / 1000) + data.expires_in;
    console.log("New token obtained:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching new token:", error);
    throw error;
  }
}

var myHeaders = new Headers();
// Function to make the initial API request and generate the token
async function makeAPIRequest() {
  // Check if the token is expired and renew it if needed
  if (isTokenExpired()) {
    try {
      await getNewToken();
      myHeaders.set("Authorization", "Bearer " + accessToken);
    } catch (error) {
      // Handle error if token retrieval fails
      console.error("Error getting new token:", error);
      return;
    }
  }

  // function fetchData() {
  // Call makeAPIRequest to generate the token when the page is opened

  // Function to automatically renew the token
  // function renewToken() {
  //   if (isTokenExpired()) {
  //     getNewToken();
  //   }

  // Schedule the next token renewal
  //   setTimeout(renewToken, 30 * 60 * 1000); // 30 minutes in milliseconds
  // }

  // Start the token renewal process
  // renewToken();

  // -------------------------------------------- GETS CITY INPUT DATA ---------------------------------------------------------//

  // myHeaders.append("Authorization", "Bearer " + accessToken);
}

// -------------------------------------------- GETS CITY INFO DATA ---------------------------------------------------------//
function getCityInfo(event) {
  event.preventDefault();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  console.log(accessToken);
  var city = document
    .getElementById("cityName")
    .value.trim()
    .replace(" ", "%20");

  var city = document
    .getElementById("cityName")
    .value.trim()
    .replace(" ", "%20");

  console.log(city);
  var reqUrl =
    "https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=" +
    city +
    "&max=5";
  // requestOptions;
  console.log(reqUrl);
  fetch(reqUrl, requestOptions)
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

        createCityButton(cityName, stateCode, countryCode, latitude, longitude);
      }
    })
    .catch((error) => console.log("error", error));
}

// -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//
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
// renewToken();
makeAPIRequest();
// -------------------------------------------- SIDE NAV ---------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//
searchBtn.addEventListener("click", getCityInfo);
