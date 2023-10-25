import { Button } from "../../../components"
import { socket } from "../../../socket"
import toast from "react-hot-toast"

interface RunGameButtonProps {
  roomId: string | null
  code: string | null
  nickname: string | null
}

function RunCodeButton({ roomId, code, nickname }: RunGameButtonProps) {
  const handleClick = async () => {
      if (roomId && code) {
          socket.emit("runCode", roomId, code, nickname);
      } else {
          toast.error("Error Running Code");
      }
  }

  return (
    <Button size="lg" color="neutral" onClick={handleClick}>
      Run Code
    </Button>
  )
}

export default RunCodeButton
