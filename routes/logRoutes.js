"use strict";
const express = require('express');
const logRoutes  = express.Router();

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

module.exports = (databaseHelper) => {
  logRoutes.get("/logStatus", (req, res) => {
    const orderid = req.query.orderid;
    databaseHelper.logStatus(orderid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });

  logRoutes.post("/login", (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    const orderid = req.body.orderid;
    const userid = generateRandomString();
    req.session.userid = userid;
    console.log(">>>>>>>>>>>>>>>>>>>>userid session:",req.session.userid);
    databaseHelper.login(phone, password, orderid, userid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });
  logRoutes.post("/logout", (req, res) => {
    const orderid = req.body.orderid;
    req.session.userid = null;
    databaseHelper.logout(orderid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });




  return logRoutes;
}

