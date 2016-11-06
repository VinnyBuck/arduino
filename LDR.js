var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function(){
  var led = new five.Led(11);
  var light = new five.Light("A0");
  light.on("change", function(){
    //Convert value the sensor the light to HEXDECIMAL
    var ldrValue = this.level * 255;
    //Set valur this convert to LED
    led.brightness(ldrValue);
  })
});
