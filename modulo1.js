var five = require("johnny-five");
var board = new five.Board();
var firebase = require("./firebase.js");
var refFirabase = firebase.ref('modulo1');
var led;
var ledValue = false;

const LED_PIN = 9;
const BUTTON_PIN = 8;

/*
* Carregando o Firmata
*/
board.on("ready", function(){
    led = new five.Led(LED_PIN);
    var button = new five.Button(BUTTON_PIN);

    initFirebase();

    board.repl.inject({
      button: button,
      led: led
    });

    button.on("hold", function(){
      refFirabase.set({led:!ledValue});
    });

});

/*
* Método que altera o estato do LED
*/
var refresh = function(value){
  console.log(value);
  if(value == null){
    return;
  }
  ledValue = value.led;

  if(ledValue){
    led.on();
  } else {
    led.off();
  }
}

/*
* Inicializando dados que estão no Firebase
*/
var initFirebase = function(){
  refFirabase.on('value', function(snapshot){
    refresh(snapshot.val());
  });
}
/*
*Quando alterar algum dados na estrutura do firebase
*/
refFirabase.on("child_changed", function(snapshot){
  refresh(snapshot);
});
