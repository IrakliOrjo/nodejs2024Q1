"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
var refreshTokenSecurityKey = process.env.JWT_SECRET_REFRESH_KEY || '';
var generateRefreshToken = function (payload, options) {
    return (0, jsonwebtoken_1.sign)(payload, refreshTokenSecurityKey, options);
};
exports["default"] = generateRefreshToken;
