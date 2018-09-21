function createMenuItem(data) {
  const id = ;
  const name = ;
  const price = ;
  const img = ;
  const description = ;

  let $menu = $(`<section id="${id} menu">`).addClass("col-md-4");

  let $header = $("<header>").addClass("menu-item-header");
  let $section = $("<div>").addClass("menu-body");
  let $footer = $("<footer>").addClass("menu-item-footer");

  let $name = $("<span>").addClass("item-name").append(name);

  let $image = $(`<img src = ${img}>`).addClass("menu-item-img");

  let $description = $("<p>").text(description).addClass("description");

  let $plus = $(`<button <i class="fas fa-plus">>`).addClass("add-sub");
  let $minus = $(`<button <i class="fas fa-minus">>`).addClass("add-sub");
  let $price = $("<p>").addClass("price").append(price);

  $header.append($name);
  $section.append($image, $description);
  $footer.append($plus, $minus, $price);

  $menu.append($header, $section, $footer);

  return $menu;
  }
