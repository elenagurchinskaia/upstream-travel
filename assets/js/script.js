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

// -------------------------------------------- GETS CITY INPUT DATA ---------------------------------------------------------//
var searchBtn = document.querySelector(".search-btn");
var buttonContainer = document.getElementById("buttons");

var myHeaders = new Headers();


myHeaders.append("Authorization", "Bearer uNVrOG2kQtzWA8VBdTjors1PN1xk");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function getCityInfo(event) {
  event.preventDefault();

  var city = document.getElementById("cityName").value.trim().replace(" ", "%20");
  console.log(city);

  fetch(
    "https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=" + city + "&max=5", requestOptions)
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
        var cityKey = cityName + ", " + stateCode + "; " + countryCode;

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
