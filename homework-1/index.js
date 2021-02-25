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
    console.log('Sending ' + path);

    fs.readFile(path, (error, buffer) => {
        if (error) {
            console.log(path + ' not found.');
            handleNotFound(res);
        } else {
            console.log('Content-type', processContentType(path));

            res.writeHead(200, {'Content-Type': processContentType(path)});
            res.write(buffer);
        }

        res.end();
    });
}

const requestListener = (req, res) => {
    if (req.url === '/') {
        sendFile('index.html', res);
    } else if (['css', 'js'].includes(req.url.split('.')[1])) {
        sendFile('.' + req.url, res);
    } else {
        handleNotFound(res, () => { res.end(); });
    }
}

const server = http.createServer(requestListener);

server.listen(8080);
