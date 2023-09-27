import { Request, Response } from 'express';
import cors from 'cors';

const { createServer } = require('node:http');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router.ts');
 
export const app = express();
const port = 3000;
const server = createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
      <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
      <script>
        fetch('http://localhost:3000/host/newGame', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const socket = io("http://localhost:"+data.Port);
        })
        .catch(error => console.error(error))
      </script>
      <body>
      </body>
    </html>
  `);
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

router(app);
