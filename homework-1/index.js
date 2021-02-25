const http = require('http');
const fs = require('fs');

const handleNotFound = (res, callback = null) => {
    fs.readFile('./404.html', (error, buffer) => {
        if (error) {
            res.writeHead(404);
            res.write('Page not found.');
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.write(buffer);
        }

        if (callback) {
            callback();
        }
    });
}

const processContentType = (path) => {
    if (path.includes('.html')) {
        return 'text/html';
    } else if (path.includes('.css')) {
        return 'text/css';
    } else if (path.includes('.js')) {
        return 'text/javascript';
    }
}

const sendFile = (path, res) => {
    fs.readFile(path, (error, buffer) => {
        if (error) {
            handleNotFound(res);
        } else {
            res.writeHead(200, {'Content-Type': processContentType(path)});
            res.write(buffer);
        }

        res.end();
    });
}

const requestListener = (req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            sendFile('index.html', res);
        } else if (['css', 'js'].includes(req.url.split('.')[1])) {
            sendFile('.' + req.url, res);
        } else {
            handleNotFound(res, () => { res.end(); });
        }
    } else if (req.method === 'POST') {
        if (req.url === '/message') {
            let data = '';

            req.on('data', chunk => {
                data = data + chunk;
            });

            req.on('end', () => {
                const message = JSON.parse(data);

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(message));

                res.end();
            });
        }
    }
}

const server = http.createServer(requestListener);

server.listen(8080);
