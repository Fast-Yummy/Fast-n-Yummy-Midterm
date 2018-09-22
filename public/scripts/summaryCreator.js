function createSummaryItem(data) {
  const name = data.name;
  const quantity = data.quantity;
  const totalPrice = quantity * data.price;
  const totalTime = quantity * data.time;
  const $item = `<p><a>${name}</a><span class="quantity">${quantity}</span><span class="price">${totalPrice}</span></p>`;
  return $item;
}
function renderSummary(data) {
  let totalItem = 0;
  let totalTime = 0;
  for (let item of data) {
    totalItem += item.quantity;
    totalTime += item.quantity * item.time;
  }
  const $cartTittle = `<h4>Cart <span class="price"><i class="fa fa-shopping-cart"></i> <b>${totalItem}</b></span></h4>`;
  $('.summaryContainer').append($cartTittle);
  let totalPrice = 0;
  for (let item of data) {
    let $item = createSummaryItem(item);
    $('.summaryContainer').append($item);
    totalPrice += item.price * item.quantity;
  }
  const $total = `<p>Total</p> <div>$${totalPrice}</div>`;
  $('.summaryContainer').append($total);
}


$(document).ready(function() {
  const orderid = $("#sessionID").data("orderid") ;
  const loadSummary = () => {
    $.ajax('/menu/summary', {
      method: 'GET',
      data: {
        orderid: orderid
      }})
    .then(function(data) {
      renderSummary(data);
    });
  }
  loadSummary();


})

