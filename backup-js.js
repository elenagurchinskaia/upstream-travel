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

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer TwMldC3nCGS7N0MPJkPsArSGB75I");

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

      var buttonContainer = document.getElementById("buttons");
      buttonContainer.innerHTML = "";

      for (var i = 0; i <= data.data.length; i++) {
        var cityData = data.data[i];
        var cityName = cityData.name;
        var stateCode = cityData.address.stateCode;
        var countryCode = cityData.address.countryCode;

        // -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//
        var cityBtn = document.createElement("button");
        cityBtn.textContent = cityName + ", " + stateCode + "; " + countryCode;

        cityBtn.addEventListener(
          "click",
          (function () {
            var selectedCity = {
              cityName: cityName,
              longitude: cityData.geoCode.longitude,
              latitude: cityData.geoCode.latitude,
            };

            localStorage.setItem("selectedCity", JSON.stringify(selectedCity));

            // create an anchor tag element with teh city info page URL
            var link = document.createElement("a");
            link.href = "../assets/html/city-info.html";

            //redirect the user to the city-info page
            // window.location.href =
            //   "../assest/html/city-info.html?lat=" +
            //   latitude +
            //   "&lng=" +
            //   longitude;
            console.log(selectedCity);
          })(cityName, stateCode, countryCode)
        );

        buttonContainer.appendChild(cityBtn);
      }
    })
    .catch((error) => console.log("error", error));
}

// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//

searchBtn.addEventListener("click", getCityInfo);
