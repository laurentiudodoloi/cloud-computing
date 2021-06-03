'use strict';

const axios = require('axios');

const PLACE_SERVICE_HOST = process.env.PLACE_SERVICE_HOST || 'http://127.0.0.1:8083';

module.exports = {
    getPlaces: function ({ searchQuery, nextPage }, callback) {
        if (!searchQuery) {
            return false;
        }

        var query = `?placename=${searchQuery}`;
        if (nextPage) {
            query = `?next_page=${nextPage}`;
        }

        axios
            .get(`${PLACE_SERVICE_HOST}/places/${query}`)
            .then(r => {
                const entities = r.data.entities ? r.data.entities : [];
                callback(entities);
            })
            .catch(e => {
                callback([]);
            });
    },

    getPlaceDetails: function (placeId, callback) {
        if (!placeId) {
            return false;
        }

        var query = `?id=${placeId}`;

        axios
            .get(`${PLACE_SERVICE_HOST}/places/details/${query}`)
            .then(r => {
                const entity = r.data.entity ? r.data.entity : false;
                callback(entity);
            })
            .catch(e => {
                callback(false);
            });
    },

    autocomplete: function (text, callback) {
        if (!text) {
            return false;
        }

        var query = `?input=${text}`;

        axios
            .get(`${PLACE_SERVICE_HOST}/places/autocomplete/${query}`)
            .then(r => {
                callback(r.data);
            })
            .catch(e => {
                callback(false);
            });
    }
}
