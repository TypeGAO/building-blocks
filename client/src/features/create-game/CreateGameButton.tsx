import { Button } from "../../components"
import { socket } from "../../socket"

function CreateGameButton() {
  const handleClick = () => {
    // TODO: Change parameter in emit to questionSetId
    socket.emit("createRoom", 1)
  }

  return (
    <Button size="lg" color="blue" onClick={handleClick}>
      Host your own game
    </Button>
  )
}

export default CreateGameButton
