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
myHeaders.append("Authorization", "Bearer nfaIeNfDYGLGVIZ0x4AZcBeYCzit");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function getCityInfo(event) {
  event.preventDefault();

  var city = document.getElementById("cityName").value;
  console.log(city);

  fetch(
    "https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=" +
      city +
      "&max=5",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);

      buttonContainer.innerHTML = "";

      for (var i = 0; i < data.data.length; i++) {
        var cityData = data.data[i];
        console.log(cityData);
        var cityName = cityData.name;
        var stateCode = cityData.address.stateCode;
        var countryCode = cityData.address.countryCode;
        var latitude = cityData.geoCode.latitude;
        var longitude = cityData.geoCode.longitude;

        // -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//
        var cityBtn = document.createElement("button");
        cityBtn.textContent = cityName + ", " + stateCode + "; " + countryCode;
        // add lat and long as data-attributes to cityBtn

        cityBtn.addEventListener("click", function (event) {
          event.preventDefault();
          var selectedCity = {
            cityName: cityName,
            longitude: cityData.geoCode.longitude,
            latitude: cityData.geoCode.latitude,
          };

          localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
          console.log(selectedCity);

          window.location.href = "city-info.html";
        });

        buttonContainer.appendChild(cityBtn);
      }
    })
    .catch((error) => console.log("error", error));
}

// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//

searchBtn.addEventListener("click", getCityInfo);
