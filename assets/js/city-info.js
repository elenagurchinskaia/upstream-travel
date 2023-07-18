// ------------------------- CITY COORDINATES -------------------------//

// var city = localStorage.getItem("city");
// var lon = localStorage.getItem("longitude");
// var lat = localStorage.getItem("latitude");

//console.log(city);
// console.log(lon);
// console.log(lat);

// -------------------------------------------- MAP ---------------------------------------------------------//

// function cityMap() {
//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzUxMiIsImN0eSI6IkpXVCIsImlzcyI6IkhFUkUiLCJhaWQiOiJVWHJmbWhtc3g4Nzh6eDVidFhRNyIsImlhdCI6MTY4OTY5ODE1MSwiZXhwIjoxNjg5Nzg0NTUxLCJraWQiOiJqMSJ9.ZXlKaGJHY2lPaUprYVhJaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuLnhyb3QzcE9QZ3R1Q3JEUWh1akZVV0EuOW5WU1pfazFqS0plTGpkM0dXZXVYS2dyNTNDRmJSN2FBSFJwSm5iTWtZMUg2QlJDODc3a2xlR1JZSUk3YmVSOXFEOGF2SVI5ZzNYOEw3alJMUXQxc0Vlck4wV2R2QWhKR2N5VmpNMS05ZmNfWjRaYnJpb3hOVk14QXc4UDdES1lXLW01NmhwVjl5S3daRlpZaWVCMjNmX3hMdzNVNUtsQmJmNXVRVEJzWk5OV1R6R2o2dGJYNzJ2S19YbFJhbnpVS0U1VzdNS2g1SHB5TUtaU0EtT3NOVXQ0cGR4bHI4UG5VZnpSbkhXUEQwcy5OS04yTURVSkVnbExsMTBRYTBqS2RaV3RRMnJXTGM2U0hpYnk5R09WSndn.AeRohg56OFGMdK8C84QokdrFpzy7MeT7bAv9P3KyKGuO50u7qX3flcdF7ntBuWm542Cft1Zz8tQZfAwpWJNANnBTU_OboZudvlpz2r_76PgUFpRpS2Org2PVh3LzFHswW-T2pyoXwLeIgqpOPVo9DU5GkriuxuiTVsAJcQPfiPid4avnVeI8cusXRmfo_rReNcVUedllNW-M_-6RXsQQQ5uwLdlYT-jrdJ-uLwJakjq7-pyXfZWJtn1BaU_2y09nPtQcMZ10s92uhHnZM1UVwHDsnjq3ZPhFi6YelSdPm2Iw_fjHxDmjB6oXMP_xS2XQTnLVw31TBZ29cO4LiuECFg");

//   var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//   };

//   fetch("https://image.maps.ls.hereapi.com/mia/1.6/mapview?c=47.60621%2C-122.33207&z=12&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log('Map: ', result))
//     .catch(error => console.log('error', error));
// };

// -------------------------------------------- SAFETY STATS ---------------------------------------------------------//

function safetyStats() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer By6cK9Hh6iG3ATbvfojt9d3ZYqI1");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  fetch("https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=41.397158&longitude=2.160873&radius=1&page%5Blimit%5D=1&page%5Boffset%5D=0", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('Safety Stats: ', result);

      var safetyContainer = document.getElementById('safety-stats-list');
      safetyContainer.innerHTML = "";

        var safetyData = result.data.safetyScores;
        var lgbtqNum = 'LGBTQ+: ' + safetyData.lgbtq;
        var medicalNum = 'Medical: ' + safetyData.medical;
        var overallNum = 'Overall: ' + safetyData.overall;
        var physicalHarmNum = 'Physical Harm: ' + safetyData.physicalHarm;
        var politicalFreedomNum = 'Political Freedom: ' + safetyData.politicalFreedom;
        var theftNum = 'Theft: ' + safetyData.theft;
        var womenNum = "Women's Safety: " + safetyData.women;

        //----------LGBTQ SCORE----------//
        var lgbtScore = document.createElement('li');
        lgbtScore.textContent = lgbtqNum;
        safetyContainer.appendChild(lgbtScore);
        console.log(lgbtqNum);

        //----------MEDICAL SCORE----------//
        var medicalScore = document.createElement('li');
        medicalScore.textContent = medicalNum;
        safetyContainer.appendChild(medicalScore);
        console.log(medicalNum);

        //----------OVERALL SCORE----------//
        var overallScore = document.createElement('li');
        overallScore.textContent = overallNum;
        safetyContainer.appendChild(overallScore);
        console.log(overallNum);

        //----------HARM SCORE----------//
        var physicalHarmScore = document.createElement('li');
        physicalHarmScore.textContent = physicalHarmNum;
        safetyContainer.appendChild(physicalHarmScore);
        console.log(physicalHarmNum);

        //----------POLITICAL SCORE----------//
        var politicalFreedomScore = document.createElement('li');
        politicalFreedomScore.textContent = politicalFreedomNum;
        safetyContainer.appendChild(politicalFreedomScore);
        console.log(politicalFreedomNum);

        //----------THEFT SCORE----------//
        var theftScore = document.createElement('li');
        theftScore.textContent = theftNum;
        safetyContainer.appendChild(theftScore);
        console.log(theftNum);

        //----------WOMEN SCORE----------//
        var womenScore = document.createElement('li');
        womenScore.textContent = womenNum;
        safetyContainer.appendChild(womenScore);
        console.log(womenNum);

    })
    .catch (error => console.log('error', error));
};

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


// -------------------------------------------- FOOD ---------------------------------------------------------//

function foodOptions() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer By6cK9Hh6iG3ATbvfojt9d3ZYqI1");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=15&page%5Blimit%5D=4&page%5Boffset%5D=0&categories=RESTAURANT", requestOptions)
    .then(response => response.json())
    .then(result => console.log('Food: ', result))
    .catch (error => console.log('error', error));
};

// -------------------------------------------- PLACES OF INTEREST ---------------------------------------------------------//

function sightsOptions() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer By6cK9Hh6iG3ATbvfojt9d3ZYqI1");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=15&page%5Blimit%5D=4&page%5Boffset%5D=0&categories=SIGHTS", requestOptions)
    .then(response => response.json())
    .then(result => console.log('Places of Interest: ', result))
    .catch(error => console.log('error', error));
}

// -------------------------------------------- EXCURSIONS ---------------------------------------------------------//

function toursOptions() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer By6cK9Hh6iG3ATbvfojt9d3ZYqI1");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=15", requestOptions)
    .then(response => response.json())
    .then(result => console.log('Excursions: ', result))
    .catch(error => console.log('error', error));
}

// ------------------------------------ CALLING THE FUNCTIONS ------------------------------------//

// cityMap();
safetyStats();
foodOptions();
sightsOptions();
toursOptions();