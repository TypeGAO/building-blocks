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
// CRUD api for rooms table in the database
router.post('/addRoom', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pin, is_active, question_set_id, game_activity, time_started } = req.body;
        let strSQL = `INSERT INTO rooms (pin, is_active, question_set_id, game_activity, time_started)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = yield query(strSQL, [pin, is_active, question_set_id, game_activity, time_started]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Adding Room' });
    }
}));
router.get('/getRoom/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `SELECT * 
                      FROM rooms
                      WHERE id = $1`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Specific Room' });
    }
}));
router.put('/updateRoom/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { pin, is_active, question_set_id, game_activity, time_started } = req.body;
        let strSQL = `UPDATE rooms 
                      SET pin = $1, is_active = $2, question_set_id = $3, game_activity = $4, time_started = $5
                      WHERE id = $6 RETURNING *`;
        const { rows } = yield query(strSQL, [pin, is_active, question_set_id, game_activity, time_started, id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Room' });
    }
}));
router.delete('/deleteRoom/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let strSQL = `DELETE FROM rooms 
                      WHERE id = $1 RETURNING *`;
        const { rows } = yield query(strSQL, [id]);
        res.send(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Deleting Room' });
    }
}));
// Sets a room's question set
router.post('/setQuestionSet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomID, questionSetID } = req.body;
        let strSQL = `UPDATE rooms
                      SET (question_set_id = $1)
                      WHERE (pin = $2)`;
        const { rows } = yield query(strSQL, [questionSetID, roomID]);
        res.send(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error Getting Questions' });
    }
}));
module.exports = router;
