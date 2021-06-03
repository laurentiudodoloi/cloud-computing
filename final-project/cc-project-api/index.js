const port = 8081;

const bp = require('body-parser');
const express = require('express')
const app = express()
const cors = require('cors');

const cartService = require('./services/cartService');
const placeService = require('./services/placeService');
const checkoutService = require('./services/checkoutService');

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/places', (req, res) => {
  var query = {
    searchQuery: req.query.placename,
    nextPage: req.query.next_page
  };

  placeService.getPlaces(query, response => {
    return res.status(200).send({
      success: !!response,
      entities: response
    });
  });
});

app.get('/places/autocomplete', (req, res) => {
  placeService.autocomplete(req.query.input, response => {
    return res.status(200).send({
      success: !!response,
      entities: response
    });
  });
});

app.get('/places/details', (req, res) => {
  placeService.getPlaceDetails(req.query.id, response => {
    if (!response) {
      return res.status(200).send({
        success: false,
        entity: false
      });
    } else {
      return res.status(200).send({
        success: !!response,
        entity: response
      });
    }
  });
});

app.get('/cart', (req, res) => {
  const userId = req.query.user_id;

  cartService.getItinerary(userId, response => {
    return res.status(response ? 200 : 400).send({
      success: response ? response.success : false,
      entity: response
    });
  });
});

app.post('/cart/add', (req, res) => {
  const data = {
    userId: req.body.user_id,
    placeId: req.body.place_id
  }

  const ok = cartService.addToItinerary(data, response => {
    return res.status(response ? 200 : 400).send({
      success: response ? response.success : false
    });
  });
});

app.delete('/cart/remove', (req, res) => {
  const data = {
    userId: req.body.user_id,
    placeId: req.body.place_id
  }

  cartService.removeFromItinerary(data, response => {
    return res.status(response ? 204 : 400).send({
      success: response
    });
  });
});

app.get('/itineraries', (req, res) => {
  const userId = req.query.user_id;

  checkoutService.getItineraries(userId, response => {
    return res.status(response ? 200 : 400).send({
      success: !!response,
      entity: response
    });
  });
});

app.post('/checkout', (req, res) => {
  const data = req.body;

  checkoutService.checkout(data, response => {
    return res.status(response ? 200 : 400).send({
      success: response ? response.success : false
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});
