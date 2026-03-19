const express = require("express");
const app = express();

// FCC requires this exact base project structure
app.use(express.static("public"));

// IMPORTANT: Root must NOT be FCC example
app.get("/", (req, res) => {
  res.send("My Timestamp Microservice");
});

// 🔥 MAIN API
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // 7 & 8: Empty date → current time
  if (!dateString) {
    date = new Date();
  } else {
    // If numeric → treat as Unix timestamp
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise parse normally
      date = new Date(dateString);
    }
  }

  // 6: Invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 2,3,4,5: Correct response format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// FCC-compatible port
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});