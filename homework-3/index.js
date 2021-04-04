require('dotenv').config();

const PORT = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const datastore = require('./services/datastore');
const placeService = require('./services/placeService');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function(req, res){
  res.render("index", { testvar: 'WORKS FINE.' });
});

app.post('/search', (req, res) => {
  const search = req.body.search;

  const place = placeService.search(search, (result) => {
    if (result) {
      datastore.storeSearchRecord({
        search_key: search,
        place_result: result.name,
        place_address: result.formatted_address
      });
    }

    res.render("statistics", { place: result });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`)
});
