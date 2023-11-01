import { useState } from "react"
import { TextEditor } from "../../components"
import RunCodeButton from "./RunCodeButton"
import Output from "./Output"

function Code() {
  const [code, setCode] = useState<string>("")

  return (
    <>
      <TextEditor code={code} setCode={setCode} />
      <RunCodeButton code={code} questionId={1} />
      <Output />
    </>
  )
}

export default Code
