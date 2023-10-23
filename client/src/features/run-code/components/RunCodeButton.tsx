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
    //if (players.length === 0) {
      //toast.error("The Lobby Is Empty!")
    //} else {
      //if (roomId) {
        //const res = await startGame(roomId)
        //if (res.status === 200) {
          //socket.emit("startGame", roomId)
        //} else {
          //toast.error("Error Starting Game")
        //}
      //}
    //}
  }

  return (
    <Button size="lg" color="red" onClick={handleClick}>
      Run Code
    </Button>
  )
}

export default RunCodeButton
