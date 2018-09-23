module.exports = function databaseHelper(knex, Promise) {
  return {
    loadMenu: function(cb)
     {
      knex("fooditem").select().then(function(result) {
        //result will be an array of object of fooditem
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
    //add item to cart and return the updated cart
    addCart: function(orderid, foodid, cb) {
      knex.select('quantity').from('order_fooditem')
      .where('orderid', '=', orderid)
      .andWhere('foodid', '=', foodid)
      .then(function(result) {
        if (result.length === 0) {
          knex("order_fooditem").insert({orderid: orderid, foodid: foodid, quantity: 1})
          .then(function(result) {
            const qraw = 'name, quantity, quantity * price as price';
            knex.select(knex.raw(qraw))
            .from('order_fooditem').innerJoin('fooditem', 'fooditem.id', 'order_fooditem.foodid')
            .where('orderid', '=', orderid)
            .groupBy('name', 'quantity', 'price','foodid')
            .orderBy('foodid')
            .then(function(result) {
              cb(null,result);
            })
      });
        } else {
          knex('order_fooditem')
          .where('orderid', '=', orderid)
          .andWhere('foodid', '=', foodid)
          .increment('quantity',1)
          .then(function(result) {
            const qraw = 'name, quantity, quantity * price as price';
            knex.select(knex.raw(qraw))
            .from('order_fooditem').innerJoin('fooditem', 'fooditem.id', 'order_fooditem.foodid')
            .where('orderid', '=', orderid)
            .groupBy('name', 'quantity', 'price','foodid')
            .orderBy('foodid')
            .then(function(result) {
              cb(null,result);
            })
          });
        }
      })
    },

    //removeCart remove item to cart and return the updated cart
    removeCart: function(orderid, foodid, cb) {
      knex.select('quantity').from('order_fooditem')
      .where('orderid', '=', orderid)
      .andWhere('foodid', '=', foodid)
      .then(function(result) {
        if (result.length === 0) {
          const qraw = 'name, quantity, quantity * price as price';
          knex.select(knex.raw(qraw))
          .from('order_fooditem').innerJoin('fooditem', 'fooditem.id', 'order_fooditem.foodid')
          .where('orderid', '=', orderid)
          .groupBy('name', 'quantity', 'price','foodid')
          .orderBy('foodid')
          .then(function(result) {
            cb(null,result);
          });
        } else if (result[0].quantity > 1) {
          knex('order_fooditem')
          .where('orderid', '=', orderid)
          .andWhere('foodid', '=', foodid)
          .decrement('quantity',1)
          .returning('*').then(function(result){console.log(result)})
          .then(function() {
            const qraw = 'name, quantity, quantity * price as price';
            knex.select(knex.raw(qraw))
            .from('order_fooditem').innerJoin('fooditem', 'fooditem.id', 'order_fooditem.foodid')
            .where('orderid', '=', orderid)
            .groupBy('name', 'quantity', 'price','foodid')
            .orderBy('foodid')
            .then(function(result) {
              cb(null,result);
            })
          });
        } else {
          knex('order_fooditem')
          .where('orderid', '=', orderid)
          .andWhere('foodid', '=', foodid).del().then(function() {
            const qraw = 'name, quantity, quantity * price as price';
            knex.select(knex.raw(qraw))
            .from('order_fooditem').innerJoin('fooditem', 'fooditem.id', 'order_fooditem.foodid')
            .where('orderid', '=', orderid)
            .groupBy('name', 'quantity', 'price','foodid')
            .orderBy('foodid')
            .then(function(result) {
              cb(null,result);
            })
          });
        }
      })
    },

    summary: function(orderid, cb) {
      const qraw = 'name, quantity, quantity * price as price, quantity * time as time';
      knex.select(knex.raw(qraw))
      .from('order_fooditem').innerJoin('fooditem', 'fooditem.id', 'order_fooditem.foodid')
      .where('orderid', '=', orderid)
      .groupBy('name', 'quantity', 'price','foodid','time')
      .orderBy('foodid')
      .then(function(result) {
        cb(null,result);
      });
    },

    createOrderid: function(orderid, cb) {
      knex("orders").select().where('id', '=', orderid)
      .then(function(result) {
        if (result.length === 0) {
          knex("orders").insert({id: orderid}).returning('*')
          .then(function(result) {
            cb(null,result);
          })
        } else {
          cb(null,result);
        }
      });
    },

    createOrder: function(orderid, phone, cb) {
      knex("orders").select().where('id', '=', orderid)
      .then(function(result) {
        knex("orders").update({phone: phone}).returning('*')
        .then(function(result) {
          cb(null, result);
        })
      });
    // },

    // logStatus: function(orderid, cb) {
    //   console.log(">>>>>>>>>>>>>>>>");
    //   knex("fooditem").where('category', '=', orderid).select()
    //   .then(function(result) {
    //     cb(null, result);
    //   });
    //   // knex.select('name').from("order_history")
    //   // .innerJoin('customer', 'customer.customerid', 'order_history.customerid')
    //   // .where('orderid', '=', orderid)
    //   // .then(function(result) {
    //   //   console.log(">>>>>>>>>>>>>>>>result:",result);
    //   //   cb(null, result);
    //   // });
    // },
    // status: function(orderid, cb) {
    //   knex.select('name').from("order_history")
    //   .innerJoin('customer', 'customer.customerid', 'order_history.customerid')
    //   .where('orderid', '=', orderid)
    //   .then(function(result) {
    //     console.log(">>>>>>>>>>>>>>>>result:",result);
    //     cb(null, result);
    //   });

    }
  };
}
