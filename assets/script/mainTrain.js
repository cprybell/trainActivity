var trainName = "";
var trainDestination = "";
var firstTrainTime = "00:00"
var trainFrequency = 0;

// Your web app's Firebase configuration
const firebaseConfig = {
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

    trainNameValid = validInput("train-name-input", trainName);
    trainDestinationValid = validInput("destination-input", trainDestination);
    firstTrainTimeValid = validInput("first-train-time-input", firstTrainTime);
    trainFrequencyValid = validInput("frequency-input", trainFrequency);

    if (trainNameValid.valid && trainDestinationValid.valid && firstTrainTimeValid.valid && trainFrequencyValid.valid) {
        database.ref().push( {
            train_name: trainName,
            train_destination: trainDestination,
            first_train_time: firstTrainTime,
            train_frequency: trainFrequency
        })

        $(".trainForm")[0].reset();
        $(".trainForm")[1].reset();
        $(".trainForm")[2].reset();
        $(".trainForm")[3].reset();
    }
    else {
        if (!trainNameValid.valid) {
            console.log(trainNameValid.errorMessage);
            alert(trainNameValid.errorMessage);
        }
        if (!trainDestinationValid.valid) {
            console.log(trainDestinationValid.errorMessage);
            alert(trainDestinationValid.errorMessage);
        }
        if (!firstTrainTimeValid.valid) {
            console.log(firstTrainTimeValid.errorMessage);
            alert(firstTrainTimeValid.errorMessage);
        }
        if (!trainFrequencyValid.valid) {
            console.log(trainFrequencyValid.errorMessage);
            alert(trainFrequencyValid.errorMessage);
        }
    }
})

database.ref().on("child_added", function(snapshot) {
    // Change the HTML to reflect
      var tableRow = $("<tr>");
      calcTrainTimes = nextTrain(snapshot.val().first_train_time, snapshot.val().train_frequency);
      tableRow.append($("<td>").text(snapshot.val().train_name));
      tableRow.append($("<td>").text(snapshot.val().train_destination));
      tableRow.append($("<td>").text(snapshot.val().train_frequency));
      tableRow.append($("<td>").text(calcTrainTimes.next_train_time));
      tableRow.append($("<td>").text(calcTrainTimes.next_train_minutes));
      $("#tracked-trains-here").append(tableRow);
});

function nextTrain(firstArrivalTime, trainArrivalFrequency) {
    var firstArrival = moment(firstArrivalTime, "HH:mm").subtract(1, "years");
    var differenceTime = moment().diff(moment(firstArrival), "minutes");
    var tRemainder = differenceTime % trainArrivalFrequency;
    var nextTrainMinutes = trainArrivalFrequency - tRemainder;
    var nextTrain = moment().add(nextTrainMinutes, "minutes");
    var nextTrainConvert = moment(nextTrain).format("HH:mm");

    var trainTimes = {
        next_train_minutes: nextTrainMinutes,
        next_train_time: nextTrainConvert
    }

    return trainTimes;
}