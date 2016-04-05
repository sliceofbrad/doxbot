var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /[Dd]oxbot/;

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
    'first rehearsal has to be coherent',
    'DO IT',
    'YEET YEET YEET',
    'ITS LIT',
    'NO CHILL',
    'DOWN',
    '~dabs~',
    '~~open shak now ats!~~',
    'anyone want to split an uber to staph retreat?',
    'Cardigans are life',
    'Does anyone have a calculator I can borrow? I have a midterm in twenty minutes.',
    'GUYS I MADE IT',
    'I love spoonman, putting it back in the folder is a great idea',
    'youll do it if ur real',
    'ughhhh',
    'can I come to your special d?',
    'I cant go, I have a special d',
    'lmao',
    'Im kinda into it',
    'ITS YOUR BOI',
    'you guys are brutal af',
    'OPEN SHAK RN',
    '~slidin into the DMs~',
    '1-800-SEXLINEBLING',
    'BITCH YOU GUESSED IT',
    'HOOOOOOO, you was right',
    'Botcarlo, when is the next Red Vest?',
    'https://youtu.be/kT3OQwyvKmk',
    'doxbot is an accurate representation of me',
    'Twain is a building, not an individual',
    '~role playing~',
    '^savage',
    'I feel excluded',
    'Hamburger Helper mixtape is fire',
    '* insults DFS *',
    'I wonder whats on the canonical'
  ];  
  return responseArray[Math.floor(Math.random()*responseArray.length)];
}

exports.respond = respond;