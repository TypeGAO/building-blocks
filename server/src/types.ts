export type Player = {
    roomId: string
    nickname: string
    score: int
    currentQuestion: int
    buildingBlocksId: [int] | []
}

export type GameActivity = {
  masterSocket: string  | null
  roomId: string | null
  role?: string
  stage: string
  time: int
  players: [Player] | []
}
