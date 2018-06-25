$(document).ready(function(){
     // Initalize Firebase
   var config = {
    apiKey: "AIzaSyC0gX6exBphdv_gvMPbHakI3IcmHlXOFis",
    authDomain: "train-scheduler-d35f9.firebaseapp.com",
    databaseURL: "https://train-scheduler-d35f9.firebaseio.com/",
    projectId: "train-scheduler-d35f9",
    storageBucket: "train-scheduler-d35f9.appspot.com",
    messagingSenderId: "562161257539"
    };
    
firebase.initializeApp(config);
var database = firebase.database();

// Capture button click
$("#submit").on("click", function(event) { 
  event.preventDefault();

  // User input stuff
     var trainName=$("name-input").val();
     var destination = $("#destination-input").val().trim();
     var first = $("#first-input").val();
     var tfrequency = $("#tfrequency-input").val(); //.trim ?
    
// Push to database
   database.ref().push ({
        name: trainName,
        destination: destination,
        first: first,
        frequency: tfrequency,
        timeAdded: firebase.database.ServerValue.TIMESTAMP
      });

// Refresh 
$("input").val('');
return false;
});

// On click child function
var dataRef = firebase.database();
  dataRef.ref().on("child_added", function(childSnapshot) { 
    var trainName= childSnapshot.val().name;
    var traindestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
  
 // Variables
    var tFrequency = '';
    var firstTime = '';
    var diffTime='';
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
// Logs
    console.log(firstTimeConverted);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log(tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    console.log(firebase);
    
    // Append to table
    $("#train-table").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" + tFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });
});

 
    
    
