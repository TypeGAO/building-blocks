export type Player = {
  roomId: string
  nickname: string
  score: number
  currentQuestion: number
  buildingBlocksId: [number] | []
  submissions: number
  currentCode: string
  lastOutput: string
  currentQuestionId: number
  currentCode: string
  lastOutput: string
  currentQuestionId: number
  doneTime: string
}

export type GameActivity = {
  masterSocket?: string | null
  roomId: string | null
  nickname: string | null
  role?: string
  stage: string
  time: number
  players: [Player] | []
  questionSetId: number
}
