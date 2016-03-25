var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\@doxbot$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  
  
  botResponse = generateResponse();
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function generateResponse() {
  console.log('generating response');
  var responseArray = [
    'Ralph Lauren Polo',
    '~donuts tho~',
    '~brisket tho~',
    'at least its not a white condiment',
    'it has to be coherent',
    'DO IT',
    'YEET',
    'smh',
    'ITS LIT',
    'NO CHILL',
    'DOWN',
    '~dabs~',
    '~open shak~',
    'anyone want to split an uber?',
    'Cardigans is life',
    'Does anyone have a calculator I can borrow? I have a midterm in twenty minutes.',
    'GUYS I MADE IT',
    'I love spoonman, spoony spoony spoonman',
    'if ur real',
    'ughhhh',
    'can I come to your special d?',
    'lmao'
  ];  
  return responseArray[Math.floor(Math.random()*responseArray.length)];
}

exports.respond = respond;