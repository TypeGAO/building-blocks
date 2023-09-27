import styles from "./ProgressBar.module.css"

interface ProgressBarProps {
  percentage: number
}

function ProgressBar({ percentage }: ProgressBarProps) {
  percentage = percentage > 100 ? 100 : percentage

  const borderRadius =
    percentage === 100 ? "var(--112)" : "var(--112) 0 0 var(--112)"

  return (
    <div className={styles.progressbar}>
      <div
        className={styles.progress}
        style={{
          width: `${percentage}%`,
          borderRadius: borderRadius,
        }}
      ></div>
    </div>
  )
}

export default ProgressBar
