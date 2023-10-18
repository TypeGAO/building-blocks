import { Button } from "../../../components"
import { socket } from "../../../socket"
import { startGame } from "../../../api"
import toast from "react-hot-toast"

function StartGameButton(props) {
  const handleClick = async (roomId, players) => {
    if (players === 0) {
      toast.error("The Lobby Is Empty!")
    } else {
        let ret = await startGame(roomId)
        if (ret.status === 200) {
            socket.emit("startGame", roomId)
        } else {
          toast.error("Error Starting Game")
        }
    }
  }

  return (
    <Button size="lg" color="blue" onClick={() => handleClick(props.roomId, props.players)}>
      Start
    </Button>
  )
}

export default StartGameButton
