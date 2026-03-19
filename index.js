const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Root route (IMPORTANT: not example URL)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running.");
});

// API route
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // If no date provided → current time
  if (!dateString) {
    date = new Date();
  } else {
    // If it's a Unix timestamp (only numbers)
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Invalid date check
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return correct format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});