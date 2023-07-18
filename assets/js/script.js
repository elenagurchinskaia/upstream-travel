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
myHeaders.append("Authorization", "Bearer pcybUALIoARyulk8CEBxNhhAUWXk");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};



function getCityInfo(event) {
  event.preventDefault();

  var city = document.getElementById('cityName').value;
  console.log(city);

  fetch("https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=" + city + "&max=5", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};


searchBtn.addEventListener("click", getCityInfo);


// -------------------------------------------- CREATES CITY OPTION BUTTONS ---------------------------------------------------------//

test to see if my pull request works


// -------------------------------------------- SAVES COORDINATES & REDIRECTS USER ---------------------------------------------------------//