import Editor from "@monaco-editor/react"
import styles from "./TextEditor.module.css"
import { Spinner } from ".."
import useGameActivity from "../../hooks/useGameActivity"

const options = {
  selectOnLineNumbers: true,
  fontSize: 16,
  minimap: {
    enabled: false,
  },
  theme: {
    base: "vs",
    inherit: true,
    rules: [],
  },
}

function TextEditor() {
  const { currentPlayer, setCurrentPlayer } = useGameActivity()

  const handleChange = (value: string | undefined) => {
    if (value) {
      currentPlayer.currentCode = value
      setCurrentPlayer(currentPlayer)
    }
  }

  return (
    <div className={styles.editor}>
      <Editor
        value={currentPlayer.currentCode}
        height="100%"
        defaultValue="# Start writing code here!"
        defaultLanguage="python"
        options={options}
        loading={<Spinner color="neutral" />}
        onChange={handleChange}
      />
    </div>
  )
}

export default TextEditor
