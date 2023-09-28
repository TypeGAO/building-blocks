// Import types, server, services
import { Request, Response } from 'express';
import { app } from '../index';
import { Server, Socket } from 'socket.io';
import { codes } from '../../services/gameManagerService';

const Router = require('express-promise-router');
const router = new Router();

let port = 4000;

// Player page, can enter game code and port to join
// Currently only uses port, not game code
// TODO: Implement API to check with database for existing code, return port, join using port
router.get('/', async (req: Request, res: Response) => {
    try {
        res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>Player</title>
              </head>
              <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
              <script>
                function joinGame() {
                    let code = document.getElementById("code").value;
                    fetch('http://localhost:3000/player/getPort/'+code, {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    })
                    .then(response => response.json())
                    .then(data => {
                        const socket = io("http://localhost:"+data.Port);
                        document.getElementById("beforeJoin").style.display = "none";
                        document.getElementById("joined").innerHTML = "Joined: " + code;
                    })
                    .catch(error => console.error(error))
                    }
              </script>
              <body>
                <div id="beforeJoin">
                    <h1>Enter Code</h1>
                    <input type="text" id="code" />
                    <button onclick="joinGame()">Join</button>
                </div>
                <h1 id="joined"></h1>
              </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Player' });
    }
});

// Gets the corresponding port from the given code
// Currently stored in server
// TODO: Migrate to database
router.get('/getPort/:code', async (req: Request, res: Response) => {
    try {
        const code = req.params.code;
        if (codes[code]) {
            res.send({"Port": codes[code]});
        } else {
            throw new Error('Invalid Code');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error Getting Port' });
    }
});

module.exports = router;
