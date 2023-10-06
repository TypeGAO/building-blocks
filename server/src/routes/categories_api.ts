import { Request, Response } from 'express';

const Router = require('express-promise-router');
const query = require('../db/index.ts');
 
const router = new Router();

router.post('/addCategory', async (req: Request, res: Response) => {
    try {
        const { category } = req.body;
        let strSQL = `INSERT INTO categories (category)
                      VALUES ($1) RETURNING *`;
        const { rows } = await query(strSQL, [category]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Category' });
    }
});

router.get('/getCategories', async (req: Request, res: Response) => {
    try { 
        let strSQL = `SELECT * 
                      FROM categories`;
        const { rows }  = await query(strSQL, []);
        res.send(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Categories' });
    }
});

router.get('/getCategory/:id', async (req: Request, res: Response) => {
    try { 
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM categories
                      WHERE id = $1`;
        const { rows }  = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Specific Category' });
    }
});

router.put('/updateCategory/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { category } = req.body;
        let strSQL = `UPDATE categories 
                      SET category = $1
                      WHERE id = $2 RETURNING *`;
        const { rows } = await query(strSQL, [category, id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Updating Category' });
    }
});

router.delete('/deleteCategory/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM categories 
                      WHERE id = $1 RETURNING *`;
        const { rows } = await query(strSQL, [id]);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Category' });
    }
});

module.exports = router;
