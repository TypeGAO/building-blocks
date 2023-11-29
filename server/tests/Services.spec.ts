import { describe } from "node:test";
import { addPlayer, generateUniqueCode, newGameActivity } from "../services/generateGameService";
import * as sinon from 'sinon';
import {
    gameStarted,
    getGameActivity,
    setGameActivity,
    insertGameActivity,
    endGame,
    getExpectedOutput,
    runCode,
    getQuestionIds,
    getStarterCode,
} from "../services/gameManagerService";

var expect = require('chai').expect;

describe('Test /generateManagerService', () => {
    describe('generateUniqueCode', () => {
        it('should generate a unique code of length 7', () => {
            const code = generateUniqueCode();
            expect(code).to.have.lengthOf(7);
        });

        it('should only contain characters A-Z, a-z, and 0-9', () => {
            const code = generateUniqueCode();
            expect(code).to.match(/^[a-zA-Z0-9]+$/);
        });

        it('should generate different codes for multiple calls', () => {
            const code1 = generateUniqueCode();
            const code2 = generateUniqueCode();
            expect(code1).to.not.equal(code2);
        });
    });

    describe('addPlayer', () => {
        it('should create a new player with default values', () => {
            const roomId = 'testRoom';
            const nickname = 'testPlayer';
            const player = addPlayer(roomId, nickname);

            expect(player.roomId).to.equal(roomId);
            expect(player.nickname).to.equal(nickname);
            expect(player.currentQuestion).to.equal(0);
            expect(player.score).to.equal(0);
            expect(player.buildingBlocksId).to.have.lengthOf(0);
            expect(player.submissions).to.equal(0);
            expect(player.currentCode).to.equal('');
            expect(player.lastOutput).to.equal('');
            expect(player.currentQuestionId).to.equal(1);
        });
    });

    describe('newGameActivity', () => {
        it('should create a new game activity with default values', () => {
            const masterSocket = 'masterSocket';
            const roomId = 'testRoom';
            const gameActivity = newGameActivity(masterSocket, roomId);

            expect(gameActivity.masterSocket).to.equal(masterSocket);
            expect(gameActivity.roomId).to.equal(roomId);
            expect(gameActivity.nickname).to.equal('');
            expect(gameActivity.time).to.equal(-1);
            expect(gameActivity.players).to.have.lengthOf(0);
            expect(gameActivity.stage).to.equal('lobby');
            expect(gameActivity.questionSetId).to.equal(2);
        });
    });
});

describe('Test /gameManagerService', () => {
    // Mock the database query function
    const queryStub = sinon.stub();

    // Mock database responses
    const fakeIsActive = false;
    const fakeGameActivity = newGameActivity('masterSocket', 'roomId')
    const fakeExpectedOutput = 'Fake Expected Output';
    const fakeQuestionIds = [157, 158, 159];
    const fakeStarterCode = 'Fake Starter Code';

    // Set up sinon stubs
    queryStub.withArgs(sinon.match(/SELECT is_active/), sinon.match.array).resolves({ rows: [{ is_active: fakeIsActive }] });
    queryStub.withArgs(sinon.match(/SELECT game_activity/), sinon.match.array).resolves({ rows: [{ game_activity: fakeGameActivity }] });
    queryStub.withArgs(sinon.match(/SELECT test_cases/), sinon.match.array).resolves({ rows: [{ test_cases: { expected_output: fakeExpectedOutput } }] });
    queryStub.withArgs(sinon.match(/SELECT id/), sinon.match.array).resolves({ rows: fakeQuestionIds.map(id => ({ id })) });
    queryStub.withArgs(sinon.match(/SELECT starter_code/), sinon.match.array).resolves({ rows: [{ starter_code: fakeStarterCode }] });
    queryStub.withArgs(sinon.match(/INSERT INTO rooms/), sinon.match.array).resolves({ rows: [] });
    queryStub.withArgs(sinon.match(/UPDATE rooms SET game_activity/), sinon.match.array).resolves({ rows: [] });
    queryStub.withArgs(sinon.match(/UPDATE rooms SET is_active/), sinon.match.array).resolves({ rows: [] });
    queryStub.withArgs(sinon.match(/UPDATE rooms SET is_active/), sinon.match.array).resolves({ rows: [] });

    // Replace the original query function with the sinon stub
    sinon.define(require('../src/db/index.ts'), 'query', queryStub);

    beforeEach(async () => {
        // Insert a game activity (adjust as needed)
        const gameActivity = newGameActivity('masterSocket', 'roomId');
        await insertGameActivity(gameActivity, "1234567");
      });
    
      // After each test, end the game and clean up the database
      afterEach(async () => {
        await endGame("1234567");
      });
    

    describe('gameStarted', () => {
        it('should return the status of the game for the given room', async () => {
            const roomId = '1234567';
            const isGameActive = await gameStarted(roomId);

            expect(isGameActive).to.equal(fakeIsActive);
        });
    });

    describe('getGameActivity', () => {
        it('should return the game activity for the given room', async () => {
            const roomId = '1234567';
            const gameActivity = await getGameActivity(roomId);

            expect(gameActivity).to.deep.equal(fakeGameActivity);
        });
    });

    describe('setGameActivity', () => {
        it('should update the game activity for the given room', async () => {
            const roomId = '1234567';
            const GameActivity = newGameActivity('masterSocket', '1234567');

            await setGameActivity(GameActivity, roomId);

            const updatedGameActivity = await getGameActivity(roomId);
            expect(updatedGameActivity).to.deep.equal(GameActivity);
        });
    });

    describe('insertGameActivity', () => {
        it('should insert a new game activity into the database', async () => {
            const roomId = '7654321';
            const GameActivity = newGameActivity('masterSocket', '1234567');

            await insertGameActivity(GameActivity, roomId);

            const insertedGameActivity = await getGameActivity(roomId);
            expect(insertedGameActivity).to.deep.equal(GameActivity);
        });
    });

    describe('endGame', () => {
        it('should end the game for the given room', async () => {
            const roomId = 'testRoom';
            await endGame(roomId);

            const isGameActive = await gameStarted(roomId);
            expect(isGameActive).to.be.false;
        });
    });

    // describe('getExpectedOutput', () => {
    //     it('should return the expected output for the given question id', async () => {
    //         const questionId = 1;
    //         const expectedOutput = await getExpectedOutput(questionId);

    //         expect(expectedOutput).to.equal(fakeExpectedOutput);
    //     });
    // });

    // describe('runCode', () => {
    //     it('should execute the provided code and return the output', async () => {
    //         const code = 'print("Hello, World!")';
    //         const output = await runCode(code);

    //         // Add assertions based on your expectations for code execution
    //         // For example, check if the output contains "Hello, World!"
    //         expect(output).to.include('Hello, World!');
    //     });
    // });

    describe('getQuestionIds', () => {
        it('should return an array of question ids for the given question set id', async () => {
            const questionSetId = 1;
            const questionIds = await getQuestionIds(questionSetId);

            expect(questionIds).to.deep.equal(fakeQuestionIds);
        });
    });

    // describe('getStarterCode', () => {
    //     it('should return the starter code for the given question id', async () => {
    //         const questionId = 1;
    //         const starterCode = await getStarterCode(questionId);

    //         expect(starterCode).to.equal(fakeStarterCode);
    //     });
    // });

    // Restore the original query function after all tests
    sinon.restore();
});