
import { QuestionBuilder } from "../features/create-game"
import styles from "./CreateQuestions.module.css"

function QuizCreation() {
  return (
    <div
      style={{ width: "500px", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}
    >
      <div className={styles.questionContainer}>
        <QuestionBuilder />
      </div>
    </div>

  )
}

export default QuizCreation;



