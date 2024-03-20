"use strict";
exports.__esModule = true;
var request = require("supertest");
require("dotenv/config");
var port = process.env.PORT || 4000;
var host = "localhost:".concat(port);
var _request = request(host);
exports["default"] = _request;
