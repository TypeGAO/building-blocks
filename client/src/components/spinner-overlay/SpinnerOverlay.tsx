import { Spinner } from ".."
import styles from "./SpinnerOverlay.module.css"

interface SpinnerOverlayProps {
  label?: string
}

function SpinnerOverlay({ label }: SpinnerOverlayProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <div>
          <Spinner size="lg" color="inverse" />
        </div>
        <div>{label}</div>
      </div>
    </div>
  )
}

export default SpinnerOverlay
