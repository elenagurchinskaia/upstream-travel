/*var amadeus = document.getElementById('amadeus-api');
//use token, not key or secret
var amadeusApiToken = "ws7PjxnydAcGExorNFdjzGVjXqIQ";
var spotifyApiToken = "";
var spotifyApiKey = "a4c70f559e3e46df90bb4d9dc0dd39f4";
var spotifyApiSecret = "70dbab28cfff477c98d85db71a635987";

//add header to the fetch request
//put type of method for get
//the header will have authorization and include the token

fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200', {
    method: "GET",
    headers: {
        Authorization: "Bearer ws7PjxnydAcGExorNFdjzGVjXqIQ",
    }
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data)
});

fetch('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200', {
    method: "GET",
    headers: {
        Authorization: "Bearer ws7PjxnydAcGExorNFdjzGVjXqIQ",
    }
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data)
});
*/

var client_id = "a4c70f559e3e46df90bb4d9dc0dd39f4";
var client_secret = "70dbab28cfff477c98d85db71a635987";

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});