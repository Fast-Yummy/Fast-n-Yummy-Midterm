"use strict";
const express = require('express');
const menuRoutes  = express.Router();

module.exports = (databaseHelper) => {
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
  menuRoutes.get("/load", (req, res) => {
    databaseHelper.loadMenu((error, result) => {
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
