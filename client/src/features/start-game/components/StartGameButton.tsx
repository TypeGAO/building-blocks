import { Button } from "../../../components"
import { socket } from "../../../socket"
import { startGame } from "../../../api"
import toast from "react-hot-toast"
import { Player } from "../../../types"

interface StartGameButtonProps {
  roomId: string | null
  players: Player[]
}

function StartGameButton({ roomId, players }: StartGameButtonProps) {
  const handleClick = async () => {
    if (players.length === 0) {
      toast.error("The Lobby Is Empty!")
    } else {
      if (roomId) {
        const res = await startGame(roomId)
        if (res.status === 200) {
          socket.emit("startGame", roomId)
        } else {
          toast.error("Error Starting Game")
        }
      }
    }
  }

  return (
    <Button size="lg" color="blue" onClick={handleClick}>
      Start
    </Button>
  )
}

export default StartGameButton
