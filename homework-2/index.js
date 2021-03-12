require('dotenv').config()

const http = require('http');
const router = require('./http/router');
const rest = require('./http/my-rest');

const routes = require('./routes');

const usersRequest = require('./requests/users');

const appRouter = new router();

appRouter.setPrefix('api');
appRouter.setRoutes(routes);

rest.setRouter(appRouter);

appRouter.useMap({
    'users.all': usersRequest.all,
    'users.get': usersRequest.get,
    'users.create': usersRequest.create,
    'users.update': usersRequest.update,
    'users.delete': usersRequest.delete
});

const server = http.createServer(rest.instance);

server.listen(process.env.PORT);
