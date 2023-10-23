import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { defineTheme } from 'react-codemirror2'
// import { createTheme } from 'react-codemirror2'
import styles from './TextEditor.module.css'

const CustomTheme = defineTheme('custom', {
    'cm-container': styles.CodeMirrorContainer,
    'cm': styles.CodeMirror,
    'cm-linenumbers': styles.CodeMirrorLineNumbers,
    'cm-activeline-background': styles.CodeMirrorActiveLineBackground,
    'cm-comment': styles.CodeMirrorComment,
    'cm-string': styles.CodeMirrorString,
    'cm-keyword': styles.CodeMirrorKeyword,
})

// const myTheme = createTheme({
//     dark: 'light',
//     settings: {
//       background: '#ffffff',
//       backgroundImage: '',
//       foreground: '#4D4D4C',
//       caret: '#AEAFAD',
//       selection: '#D6D6D6',
//       selectionMatch: '#D6D6D6',
//       gutterBackground: '#FFFFFF',
//       gutterForeground: '#4D4D4C',
//       gutterBorder: '#dddddd',
//       gutterActiveForeground: '',
//       lineHighlight: '#EFEFEF',
//     },
//     styles: [
//       { tag: t.comment, color: '#787b80' },
//       { tag: t.definition(t.typeName), color: '#194a7b' },
//       { tag: t.typeName, color: '#194a7b' },
//       { tag: t.tagName, color: '#008a02' },
//       { tag: t.variableName, color: '#1a00db' },
//     ],
//   })

export default CustomTheme