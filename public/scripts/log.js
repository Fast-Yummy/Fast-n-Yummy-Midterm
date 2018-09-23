function renderlog(response) {
  const $loginButton = `<button id="login" class="nav-button" type="button">Login</button>`;
  const $logoutButton = `<button id="logout" class="nav-button" type="button">Logout</button>`;
  if (response.length === 0 || response[0].userid === null) {
    $("#logContainer").empty();
    $('.login-welcome').html('')
    $("#logContainer").append($loginButton);
  } else {
    $("#logContainer").empty();
    $("#logContainer").append($logoutButton);
    $('#loginForm').hide();
    const name = result[0].name;
    const $welcome = `Welcome ${name}!`;
    $('.login-welcome').html('').append($welcome);
    //////  //////  ////////display the name and store the phone number in DOM in header
  }
}
$(document).ready(function() {

  $('#loginForm').hide();
  const orderid = $("#sessionID").data("orderid");
  const checkLogStatus = function() {
    $.ajax(
    {
      url:'/log/logStatus',
      method: 'GET',
      data: {
        orderid: orderid
      }
    }).then(function(response) {
      renderlog(response);
    });
  }
  checkLogStatus();

  $.ajax("/menu/createorderid", {
    method: 'POST',
    data: {id: orderid}
  });

  $("#logContainer").on('click', '#logout', function() {
    $.ajax({
      url:'/log/logout',
      method: 'POST',
      data: {orderid: orderid}
      }).then(function() {
        checkLogStatus();
      });
    });

  $("#logContainer").on('click', '#login', function() {
    $('#loginForm').slideDown();
  })
  $("#loginForm").on('submit', function(event) {
    event.preventDefault();
    const info = $(this).serialize();
    const n = info.indexOf("&password");
    const phone = info.slice(6,n);
    const password = info.slice(n+10);
    $.ajax({
      url:'/log/login',
      method: 'POST',
      data: {
        phone:phone,
        password:password,
        orderid: orderid
      }
    }).then(function(result) {
      checkLogStatus();
    });
  })

  $('#registerForm').hide();
  $("#registerContainer").on('click', '#register-button', function() {
    $('#registerForm').slideDown();
  })

  $("#registerForm").on('submit', function(event) {
    event.preventDefault();
    const info = $(this).serialize();
    const e = info.indexOf("&phone");
    const p = info.indexOf("&password");
    const name = info.slice(5,e);
    const phone = info.slice(e+7,p);
    const password = info.slice(p+10);
    $.ajax({
      url:'/log/register',
      method: 'POST',
      data: {
        name: name,
        phone:phone,
        password:password,
      }
    }).then(function() {
      $('#registerContainer').hide();
      const $welcome = `<p>Welcome ${name}!</p>`;
      $('.welcome').html('').append($welcome);

    });
  })

})

