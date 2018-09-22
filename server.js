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

const url = require('url');

const twilio = require('./server/twilio.js')

const cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['a',0,'g',46,543,52,85,'asdfg','gfsd','trfsdd'],
  maxAge: 60 * 60 * 1000 // 1 hour
}))


// Seperated Routes for each Resource
const databaseHelper = require("./routes/dbHelper")(knex, Promise);
const menuRoutes = require("./routes/menuRoutes")(databaseHelper);

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
app.use("/menu", menuRoutes);
// Home page
app.get("/", (req, res) => {
 res.render("index");
});
//Project Home Page
app.get("/home", (req, res) => {
  const orderid = generateRandomString();
  req.session.order_id = orderid;
  let templateVars = {orderid: orderid};
  res.render("home", templateVars);
});

//Menu Page
app.get("/menu", (req, res) => {
  let templateVars = {orderid: req.session.order_id};
  res.render("menu", templateVars);
});

//Confirmation Page
app.get("/confirmation", (req, res) => {
  let templateVars = {orderid: req.session.order_id};
  res.render("confirmation", templateVars);
});

//Status Page
app.get("/status", (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  const totalTime = req.query.totalTime;
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>totalTime:",totalTime);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>phone:",phoneNumber);
  let templateVars = {orderid: req.session.order_id,
    phoneNumber: phoneNumber,
    totalTime: totalTime
  };
  req.session = null;
  res.render("status", templateVars);
});

app.post("/status", (req,res) => {
  twilio.ready(`${req.session.order_id}`, `+1${req.body.phoneNumber}`)
})

app.get("/cart", (req, res) => {
 res.render("cart");
});

app.post("/order",(req,res) => {
  const totalTime = req.body.totalTime;
  const phoneNumber = req.body.phoneNumber;
  let templateVars = {phoneNumber: req.body.phoneNumber};
  twilio.restaurant(`${req.session.order_id}`, '+16477864414');
  twilio.customer(`${req.session.order_id}`, '20', `+1${req.body.phoneNumber}`);
  //console.log(">>>>>>>>>>>>>>>>>>>>>>>>totalTime:",req.body.totalTime);
  res.redirect(url.format({
    pathname: "/status",
    query: {
      phoneNumber: phoneNumber,
      totalTime: totalTime
    }
  }));
  //res.redirect("/status/?valid=" + phoneNumber);
})

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

