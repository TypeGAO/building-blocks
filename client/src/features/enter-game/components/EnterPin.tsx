import { useState } from "react"
import { Button, Input, SpinnerOverlay } from "../../../components"
import useGameActivity from "../../../hooks/useGameActivity"

function EnterPin() {
  // TODO: Replace with API call. This currently emulates a request

  const [roomId, setRoomId] = useState("")
  const { gameActivity, setGameActivity } = useGameActivity()
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setGameActivity({ ...gameActivity, roomId: roomId })
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      {isLoading && <SpinnerOverlay label="Connecting" />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div style={{ display: "grid", width: "100%", gap: "var(--8)" }}>
          <Input
            placeholder="Game PIN"
            size="lg"
            value={roomId}
            onChange={handleChange}
            autoFocus
            style={{ textAlign: "center" }}
          />
          <Button color="green" size="lg" disabled={isLoading}>
            Enter
          </Button>
        </div>
      </form>
    </>
  )
}

export default EnterPin
