"use strict";
const express = require('express');
const logRoutes  = express.Router();

module.exports = (databaseHelper) => {
  logRoutes.post("/", (req, res) => {
    databaseHelper.createOrderid((error, result) => {
      if (error) throw error;
      else {
        console.log("/status>>>>>>>>>>>>>>", result);
        res.json(result);
      }
    })
    //res.json([{name: "nametest01"}]);
  });


  return logRoutes;
}

