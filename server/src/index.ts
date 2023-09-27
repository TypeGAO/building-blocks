import { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';

const { createServer } = require('node:http');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router.ts');
 
const app = express();
const port = 3000;
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.on('SIGINT', function() {
    console.log('Server Successfully Shut down');
    process.exit(0);
});

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Test</title>
      </head>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
      </script>
      <body>
      </body>
    </html>
  `);
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

router(app);
