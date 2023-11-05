import { TextEditor } from "../../components"
import RunCodeButton from "./RunCodeButton"
import Output from "./Output"
import styles from "./styles.module.css"

function Code() {
  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <div style={{ position: "relative" }}>
          <TextEditor />
          <div className={styles.buttonContainer}>
            <RunCodeButton />
          </div>
        </div>
      </div>
      <div className={styles.half}>
        <Output />
      </div>
    </div>
  )
}

export default Code
