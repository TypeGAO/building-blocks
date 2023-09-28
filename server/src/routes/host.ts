import { Request, Response } from 'express';
import { app } from '../index';
import { generateUniqueCode } from '../../services/generateGameService';
import { Server, Socket } from 'socket.io';

const Router = require('express-promise-router');
 
const router = new Router();

let port = 4000;
let players = 0;

router.get('/', async (req: Request, res: Response) => {
    try {
        res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>Host</title>
              </head>
              <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
              <script>
                const socket = io();
                socket.on('updatePlayers', (players) => {
                    document.getElementById("players").innerHTML = players.players; 
                });

                fetch('http://localhost:3000/host/newGame', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(response => response.json())
                .then(data => {
                    socket.io.uri = "http://localhost:"+data.Port;
                    socket.disconnect().connect();
                    document.getElementById('code').innerHTML = "Game Code: " + data.Code;
                })
                .catch(error => console.error(error))
              </script>
              <body>
                <h1 id="code">Game Code</h1>
                <h2>Players</h2>
                <h2 id="players">0</h2>
              </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Host' });
    }
});

// Create a new game
router.get('/newGame', async (req: Request, res: Response) => {
    try { 
        let code = generateUniqueCode();

        const server = app.listen(++port, () => {
            //console.log(`New socket on port ${port}`);
        });

        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000", 
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket: Socket) => {
          players++;
          io.emit('updatePlayers', {"players": players-1});

          socket.on('disconnect', () => {
            players--;
            io.emit('updatePlayers', {"players": players-1});
            //console.log(`user disconnected from ${socket.handshake.headers.host}`);
          });

          //console.log(`a user connected to ${socket.handshake.headers.host}`);
        });

        res.send({Code: code, Port: port});
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Game' });
    }
});

module.exports = router;
