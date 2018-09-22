"use strict";
const express = require('express');
const logRoutes  = express.Router();

module.exports = (databaseHelper) => {
  logRoutes.get("/status", (req, res) => {
    databaseHelper.logStatus((error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });


  return logRoutes;
}

