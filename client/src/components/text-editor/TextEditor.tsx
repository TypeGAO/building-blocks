import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python' //python mode

interface TextEditorProps {
  value: string
  onChange: (newValue: string) => void
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const options = {
    mode: 'python', 
    theme: 'material', 
  }

  const handleBeforeChange = (editor: any, data: any, newValue: string) => {
    onChange(newValue)
  }

  return (
    <div>
      <CodeMirror
        value={value}
        options={options}
        onBeforeChange={handleBeforeChange}
      />
    </div>
  )
}

export default TextEditor
