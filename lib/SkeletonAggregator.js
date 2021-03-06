/*jslint node: true */
"use strict";

var _ = require("underscore");

// Reduce two items of data
// with a value and a confidence
function reduceData(aValue, aConfidence, bValue, bConfidence) {
    // If dominated by the next (current) value, update and replace
    if (aConfidence < bConfidence) {
        return {
            confidence: bConfidence,
            value: bValue
        };
    } else {
        return {
            confidence: aConfidence,
            value: aValue
        };
    }
}

// Combine 2 joints into 1
function reduceJoints(a, b) {
    var pos = reduceData(a.position, a.positionconfidence, b.position, b.positionconfidence);
    
    var rot = reduceData(a.rotation, a.rotationconfidence, b.rotation, b.rotationconfidence);
        
    return {
        // joint ID should be the same for both
        id: a.id,
        position: pos.value,
        positionconfidence: pos.confidence,
        rotation: rot.value,
        rotationconfidence: rot.confidence
    };
}

// Combine 2 skeletons into 1
function reduceSkeletons(a, b) {
    // A zig skeleton is an object of joint objects
    // so stitch the two master objects together
    // where each elem of the array
    // is a 2-array of
    // [ joint A data, joint B data ]
    var combined = _.zip(_.values(a), _.values(b));
    
    var jointIds = _.keys(a);
    
    // then go through the zipped array
    var joints = combined.map(function (abJoint, index, array) {
        // ... then pull out the joint data (values)
        var aJoint = abJoint[0];
        var bJoint = abJoint[1];
        
        return reduceJoints(aJoint, bJoint);
    });
    
    return _.object(jointIds, joints);
}

// Combines OpenNI skeleton data to provide a more accurate overall model of the user's body
// from multiple angles
// NOTE: SKELETONS SHOULD ALREADY HAVE HAD THEIR ORIENTATION NORMALISED
// SO ALL POSITIONS AND ROTATIONS ARE RELATIVE TO THE AUTHORITATIVE SENSOR
function reconstructSkeleton(skeletons) {
    // Got an array of skeletons - apply reduce
    if ((skeletons instanceof Array) && (skeletons.length >= 1)) {
        return skeletons.reduce(reduceSkeletons);
    } else {
        // If only one sensor was rigged up anyway
        // Do NOT call reduce(), it will crash
        return skeletons;
    }
}

exports.reconstructSkeleton = reconstructSkeleton;
exports.reduceSkeletons = reduceSkeletons;
exports.reduceJoints = reduceJoints;
exports.reduceData = reduceData;
