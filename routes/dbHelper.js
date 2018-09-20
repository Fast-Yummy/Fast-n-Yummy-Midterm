//const databaseHelper = require("./db/dbHelper.js")(knex, Promise);
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: "localhost",
    user: 'labber',
    password: 'labber',
    database : 'midterm'
  }
});

function organizeOrderList(knex, Promise, orderID) {
  const cart = {};
  knex.select('orderID','foodID','COUNT(foodid)')
  .from('order_food_item')
  .where('orderID', '=', orderID)
  .then(function(result) {
    console.log(result);
    // knex(result).countDistinct({ quantity: 'foodID' }).then(function(result2) {
    //   console.log(result2);
    //})
    return;
  })
  .finally(function() {
    knex.destroy();
  });
}

//module.exports =
function databaseHelper(knex, Promise) {
  return {
    addItemToMenu: function(itemData) {
    //itemData is an array of obj of fooditem
    //for example: [
    //   {
    //     name: 'food_testing1',
    //     price: 99.99,
    //     description: 'testing1',
    //     img: 'url1'
    //   },
    //   {
    //     name: 'food_testing1',
    //     price: 99.99,
    //     description: 'testing1',
    //     img: 'url1'
    //   }]

        knex("fooditem").insert(itemData).returning('*')
        .then(function(result) {
          console.log("successfully updated menu:",result);
        }).catch(function(err) {
          console.log("the order format is not corret, apply an array of obj of fooditem, or it may be cause by adding duplicated order(duplicate key value violates unique constraint)");
        }).finally(function() {
          knex.destroy();
        });
    },
    addOrder: function(orderData) {
      //orderData is an obj of two item: id(session) and phone#
      knex("orders").insert(orderData).returning('*')
        .then(function(result) {
          console.log("successfully insert order:",result);
        })
        .catch(function(err) {
          console.log("the order format is not corret, apply an obj of two item: id and phone, or it may be cause by adding duplicated order(duplicate key value violates unique constraint)");
        })
        .finally(function() {
          knex.destroy();
        });
    },
    addOrderItem: function(itemList) { //add items and return what's in the cart
      //itemList is an array of obj of 2 items: foodid, orderid
      knex("order_food_item").insert(itemList).returning('*')
        .then(function(result) {
          console.log("successfully insert ordered item:",result);
        }).finally(function() {
          knex.destroy();
        });
    }
  };
}

/////////////////////////////testing/////////////////////////////
// const itemData =[
//       {
//         name: 'food_testing3',
//         price: 100.78,
//         description: 'testing3',
//         img: 'url1'
//       },
//       {
//         name: 'food_testing4',
//         price: 399.99,
//         description: 'testing4',
//         img: 'url1'
//       }];
// databaseHelper(knex, Promise).addItemToMenu(itemData);

// const orderData = {id: "abc123",
//                    phone: 123456111};
// databaseHelper(knex, Promise).addOrder(orderData);

// const itemList = [{orderid: "abc123", foodid: 4}];
// databaseHelper(knex, Promise).addOrderItem(itemList);
organizeOrderList(knex, Promise, 'abc123');
