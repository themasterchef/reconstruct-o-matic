/*jslint node: true */
"use strict";

var UserAggregator = require("../UserAggregator");
var UserCalibrator = require("../UserCalibrator");

// A skeleton shared by a number of clients
// who contribute data to reconstruct it
function Skeleton() {
    this.realReadings = [];
    this.referenceCalibrationReading = undefined;
}

Skeleton.prototype.finishWindow = function () {
    // Retrieve all the readings
    var result = UserAggregator.condenseUser(this.realReadings);
    
    // Clear out the data
    this.realReadings.length = 0;
    
    return result;
};

Skeleton.prototype.pushRealData = function (data) {
    this.realReadings.push(data);
};

Skeleton.prototype.getReferenceCalibrationFunc = function (userData) {
    // this *is* the reference client
    // just create a passthrough
    this.referenceCalibrationReading = userData;
    return UserCalibrator.passthrough;
};

Skeleton.prototype.getSecondaryCalibrationFunc = function (userData) {
    // Want the calibration ref data from reference user        
    // Now we have the data, Return the calibration function
    if (this.referenceCalibrationReading) {
        return UserCalibrator.calibrate(
            this.referenceCalibrationReading,
            userData
        );
    } else {
        return this.getReferenceCalibrationFunc(userData);
    }
};


module.exports = Skeleton;