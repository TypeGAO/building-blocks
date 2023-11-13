import { useState } from "react"
import SelectQuestionSet from "./SelectQuestionSet"
import SelectGameTime from "./SelectGameTime"
import styles from "./styles.module.css"
import { Button } from "../../components"
import { Link } from "react-router-dom"

function CreateGame() {
  const [step, setStep] = useState<number>(0)

  if (step === 0) {
    return (
      <div className={styles.stepContainer} id={styles.timeStep}>
        <h1 className={styles.title}>Choose a game time</h1>
        <SelectGameTime setStep={setStep} />
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className={styles.stepContainer}>
        <h1 className={styles.title}>
          Next, choose a question set or{" "}
          <Link
            to="/host/questions/create"
            style={{
              color: "var(--neutral-950)",
              textDecoration: "none",
              borderBottom: "var(--4) dashed var(--blue-500)",
            }}
          >
            build a set
          </Link>
        </h1>
        <SelectQuestionSet />
      </div>
    )
  }
}

export default CreateGame
