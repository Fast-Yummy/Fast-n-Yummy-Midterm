function createMenuItem(data) {

  const id = data.foodid;
  const name = data.name;
  const price = data.price;
  const img = data.img;
  const description = data.description;
  const category = data.category;

  let $menu = $(`<section id="${id}">`).addClass(`col-md-4 ${category}`);

  let $header = $("<header>").addClass("menu-item-header");
  let $section = $("<div>").addClass("menu-body");
  let $footer = $("<footer>").addClass("menu-item-footer");

  let $name = $("<span>").addClass("item-name").append(name);

  let $image = $(`<img src = ${img}>`).addClass("menu-item-img");

  let $description = $("<p>").text(description).addClass("description");

  let $plus = $(`<button <i class="fas fa-plus">`).addClass("add-sub");
  let $minus = $(`<button <i class="fas fa-minus">`).addClass("add-sub");
  let $price = $("<p>").addClass("price").append(price);

  $header.append($name);
  $section.append($image, $description);
  $footer.append($plus, $minus, $price);

  $menu.append($header, $section, $footer);

  return $menu;
  }

function renderMenu(menudata) {
  for (let item of menudata) {
    let $item = createMenuItem(item);
    $('#menuContainer').append($item);
  }
}


$(document).ready(function() {
  console.log('ready to loading DOM');
  const loadMenu = () => {
      $.ajax('/menu/load', { method: 'GET' })
      .then(function(data) {
        renderMenu(data);
      });
  }

  $("#menuContainer").on('click', '.fa-plus', function() {

    let foodid = $(this).parent().parent().attr("id");
    console.log(foodid);
    //const orderid;
    $.ajax("/menu/add",
      { method: 'POST',
      data: {
        foodid: foodid,
        orderid: orderid
      }
      }).then(function(response) {
        console.log(response);
      });



  });

  $("#menuContainer").on('click', '.fa-minus', function() {

    let foodid = $(this).parent().parent().attr("id");
    console.log(foodid);
    //const orderid;
    $.ajax("/menu/add",
      { method: 'POST',
      data: {
        foodid: foodid,
        orderid: orderid
      }
      }).then(function(response) {
        console.log(response);
      });



  });



  loadMenu();

});

