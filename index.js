const path = require("path");
const express = require("express");
const config = require("./config/app.config.json");
const port = config.PORT || 3000;
const app = express();

// Using the ejs templating engine and setting the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting the middleware for express to use static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/addpost", (req, res) => {
  res.render("addpost");
});

app.listen(port);
