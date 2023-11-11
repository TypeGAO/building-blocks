
import { useParams } from "react-router-dom";
import { QuestionBuilder } from "../features/create-game"
import styles from "./CreateQuestions.module.css"


function QuizCreation() {
  const { setId } = useParams()

  return (
    <div
      style={{ width: "500px", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}
    >
      <div className={styles.questionContainer}>
        <QuestionBuilder setId={setId} />
      </div>
    </div>

  )
}

export default QuizCreation;



