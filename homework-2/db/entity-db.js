require('dotenv').config()

const fs = require('fs');
const path = require('path');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const getFilePath = (entityName) => {
    return `${path.dirname(require.main.filename)}/${process.env.DB_PATH}/${entityName}.json`;
}

const readEntities = (entityName) => {
    const entities = fs.readFileSync(getFilePath(entityName), 'utf-8');
    if (!entities) {
        return [];
    }

    return JSON.parse(entities);
}

const writeEntities = (entityName, content) => {
    fs.writeFileSync(getFilePath(entityName), JSON.stringify(content));
}

const entityDb = function () {
    this.use = (entity) => {
        entityDb.prototype.__entity = entity;

        return this;
    }

    this.readAll = () => {
        this.checkEntity();

        return readEntities(entityDb.prototype.__entity);
    }

    this.readOne = (id) => {
        this.checkEntity();

        let entities = readEntities(entityDb.prototype.__entity);
        if (!entities) {
            entities = [];
        }

        return entities.find(e => e.id === id);
    }

    this.create = (data) => {
        this.checkEntity();

        let entities = readEntities(entityDb.prototype.__entity);
        if (!entities) {
            entities = [];
        }

        const entity = {
            id: uuidv4(),
            ...data
        };

        entities.push(entity);

        writeEntities(entityDb.prototype.__entity, entities);

        return entity;
    }

    this.update = (id, data) => {
        this.checkEntity();

        let entities = readEntities(entityDb.prototype.__entity);
        const index = entities.findIndex(e => e.id === id);

        if (index < 0) {
            throw 'Entity not found';
        }

        entities.splice(index, 1, {
            ...entities[index],
            ...data
        });

        writeEntities(entityDb.prototype.__entity, entities);

        return true;
    }

    this.deleteOne = (id) => {
        this.checkEntity();

        const entities = readEntities(entityDb.prototype.__entity);
        const index = entities.findIndex(e => e.id === id);

        if (index < 0) {
            return false;
        }

        entities.splice(index, 1);

        writeEntities(entityDb.prototype.__entity, entities);

        return true;
    }
}

entityDb.prototype.__entity = false;

entityDb.prototype.checkEntity = () => {
    if (!entityDb.prototype.__entity) {
        throw 'No entity used';
    }

    if (!fs.existsSync(getFilePath(entityDb.prototype.__entity))) {
        throw 'Entity not found';
    }

    return true;
};

module.exports = entityDb;