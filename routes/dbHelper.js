// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: "localhost",
//     user: 'labber',
//     password: 'labber',
//     database : 'midterm'
//   }
// });


module.exports = function databaseHelper(knex, Promise) {
  return {
    //this is for just in case we use API
    //for store owner to add food item to menu.
    // addItemToMenu: function(itemData) {
    //     knex("fooditem").insert(itemData).returning('*')
    //     .then(function(result) {
    //       console.log("successfully updated menu:",result);
    //     }).catch(function(err) {
    //       console.log("the order format is not corret, apply an array of obj of fooditem, or it may be cause by adding duplicated order(duplicate key value violates unique constraint)");
    //     }).finally(function() {
    //       knex.destroy();
    //     });
    // },

    //loadMenu return the menu for rendering
    loadMenu: function(cb)
     {
      knex("fooditem").select().then(function(result) {
        //result will be an array of object of fooditem, ignore anonymous
        cb(null, result);
      })
      .finally(function() {
        knex.destroy();
      });
    },

    //return an array of obj of all the item of that category
    getCategory: function(category, cb) {
      knex("fooditem").select().where('category', '=', category)
      .then(function(result) {
        cb(null, result);
      }).finally(function() {
        knex.destroy();
      });
    },
    //add orderid and phone number at the payment
    addOrder: function(orderData, cb) {
      //orderData is an obj of two item: id(session) and phone
      knex("orders").insert(orderData).returning('*')
        .then(function(result) {
          console.log("successfully insert order:",result);
          cb(null, result);
        })
        .catch(function(err) {
          console.log("the order format is not corret, apply an obj of two item: id and phone, or it may be cause by adding duplicated order(duplicate key value violates unique constraint),or callback function");
        })
        .finally(function() {
          knex.destroy();
        });
    },

    //add item to cart and return the updated cart
    addCart: function(orderid, foodid, cb) {
      var qraw = 'orderid, foodid, COUNT(foodid) AS quantity';
      knex("order_food_item")
      .insert({orderid: orderid, foodid: foodid})
      .then( function(result) {
        //SELECT orderid, foodid, COUNT(foodid) FROM order_food_item GROUP BY orderid,foodid;
        knex.select(knex.raw(qraw))
        .from('order_food_item')
        .where('orderid', '=', orderid)
        .groupBy('orderid', 'foodid')
        .then(function(result) {
          cb(null,result);
        })
      })
      .finally(function() {
        knex.destroy();
      });
    },

    //removeCart remove item to cart and return the updated cart
    removeCart: function(orderid, foodid, cb) {
      var qraw = 'orderid, foodid, COUNT(foodid) AS quantity';
      knex("order_food_item")
      .where('orderid', '=', orderid)
      .andWhere('foodid', '=', foodid)
      .offset(1)
      .del()
      .then( function(result) {
        knex.select(knex.raw(qraw))
        .from('order_food_item')
        .where('orderid', '=', orderid)
        .groupBy('orderid', 'foodid')
        .then(function(result) {
          cb(null,result);
        })
      })
      .finally(function() {
        knex.destroy();
      });
    },

    //finalCart(orderid, cb)
    finalCart: function(orderid, cb) {
      var qraw = 'orderid, foodid, COUNT(foodid) AS quantity';
      knex.select(knex.raw(qraw))
      .from('order_food_item')
      .where('orderid', '=', orderid)
      .groupBy('orderid', 'foodid')
      .then(function(result) {
        cb(null,result);
      })
      .finally(function() {
        knex.destroy();
      });
    }
  };
}





/////////////////testing/////////////ignore///////////////////////////
//databaseHelper(knex, Promise).loadMenu(console.log);
//databaseHelper(knex, Promise).getCategory('lunch',console.log); //cca1345
//databaseHelper(knex, Promise).addCart('dda1345',2,console.log);
//databaseHelper(knex, Promise).removeCart('dda1345',2,console.log);
//databaseHelper(knex, Promise).finalCart('dda1345', console.log)
// const itemData =[
//       {
//         name: 'food_testing3',
//         price: 100.78,
//         description: 'testing3',
//         img: 'url1',
//         time:1
//       },
//       {
//         name: 'food_testing4',
//         price: 399.99,
//         description: 'testing4',
//         img: 'url1',
//         time:1
//       }];
// databaseHelper(knex, Promise).addItemToMenu(itemData);

// const orderData = {orderid: "dda1345",
//                    phone: 123456111};
// databaseHelper(knex, Promise).addOrder(orderData,console.log);

// const itemList = [{orderid: "abc123", foodid: 2}];
//
