export default (request) => {
    const db = require("kvstore");
    const pubnub = require('pubnub');


 //retrieve state variable from kv store
 return db.get("state").then((state) => {
 
 
//=================STATE MACHINE==================== 
        
//initial state         
    if(state == 0 || !state){
  
        if(request.message.text == "a"){
             
            //change state
            state = 1;

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "a"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                


        }else{
           pubnub.publish({
            "channel": "ch2",
            "message": "off"
        }).then((publishResponse) => {
            console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
        });

        }

            //store state in kv store
            db.set("state", state)
            //error handling
            .catch((err) => {
                console.log("An error occured.", err);
            });


        
    //1st state    
    }else if(state == 1){
      
        
         
        if(request.message.text == "b"){

             console.log("state 2 reached");
             
            //change state
            state = 2;

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "b"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                

    
        }else if(request.message.text == "a"){

            console.log("state 1 reached");

            //change state
            state = 1;

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "a"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                

        }else{
       
             console.log("state 0 reached");
             
            //change state
            state = 0;

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "off"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                }

            //store state in kv store
            db.set("state", state)
            //error handling
            .catch((err) => {
                console.log("An error occured.", err);
            });


    
    //2nd state    
    }else if(state ==2){
    
     if(request.message.text == "c"){

            console.log("state 3 reached");
             
            //change state
            state = 3;

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "c"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                

    
        }else if(request.message.text == "a"){

            console.log("state 1 reached");

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "a"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                

        }else{
       
            console.log("state 0 reached");
             
            //change state
            state = 0;

            //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "off"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                }

             //store state in kv store
             db.set("state", state)
             //error handling
             .catch((err) => {
                console.log("An error occured.", err);
             });

     
    //3rd state    
    }else if(state == 3){
        
       
        if(request.message.text == "d"){

          console.log("Unlocked!")

          state = 0;
            //let the client know they unlocked the state machine
            pubnub.publish({
            "channel": "ch2",
            "message": "Unlocked!"
             }).then((publishResponse) => {
               console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
              });

        }else if(request.message.text == "a"){

          state = 1;
           //publish state to Arduino channel
            pubnub.publish({
                  "channel": "ch2",
                  "message": "a"
                  }).then((publishResponse) => {
                  console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
                    });
                
        }
        
        else{
        state = 0;
         pubnub.publish({
            "channel": "ch2",
            "message": "off"
        }).then((publishResponse) => {
            console.log(`Publish Status: ${publishResponse[0]}:${publishResponse[1]} with TT ${publishResponse[2]}`);
        });
 
    }

      db.set("state", state)
            //error handling
            .catch((err) => {
                console.log("An error occured.", err);
            });
         }

        return request.ok();
       
    });
 

};