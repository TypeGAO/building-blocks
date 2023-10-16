import { useState } from "react"
import { socket } from "../../../socket"
import { Button, Input } from "../../../components"

function EnterGame() {
  const [roomId, setRoomId] = useState("")
  const [nickname, setNickname] = useState("")

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const handleSubmit = () => {
    if (roomId && nickname) {
      socket.emit("joinRoom", roomId, nickname)
    }
  }

  return (
    <>
      <Input
        placeholder="Nickname"
        size="lg"
        value={nickname}
        onChange={handleNicknameChange}
        autoFocus
        style={{ textAlign: "center" }}
      />
      <Input
        placeholder="Game PIN"
        size="lg"
        value={roomId}
        onChange={handleRoomIdChange}
        autoFocus
        style={{ textAlign: "center" }}
      />
      <Button color="green" size="lg" onClick={handleSubmit}>
        Enter
      </Button>
    </>
  )
}

export default EnterGame
