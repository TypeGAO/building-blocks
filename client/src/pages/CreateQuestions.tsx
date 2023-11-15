import { useNavigate, useParams } from "react-router-dom"
import { QuestionBuilder } from "../features/create-game"
import styles from "./CreateQuestions.module.css"
import { Button, Header } from "../components"

function QuizCreation() {
  const { setId } = useParams()
  const navigate = useNavigate()

  return (
    <>
      <Header
        leftElement={
          <Button size="lg" onClick={() => navigate("/host/questions/create")}>
            Back
          </Button>
        }
      />
      <div
        style={{
          width: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
        }}
      >
        <div className={styles.questionContainer}>
          <QuestionBuilder />
        </div>
      </div>
    </>
  )
}

export default QuizCreation
