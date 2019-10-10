function validInput(inputID, value) {
    var validInputObject = {
        valid: false,
        errorMessage: ""
    }
    if (inputID === "train-name-input" || inputID === "destination-input") {
        if (value.length > 50) {
            validInputObject.errorMessage = "Train Name too long. 50 Character Limit";
            return validInputObject;
        }
        else if (value === "") {
            validInputObject.errorMessage = "Please input a name and destination in order to add a train";
            return validInputObject;
        }
    }
    else if (inputID === "first-train-time-input") {
        if (!moment(value, "HH:mm").isValid()) {
            validInputObject.errorMessage = "Not a valid first train input time. Please use HH:mm format";
            return validInputObject;
        }
        else if (value === "") {
            validInputObject.errorMessage = "Please input a first train arrival time in order to add a train";
            return validInputObject;
        }
    }
    else if (inputID === "frequency-input") {
        if (!Number.isInteger(parseInt(value))) {
            validInputObject.errorMessage = "Frequency is not an integer. Please submit a valid integer";
            return validInputObject;
        }
        else if (parseInt(value) <= 0) {
            validInputObject.errorMessage = "Integer can not be 0 or negative.";
            return validInputObject;
        }
        else if (value === "") {
            validInputObject.errorMessage = "Please input a frequency in order to add a train";
            return validInputObject;
        }
    }

    validInputObject.valid = true;
    return validInputObject;
}