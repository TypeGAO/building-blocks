import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import styles from "./TextEditor.module.css"
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python'
import CustomTheme from './CustomTheme'

// type EditorOptions = {
//   mode: 'python',
//   theme: 'custom',
//   lineNumbers: boolean,
//   autofocus: boolean,
//   className?: string
// }

interface TextEditorProps {
  value: string
  onChange: (newValue: string) => void
  className?: string
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const options = {
    mode: 'python',
    theme: 'custom',
    lineNumbers: true,
    autofocus: true,
  }

  const handleBeforeChange = (editor: any, data: any, newValue: string) => {
    onChange(newValue)
  }

  return (
    <CodeMirror
      value={value}
      options={options}
      onBeforeChange={handleBeforeChange}
      className={styles.CodeMirrorContainer}
    />
  )
}

export default TextEditor
