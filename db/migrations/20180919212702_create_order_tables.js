exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('fooditem', function(table){
      table.increments('id').primary().unsigned();
      table.string('name');
      table.float('price', 10, 2);// 2 is [scale], 10 is maximum number of digits
      table.string('category');
      table.string('description');
      table.string('img'); //image URL
      table.integer('time').unsigned();
    }),
    knex.schema.createTable('orders', function(table){
      table.string('id').primary(); //browser cookie session ID is used for orderID
      table.string('phone');
    }),
    knex.schema.createTable('order_fooditem', function(table){
      table.string('orderid').references('id').inTable('orders');
      table.integer('foodid').references('id').inTable('fooditem');
      table.integer('quantity').unsigned();
    }),
    knex.schema.createTable('customers', function(table){
      table.increments('id').primary().unsigned();
      table.string('phone');
      table.string('password');
      table.string('name');
    }),
    knex.schema.createTable('order_history', function(table){
      table.integer('customerid').references('id').inTable('customers');
      table.string('orderid').references('id').inTable('orders');
      table.string('userid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_history'),
    knex.schema.dropTable('order_fooditem'),
    knex.schema.dropTable('customers'),
    knex.schema.dropTable('fooditem'),
    knex.schema.dropTable('orders')
  ])
};


