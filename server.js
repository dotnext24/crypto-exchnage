const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/token_price/:contract_addresses/:vs_currency', async (req, res) => {
  const contract_addresses = req.params["contract_addresses"];
  const vs_currency = req.params["vs_currency"];
  let data = await CoinGeckoClient.simple.fetchTokenPrice({
    contract_addresses: contract_addresses,
    vs_currencies: vs_currency,
  });
  res.send(data);
});

app.get('/api/coin_price/:name/:vs_currency', async (req, res) => {
  const name = req.params["name"];
  const vs_currency = req.params["vs_currency"];
  let data = await CoinGeckoClient.simple.price({
    ids: [name],
    vs_currencies: [vs_currency],
  });
  res.send(data);
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
