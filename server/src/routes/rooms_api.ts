import { Request, Response } from 'express';

const Router = require('express-promise-router');
const query = require('../db/index.ts');
 
const router = new Router();

router.post('/addRoom', async (req: Request, res: Response) => {
    try {
        const { pin, is_active, question_set_id, game_activity, time_started } = req.body;
        let strSQL = `INSERT INTO rooms (pin, is_active, question_set_id, game_activity, time_started)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await query(strSQL, [pin, is_active, question_set_id, game_activity, time_started]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Room' });
    }
});

router.get('/getRoom/:id', async (req: Request, res: Response) => {
    try { 
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM rooms
                      WHERE id = $1`;
        const { rows }  = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Specific Room' });
    }
});

router.put('/updateRoom/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { pin, is_active, question_set_id, game_activity, time_started } = req.body;
        let strSQL = `UPDATE rooms 
                      SET pin = $1, is_active = $2, question_set_id = $3, game_activity = $4, time_started = $5
                      WHERE id = $6 RETURNING *`;
        const { rows } = await query(strSQL, [pin, is_active, question_set_id, game_activity, time_started, id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Room' });
    }
});

router.delete('/deleteRoom/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM rooms 
                      WHERE id = $1 RETURNING *`;
        const { rows } = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Room' });
    }
});

module.exports = router;
