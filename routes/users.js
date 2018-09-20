"use strict";

const express = require('express');
const router  = express.Router();
const async   = require('async');
const twilio  = require('../server/twilio');

//Add to Cart
const addtocart = (foodid)=>{
cart = [];
cart.push(foodid);
}
// Remove from Cart
const removefromcart = (foodid) =>{
cart = [];
cart.remove(foodid);




module.exports = (knex) => {

router.get("/", (req, res) => {
  knex
   .select("*")
   .from("users")
   .then((results) => {
    res.json(results);
  });
 });
​
 return router;
}

/*const calculateTotal = (order) => { // Need to work 
  let total = 0;
  let quantity;
  order.foodid.forEach((foodid) => {
    let quantity
    total += (fooditem.price * quantity)
  })
 
  return total * 1.13;
}*/