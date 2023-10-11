import { useState } from "react"
import { socket } from "../../../socket"
import { Button, Input } from "../../../components"
import useGameActivity from "../../../hooks/useGameActivity"

function EnterNickname() {
  const [nickname, setNickname] = useState("")
  const { gameActivity } = useGameActivity()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nickname) {
      socket.emit("joinRoom", gameActivity.roomId)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div style={{ display: "grid", width: "100%", gap: "var(--8)" }}>
        <Input
          placeholder="Nickname"
          size="lg"
          value={nickname}
          onChange={handleChange}
          autoFocus
          style={{ textAlign: "center" }}
        />
        <Button type="submit" color="green" size="lg">
          Go!
        </Button>
      </div>
    </form>
  )
}

export default EnterNickname
