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
<<<<<<< HEAD
myHeaders.append("Authorization", "Bearer woqkaHCYJdmW1lTJyY3dAqnz0n1i");
=======

myHeaders.append("Authorization", "Bearer RA4nRypm0LZ3AghiodXUBoNl8f7F");
>>>>>>> main

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

      for (var i = 0; i <= data.data.length; i++) {
        var cityData = data.data[i];
        var cityName = cityData.name;
        var stateCode = cityData.address.stateCode;
        var countryCode = cityData.address.countryCode;

        // -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//
        var cityBtn = document.createElement("button");
        cityBtn.textContent = cityName + ", " + stateCode + "; " + countryCode;
        // add lat and long as data-attributes to cityBtn

        cityBtn.addEventListener(
          "click",
          (function () {
            var selectedCity = {
              cityName: cityName,
              longitude: cityData.geoCode.longitude,
              latitude: cityData.geoCode.latitude,
            };

            // var form = document.createElement("form");
            // form.method = "GET";
            // form.action = "../assets/html/city-info.html";

            // var input = document.createElement("input");
            // input.type = "hidden";
            // input.name = "city";
            // input.value = JSON.stringify(selectedCity);

            // form.appendChild(input);
            // document.body.appendChild(form);
            // form.submit();

            // create an anchor tag element with teh city info page URL
            // var link = document.createElement("a");
            // link.href = "../assets/html/city-info.html";

            // // click event on the link
            // var clickEvent = new MouseEvent("click", {
            //   view: window,
            //   bubbles: true,
            //   cancelable: true,
            // });
            // link.dispatchEvent(clickEvent);

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

<<<<<<< HEAD
=======
// -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//


>>>>>>> main
// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//

searchBtn.addEventListener("click", getCityInfo);

buttonContainer.addEventListener("click", function (event) {
  event.preventDefault();
  // check if teh clicked element is the button
  console.log(event.target);
  if (event.target.tagName === "BUTTON") {
    var buttonText = event.target.textContent;

    var cityName = buttonText.split(",")[0];
    var stateCode = buttonText.split(",")[1].split(";")[0].trim();
    var countryCode = buttonText.split(";")[1].trim();

    var lat = event.target.s.dkjfa;

    // Store the selected city data in local storage
    var selectedCity = {
      cityName: cityName,
      stateCode: stateCode,
      countryCode: countryCode,
    };
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    // Redirect the user to the city-info page
    window.location.href = "city-info.html";
  }
});
