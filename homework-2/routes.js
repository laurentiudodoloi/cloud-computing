module.exports = [
    {
        name: 'users.all',
        path: '/users',
        accept: ['GET']
    },
    {
        name: 'users.get',
        path: '/users/-id',
        accept: ['GET']
    },
    {
        name: 'users.create',
        path: '/users',
        accept: ['POST']
    },
    {
        name: 'users.update',
        path: '/users/-id',
        accept: ['PUT']
    },
    {
        name: 'users.delete',
        path: '/users/-id',
        accept: ['DELETE']
    }
];
