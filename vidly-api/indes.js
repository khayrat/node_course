const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('/api/genres', genres);
app.use('/', home);

console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger("Morgan enabled...");
}

dbDebugger("db connected...");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
