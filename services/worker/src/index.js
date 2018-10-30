const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const expireSpot = require('./expireSpot').expireSpot;
const updateRankings = require('./updateRankings').updateRankings;

const headers = {
  'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
};

const client = new Lokka({
  transport: new Transport(process.env.SERVER_URL, {
    headers
  })
});

var the_expire_interval = 10 * 1000; // 1min;
var the_ranking_interval =  10 * 1000; // 10 min

setInterval(async function() {
  await expireSpot(client);
}, the_expire_interval);

setInterval(async function() {
  await updateRankings(client);
}, the_ranking_interval);
