import { ProgressBar } from ".."
import useGameActivity from "../../hooks/useGameActivity"
import styles from "./GameHeader.module.css"

function GameHeader() {
  const { gameActivity } = useGameActivity()

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.leftContainer}>
          {gameActivity.stage === "started" && (
            <>
              <div className={styles.leftItem}>
                <ProgressBar percentage={0} />
              </div>
              <div className={styles.leftItem}>
                <span>
                  <strong>0</strong>/2 solved
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.mid}></div>
      <div className={styles.right}>
        <div className={styles.nickname}>{gameActivity.nickname}</div>
      </div>
    </div>
  )
}

export default GameHeader
