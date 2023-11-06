import { Request, Response } from 'express';

const Router = require('express-promise-router');
const query = require('../db/index.ts');
 
const router = new Router();

// CRUD api for question_sets table in the database

router.post('/addQuestionSet', async (req: Request, res: Response) => {
    try {
        const { grade_level, description, categories, created_on } = req.body;
        let strSQL = `INSERT INTO question_sets (grade_level, description, categories, created_on, title)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await query(strSQL, [grade_level, description, categories, created_on, title]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Question Set' });
    }
});

router.get('/getQuestionSets', async (req: Request, res: Response) => {
    try { 
        let strSQL = `SELECT * 
                      FROM question_sets`;
        const { rows }  = await query(strSQL, []);
        res.send(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Question Sets' });
    }
});

router.get('/getQuestionSet/:id', async (req: Request, res: Response) => {
    try { 
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM question_sets
                      WHERE id = $1`;
        const { rows }  = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Specific Question Set' });
    }
});

router.put('/updateQuestionSet/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { grade_level, description, categories, created_on } = req.body;
        let strSQL = `UPDATE question_sets 
                      SET grade_level = $1, description = $2, categories = $3, created_on = $4, title = $5
                      WHERE id = $6 RETURNING *`;
        const { rows } = await query(strSQL, [grade_level, description, categories, created_on, title, id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Question Set' });
    }
});

router.delete('/deleteQuestionSet/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM question_sets 
                      WHERE id = $1 RETURNING *`;
        const { rows } = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Question Set' });
    }
});

// Gets questions related to a question set

router.get('/getQuestionsInSet/:id', async (req: Request, res: Response) => {
    try { 
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM questions
                      WHERE (question_set_id = $1)`;
        const { rows }  = await query(strSQL, [id]);
        res.send(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Questions' });
    }
});

module.exports = router;
