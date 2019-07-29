require('dotenv').config()
const { App } = require('@slack/bolt');
const MongoClient = require('mongodb').MongoClient;

// Initialize the bot
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

const uri = process.env.MONGODB_URI;

MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  /*var dbo = db.db("markov");
  dbo.collection("test").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });*/
});

/* Bot Actions */
app.message('hello', async({message, say}) => {
  say(`Hello, <@${message.user}>`);
});

app.event('app_mention', async({event, context}) => {
  try {
    console.log(event);
    console.log(context);
  }
  catch (error) {
    console.error(error);
  }
});