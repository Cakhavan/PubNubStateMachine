var five = require('johnny-five'),
  board, button;

board = new five.Board();
var PubNub = require('pubnub');


    board.on('ready', function() {
   // Create a new 'LED' hardware instance.
   let led_1 = new five.Led(13);
   let led_2 = new five.Led(12);
   let led_3 = new five.Led(11);

   // Create a new `button` hardware instance.
   let button_1 = new five.Button({
    pin: 'A5',
    isPullup: true,
  });
   let button_2 = new five.Button({
    pin: 'A4',
    isPullup: true,
  });
   let button_3 = new five.Button({
    pin: 'A3',
    isPullup: true,
  });
   let button_4 = new five.Button({
    pin: 'A2',
    isPullup: true,
  });


 pubnub = new PubNub({

        publishKey: 'pub-c-2bda6cf3-c455-4b28-bbed-00611b461f98',
        subscribeKey: 'sub-c-5bdd008c-6d97-11e8-a49b-66b3abd5adf6',

                    });


                    pubnub.addListener(
                    {

                         message: function(message)
                         {
                            console.log(message.message);
                            if (message.message == 'a') {
                                led_1.stop().off();
                                led_2.stop().off();
                                led_3.stop().off();
                                led_1.on();
                            } else if (message.message == 'b') {
                                led_1.stop().off();
                                led_2.stop().off();
                                led_3.stop().off();
                                led_1.on();
                                led_2.on();
                            } else if (message.message == 'c') {
                                led_1.stop().off();
                                led_2.stop().off();
                                led_3.stop().off();
                                led_1.on();
                                led_2.on();
                                led_3.on();
                            } else if (message.message == 'Unlocked!') {
                                    led_1.stop().off();
                                led_2.stop().off();
                                led_3.stop().off();
                                led_1.blink();
                                led_2.blink();
                                led_3.blink();
                            } else if (message.message == 'off') {
                                led_1.stop().off();
                                led_2.stop().off();
                                led_3.stop().off();
                            }
                              },   


                    });


  // "down" the button is released
  button_1.on('down', function() {
    publish('a');
  });

  button_2.on('down', function() {
    publish('b');
  });
   button_3.on('down', function() {
    publish('c');
  });
    button_4.on('down', function() {
    publish('d');
  });
 

    console.log('Subscribing');
    pubnub.subscribe({
        channels: ['ch2'], 


    });
   

function publish(x) {
                     let publishConfig =
                     {
                        channel: 'ch1',
                        message: {"text": x,


                                   },
                     };
                     pubnub.publish(publishConfig, function(status, response)
                     {
                     console.log(status, response);
                     });
                        };
});
