/*var client = require('twilio')(
  'AC0ed19f20e070b0e2093bfd771531fce1',
  'dc786425e028cfe48934726f002b7647'
);
client.messages.create({
  from: "+16474904015",
  to: "+16477864414",
  body: "Your order is ready for pickup!"
}).then((message) => console.log(message.sid));


client.messages.create({
  from: "+16474904015",
  to: "+19058308227",
  body: "Your order is ready for pickup!"
}).then((message) => console.log(message.sid));

*/
const accountSid = 'AC0ed19f20e070b0e2093bfd771531fce1'; //process.env.TWILIO_ACCOUNT_SID;
const authToken  = 'dc786425e028cfe48934726f002b7647';  //process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);

const smsRestaurant = (orderid, phone) => {
  const message = `Order received with order id: ${orderid}.`
  client.messages.create({
    from: "+16474904015", //twilio
    to: phone, //"+16477864414", //restaurant
    body: message
  }, 
//function(err, call) {
   // process.stdout.write(call.sid);
//});
  (err, message) => {
    if (err) {
      return err;
    }
  });
}

const smsCustomer = (orderid, time) => {
  const message = `Hello, your order id: ${orderid} from Fast n Yummy should be ready in ${time} mins!.`
  client.messages.create({
    from: "+16474904015", //twilio
    to: "+19058308227", //customer
    body: message
  }, (err, message) => {
    if (err) {
      return err;
    }
  });
}

const smsReady = (orderid) => {
  const message = `Hello your order id: ${orderid} from Fast n Yummy is now ready !.`
  client.messages.create({
    from: "+16474904015", //twilio
    to: "+16477864403", //customer
    body: message
  }, (err, message) => {
    if (err) {
      return err;
    }
  });
}

module.exports = {
  restaurant: smsRestaurant,
  customer: smsCustomer,
  ready: smsReady
};