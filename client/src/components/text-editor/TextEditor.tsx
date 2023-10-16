import Editor from "@monaco-editor/react"
import * as monaco from "monaco-editor"
// import myCustomTheme from "./my-custom-theme.json"
import styles from "./TextEditor.module.css"

monaco.editor.defineTheme('customTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {
        token: "identifier",
        foreground: "9CDCFE"
      },
      {
        token: "identifier.function",
        foreground: "DCDCAA"
      },
      {
        token: "type",
        foreground: "1AAFB0"
      }
    ],
    colors: {}
    });
monaco.editor.setTheme('customTheme')

function TextEditor(props: { initialContent: string; language: string }) {
    const { initialContent, language } = props

    monaco.editor.setTheme('customTheme')

    return (
        <div className={styles.textEditorContainer}>
            <Editor 
                defaultValue={initialContent}
                language={language}
                className={styles.editor}
            />
        </div>
    )
}

export default TextEditor
