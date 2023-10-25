import { Player, GameActivity } from '../src/types';
const query = require('../src/db/index.ts');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

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

export async function endGame(roomId: string) {
    const strSQL = `
            UPDATE rooms 
            SET is_active = false
            WHERE pin = $1 
            RETURNING time_started
        `;

    await query(strSQL, [roomId]);
}

export async function getExpectedOutput(questionId: number) {
    const strSQL = `
            SELECT test_cases
            FROM questions WHERE id = $1
        `;
    const { rows } = await query(strSQL, [questionId]);
    const expected_output = rows[0].test_cases.expected_output;
    return expected_output;
}

export async function runCode(code: string) {
    // Timeout for 5 seconds, python -I is for isolated environment
    const command = `python -I -c "${code}"`;
    try {
        const { stdout, stderr } = await exec(command, { timeout: 5000 });
        if (stderr) {
            return stderr.trim();
        }
        return stdout.trim();
    } catch (error: any) {
        return error.message;
    }
}
