'use strict';

const axios = require('axios');

const CLOUD_FUNCTION_URL = 'https://europe-central2-cc-project-cf34c.cloudfunctions.net/cc-project-memory-cache-set';

const CART_SERVICE_HOST = process.env.CART_SERVICE_HOST || CLOUD_FUNCTION_URL;

module.exports = {
    getItinerary: function (userId, callback) {
        if (!userId) {
            return false;
        }

        axios
            .get(`${CART_SERVICE_HOST}?user_id=${userId}`)
            .then(r => {
                callback(r.data);
            })
            .catch(e => {
                callback(false);
            });
    },

    addToItinerary: function ({ userId, placeId }, callback) {
        if (!userId || !placeId) {
            return false;
        }

        const data = {
            user_id: userId,
            place_id: placeId
        };

        axios
            .post(`${CART_SERVICE_HOST}`, data)
            .then(r => {
                callback(r.data);
            })
            .catch(e => {
                callback(false);
            });
    },

    removeFromItinerary: function ({ userId, placeId }, callback) {
        if (!userId || !placeId) {
            return false;
        }

        const data = {
            user_id: userId,
            place_id: placeId
        };

        axios
            .delete(`${CART_SERVICE_HOST}`, {
                data: data
            })
            .then(r => {
                callback(r.status === 204);
            })
            .catch(e => {
                callback(false);
            });
    }
}
