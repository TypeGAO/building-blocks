import { Button } from "../../components"
import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"

interface QuestionSetProps {
  title: string
  description: string
  id: number
  grade_level: number
  categories: [string] | null
}

function QuestionSet({
  title,
  description,
  id,
  grade_level,
  categories,
}: QuestionSetProps) {
  const { gameActivity } = useGameActivity()

  const handleClick = () => {
    socket.emit("setQuestionSet", gameActivity.roomId, id)
  }

  return (
    <Button size="lg" color="blue" onClick={handleClick}>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <b>{grade_level}</b>
      {categories?.map((a: string, index) => {
        return <p key={index}>{a}</p>
      })}
    </Button>
  )
}

export default QuestionSet
