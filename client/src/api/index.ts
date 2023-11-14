import axiosClient from "../axios"
import { QuestionSet, Questions } from "../types"

export async function fetchRoomByPin(id: string) {
  const res = await axiosClient.get(`/rooms/getRoom/${id}`)
  return res
}

export async function startGame(id: string) {
  const res = await axiosClient.put(`/rooms/startGame/${id}`)
  return res
}

export async function fetchCategories() {
  const res = await axiosClient.get(`/categories/getCategories/`)
  return res
}

export async function addQuestionSet(questionSetData: QuestionSet) {
  const res = await axiosClient.post(
    "/questionSets/addQuestionSet",
    questionSetData
  )
  return res
}

export async function addQuestions(questionSetData: Questions[]) {
  let res;
  for (let i = 0; i < questionSetData.length; i++) {
    res = await axiosClient.post("/questions/addQuestion", questionSetData[i])
  }
  return res
}

export async function fetchHint(code: string, question: string) {
  const res = await axiosClient.post(`/hints/getHint`, {
    code: code,
    question: question,
  })
  return res
}

export async function fetchQuestion(questionId: number) {
  const res = await axiosClient.get(`/questions/getQuestion/${questionId}`)
  return res
}

export async function fetchQuestionSets() {
  const res = await axiosClient.get(`/questionSets/getQuestionSets`)
  return res
}

export async function fetchQuestionSetLength(questionSetId: number) {
  const res = await axiosClient.get(
    `/questionSets/getQuestionsInSet/${questionSetId}`
  )
  return res.data.length
}
