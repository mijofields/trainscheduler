$(document).ready(function() {



var config = {
    apiKey: "AIzaSyBuGVF1brmhp7-jpOx-ugFpyGxDEk0Syks",
    authDomain: "trainscheduler-265f0.firebaseapp.com",
    databaseURL: "https://trainscheduler-265f0.firebaseio.com",
    projectId: "trainscheduler-265f0",
    storageBucket: "trainscheduler-265f0.appspot.com",
    messagingSenderId: "600087001322"
  };

  firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function(){

event.preventDefault();



var trainname = $("#trainname-input").val().trim();
var destination = $("#destination-input").val().trim();
var traintime = $("#traintime-input").val().trim(); //use moment for this stiupulate X
var frequency = parseInt($("#frequency-input").val());

console.log(trainname);


database.ref().set({
        Name: trainname,
        Destination: destination,
        Time: traintime,
        Frequency: frequency
      });







}); //end of function




}); //end of document ready