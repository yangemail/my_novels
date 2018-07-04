'use strict';

const configureMongoose = require('../src/bootstrap/mongoose');
const configureExpress = require('../src/bootstrap/express');
// const configurePassport = require('./config/passport');
const debug = require('debug')('my_novels:www');
const http = require('http');
let www = null;


exports.run = function () {
// *** Make sure that your Mongoose configuration file is loaded before any other configuration is performed in the www.jsle.
    const db = configureMongoose();
    const app = configureExpress();
// const passport = configurePassport();

    /**
     * Get port from environment and store in Express.
     */
    var port = normalizePort(process.env.PORT || '8081');
    app.set('port', port);

    /**
     * Create HTTP www
     */
    www = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    www.listen(port);
    www.on('error', onError);
    www.on('listening', onListening);

// console.log('Server running at ' + www.address().address + ':' + www.address().port);
};


/**
 * Normalize a port into a number, string, or false
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP www "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP www "listening" event
 */
function onListening() {
    var addr = www.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}