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
    } else if (path.includes('.gif')) {
        return 'image/gif';
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

module.exports.handleNotFound = handleNotFound;
module.exports.processContentType = processContentType;
module.exports.sendFile = sendFile;
