// Import types, server, services
import { Request, Response } from 'express';
import { app } from '../index';
import { generateUniqueCode } from '../../services/generateGameService';
import { Server, Socket } from 'socket.io';

const Router = require('express-promise-router');
const router = new Router();

let port = 4000;
let players = 0;

// Host page, generate code and open a socket automatically
// Simply a demo
// Calls /host/newGame API to do this
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
        // Generate unique code 
        let code = generateUniqueCode();

        // TODO: Check if it exists in database
        // TODO: Add to database

        // Start a server, increment port for another host
        const server = app.listen(++port, () => {
            //console.log(`New socket on port ${port}`);
        });

        // Socket
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000", 
                methods: ["GET", "POST"]
            }
        });

        // Increase number of player, update player count
        // Note: use players-1 to not count host
        io.on('connection', (socket: Socket) => {
          players++;
          io.emit('updatePlayers', {"players": players-1});

          socket.on('disconnect', () => {
              // Decrase players, update player count
            players--;
            io.emit('updatePlayers', {"players": players-1});
            //console.log(`user disconnected from ${socket.handshake.headers.host}`);
          });

          //console.log(`a user connected to ${socket.handshake.headers.host}`);
        });

        // API sends the port associated with the code
        res.send({Code: code, Port: port});
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Game' });
    }
});

module.exports = router;
