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

$("#body").empty(); //clear all trains displayed so display is not multiplied


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
     
        var name = childSnapshot.val().Name;
        var destination = childSnapshot.val().Destination;
        var frequency = childSnapshot.val().Frequency;
        var traintime = moment(childSnapshot.val().Time, "HH:mm");

        // console.log("train time: "+ traintime);

        var currentTime = moment();

        // console.log("current time: "+currentTime);

        var diff = currentTime.diff(moment(traintime), "minutes");

        // console.log(diff);

        var timeRemainder = diff % frequency;

        // console.log(timeRemainder);

        var minUntilTrain = frequency - timeRemainder;

        // console.log(minUntilTrain);

        var nextTrain = moment().add(minUntilTrain, "minutes").format("HH:mm");

        // console.log(nextTrain);



$("#body").append('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextTrain+'</td><td>'+minUntilTrain+'</td><td></td></tr>');

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

  $("#alert").empty();

event.preventDefault();

var trainname = $("#trainname-input").val().trim();
var destination = $("#destination-input").val().trim();
var traintime = $("#traintime-input").val().trim(); //use moment for this stiupulate X
var frequency = parseInt($("#frequency-input").val().trim());


//make sure all the necessary values are entered 'return false' prevents the function firing

if (trainname === "") {
        $("#alert").text("Please enter a train name").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        return false; //means the sumbit does not happen
    }

    if (destination === "") {
        $("#alert").text("Please enter a desination").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        return false;
    }
    if (traintime === "") {
       $("#alert").text("Please enter a first train time").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        return false;
    }
    if (isNaN(frequency)) {
        $("#alert").text("Please enter the frequency of train departures").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        return false;
        console.log(frequency);
    };

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





}); //end of function








}); //end of document ready