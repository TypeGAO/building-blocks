import styles from "./Spinner.module.css"

interface SpinnerProps {
  color?: "neutral" | "inverse" | "blue"
  size?: "sm" | "md" | "lg"
}

function Spinner({ color = "neutral", size = "md" }: SpinnerProps) {
  return (
    <div className={`${styles.spinner} ${styles[color]} ${styles[size]}`}></div>
  )
}

export default Spinner
