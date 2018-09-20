exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('fooditem', function(table){
      table.increments('id').primary().unsigned();
      table.string('name');
      table.float('price', 10, 2);// 2 is [scale], 10 is maximum number of digits
      table.string('description');
      table.string('img'); //image URL
    }),
    // .then(function() {
    //   return knex("fooditem").insert([
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
    //   }
    //   ]);
    // }),

    knex.schema.createTable('orders', function(table){
      table.string('id').primary(); //browser cookie session ID is used for orderID
      table.integer('phone');
    }),

    knex.schema.createTable('order_food_item', function(table){
      table.string('orderid').references('id').inTable('orders');
      table.integer('foodid').references('id').inTable('fooditem');
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

//psql
//\c midterm
//SELECT * FROM fooditem;
//SELECT * FROM migrations; //to check past migrations
//knex migrate:latest
//knex migrate:rollback

