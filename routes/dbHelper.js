module.exports =

// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host : 'localhost',
//     user : 'labber',
//     password : 'labber',
//     database : 'midterm'
//   }
// });
function databaseHelper(knex, Promise) {
  return {

    addItemToMenu: function(itemData) {
        knex("order_history").insert(itemData).returning('*')
        .then(function(result) {
          console.log("successfully updated menu:",result);
        });    },

    //loadMenu return the menu for rendering
    loadMenu: function(cb)
     {
      knex("fooditem").select().then(function(result) {
        //result will be an array of object of fooditem, ignore anonymous
        cb(null, result);
      });
    },

    //return an array of obj of all the item of that category
    getCategory: function(category, cb) {
      knex("fooditem").select().where('category', '=', category)
      .then(function(result) {
        cb(null, result);
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
        });
    },

    //add item to cart and return the updated cart
    addCart: function(orderid, foodid, cb) {
      const qraw ='name, COUNT(fooditem.foodid) AS quantity, fooditem.price';
      knex("order_food_item")
      .insert({orderid: orderid, foodid: foodid})
      .then(function(result) {
        knex.select(knex.raw(qraw))
        .from('order_food_item').innerJoin('fooditem', 'fooditem.foodid', 'order_food_item.foodid')
        .where('orderid', '=', orderid)
        .groupBy('fooditem.name', 'fooditem.price')
        .then(function(result) {
          cb(null,result);
        })
      });
    },

    //removeCart remove item to cart and return the updated cart
    removeCart: function(orderid, foodid, cb) {
      const qraw ='name, COUNT(fooditem.foodid) AS quantity, fooditem.price';
      knex("order_food_item")
      .where('orderid', '=', orderid)
      .andWhere('foodid', '=', foodid)
      .offset(1)
      .limit(1)
      .del()
      .then(function(result) {
        knex.select(knex.raw(qraw))
        .from('order_food_item').innerJoin('fooditem', 'fooditem.foodid', 'order_food_item.foodid')
        .where('orderid', '=', orderid)
        .groupBy('fooditem.name', 'fooditem.price')
        .then(function(result) {
          cb(null,result);
        })
      });
    },

    summary: function(orderid, cb) {
      var qraw = 'name, COUNT(order_food_item.foodid) AS quantity, price, time';
      knex.select(knex.raw(qraw))
      .from('order_food_item').innerJoin('fooditem', 'fooditem.foodid', 'order_food_item.foodid')
      .where('orderid', '=', orderid)
      .groupBy('name', 'price', 'time')
      .then(function(result) {
        cb(null,result);
      });
    },

    createOrderid: function(orderid, cb) {
      knex("orders").where('orderid', '=', orderid)
      .andWhere('orderid', '=', orderid)
      .del()
      .then(function(result) {
        knex("orders").insert({orderid: orderid}).returning('*')
        .then(function(result) {
          cb(null,result);
        })
      });
    },

    createOrder: function(orderid, phone, cb) {
      knex("orders").where('orderid', '=', orderid)
      .andWhere('orderid', '=', orderid)
      .del()
      .then(function(result) {
        knex("orders").insert({orderid: orderid, phone: phone}).returning('*')
        .then(function(result) {
          cb(null, result);
        })
      });
    },

    logStatus: function(orderid, cb) {
      knex.select('name').from("order_history")
      .innerJoin('customer', 'customer.customerid', 'order_history.customerid')
      .where('orderid', '=', orderid)
      .then(function(result) {
        cb(null, result);
      });
    }
  };
}

//databaseHelper(knex, Promise).logStatus('testorder02', console.log);

/////////////////testing/////////////ignore///////////////////////////


//databaseHelper(knex, Promise).addCart('K02714',4,console.log);
//databaseHelper(knex, Promise).removeCart('K02714',2,console.log);


 // const orderData = {customerid: 1,
 //                    orderid: 'testorder01'};
 //  databaseHelper(knex, Promise).addItemToMenu(orderData);

// const itemList = [{orderid: "abc123", foodid: 2}];

