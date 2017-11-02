const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      line = require('@line/bot-sdk');

var config = {
  channelId: '1543888855',
  channelAccessToken: 'XVuY8V/SdXoJba3Seyi3yFi2vK4fJTjQTSEjD5R69zQ7wn7zRM6ALxFZIMQdBearV+1BHaBPK2Cx8QJttLgKQccnKCyrpyIT8heGxvgK3OCp32KOLzpoU6ZA/ypcBtgSmUDpNWZBTSn3UuMR0Da4VgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '4efbc8c31e8609706dd6b7d59bce3cc9',
  verify: true
};

app.post('/webhook', line.middleware(config), (req, res) => {
  const event = req.body.events[0];

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000, function() {
  console.log('server listning on port 3000');
})