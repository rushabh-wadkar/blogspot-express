const path = require("path");
const express = require("express");
const morgan = require("morgan");
const config = require("./config/app.config.json");
const port = config.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const controller = require("./controllers/blogController");

// Connecting to database
mongoose.connect(config.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function onConnectToDB() {
  console.log("Connected to database. Running server on port: " + port);
  app.listen(port);
});

// Middleware initialization
app.use(morgan("dev"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Using the ejs templating engine and setting the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting the middleware for express to use static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", controller.blogs_view_all);

app.get("/addpost", controller.blog_add_form);

app.post("/createpost", controller.blog_create_post);
