'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow,Suggestions} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});


app.intent('Default Welcome Intent', (conv )=> {
    
    conv.ask('Hi! What service do you want?');
    
    if (conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
         conv.ask(new Suggestions(['Photographer', 'Tourist guide', 'A translator']));
    }
});

    app.intent('Choose Provider', (conv,{vendor_type} )=> {
    
        if (vendor_type.trim() === 'photographer') {
            conv.ask('which category of photographer?');
            conv.ask(new Suggestions(['Pop', 'X','Pro', 'Action Cam']));
        }
        
    });
    
    app.intent('Choose Category', (conv,{profile,billing_type} )=> {


    conv.ask('Confirmation:')
    conv.ask('Photographer José Silva, value $ 20.00, ')
    conv.ask(new Suggestions(['Yes', 'No']));

    });
    
    
    app.intent('Confirmation', (conv, {confirmation})=> {
        
        if(confirmation.trim() == 'yes'){
            conv.ask('Ok! service requested successfully');
            conv.close('Wait, he\'s on his way, thank you.');
        }else{
            conv.close('Ok, try again');
    }
        
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);