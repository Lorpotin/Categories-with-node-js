// ./routes/index.js
const users = require('./categories');
module.exports = app => {
    app.use('/api/categories', users);
}