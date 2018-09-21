"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const twilio = require('./server/twilio.js')

// Seperated Routes for each Resource
//const menuRoutes = require("./routes/menuRoutes");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
//app.use("/api/users", menuRoutes(knex));

// Home page
app.get("/", (req, res) => {
 res.render("index");
});
//Project Home Page
app.get("/home", (req, res) => {
 res.render("home");
});

//Menu Page
app.get("/menu", (req, res) => {
 res.render("menu");
});

//Confirmation Page
app.get("/confirmation", (req, res) => {
 res.render("confirmation");
});

//Status Page
app.get("/status", (req, res) => {
 res.render("status");
});

app.get("/cart", (req, res) => {
 res.render("cart");
});

app.post("/order",(req,res) => {
twilio.restaurant('12345', '+16477864414');
res.redirect("/status")
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

