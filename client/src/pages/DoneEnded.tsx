import styles from "./DoneEnded.module.css"

interface DoneEndedProps {
  title: string
}

function DoneEnded({ title }: DoneEndedProps) {
  return (
    <div className={styles.lobby}>
      <div className={styles.banner}>
        <div className={styles.bannerRight}>
          <h1 className={styles.bannerPin}>{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default DoneEnded
