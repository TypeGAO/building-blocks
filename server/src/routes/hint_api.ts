import { Request, Response } from "express";
import OpenAI from "openai";

const Router = require("express-promise-router");
const query = require("../db/index.ts");
const router = new Router();
const dotenv = require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/getHint", async (req: Request, res: Response) => {
    try {
        const { code, question }  = req.body;
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{
              role: "system",
              content: `Python: ${code}. At a high school grade level, and without revealing the solution or writing code, give a hint from this question: ${question}. Format your hint starting with "Hint: "`
          }],
          temperature: 0,
          max_tokens: 1024,
        });
        res.send(response.choices[0].message.content);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error Getting Hint' });
    }
});

module.exports = router;
