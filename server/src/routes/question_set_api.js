"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('express-promise-router');
const query = require('../db/index.ts');
const router = new Router();
// CRUD api for question_sets table in the database
router.post('/addQuestionSet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { grade_level, description, categories, created_on } = req.body;
        let strSQL = `INSERT INTO question_sets (grade_level, description, categories, created_on)
                      VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = yield query(strSQL, [grade_level, description, categories, created_on]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Adding Question Set' });
    }
}));
router.get('/getQuestionSets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let strSQL = `SELECT * 
                      FROM question_sets`;
        const { rows } = yield query(strSQL, []);
        res.send(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Question Sets' });
    }
}));
router.get('/getQuestionSet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM question_sets
                      WHERE id = $1`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Specific Question Set' });
    }
}));
router.put('/updateQuestionSet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { grade_level, description, categories, created_on } = req.body;
        let strSQL = `UPDATE question_sets 
                      SET grade_level = $1, description = $2, categories = $3, created_on = $4
                      WHERE id = $5 RETURNING *`;
        const { rows } = yield query(strSQL, [grade_level, description, categories, created_on, id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Question Set' });
    }
}));
router.delete('/deleteQuestionSet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM question_sets 
                      WHERE id = $1 RETURNING *`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Deleting Question Set' });
    }
}));
// Gets questions related to a question set
router.get('/getQuestionsInSet/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM questions
                      WHERE (question_set_id = $1)`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Questions' });
    }
}));
module.exports = router;
