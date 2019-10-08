var trainName = "";
var trainDestination = "";
var firstTrainTime = "00:00"
var trainFrequency = 0;


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAWo-zRrW8mwCFvsKDHjRl6dFthdzSXmw0",
    authDomain: "trainproject-e73e5.firebaseapp.com",
    databaseURL: "https://trainproject-e73e5.firebaseio.com",
    projectId: "trainproject-e73e5",
    storageBucket: "trainproject-e73e5.appspot.com",
    messagingSenderId: "113777723656",
    appId: "1:113777723656:web:3fa021a84d206d150944bd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#train-add-submit").on("click", function() {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    
})