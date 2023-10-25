import toast from "react-hot-toast"
import { socket } from "../../socket"
import { Button } from "../../components"
import useGameActivity from "../../hooks/useGameActivity"

interface RunGameButtonProps {
  code: string | null
}

function RunCodeButton({ code }: RunGameButtonProps) {
  const { gameActivity } = useGameActivity()

  const handleClick = async () => {
    if (gameActivity.roomId && code) {
      socket.emit("runCode", gameActivity.roomId, code, gameActivity.nickname)
    } else {
      toast.error("Error Running Code")
    }
  }

  return (
    <Button color="green" onClick={handleClick}>
      Run
    </Button>
  )
}

export default RunCodeButton
