import { Button } from "../../components"
import { socket } from "../../socket"
import toast from "react-hot-toast"
import useGameActivity from "../../hooks/useGameActivity"

interface RunGameButtonProps {
  code: string
  questionId: number | null
}

function RunCodeButton({ code, questionId }: RunGameButtonProps) {
  const { gameActivity } = useGameActivity()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (gameActivity.roomId && code) {
      socket.emit(
        "runCode",
        gameActivity.roomId,
        code.replace(/"/g, '\\"'),
        gameActivity.nickname,
        questionId
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
