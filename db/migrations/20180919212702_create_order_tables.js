exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('fooditem', function(table){
      table.increments('foodid').primary().unsigned();
      table.string('name');
      table.float('price', 10, 2);// 2 is [scale], 10 is maximum number of digits
      table.string('category');
      table.string('description');
      table.string('img'); //image URL
      table.integer('time').unsigned();
    }),
    knex.schema.createTable('orders', function(table){
      table.string('orderid').primary(); //browser cookie session ID is used for orderID
      table.integer('phone');
    }),
    knex.schema.createTable('order_food_item', function(table){
      table.string('orderid').references('orderid').inTable('orders');
      table.integer('foodid').references('foodid').inTable('fooditem');
      table.integer('quantity').unsigned();
    }),
    knex.schema.createTable('customer', function(table){
      table.increments('customerid').primary().unsigned();
      table.integer('phone').unsigned();
      table.string('password');
      table.string('name');
    }),
    knex.schema.createTable('order_history', function(table){
      table.integer('customerid').references('customerid').inTable('customer');
      table.string('orderid').references('orderid').inTable('orders');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_history'),
    knex.schema.dropTable('order_food_item'),
    knex.schema.dropTable('customer'),
    knex.schema.dropTable('fooditem'),
    knex.schema.dropTable('orders')
  ])
};


