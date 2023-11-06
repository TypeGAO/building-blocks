import axiosClient from "../axios"
import { QuestionSet } from "../types";

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
  return res;
}


export async function addQuestionSet(questionSetData: QuestionSet) {
  const res = await axiosClient.post('/addQuestionSet', questionSetData);
  return res;
}