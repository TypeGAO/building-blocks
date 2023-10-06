import { Express } from "express";

const question_sets = require('./question_set_api.ts');
const questions= require('./questions_api.ts');

const mountRoutes = (app: Express) => {
    app.use('/questionSets', question_sets);
    app.use('/questions', questions);
};
     
module.exports = mountRoutes;
