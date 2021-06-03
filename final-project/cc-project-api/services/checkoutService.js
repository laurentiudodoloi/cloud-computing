'use strict';

const axios = require('axios');

const CHECKOUT_SERVICE_HOST = process.env.PLACE_SERVICE_HOST || '127.0.0.1:8081';

module.exports = {
    checkout: function (data, callback) {
        axios
            .post(`${CHECKOUT_SERVICE_HOST}/checkout`, data)
            .then(r => {
                callback(r.data);
            })
            .catch(e => {
                callback([]);
            });
    },

    getItineraries: function (userId, callback) {
        if (!userId) {
            return [];
        }
        const query = `?user_id=${userId}`;

        axios
            .get(`${CHECKOUT_SERVICE_HOST}/itineraries/${query}`)
            .then(r => {
                callback(r.data);
            })
            .catch(e => {
                callback([]);
            });
    }
}
