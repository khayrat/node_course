const Logger = require('./Logger');
const logger = new Logger();

//console.log(module);

logger.on('messageLogged', arg => {
  console.log('listener called: ', arg);
});

logger.log('message');
