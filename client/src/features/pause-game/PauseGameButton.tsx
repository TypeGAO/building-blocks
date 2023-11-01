import { Button } from "../../components"
import useGameActivity from "../../hooks/useGameActivity"
import { socket } from "../../socket"

function PauseGameButton() {
  const { gameActivity } = useGameActivity()

  const handleClick = async () => {
    socket.emit("pauseGame", gameActivity.roomId)
  }

  return (
    <Button size="lg" color="neutral" onClick={handleClick}>
      Pause Game
    </Button>
  )
}

export default PauseGameButton
