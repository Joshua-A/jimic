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

const client = new MongoClient(uri, { useNewUrlParser: true });
/*client.connect(err => {
  const collection = client.db("markov").collection("test");
  collection.find({}).toArray().then(result => console.log(result));
  client.close();
});*/

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

function selectNextItem(nextArr) {
  const lexiconCountTotal = nextArr.reduce((acc, val) => acc += val.count, 0); // Total of occurances of all next possible words
  let weightingAcc = 0;
  // Define upper and lower bounds for each item being selected
  next.forEach(item => {
    item.minIndex = weightingAcc;
    item.maxIndex = weightingAcc + item.count - 1;
    weightingAcc = item.maxIndex + 1;
  });
  // Randomly select the next item
  const selectedIndex = getRandomInt(0,lexiconCountTotal);
  return nextArr.filter(item => item.minIndex <= selectedIndex && item.maxIndex >= selectedIndex)[0];
}

function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}