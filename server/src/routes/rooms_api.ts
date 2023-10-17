import { Request, Response } from "express";

const Router = require("express-promise-router");
const query = require("../db/index.ts");

const router = new Router();

// CRUD api for rooms table in the database
// Note id is actually the game room pin, not the PK id

router.post("/addRoom", async (req: Request, res: Response) => {
  try {
    const { pin, is_active, question_set_id, game_activity, time_started } =
      req.body;
    let strSQL = `INSERT INTO rooms (pin, is_active, question_set_id, game_activity, time_started)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const { rows } = await query(strSQL, [
      pin,
      is_active,
      question_set_id,
      game_activity,
      time_started,
    ]);
  } catch (error) {
    res.status(500).json({ message: "Error Adding Room" });
  }
});

router.get("/getRoom/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let strSQL = `SELECT * 
                      FROM rooms
                      WHERE pin = $1`;
    const { rows } = await query(strSQL, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.send(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error Getting Specific Room" });
  }
});

router.put("/updateRoom/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { pin, is_active, question_set_id, game_activity, time_started } =
      req.body;
    let strSQL = `UPDATE rooms 
                      SET pin = $1, is_active = $2, question_set_id = $3, game_activity = $4, time_started = $5
                      WHERE pin = $6 RETURNING *`;
    const { rows } = await query(strSQL, [
      pin,
      is_active,
      question_set_id,
      game_activity,
      time_started,
      id,
    ]);
    res.send(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error Updating Room" });
  }
});

router.delete("/deleteRoom/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    let strSQL = `DELETE FROM rooms 
                      WHERE pin = $1 RETURNING *`;
    const { rows } = await query(strSQL, [id]);
    res.send(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Room" });
  }
});

// Sets a room's question set

router.post("/setQuestionSet", async (req: Request, res: Response) => {
  try {
    const { roomID, questionSetID } = req.body;
    let strSQL = `UPDATE rooms
                      SET (question_set_id = $1)
                      WHERE (pin = $2)`;
    const { rows } = await query(strSQL, [questionSetID, roomID]);
    res.send(rows);
  } catch (error) {
    res.status(500).json({ message: "Error Getting Questions" });
  }
});

// Set and get game activity

router.get("/getGameActivity/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const strSQL = `SELECT game_activity FROM rooms WHERE pin = $1`;
    const { rows } = await query(strSQL, [roomId]);

    if (rows.length) {
      res.json(rows[0].game_activity);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving game activity" });
  }
});

router.put("/setGameActivity", async (req: Request, res: Response) => {
  try {
    const { roomId, game_activity } = req.body;

    const strSQL = `UPDATE rooms SET game_activity = $1 WHERE pin = $2 RETURNING game_activity`;
    const { rows } = await query(strSQL, [game_activity, roomId]);

    if (rows.length) {
      res.json(rows[0].game_activity);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating game activity" });
  }
});

// Start game
router.put("startGame/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;

    // Set time_started to now
    const strSQL = `
            UPDATE rooms 
            SET is_active = true, time_started = NOW() 
            WHERE pin = $1 
            RETURNING is_active, time_started
        `;

    const { rows } = await query(strSQL, [roomId]);

    if (rows.length) {
      res.json({
        message: "Game started successfully",
        gameActivity: rows[0].game_activity,
      });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error starting the game" });
  }
});

module.exports = router;
