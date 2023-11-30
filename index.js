const express = require("express");
const app = express();
const fs = require("fs");

// Load data from JSON file
const rawData = fs.readFileSync("terms.json");
const terms = JSON.parse(rawData);

// Set EJS as the view engine
app.set("view engine", "ejs");

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Render the index page
app.get("/", (req, res) => {
  res.render("index", { terms });
});

// Search for a term
app.get("/search", (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = terms.filter((term) =>
    term.name.toLowerCase().includes(query)
  );
  res.render("search", { query, results });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
