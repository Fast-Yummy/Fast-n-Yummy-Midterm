function createSummaryItem(data) {
  const name = data.name;
  const quantity = data.quantity;
  const price = Math.round(data.price * 100) / 100;
  const totalTime = quantity * data.time;
  const $item = `<p><a href="/">${name}<span class="quantity">  ${quantity}</span></a><span class="price">${price}</span></p>`;
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
  let totalTime = 0;
  for (let item of data) {
    let $item = createSummaryItem(item);
    $('.summaryContainer').append($item);
    totalPrice += item.price * item.quantity;
    totalTime += item.quantity * item.time;
  }
  totalPrice = Math.round(totalPrice * 100) / 100;
  const $total = `<p>Total</p> <div>$${totalPrice}</div>`;
  $('.summaryContainer').append($total);
  return totalTime;
}
const $phoneInputForm = `<label for="couponCode">PHONE NUMBER</label>
          <input
            type="tel"
            class="form-control"
            name="phoneNumber"
            placeholder="Phone Number"
            required
          />`;
const orderid = $("#sessionID").data("orderid");

$(document).ready(function() {
  $.ajax('/menu/summary', {
      method: 'GET',
      data: {orderid: orderid}
    })
  .then(function(data) {
    const totalTime = renderSummary(data);
    const $hiddenTime = `<input type="hidden" name="totalTime" value="${totalTime}">`;
    $.ajax({
      url:'/log/logStatus',
      method: 'GET',
      data: {orderid: orderid}
    }).then(function(response) {
      console.log(response);
      if (response.length === 0 || response[0].userid === null) {
        $('#submitform').append($hiddenTime).append($phoneInputForm);
      } else {
        const phone = response[0].phone;
        const $hiddenPhone = `<input type="hidden" name="phoneNumber" value="${phone}">`;
        $('#submitform').append($hiddenTime).append($hiddenPhone);
      }
    });
  });






})
  //
  //

  //
  //
  //     $.ajax({
  //       url:'/log/logStatus',
  //       method: 'GET',
  //       data: {orderid: orderid}
  //     }).then(function(response) {
  //       console.log('>>>>>>>>>>>>>>>>>>response',totalTime,response);
  //       if (response.length === 0 || response[0].userid === null) {
  //         $('#submitform').append($hiddenTime).append($phoneInputForm);
  //       } else {
  //         const phone = response[0].phone;
  //         console.log(">>>>>>>>>>>confirm form sent, hidden phone:",phone);
  //         const $hiddenPhone = `<input type="hidden" name="phoneNumber" value="${phone}">`;
  //         $('#submitform').append($hiddenTime).append($hiddenPhone);
  //       }
  //     });


  //  console.log(">>>>>>>>>>>>");

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



