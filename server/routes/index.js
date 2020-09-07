// ./routes/index.js
const categories = require('./categories');
const item = require('./item');
module.exports = app => {
    app.use('/api/categories', categories);
    app.use('/api/item', item);
}