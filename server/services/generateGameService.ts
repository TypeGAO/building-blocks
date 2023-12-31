import { Player, GameActivity } from '../src/types';

// Create random 7 character code
export function generateUniqueCode(): string {
    let code = '';
    // Removed l, 0, o
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789';
    for (let i = 0; i < 7; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// New player and game activity helper functions
export function addPlayer(roomId: string, nickname: string): Player {
    return {
        roomId: roomId,
        nickname: nickname,
        currentQuestion: 0,
        score: 150,
        buildingBlocksId: [],
        submissions: 0,
        currentCode: "",
        lastOutput: "",
        currentQuestionId: 1,
        doneTime: ""
    }
}

export function newGameActivity(masterSocket: string, roomId: string): GameActivity {
    return { 
        masterSocket: masterSocket,
        roomId: roomId,
        nickname: "",
        time: 600,
        players: [],
        stage: "creating",
        questionSetId: 2
    };
}
