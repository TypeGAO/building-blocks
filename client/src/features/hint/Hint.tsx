import { useState } from "react"
import HintButton from "./HintButton"
import styles from "./styles.module.css"

function Hint() {
  const [hint, setHint] = useState("")

  return (
    <>
      <HintButton setHint={setHint} />
      {hint && (
        <div className={styles.hint}>
          <p className={styles.hintText}>
            <span>{hint.substring(0, 5)}</span>
            {hint.substring(5)}
          </p>
        </div>
      )}
    </>
  )
}

export default Hint
