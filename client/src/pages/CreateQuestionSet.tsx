
import { QuestionSetBuilder } from "../features/create-game"


function QuestionSetCreation() {
  return (

    <div
    style={{ width: "1000px", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}
    >
      <div 
        className="QuestionSetCreation"
        style={{ display: "grid", width: "100%", gap: "var(--8)" }}
      >
        <QuestionSetBuilder />
      </div>
    </div>

  )
}

export default QuestionSetCreation;



