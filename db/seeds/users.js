exports.seed = function(knex, Promise) {
  return  Promise.all([
    knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice'}),
        knex('users').insert({id: 2, name: 'Bob'}),
        knex('users').insert({id: 3, name: 'Charlie'})
      ]);
    }),

    knex('fooditem').del()
    .then(function () {
      return Promise.all([
        knex('fooditem').insert({
          name: 'food_testing1',
          price: 99.99,
          description: 'breakfast',
          img: 'url1'
      }),
        knex('fooditem').insert({
          name: 'food_testing2',
          price: 99.99,
          description: 'testing1',
          img: 'url1'
      }),
        knex('fooditem').insert({
          name: 'food_testing3',
          price: 99.99,
          description: 'testing1',
          img: 'url1'
      })
      ]);
    })

  ]);
};

