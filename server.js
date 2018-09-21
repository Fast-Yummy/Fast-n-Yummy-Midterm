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

const cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['a',0,'g',46,543,52,85,'asdfg','gfsd','trfsdd'],
  maxAge: 60 * 60 * 1000 // 1 hour
}))

// Seperated Routes for each Resource
const databaseHelper = require("./routes/dbHelper")(knex, Promise);
const menuRoutes = require("./routes/menuRoutes")(databaseHelper);
app.use("/menu", menuRoutes);

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
  const orderid = generateRandomString();
  req.session.order_id = orderid;
  console.log("this is the order ID: ",req.session.order_id);
  let templateVars = {orderid: orderid};
  res.render("menu", templateVars);
});

//Confirmation Page
app.get("/confirmation", (req, res) => {
 res.render("confirmation");
});

//Status Page
app.get("/status", (req, res) => {
 res.render("status");
});

function generateRandomString() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  let shortUrl = "";
  for (let i = 0; i < 6; i++) {
    let num = getRandomInt(9);
    let randomNum = getRandomInt(25);
    let letter = String.fromCharCode(randomNum + 65); //A:65
    if (getRandomInt(2) === 0) {
      shortUrl += num;
    } else {
      shortUrl += letter;
    }
  }
  return shortUrl;
}



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

