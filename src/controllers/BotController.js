const request = require('request');

function handleMessage(sender_psid, received_message) {
  let response={
    received_message
  };

  // Check if the message contains text
  if (received_message.text) {
    if(received_message.text === "Comment vas-tu ?")
    response = {
        "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": "Très bien et vous ?",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "je vais bien merci",
                    "payload": "yes",
                  },
                  {
                    "type": "postback",
                    "title": "Non, ça ne va pas",
                    "payload": "no",
                  }
                ],
              }]
            }
        }
    }
  }
  else if (received_message.attachments) {
  
    response = {
        text : "Je ne sais pas traiter ce type de demande"
    };
  
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v6.0/me/messages",
      qs: { access_token: process.env.FB_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

module.exports ={
    callSendAPI,
    handleMessage
}