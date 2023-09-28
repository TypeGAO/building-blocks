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
        <title>Landing Page</title>
      </head>
      <body>
        <a href="http://localhost:3000/host">Host</a>
        <a href="http://localhost:3000/player">Player</a>
      </body>
    </html>
  `);
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

router(app);
