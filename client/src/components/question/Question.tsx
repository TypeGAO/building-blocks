import styles from "./Question.module.css"

interface QuestionProps {
  title: string
  description: string
}

function Question({ title, description }: QuestionProps) {
  return (
    <div className={styles.question}>
      <div className={styles.left}></div>
      <div className={styles.mid}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default Question
