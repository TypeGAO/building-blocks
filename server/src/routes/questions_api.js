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
// CRUD api for questions table in the database
router.post('/addQuestion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, starter_code, question_set_id, test_cases } = req.body;
        let strSQL = `INSERT INTO questions (question, starter_code, question_set_id, test_cases)
                      VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = yield query(strSQL, [question, starter_code, question_set_id, test_cases]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Adding Question' });
    }
}));
router.get('/getQuestion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM questions
                      WHERE id = $1`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Question' });
    }
}));
router.put('/updateQuestion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { question, starter_code, question_set_id, test_cases } = req.body;
        let strSQL = `UPDATE questions 
                      SET question = $1, starter_code = $2, question_set_id = $3, test_cases = $4
                      WHERE id = $5 RETURNING *`;
        const { rows } = yield query(strSQL, [question, starter_code, question_set_id, test_cases, id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Question' });
    }
}));
router.delete('/deleteQuestion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM questions 
                      WHERE id = $1 RETURNING *`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Deleting Question' });
    }
}));
module.exports = router;
