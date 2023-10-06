import { Request, Response } from 'express';
import { newGameActivity } from '../../services/generateGameService';

const Router = require('express-promise-router');
const query = require('../db/index.ts');
 
const router = new Router();

router.post('/addQuestion', async (req: Request, res: Response) => {
    try {
        const { question, starter_code, question_set_id, test_cases } = req.body;
        let strSQL = `INSERT INTO questions (question, starter_code, question_set_id, test_cases)
                      VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await query(strSQL, [question, starter_code, question_set_id, test_cases]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Question' });
    }
});

router.get('/getQuestion/:id', async (req: Request, res: Response) => {
    try { 
        const id = req.params.id;
        let strSQL = `SELECT * 
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
        const { question, starter_code, question_set_id, test_cases } = req.body;
        let strSQL = `UPDATE questions 
                      SET question = $1, starter_code = $2, question_set_id = $3, test_cases = $4
                      WHERE id = $5 RETURNING *`;
        const { rows } = await query(strSQL, [question, starter_code, question_set_id, test_cases, id]);
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
