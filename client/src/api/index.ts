import axiosClient from "../axios"

export async function fetchRoomByPin(id: string) {
  const res = await axiosClient.get(`/rooms/getRoom/${id}`)
  return res
}

export async function startGame(id: string) {
  const res = await axiosClient.put(`/rooms/startGame/${id}`)
  return res
}

export async function fetchHint(code: string, question: string) {
  const res = await axiosClient.post(`/hints/getHint`, {
    code: code,
    question: question,
  })
  return res
}
