import { Request, Response } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router.ts');
 
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.on('SIGINT', function() {
    console.log('Server Successfully Shut down');
    process.exit(0);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Building Blocks Server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
router(app);
