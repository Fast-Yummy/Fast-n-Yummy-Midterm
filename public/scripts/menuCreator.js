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

function createCartItem(data) {
  const name = data.name;
  const quantity = data.quantity;
  const totalPrice = Math.round(quantity * data.price * 100) / 100;
  const $item = `<p><a>${name}</a><span class="quantity">  ${quantity}</span><span class="price">${totalPrice}</span></p>`;
  return $item;
}

function renderCart(data) {
  $('.cartContainer').html("");
  let totalItem = 0;
  for (let item of data) {
    totalItem += item.quantity;
  }
  const $cartTittle = `<h4>Cart <span class="price"><i class="fa fa-shopping-cart"></i> <b>${totalItem}</b></span></h4>`;
  $('.cartContainer').append($cartTittle);
  let totalPrice = 0;
  for (let item of data) {
    let $item = createCartItem(item);
    $('.cartContainer').append($item);
    totalPrice += item.price * item.quantity;
  }
  totalPrice = Math.round(totalPrice * 100) / 100;
  const $total = `<p>Total</p> <div>$${totalPrice}</div>`;
  $('.cartContainer').append($total);
}

$(document).ready(function() {
  const orderid = $("#sessionID").data("orderid") ;
  $.ajax("/menu/createorderid", {
    method: 'POST',
    data: {orderid: orderid}
  });

  const loadMenu = () => {
    $.ajax('/menu/load', { method: 'GET' })
    .then(function(data) {
      renderMenu(data);
    });
  }
  loadMenu();

  $("#menuContainer").on('click', '.fa-plus', function() {

    let foodid = $(this).parent().parent().attr("id");
    console.log(foodid);
    const orderid = $("#sessionID").data("orderid") ;
    console.log(orderid);
    $.ajax("/menu/add",
      { method: 'POST',
      data: {
        foodid: foodid,
        orderid: orderid
      }
      }).then(function(response) {
        $('#cartContainer').html("");
        console.log(response);
        renderCart(response);
      });
  });

  $("#menuContainer").on('click', '.fa-minus', function() {
    let foodid = $(this).parent().parent().attr("id");
    console.log(foodid);
    const orderid = $("#sessionID").data("orderid") ;
    console.log(orderid);
    $.ajax("/menu/remove",
      { method: 'POST',
      data: {
        foodid: foodid,
        orderid: orderid
      }
      }).then(function(response) {

        console.log(response);
        renderCart(response);
      });
  });

  $("#breakfast").click(function() {
    $.ajax(
    {
      url: "/menu/category",
      method: 'GET',
      data: {
        category: 'breakfast'
      }
    }).then(function(data) {
      console.log(data);

      renderMenu(data);
    })
  });
  $("#sides").click(function() {
    $.ajax(
    {
      url: "/menu/category",
      method: 'GET',
      data: {
        category: 'sides'
      }
    }).then(function(data) {
      console.log(data);
      $('#menuContainer').html("");
      renderMenu(data);
    })
  });
  $("#main").click(function() {
    $.ajax(
    {
      url: "/menu/category",
      method: 'GET',
      data: {
        category: 'main'
      }
    }).then(function(data) {
      $('#menuContainer').html("");
      renderMenu(data);
    })
  });
  $("#dessert").click(function() {
    $.ajax(
    {
      url: "/menu/category",
      method: 'GET',
      data: {
        category: 'dessert'
      }
    }).then(function(data) {
      $('#menuContainer').html("");
      renderMenu(data);
    })
  });
})
