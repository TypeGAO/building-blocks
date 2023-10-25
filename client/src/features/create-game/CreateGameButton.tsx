import { Button } from "../../components"
import { socket } from "../../socket"

function CreateGameButton() {
  const handleClick = () => {
    socket.emit("createRoom")
  }

  return (
    <Button size="lg" color="blue" onClick={handleClick}>
      Host your own game
    </Button>
  )
}

export default CreateGameButton
