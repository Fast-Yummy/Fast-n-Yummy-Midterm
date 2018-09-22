exports.seed = function(knex, Promise) {
  return  Promise.all([
    knex('fooditem').del().insert([
    {
      name: 'Delicious Breakfast Bowl',
      price: 8.99,
      category: 'breakfast',
      description: 'A delicious bowl of granola and fresh fruit.',
      img: '/images/Breakfast/healthy-fruits-breakfast.jpg',
      time: 5
    },
    {
      name: 'Breakfast BLT',
      price: 9.99,
      category: 'breakfast',
      description: 'A tasty BLT with bonus fried egg.',
      img: '/images/Breakfast/sandwich.png',
      time: 10
    },
    {
      name: 'Egg and Cheddar',
      price: 9.99,
      category: 'breakfast',
      description: 'A lovely poached egg smothered in cheese.',
      img: '/images/Breakfast/egg_and_cheese.jpg',
      time: 10
    },
    {
      name: 'Chicken and Waffles',
      price: 12.99,
      category: 'breakfast',
      description: 'Everyones favourite ridiculous breakfast.',
      img: '/images/Breakfast/chicken-and-waffles.jpg',
      time: 15
    },
    {
      name: 'Chicken Sandwich',
      price: 14.99,
      category: 'main',
      description: 'Grilled chicken, bacon and avocado on a bun.',
      img: '/images/Mains/chicken_sandwich.jpg',
      time: 10
    },
    {
      name: 'Mini Chicken Wraps',
      price: 12.99,
      category: 'main',
      description: 'Seasoned chicken in soft tortillas.',
      img: '/images/Mains/chicken_wrap.jpg',
      time: 20
    },
    {
      name: 'Chicken and Mushrooms',
      price: 16.99,
      category: 'main',
      description: 'Grilled chicken breast topped with mushrooms.',
      img: '/images/Mains/Chicken.jpg',
      time: 20
    },
    {
      name: 'Salmon Toast',
      price: 15.99,
      category: 'main',
      description: 'Fresh salmon and veggies on toasted bread.',
      img: '/images/Mains/Salmon.jpg',
      time: 15
    },
    {
      name: 'Deli Sandwich',
      price: 12.99,
      category: 'main',
      description: 'Various deli meats and cheese, on a fancy bread triangle.',
      img: '/images/Mains/sandwich-deli.jpg',
      time: 10
    },
    {
      name: 'Steak',
      price: 24.99,
      category: 'main',
      description: 'Its a steak. What more could you want?',
      img: '/images/Mains/steak.jpg',
      time: 20
    },
    {
      name: 'Veggie Wrap',
      price: 15.99,
      category: 'main',
      description: 'Sweet potato, onion and veggies.',
      img: '/images/Mains/veg-wrap.jpg',
      time: 15
    },
    {
      name: 'Chicken Drumsticks',
      price: 10.99,
      category: 'sides',
      description: 'Spicy roasted chicken legs.',
      img: '/images/Sides/chicken_leg.jpg',
      time: 20
    },
    {
      name: 'Chicken Patties',
      price: 12.99,
      category: 'sides',
      description: 'Juicy grilled circles of chicken. The tastiest shape.',
      img: '/images/Sides/chicken_nuggets.jpg',
      time: 15
    },
    {
      name: 'Chicken Tenders',
      price: 10.99,
      category: 'sides',
      description: 'Kid safe. Grownup safe too.',
      img: '/images/Sides/Chicken-tenders.jpg',
      time: 15
    },
    {
      name: 'Salad',
      price: 6.99,
      category: 'sides',
      description: `Those greens your mom wanted you to eat. You're welcome.`,
      img: '/images/Sides/salad.jpg',
      time: 5
    },
    {
      name: 'Honey Garlic Chicken',
      price: 12.99,
      category: 'sides',
      description: 'Tasty enough to eat as a main dish. Maybe buy two.',
      img: '/images/Sides/honey-garlic.jpg',
      time: 20
    },
    {
      name: 'Potato Cakes',
      price: 12.99,
      category: 'sides',
      description: 'Fritters. Latkes. Kartoffelpuffen. Delicious.',
      img: '/images/Sides/Potatocake.jpg',
      time: 20
    },
    {
      name: 'Potato Wedges',
      price: 7.99,
      category: 'sides',
      description: 'Oven roasted potato wedges.',
      img: '/images/Sides/Roasted_potato.jpg',
      time: 15
    },
    {
      name: 'Rocky Road Bars',
      price: 8.99,
      category: 'dessert',
      description: 'White chocolate, caramel, walnut pieces, and fudge.',
      img: '/images/Dessert/rocky-road.jpeg',
      time: 5
    },
    {
      name: 'Chocolate Mousse',
      price: 9.99,
      category: 'dessert',
      description: 'All the chocolate you could want, in convenient layers.',
      img: '/images/Dessert/layered-chocolate-mousse.jpeg',
      time: 5
    },
    {
      name: 'Mini Pavlova',
      price: 10.99,
      category: 'dessert',
      description: 'Meringue, cream, and fruit. Fancy.',
      img: '/images/Dessert/mini-pavlova.jpg',
      time: 10
    },
    {
      name: 'Strawberry Shortcake',
      price: 9.99,
      category: 'dessert',
      description: 'Summer, but in dessert form.',
      img: '/images/Dessert/shortcake.jpg',
      time: 10
    },
    {
      name: 'Caramel Cheesecake',
      price: 12.99,
      category: 'dessert',
      description: 'Cheesecake, topped with caramel, nuts and chocolate.',
      img: '/images/Dessert/cheesecake.jpg',
      time: 5
    }
    ])
  ]);
};

