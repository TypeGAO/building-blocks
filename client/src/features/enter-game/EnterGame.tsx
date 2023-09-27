import { useState } from "react"
import { Button, Input } from "../../components"

function EnterGame() {
  const [pin, setPin] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPin(e.target.value)
  }

  function handleSubmit() {
    alert("Submit")
  }

  return (
    <div>
      <Input
        placeholder="Game PIN"
        value={pin}
        onChange={(e) => handleChange(e)}
      />
      <Button color="green" onClick={handleSubmit}>
        Enter
      </Button>
    </div>
  )
}

export default EnterGame
