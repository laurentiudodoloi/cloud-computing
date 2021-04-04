require('dotenv').config();

const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore({
    projectId: process.env.GCLOUD_PROJECT_ID
});

const DEFAULT_ID_LENGTH = 10;

generateID = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
 }

module.exports = {
    storeSearchRecord: async (entity) => {
        const ID = generateID(DEFAULT_ID_LENGTH);
        const KIND = 'SearchRecord';

        const KEY = datastore.key([KIND, ID]);

        const record = {
            key: KEY,
            data: {
                search_key: entity.search_key,
                place_result: entity.place_result,
                place_address: entity.place_address,
                date: new Date()
            }
        };

        await datastore.save(record);
    }
}
