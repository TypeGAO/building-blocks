import { useState } from "react"
import { Button, Input } from "../../../components"

function QuestionBuilder() {
  const [questions, setQuestions] = useState([{
    ques: '',
    desc: ''
  }
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newQuestions = [...questions];
    const updatedQuestion = { ...newQuestions[index] };


    if (e.target.name === "ques") {
      updatedQuestion.ques = e.target.value;
    }

    if (e.target.name === "desc") {
      updatedQuestion.desc = e.target.value;
    }

    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  }

  const handleClick = () => {
    setQuestions([...questions, { ques: "", desc: "" }]);
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <Input
            type="text"
            name="ques"
            placeholder="Question"
            value={question.ques}
            onChange={(e) => handleChange(e, index)}
          />
          <Input
            type="text"
            name="desc"
            placeholder="Description"
            value={question.desc}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <Button color="green" size="lg" onClick={handleClick}>
        Add Another Question
      </Button>
    </div>
  )
}

export default QuestionBuilder
