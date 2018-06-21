// Variables
var name="";
var destination="";
var tFrequencey="";
var nextArrival="";
var minAway="";
var database = firebase.database();

// jQuery Variables
$(document).ready(function(){
$("#add").click(function(){
var trainName = $("#name").val();
        var destination = $("#destination").val();
        var tFrequency = "";
        $("#minAway").val();
        var monthlyRate = $("#monthlyRate").val();
        // var markup = "<tr><th>" + name + "</th><td>" + role +  "</td><td>" + startDate + "</td><td>" + monthsWorked + "</td><td>" + monthlyRate + "</td><td>" + totalBilled + "</td></tr>";
        $("table tbody").append(markup);
    });
});
// Firebase

firebase.initializeApp(config);


$("#add").on("click", function(event) {
    event.preventDefault();

    uName = $("#name").val().trim();
    uRole = $("#destination").val().trim();
    uSDate = $("#tFrequency").val().trim();
    uMRate = $("#nextArrival").val().trim();

    database.ref().push({
        uName: uName,
        uRole: uRole,
        uSDate: uSDate,
        uMRate: uMRate 
    });
});
database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    
// Console.log's
    console.log(sv.uName);
    console.log(sv.uRole);
    console.log(sv.uSDate);
    console.log(sv.uMRate);
    var monthsWorked = moment().diff(moment(sv.uSDate), 'months');
    var totalBilled = monthsWorked * sv.uMRate;
    $("table tbody").append("<tr><th>" + sv.uName + "</th><td>" + sv.uRole+  "</td><td>" + sv.uSDate +"</td><td>" + monthsWorked + "</td><td>" + sv.uMRate + "</td><td>" + totalBilled + "</td></tr>");


})
