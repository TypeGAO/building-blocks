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
// CRUD api for categories table in database
router.post('/addCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        let strSQL = `INSERT INTO categories (category)
                      VALUES ($1) RETURNING *`;
        const { rows } = yield query(strSQL, [category]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Adding Category' });
    }
}));
router.get('/getCategories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let strSQL = `SELECT * 
                      FROM categories`;
        const { rows } = yield query(strSQL, []);
        res.send(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Categories' });
    }
}));
router.get('/getCategory/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM categories
                      WHERE id = $1`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Specific Category' });
    }
}));
router.put('/updateCategory/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { category } = req.body;
        let strSQL = `UPDATE categories 
                      SET category = $1
                      WHERE id = $2 RETURNING *`;
        const { rows } = yield query(strSQL, [category, id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Category' });
    }
}));
router.delete('/deleteCategory/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM categories 
                      WHERE id = $1 RETURNING *`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Deleting Category' });
    }
}));
module.exports = router;
