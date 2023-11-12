import { Request, Response } from 'express';

import { Questions } from "../../../client/src/types";

const Router = require('express-promise-router');
const query = require('../db/index.ts');
 
const router = new Router();

// CRUD api for questions table in the database

router.post('/addQuestion', async (req: Request, res: Response) => {
    try {
        const questions: Questions[] = req.body;
        const responses: any[] = []; // Store responses

        for (const q of questions) {
            const {question, starter_code, question_set_id, test_cases, title, public_tests} = q;

            let strSQL = `INSERT INTO questions (question, starter_code, question_set_id, test_cases, title, public_tests)
                          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

            const { rows } = await query(strSQL, [question, starter_code, question_set_id, test_cases, title, public_tests]);
            responses.push(rows[0]); // Collect responses
        }
        res.send(responses);
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Question' });
    }
});


router.get('/getQuestion/:id', async (req: Request, res: Response) => {
    try { 
        const id = req.params.id;
        let strSQL = `SELECT id, question, starter_code, question_set_id, title, public_tests
                      FROM questions
                      WHERE id = $1`;
        const { rows }  = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Question' });
    }
});

router.put('/updateQuestion/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { question, starter_code, question_set_id, test_cases, public_tests } = req.body;
        let strSQL = `UPDATE questions 
                      SET question = $1, starter_code = $2, question_set_id = $3, test_cases = $4, public_tests = $5
                      WHERE id = $6 RETURNING *`;
        const { rows } = await query(strSQL, [question, starter_code, question_set_id, test_cases, public_tests, id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Question' });
    }
});

router.delete('/deleteQuestion/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM questions 
                      WHERE id = $1 RETURNING *`;
        const { rows } = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Question' });
    }
});
module.exports = router;
