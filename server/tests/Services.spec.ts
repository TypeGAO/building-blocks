import { describe } from "node:test";
import { addPlayer, generateUniqueCode, newGameActivity } from "../services/generateGameService";
import { gameStarted } from "../services/gameManagerService";
var expect = require('chai').expect;

describe('Test /generateManagerService', () => {
    describe('generateUniqueCode() Test', () => {
        it('Should be 7 characters long', () => {
            const codeString = generateUniqueCode();
            expect(codeString).to.have.lengthOf(7);
        });
    });

    describe('addPlayer() Test', () => {
        it('Should return currentQuestion as 0', () => {
            const newPlayer = addPlayer("testid", "test");
            expect(newPlayer.currentQuestion).to.equal(0);
        });
    });

    describe('newGameActivity()', () => {
        it('Should return time as -1', () => {
            const newGame = newGameActivity("testSocket", "testId");
            expect(newGame.time).to.equal(-1);
        });
    });
});

// describe('Test /gameManagerService', () => {
//     describe('gameManagerService() Test', () => {
//         it('Game room should not be active', () => {
//             const codeString = gameStarted("testid");
//             expect(codeString).to.equal(false);
//         });
//     });
// });