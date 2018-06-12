 //  var five = require ('johnny-five');
 // var board = new five.Board();

var PubNub = require('pubnub')




    //board.on("ready", function(){
 //  var led_green = new five.Led(13);
  // var led_red = new five.Led(3);
 pubnub = new PubNub({
		
		publishKey : 'pub-c-2bda6cf3-c455-4b28-bbed-00611b461f98',
        subscribeKey : 'sub-c-5bdd008c-6d97-11e8-a49b-66b3abd5adf6',
               
                    });


               publish("hel;kae");
                    pubnub.addListener(
                    {
                        
                         message: function(message) 
                         {
                            console.log(message.message);
                            

                              }   
                         
                         
                    });    
                 
    console.log("Subscribing");
    pubnub.subscribe({
        channels: ['ch2'] 
       

    });

   
   
function publish(x){
             

                     var publishConfig = 
                     {
                        channel : "ch1",
                        message : {
                                        
                                        "text": "d"
                                   }
                     }
                     pubnub.publish(publishConfig, function(status, response) 
                     {
                     console.log(status, response);

                     });

                 
                        };
   
//});
