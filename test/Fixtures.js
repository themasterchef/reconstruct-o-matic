/*jslint node: true */
"use strict";

exports.real3x3 = [
    0.9178107380867004, -0.04468444734811783, -0.3944951295852661,
    0.1306413114070892, 0.9723015427589417, 0.1938103586435318,
    0.3749079704284668, -0.2294186502695084, 0.8982265591621399
];

exports.real4x4 = [
    0.9178107380867004, -0.04468444734811783, -0.3944951295852661, 0,
    0.1306413114070892,  0.9723015427589417,   0.1938103586435318, 0,
    0.3749079704284668, -0.2294186502695084,   0.8982265591621399, 0,
    0, 0, 0, 1
];

exports.zeroes3x3 = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

exports.zeroes4x4 = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 1
];

exports.maxDifference = 0.000001;

// These rotations adapted from:
// http://wiki.alioth.net/index.php/Quaternion
exports.zeroRotation = {
    w: 1,
    x: 0,
    y: 0,
    z: 0
};

exports.zRotation90 = {
    w: 1,
    x: 0,
    y: 0,
    z: 1
};

exports.zRotation180 = {
    w: 0,
    x: 0,
    y: 0,
    z: 1
};

exports.zRotation270 = {
    w: 1,
    x: 0,
    y: 0,
    z: -1
};

exports.realUser = require("./sample-user");