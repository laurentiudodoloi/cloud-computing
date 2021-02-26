require('dotenv').config()

const path = require('path');
const fs = require('fs');

module.exports.log = (data) => {
    const root = path.dirname(require.main.filename);
    const logsPath = root + '/storage/logs.json';

    const content = fs.readFileSync(logsPath);

    let logs = [];
    if (content) {
        logs = JSON.parse(content);
    }

    logs.push(data);

    fs.writeFileSync(logsPath, JSON.stringify(logs));
}
