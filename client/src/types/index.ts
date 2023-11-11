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


export type QuestionSet = {
  title: string
  description: string
  grade_level: number
  categories: string []
}

export type Categories = {
  id: number
  category: string
}

export type Questions = {
  id: number
  title: string
  question: string
  starter_code: string
  test_cases: [[string,string]]
  public_tests: string[]
  question_set_id: number
}
