const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/conf');
const errors = require('./api/errors');
const route = require('./api/routes/routes');

app.use(cors());
app.use(bodyParser.json());
app.use(errors);

route(app);

// Init Server
app.listen(config.port);