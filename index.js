const serve = require('./server');
const { PORT } = require('./constants');


serve({ port: process.env.PORT || PORT }).catch(console.error);
