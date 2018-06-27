// Firebase stuff
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
var currentTime = moment();

database.ref().on("child_added", function(childSnap){
    var trainName= "childSnapshot.val().name";
    var traindestination = "childSnapshot.val().destination";
    var firstTrain = "childSnapshot.val().firstTrain";
    var trainFreq = "childSnapshot.val().frequency";
    var min = childSnap.val().min;
    var next = childSnap.val().next;
    $("#train-table").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" + trainFreq+ "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + min + "</td></tr>");

});
database.ref().on("value", function(snapshot) {
});

// Button
$("#submit").on("click", function() { 
    var trainName=$("name-input").val();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-input").val();
    var frequency = $("#frequency-input").val(); //.trim ?
    
});
 // Holds data 
 var newTrain = {
    name: "trainName",
    destination: "destination",
    firstTrain: "firstTrain",
    frequency: "frequency",
    min: "minUntilTrain",
    next: "nextTrain"
    }
    database.ref().push(newTrain);

   

// Based on inputs
var firstTrain= moment;
var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");

// the time difference between current time and the first train

var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
var remainder = difference % frequency;
var minUntilTrain = frequency - remainder;
var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");


       
// Upload data
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstInput").val("");
$("#frequencyInput").val("");
         
console.log(newTrain);
