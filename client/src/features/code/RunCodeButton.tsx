import { Button } from "../../components"
import { socket } from "../../socket"
import toast from "react-hot-toast"
import useGameActivity from "../../hooks/useGameActivity"

function RunCodeButton() {
  const { gameActivity, currentPlayer } = useGameActivity()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (gameActivity.roomId && currentPlayer.currentCode) {
      socket.emit(
        "runCode",
        gameActivity.roomId,
        currentPlayer.currentCode.replace(/"/g, '\\"'),
        gameActivity.nickname,
        currentPlayer.currentQuestionId
      )
      return
    }

    toast.error("Uh-oh, something went wrong. Please try again!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button color="green">Run</Button>
    </form>
  )
}

export default RunCodeButton
