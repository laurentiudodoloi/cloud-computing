const status = require('./status');

module.exports = (content, statusCode) => {
    return {
        content: content ? JSON.stringify(content) : '',
        statusCode: statusCode ? statusCode : status.HTTP_OK
    }
}