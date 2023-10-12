import { Player, GameActivity } from '../src/types';

// Create random 7 character code
export function generateUniqueCode(): string {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 7; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export function addPlayer(roomId: string, nickname: string): Player {
    return {
        roomId: roomId,
        nickname: nickname,
        currentQuestion: 0,
        score: 0,
        buildingBlocksId: []
    }
}

export function newGameActivity(roomId: string): GameActivity {
    return { 
        roomId: roomId,
        time: -1,
        players: [],
        stage: "lobby"
    };
}
