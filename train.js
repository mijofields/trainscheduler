$(document).ready(function() {

//initialize fireside DB

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

  child_added(); //populate the timetable
  displayTime();


function child_added () {

$("#body").empty(); //clear all trains displayed so displa is not multiplied


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
     
        var name = childSnapshot.val().Name;
        var destination = childSnapshot.val().Destination;
        var frequency = childSnapshot.val().Frequency;
        var traintime = childSnapshot.val().Time;


$("#body").append('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>next arrival</td><td>Mins away</td></tr>');

}); //firebase child_added

}; //end of child_added


function clear_inputs () {

$("#trainname-input").val("");
$("#destination-input").val("");
$("#traintime-input").val("");
$("#frequency-input").val("");

};

function displayTime() 
{
    var time = moment().format('HH:mm:ss');
    $('#clock').html(time);
    setInterval(displayTime, 1000);



};

$("#submit").on("click", function(){

event.preventDefault();

var trainname = $("#trainname-input").val().trim();
var destination = $("#destination-input").val().trim();
var traintime = $("#traintime-input").val().trim(); //use moment for this stiupulate X
var frequency = parseInt($("#frequency-input").val().trim());


database.ref().push({
        Name: trainname,
        Destination: destination,
        Time: traintime,
        Frequency: frequency
      });


clear_inputs();




      //subtract one year to ensure to time conflicts over calculated microseconds.
        var fixTime = moment(traintime, "hh:mm").subtract(1, "years");
        console.log("fixed time: "+fixTime)
        //call moments library
        var currentMinute = moment().format("HH:MM");
        console.log("current time: "+currentMinute);
        //format currentMinute, post to html
        // $("#currentTimeSpan").html(" Current Time : " + currentMinute.format("hh:mm"));

        var timeDifference = moment().diff(moment(fixTime), "minutes");
        console.log("difference: "+timeDifference);

        var timeRemaining = timeDifference % frequency;

        var minutesTillTrain = frequency - timeRemaining;

        var nextTrain = moment().add(minutesTillTrain, "minutes")

        var arrivalTime = moment(nextTrain).format("hh:mm");



  // var tFrequency = 3;

  //   // Time is 3:30 AM
  //   var firstTime = "03:30";

  //   // First Time (pushed back 1 year to make sure it comes before current time)
  //   var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  // //   console.log(firstTimeConverted);

  //   // Current Time
  //   var currentTime = moment().format("HH:MM");
  //   var firsttime = moment(traintime).format("HH:MM");
  //   console.log("current time: "+currentTime);
  //   console.log("first time: "+firsttime);

  //   console.log(traintime.diff(currentTime, "minutes"));

  //   // Difference between the times
  //   var diffTime = moment().diff(moment(traintime), "minutes");
  //   console.log("DIFFERENCE IN TIME: " + diffTime);

  //   // Time apart (remainder)
  //   var Remainder = diffTime % frequency;
  //   console.log(Remainder);

  //   // Minute Until Train
  //   var MinutesTillTrain = frequency - Remainder;
  //   console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

  //   // Next Train
  //   var nextTrain = moment().add(MinutesTillTrain, "minutes");
  //   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





}); //end of function








}); //end of document ready