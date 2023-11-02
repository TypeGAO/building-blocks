import styles from "./Console.module.css"

interface ConsoleProps {
  title: string
  content: string
}

function Console({ title, content }: ConsoleProps) {
  return (
    <div className={styles.console}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}

export default Console
