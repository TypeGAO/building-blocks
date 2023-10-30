import styles from "./Console.module.css"

interface ConsoleProps {
  title: string
  content: string
}

function Console({ title, content }: ConsoleProps) {
  return (
    <div className={styles.console}>
      <div className={styles.left}></div>
      <div className={styles.mid}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default Console
