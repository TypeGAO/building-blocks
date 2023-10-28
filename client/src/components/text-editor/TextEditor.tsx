import Editor from "@monaco-editor/react"
import styles from "./TextEditor.module.css"
import { Spinner } from ".."

interface TextEditorProps {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

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

function TextEditor({ code, setCode }: TextEditorProps) {
  const handleChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  return (
    <div className={styles.editor}>
      <Editor
        value={code}
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
