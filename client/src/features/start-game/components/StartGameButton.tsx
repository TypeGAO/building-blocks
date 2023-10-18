import { Button } from "../../../components"
import { socket } from "../../../socket"
import { startGame } from "../../../api"

function StartGameButton(props) {
  const handleClick = async (roomId) => {
    let ret = await startGame(roomId)
    console.log(ret);
    socket.emit("startGame")
  }

  return (
    <Button size="lg" color="blue" onClick={() => handleClick(props.roomId)}>
      Start
    </Button>
  )
}

export default StartGameButton
