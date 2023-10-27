import { useState } from "react"
import { Button } from "../../components"
import { socket } from "../../socket"
import toast from "react-hot-toast"
import useGameActivity from "../../hooks/useGameActivity"

interface RunGameButtonProps {
  questionId: number | null
}

function RunCodeButton({ questionId }: RunGameButtonProps) {
  const [code, setCode] = useState<string>("")
  const { gameActivity } = useGameActivity()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

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
    } else {
      toast.error("Error Running Code")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", width: "30%", gap: "var(--8)" }}>
        <textarea
          value={code}
          onChange={handleChange}
          autoFocus
          style={{ textAlign: "left" }}
          rows={13}
          id="IDE"
        />
        <Button size="lg" color="neutral">
          Run Code
        </Button>
      </div>
    </form>
  )
}

export default RunCodeButton
