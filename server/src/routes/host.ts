import { Request, Response } from 'express';
import { app } from '../index';
import { generateUniqueCode } from '../../services/generateGameService';
import { Server, Socket } from 'socket.io';

const Router = require('express-promise-router');
 
const router = new Router();

let port = 4000;

// Create a new game
router.get('/newGame', async (req: Request, res: Response) => {
    try { 
        let code = generateUniqueCode();

        const server = app.listen(++port, () => {
            console.log(`New socket on port ${port}`);
        });

        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000", 
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket: Socket) => {
          console.log(`a user connected to ${socket.handshake.headers.host}`);
          socket.on('disconnect', () => {
            console.log(`user disconnected from ${socket.handshake.headers.host}`);
          });
});

        res.send({Code: code, Port: port});
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Game' });
    }
});

module.exports = router;
