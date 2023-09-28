import { Application } from 'express';
const host = require('./host.ts');
const player = require('./player.ts');

// Mount routes
const mountRoutes = (app: Application) => {
    app.use('/host', host);
    app.use('/player', player);
};
     
module.exports = mountRoutes;
