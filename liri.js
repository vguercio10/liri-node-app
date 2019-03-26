// NPM packages
var axios = require("axios");
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var imdb = require('imdb');

var action = process.argv[2];

var searchQuery = process.argv.slice(3).join(" ");


switch (action) {
  case "concert-this":
    concertThis(searchQuery);
    break;
  case "spotify-this-song":
    spotifyThis(searchQuery);
    break;
  case "movie-this":
    movieThis(searchQuery);
    break;
  case " do-what-it-says":
    doWhatItSays(searchQuery);
    break;
}

function concertThis(artist) {


  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  // Helps to debug actual URL
  // console.log(queryURL);


  axios.get(queryURL).then(
    function (response) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.city);
      console.log("Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
    }

  ).catch(function (error) {
    console.log(error);
  });
};

function spotifyThis(song) {
  // console.log(song);
if (!song ) {
  song = "The Sign by Ace of Base"
}
// console.log(song);
  spotify.search({
    type: 'track',
    query: song
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
// console.log(JSON.stringify(data.tracks))
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Spotify Preview link: " + data.tracks.items[0].preview_url);



  });
};
function movieThis(movie) {
  if (movie.length === 0) {
    var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody." + "&y=&plot=short&apikey=trilogy";
  } else {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  }

}

