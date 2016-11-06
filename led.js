var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function(){
  var led = new five.Led(11);
  //led.blink(500);
  //led.on();
  var value = 255;
  for (var i = 0; i < value; i++) {
      led.brightness(i);
});
