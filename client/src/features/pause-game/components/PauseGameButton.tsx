import { Button } from "../../../components"
import { socket } from "../../../socket"
import toast from "react-hot-toast"

interface PauseGameButtonProps {
  roomId: string | null
}

function PauseGameButton({ roomId } : PauseGameButtonProps) {
  const handleClick = async () => {
      socket.emit("pauseGame", roomId);
  }

  return (
    <Button size="lg" color="neutral" onClick={handleClick}>
      Pause Game
    </Button>
  )
}

export default PauseGameButton
