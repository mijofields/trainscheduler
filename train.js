$(document).ready(function() {

//initialize fireside DB

setInterval('window.location.reload()', 60000); //have page update every min

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
  remove();


function child_added () {


$("#body").empty(); //clear all trains displayed so display is not multiplied


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
     
        var name = childSnapshot.val().Name;
        var destination = childSnapshot.val().Destination;
        var frequency = childSnapshot.val().Frequency;
        var traintime = moment(childSnapshot.val().Time, "HH:mm");
        var key = childSnapshot.key;
        var removeBtn = '<button type="button" class="btn btn-danger remove active" id=' + key + '>Remove</button>';




    if (moment().diff(moment(traintime)) < 0 )    { //this allows for the first time to depart after current time like in the am!


      nextTrain = moment(traintime).format("HH:mm");
      tMinutesTillTrain = -moment().diff(moment(traintime), "minutes");

      $("#body").prepend('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextTrain+'</td><td>'+tMinutesTillTrain+'</td><td>'+removeBtn+'</td></tr>');



    } else {


    // First Time (pushed back 1 year to make sure it comes before current time) why? this fs it up for trains that start later than current time
    // var firstTimeConverted = moment(traintime).subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(traintime), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");



$("#body").prepend('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextTrain+'</td><td>'+tMinutesTillTrain+'</td><td>'+removeBtn+'</td></tr>');

}

}); //firebase child_added

}; //end of child_added


function clear_inputs () {

$("#trainname-input").val("");
$("#destination-input").val("");
$("#traintime-input").val("");
$("#frequency-input").val("");

};

function displayTime() {

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




}); //end of submit function


function remove () { //when the remove button is clicked

$(document).on("click", ".remove", deleteTrain); //doccument because there are created dynamically

    function deleteTrain() {
        var deleteBtn = $(this).attr("id");

        database.ref().child(deleteBtn).remove(); //remove the record from firebase using the id

        location.reload();



}}; //end of remove



}); //end of document ready





 