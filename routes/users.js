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
const menuRoutes  = express.Router();

module.exports = (knex) => {
  menuRoutes.post("/add", (req, res) => {
    const orderid = req.body.orderid;
    const foodid = req.body.foodid;
    databaseHelper.addCart(orderid, foodid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });
  menuRoutes.post("/remove", (req, res) => {
    const orderid = req.body.orderid;
    const foodid = req.body.foodid;
    databaseHelper.removeCart(orderid, foodid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });
  menuRoutes.post("/menu", (req, res) => {
    databaseHelper.loadMenu(orderid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });
  menuRoutes.post("/category", (req, res) => {
    const category = req.body.category;
    databaseHelper.getCategory(category, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });

  return menuRoutes;



   menuRoutes.get("/menu", (req, res) => {
    const orderid = req.body.orderid;
    const foodid = req.body.foodid;
    databaseHelper.finalCart(orderid, (error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });

menuRoutes.post("/status", (req, res) => {
    const orderid = req.body.orderid;
    databaseHelper.summary(orderid, (error, result) => {
      if (error) throw error;
      else {
        const summary = [];
        for (let item in result) {
          const itemDetail = {};
          for (let key of item) {
            itemDetail.foodid = item.foodid;
            itemDetail.totalPrice = item.quantity * item.price;
            itemDetail.totalTime = item.quantity * item.time;
          }
          summary.push(itemDetaild);
        }
       res.json(summary);
      }
    })
  });

  return menuRoutes;
}
