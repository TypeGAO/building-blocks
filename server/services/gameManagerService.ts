import { Player, GameActivity } from '../src/types';
const query = require('../src/db/index.ts');

// Helper functions for getting, setting, and inserting game activities into the database
export async function getGameActivity(roomId: string) {
    let strSQL = `SELECT game_activity 
                  FROM rooms WHERE pin = $1`
    const { rows } = await query(strSQL, [roomId]);
    const game_activity = rows[0].game_activity;
    return game_activity;
}

export async function setGameActivity(game_activity: GameActivity, roomId: string) {
    let strSQL = `UPDATE rooms SET game_activity = $1 WHERE pin = $2`;
    await query(strSQL, [game_activity, roomId]);
}

export async function insertGameActivity(game_activity: GameActivity, roomId: string) {
    let strSQL = ` INSERT INTO rooms (pin, is_active, question_set_id, game_activity, time_started) 
                   VALUES ($1, false, $2, $3, NOW())`;
    await query(strSQL, [roomId, 1, game_activity]);
}
