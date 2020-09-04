const express = require('express');
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// ./app.js
const mountRoutes = require('./routes');
const app = express();

app.use(cors());
app.options('*', cors());
mountRoutes(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
