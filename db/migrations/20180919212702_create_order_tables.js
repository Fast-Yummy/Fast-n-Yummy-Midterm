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
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_food_item'),
    knex.schema.dropTable('fooditem'),
    knex.schema.dropTable('orders')
  ])
};


