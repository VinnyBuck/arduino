var five = require("johnny-five");
var databases = require("./Firebase.js");
var board = new five.Board();

board.on("ready", function(){
  var led = new five.Led(9);
  var value = 255;
  for (var i = 0; i < value; i++) {
      led.brightness(i);
    }
});
