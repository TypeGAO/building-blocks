import { Button } from "../../components"
import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"

function CreateGameButton() {
  const { gameActivity } = useGameActivity()
  const handleClick = () => {
    socket.emit("createRoom", gameActivity.questionSetId)
  }

  return (
    <Button size="lg" color="blue" onClick={handleClick}>
      Host your own game
    </Button>
  )
}

export default CreateGameButton
