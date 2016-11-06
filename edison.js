var five = require('johnny-five');
var Edison = require('edison-io');

var board = new five.Board({
  io: new Edison()
});

board.on('ready', function(){
  var led = new five.Led(13);
  led.blink();
  var led2 = new five.Led(11);
  led2.brightnes(120);
});
