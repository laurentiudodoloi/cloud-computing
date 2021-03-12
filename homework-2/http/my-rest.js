const CONTENT_TYPE = 'application/json';
const status = require('./status');
const rqParser = require('./request-parser');

module.exports = {
    instance: (req, res) => {
        try {
            res.setHeader('Content-type', CONTENT_TYPE);

            const match = this.__router.match(req.url, req.method);

            let requestData = {
                params: {
                    ...match.params
                }
            };

            if (['POST', 'PUT'].includes(req.method)) {
                rqParser.getPostData(req, (data) => {
                    requestData = {
                        ...requestData,
                        data
                    };

                    const response = match.callback(requestData);

                    res.setHeader('Content-length', response.content.length);
                    res.statusCode = response.statusCode;
                    res.write(response.content);

                    res.end();
                });
            } else {
                const response = match.callback(requestData);

                res.setHeader('Content-length', response.content.length);
                res.statusCode = response.statusCode;
                res.write(response.content);

                res.end();
            }
        } catch (error) {
            res.statusCode = status.HTTP_NOT_FOUND;
            res.write(error);

            res.end();
        }
    },

    setRouter: (router) => {
        this.__router = router;
    }
}