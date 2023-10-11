// Create random 7 character code
export function generateUniqueCode(): string {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 7; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export function addPlayer(roomId: string, nickname: string): object {
    return {
        roomId: roomId,
        nickname: nickname,
        currentQuestion: 0,
        score: 0,
        buildingBlocksIDs: []
    }
}

export function newGameActivity(roomID: string): object {
    return { 
        roomID: roomID,
        timeRemaining: -1,
        players: []
    };
}
