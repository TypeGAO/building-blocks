import { Player, GameActivity } from '../src/types';
const query = require('../src/db/index.ts');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

// Helper functions for getting, setting, and inserting game activities into the database

export async function gameStarted(roomId: string) {
    let strSQL = `SELECT is_active 
                  FROM rooms WHERE pin = $1`
    const { rows } = await query(strSQL, [roomId]);
    const is_active = rows[0].is_active;
    return is_active;
}

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

export async function getInput(questionId: number) {
    const strSQL = `
            SELECT test_cases
            FROM questions WHERE id = $1
        `;
    const { rows } = await query(strSQL, [questionId]);
    const input = rows[0].test_cases.input;
    return '\n'+input;
}

export async function getPublicInput(questionId: number) {
    const strSQL = `
            SELECT public_tests
            FROM questions WHERE id = $1
        `;
    const { rows } = await query(strSQL, [questionId]);
    let input = rows[0].public_tests.input;
    input = input.map((i: string) => {
        return `print(${i})`
    }).join('\n');
    return '\n'+input;
}

export async function runCode(code: string) {
    // Timeout for 5 seconds, python -I is for isolated environment
    // Note: this doesn't fully check syntax?
    const command = `python3 -I -c "${code}"`;
    try {
        const { stdout, stderr } = await exec(command, { timeout: 5000 });
        if (stderr) {
            return stderr.trim();
        }
        return stdout.trim();
    } catch (error: any) {
        return error.message.substr(error.message.indexOf('Traceback'));;
    }
}

export async function getQuestionIds(questionSetId: number) {
    let strSQL = `SELECT id
                  FROM questions
                  WHERE (question_set_id = $1)`;
    const { rows }  = await query(strSQL, [questionSetId]);
    return rows.map((o: any) => o.id);
}

export async function getStarterCode(questionId: number) {
    let strSQL = `SELECT starter_code
                  FROM questions
                  WHERE (id = $1)`;
    const { rows }  = await query(strSQL, [questionId]);
    return rows[0].starter_code;
}
