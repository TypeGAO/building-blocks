import { useState } from "react"
import { socket } from "../../../socket"
import { Button, Input } from "../../../components"

function EnterGame() {
  const [roomId, setRoomId] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }

  const handleSubmit = () => {
    if (roomId) {
      socket.emit("joinRoom", roomId)
    }
  }

  return (
    <>
      <Input
        placeholder="Game PIN"
        size="lg"
        value={roomId}
        onChange={handleChange}
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
