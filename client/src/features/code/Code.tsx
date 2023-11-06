import { useState } from "react"
import { TextEditor } from "../../components"
import RunCodeButton from "./RunCodeButton"

function Code() {
  const [code, setCode] = useState<string>("")

  return (
    <>
      <TextEditor code={code} setCode={setCode} />
      <RunCodeButton code={code} questionId={1} />
    </>
  )
}

export default Code
