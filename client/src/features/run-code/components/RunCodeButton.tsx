import { useState } from "react"
import { Button, Input } from "../../../components"
import { socket } from "../../../socket"
import toast from "react-hot-toast"

interface RunGameButtonProps {
  roomId: string | null
  nickname: string | null
  questionId: number | null
}

function RunCodeButton({ roomId, nickname, questionId }: RunGameButtonProps) {
  const [code, setCode] = useState<string>("")
  const handleClick = async () => {
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (roomId && code) {
        socket.emit("runCode", roomId, code.replace(/"/g, '\\"'), nickname, questionId);
    } else {
        toast.error("Error Running Code");
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", width: "30%", gap: "var(--8)" }}>
          <textarea
            size="lg"
            value={code}
            onChange={handleChange}
            autoFocus
            style={{ textAlign: "left" }}
            rows="13"
          />
          <Button size="lg" color="neutral">
            Run Code
          </Button>
        </div>
      </form>
  )
}

export default RunCodeButton
