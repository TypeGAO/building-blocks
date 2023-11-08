export type Player = {
  roomId: string | null
  nickname: string
  score: number
  currentQuestion: number
  buildingBlocksId: [number] | []
  submissions: number
  currentCode: string
  lastOutput: string
  currentQuestionId: number
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

export type QuestionSet = {
  title: string
  grade_level: number
  description: string
  categories: string[]
}

export type Categories = {
  id: number
  category: string
}