import { useState } from "react"
import { Button, Input } from "../../components"

function EnterGame() {
  const [pin, setPin] = useState("")
  const [nickname, setNickname] = useState("")
  const [stage, setStage] = useState<"pin" | "nickname">("pin")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (stage === "pin") {
      setPin(e.target.value)
      return
    }
    setNickname(e.target.value)
  }

  function handleSubmit() {
    if (stage === "pin") {
      setStage("nickname")
      return
    }
    alert("submitted")
  }

  return (
    <>
      <Input
        placeholder={stage === "pin" ? "Game PIN" : "Nickname"}
        value={stage === "pin" ? pin : nickname}
        onChange={(e) => handleChange(e)}
        autoFocus
        style={{ textAlign: "center" }}
      />
      <Button color="green" onClick={handleSubmit}>
        {stage === "pin" ? "Enter" : "Play"}
      </Button>
    </>
  )
}

export default EnterGame
