
$(document).ready(function() {
  const orderid = $("#sessionID").data("orderid") ;
  $.ajax({
    url:'/log/status',
    method: 'POST',
    data: {orderid: orderid}
  }).then(function(result) {
    if (result.length === 0) {
      //not loged in, show log in button
      const $loginButton = `<button id="login" class="nav-button" type="button">Login</button>`;
      $("#logContainer").empty();
      $("#logContainer").append($loginButton);
    } else {
      const $logoutButton = `<button id="logout" class="nav-button" type="button">Logout</button>`;
      $("#logContainer").empty();
      $("#logContainer").append($logoutButton);
    }
  });
  $("#logContainer").on('click', '#logout', function() {
    $("#logContainer").empty();
    $("#logContainer").append($loginButton);
    });
  })
  // $("#logContainer").on('click', '#login', function() {
  //   $.ajax({

  //   }).then


  // })








  // $('#loginForm').hide();
  // $('#registerForm').hide();
  // $(".login").click(function() {
  //   $('#registerForm').hide();
  //   $('#loginForm').slideUp();
  //   $('#loginForm').slideDown();
  // });
  // $(".register").click(function() {
  //   $('#loginForm').hide();
  //   $('#registerForm').slideUp();
  //   $('#registerForm').slideDown();
  // });




