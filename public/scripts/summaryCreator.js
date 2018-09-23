function createSummaryItem(data) {
  const name = data.name;
  const quantity = data.quantity;
  const price = Math.round(data.price * 100) / 100;
  const totalTime = quantity * data.time;
  const $item = `<p><a>${name}</a><span class="quantity">  ${quantity}</span><span class="price">${price}</span></p>`;
  return $item;
}

function renderSummary(data) {
  $('.summaryContainer').html("");
  let totalItem = 0;
  for (let item of data) {
    totalItem = parseInt(totalItem) + parseInt(item.quantity);
    }
  const $tittle = `<h4>Cart <span class="price"><i class="fa fa-shopping-cart"></i> <b>${totalItem}</b></span></h4>`;
  $('.summaryContainer').append($tittle);
  let totalPrice = 0;
  for (let item of data) {
    let $item = createSummaryItem(item);
    $('.summaryContainer').append($item);
    totalPrice += item.price * item.quantity;
  }
  totalPrice = Math.round(totalPrice * 100) / 100;
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
      let totalTime = 0;
      for (let item of data) {
        totalTime += item.quantity * item.time;
      }
      const $hidden = `<input type="hidden" name="totalTime" value="${totalTime}">`;
      $('#submitform').append($hidden);
    });
  }
  loadSummary();
  // $('#submit-order').on('submit', function(event) {
  //   console.log("confirm button clicked");
  //   //event.preventDefault();
  //   const phone = $(this).serialize();
  //   console.log(">>>>>>>>>>>>>>phone:", phone, , "this>>>>>>", $(this));
  //   $.ajax('menu/createorder', {
  //     method: 'POST',
  //     data: {
  //       id: orderid,
  //       phone: phone
  //     }
  //   })
  // })



})

