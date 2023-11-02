import { useState } from "react"
import { TextEditor } from "../../components"
import RunCodeButton from "./RunCodeButton"
import Output from "./Output"
import useGameActivity from "../../hooks/useGameActivity"

function Code() {
  const [code, setCode] = useState<string>("")
  const { currentPlayer } = useGameActivity()

  return (
    <>
      <TextEditor code={code} setCode={setCode} />
      <RunCodeButton code={code} questionId={currentPlayer.currentQuestionId} />
      <Output />
    </>
  )
}

export default Code
