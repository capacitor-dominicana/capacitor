"use strict";
const express = require("express");
const compression = require("compression");

const _port = process.env.PORT || 4100;
const _app_folder = "dist/ionic-dominicana";

const app = express();
app.use(compression());

// ---- SERVE STATIC FILES ---- //
app.get("*.*", express.static(_app_folder, {maxAge: "1y"}));

// ---- SERVE APLICATION PATHS ---- //
app.all("*", function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});
