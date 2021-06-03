const express = require('express');
const app = express();
const bp = require('body-parser');
const https = require('https');
const cors = require('cors');

const PORT = 8083;
const API_KEY = 'AIzaSyAlCrsUTI2XtF6h_cc1kkwagvF23LdnDsE';

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

 /**
  * RETURN MORE PLACES
  * - uses next page token
  */
app.get('/places', (req, res) => {
    const URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    var query = `?key=${API_KEY}`;

    if (req.query.placename) {
      query += `&query=${req.query.placename}`;
    } else if (req.query.next_page) {
      query += `&pagetoken=${req.query.next_page}`;
    }

    https.get(`${URL}${query}`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
          data = JSON.parse(data);
          const results = data.results ? data.results : [];
          var entities = [];

          if (data.status === 'OK') {
            entities = results.map(e => {
              return {
                id: e.place_id,
                name: e.name,
                address: e.formatted_address,
                photos: e.photos ? e.photos.map(photo => photo.photo_reference) : [],
                types: e.types
              };
            });
          }

          var response = {
            entities,
            next_page_token: false
          };
          if (data.next_page_token) {
            response.next_page_token = data.next_page_token;
          }

          return res.send(response);
      });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        return res.status(500).send({
          success: false,
          message: 'Error occured'
        });
    });
});

app.get('/places/details', (req, res) => {
  const URL = 'https://maps.googleapis.com/maps/api/place/details/json';
  var query = `?key=${API_KEY}`;

  if (!req.query.id) {
    return res.status(404).send({
      success: false,
      message: 'Not found'
    });
  } else {
    query += `&place_id=${req.query.id}`;
    query += `&fields=address_component,adr_address,business_status,formatted_address,geometry,icon,name,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total`;

    https.get(`${URL}${query}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
          data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
          data = JSON.parse(data);
          if (!data.result || data.status !== 'OK') {
            return res.status(500).send({
              success: false,
              message: 'Error occured'
            });
          } else {
            var e = data.result;

            return res.status(200).send({
              success: true,
              entity: {
                id: e.place_id,
                rating: e.rating,
                reviews: e.reviews,
                types: e.types,
                user_ratings_total: e.user_ratings_total,
                name: e.name,
                website: e.website,
                icon: e.icon,
                opening_hours: e.opening_hours ? e.opening_hours.weekday_text : false,
                photos: e.photos ? e.photos.map(photo => photo.photo_reference) : [],
                address: e.formatted_address,
                phone_number: e.formatted_phone_number
              }
            });
          }
      });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
        return res.status(500).send({
          success: false,
          message: 'Error occured'
        });
    });
  }
});

app.get('/places/autocomplete', (req, res) => {
  const URL = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json';
  var query = `?key=${API_KEY}`;

  if (req.query.input) {
    query += `&input=${req.query.input}`;
  }

  https.get(`${URL}${query}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        data = JSON.parse(data);
        var entities = [];

        if (data.status === 'OK') {
          entities = data.predictions.map(e => {
            return e.structured_formatting.main_text;
          });
        }

        return res.send(entities);
    });
  })
  .on("error", (err) => {
      console.log("Error: " + err.message);
  });
});

app.get('/photo', (req, res) => {
    https.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.body.photoreference}&key=${API_KEY}`, (resp) => {
            let data = '';
    
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
      // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data);
                return res.send(data);
            });
    
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        });

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`),
);


