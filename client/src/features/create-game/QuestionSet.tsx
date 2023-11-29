import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"
import styles from "./styles.module.css"

interface QuestionSetProps {
  title: string
  description: string
  id: number
  gradeLevel: number
  categories: [string] | null
}

function QuestionSet({
  title,
  description,
  id,
  gradeLevel,
  categories,
}: QuestionSetProps) {
  const { gameActivity } = useGameActivity()

  const handleClick = () => {
    socket.emit("setQuestionSet", gameActivity.roomId, id)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.key === "Enter" || e.key === " ") {
      handleClick()
    }
  }

  const gradeLevelText =
    gradeLevel <= 12 ? `${gradeLevel}th Grade` : `Higher Ed.`

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.questionSet}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      <span
        className={styles.questionSetGrade}
        id={styles[`grade_${gradeLevel}`]}
      >
        {gradeLevelText}
      </span>
      <h2 className={styles.questionSetTitle}>{title}</h2>
      <p className={styles.questionSetDesc}>{description}</p>
      <div className={styles.questionSetTagContainer}>
        {categories?.map((a: string, index) => {
          return (
            <span key={index} className={styles.questionSetTag}>
              {a}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionSet
