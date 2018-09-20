"use strict";

const databaseHelper = require("./dbHelper.js")(knex, Promise);
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: "localhost",
    user: 'labber',
    password: 'labber',
    database : 'midterm'
  }
});
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
