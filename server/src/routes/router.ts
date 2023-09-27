import { Application } from 'express';
const host = require('./host.ts');

const mountRoutes = (app: Application) => {
    app.use('/host', host);
};
     
module.exports = mountRoutes;
