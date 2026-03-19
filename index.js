// index.js
// where your node app starts
const express = require("express");
const app = express();

// REQUIRED for FCC
app.use(express.static("public"));

// ROOT (must NOT be FCC example page)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// 🔥 API ROUTE (THIS IS WHAT FCC TESTS)
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // Empty → current date
  if (!dateParam) {
    date = new Date();
  }
  // Unix timestamp (ONLY numbers)
  else if (/^\d+$/.test(dateParam)) {
    date = new Date(Number(dateParam));
  }
  // Normal date string
  else {
    date = new Date(dateParam);
  }

  // Invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // SUCCESS RESPONSE
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// PORT (important for deployment)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Running on port " + listener.address().port);
});
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});