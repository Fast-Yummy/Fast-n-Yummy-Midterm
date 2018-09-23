"use strict";
const express = require('express');
const menuRoutes  = express.Router();

module.exports = (databaseHelper) => {
  menuRoutes.get("/load", (req, res) => {
    databaseHelper.loadMenu((error, result) => {
      if (error) throw error;
      else {
        res.json(result);
      }
    })
  });
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
  menuRoutes.get("/category", (req, res) => {
    const category = req.query.category;
    console.log(category);
    databaseHelper.getCategory(category, (error, result) => {
      if (error) throw error;
      else {
        res.status(200).json(result);
      }
    })
  });
  menuRoutes.get("/summary", (req, res) => {
    const orderid = req.query.orderid;
    databaseHelper.summary(orderid, (error, result) => {
      if (error) throw error;
      else {
       res.json(result);
      }
    })
  });
  menuRoutes.post("/createorderid", (req, res) => {
    const orderid = req.body.id;
    databaseHelper.createOrderid(orderid, (error, result) => {
      if (error) throw error;
      else {
        res.status(200);
      }
    })
  });
  menuRoutes.post("/createorder", (req, res) => {
    const orderid = req.body.orderid;
    const phone = req.body.phone;
    databaseHelper.createOrderid(orderid, (error, result) => {
      if (error) throw error;
      else {
        res.status(200);
      }
    })
  });
  return menuRoutes;
}

