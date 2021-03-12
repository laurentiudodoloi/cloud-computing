const status = require('../http/status');
const response = require('../http/response');
const dbInstance = require('../db/entity-db');
const validateUsers = require('../validators/users-validator');

const entityDb = new dbInstance();

module.exports = {
    all: (request) => {
        const entities = entityDb.use('users').readAll();
        let reqStatus = status.HTTP_OK;

        if (!entities.length) {
            reqStatus = status.HTTP_NOT_FOUND;
        }

        return response({
            entities
        }, reqStatus);
    },

    get: (request) => {
        const entity = entityDb
            .use('users')
            .readOne(request.params.id);
        let reqStatus = status.HTTP_OK;

        if (!entity) {
            reqStatus = status.HTTP_NOT_FOUND;
        }

        return response({
            entity: entity ? entity : false
        }, reqStatus);
    },

    create: (request) => {
        let reqStatus = status.HTTP_CREATED;
        let responseData = '';

        try {
            const data = validateUsers(request.data);
            const entity = entityDb
                .use('users')
                .create(data);

            responseData = {
                entity: entity ? entity : false
            };

            if (!entity) {
                reqStatus = status.HTTP_INTERNAL_ERROR;
            }
        } catch (error) {
            responseData = {
                message: error
            };

            reqStatus = status.HTTP_BAD_REQUEST;
        }

        return response(responseData, reqStatus);
    },

    update: (request) => {
        let reqStatus = status.HTTP_OK;
        let responseData = '';

        try {
            const data = validateUsers(request.data);
            const success = entityDb
                .use('users')
                .update(request.params.id, data);

            responseData = {
                success
            };

            if (!success) {
                reqStatus = status.HTTP_INTERNAL_ERROR;
            }
        } catch (error) {
            responseData = {
                message: error
            };

            reqStatus = status.HTTP_BAD_REQUEST;
        }

        return response(responseData, reqStatus);
    },

    delete: (request) => {
        const success = entityDb
            .use('users')
            .deleteOne(request.params.id);
        let reqStatus = status.HTTP_OK;

        if (!success) {
            reqStatus = status.HTTP_NOT_FOUND;
        }

        return response({
            success: success
        }, reqStatus);
    },
}