var five = require("johnny-five");
var board = new five.Board();
var firebase = require("./firebase.js");
var refFirabase = firebase.ref('sensores');
var led;
var ledValue;

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
      console.log("Hold button");
      refFirabase.set({teste:!ledValue});
    });

});

/*
* Método que altera o estato do LED
*/
var refresh = function(value){
  ledValue = value.teste;
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
  console.log(snapshot.key);
  refresh(snapshot);
});
