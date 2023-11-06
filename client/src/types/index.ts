export type Player = {
  roomId: string
  nickname: string
  score: number
  currentQuestion: number
  buildingBlocksId: [number] | []
  submissions: number
}

export type GameActivity = {
  masterSocket?: string | null
  roomId: string | null
  nickname: string | null
  role?: string
  stage: string
  time: number
  players: [Player] | []
}

export type QuestionSet = {
  title: string
  desc: string
  grade: number
  category: string
}

export type Categories = {
  id: number
  category: string
}