const validator = require('./validator');

const requiredFields = [
    'first_name',
    'last_name',
    'email'
];

const validateUser = (entity) => {
    requiredFields.forEach(field => {
        if (!entity[field]) {
            throw `Field ${field} is required`;
        }
    });

    ['first_name', 'last_name'].forEach(field => {
        if (!validator.validName(entity[field])) {
            throw `Field ${field} must be a valid name`;
        }
    });

    if (!validator.validEmail(entity['email'])) {
        throw `Field email must be a valid email`;
    }

    let obj = {};
    requiredFields.forEach(field => {
        obj[field] = entity[field];
    });

    return {
        ...obj
    };
}

module.exports = validateUser;