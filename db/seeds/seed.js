exports.seed = function(knex, Promise) {
  return  Promise.all([
    knex('fooditem').del().insert([
    {
      name: 'new2',
      price: 99.99,
      category: 'breakfast',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new',
      price: 99.99,
      category: 'breakfast',
      description: 'breakfast',
      img: 'url1',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'main',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'main',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'main',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'dessert',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'breakfast',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'breakfast',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    },
    {
      name: 'new2',
      price: 99.99,
      category: 'breakfast',
      description: 'breakfast',
      img: '/images/breakfast/sandwich-5.png',
      time: 1
    }
    ])
  ]);
};

