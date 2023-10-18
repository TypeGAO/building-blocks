import useGameActivity from "../../hooks/useGameActivity"
import styles from "./GameHeader.module.css"

function GameHeader() {
  const { gameActivity } = useGameActivity()

  return (
    <div className={styles.header}>
      <div className={styles.left}></div>
      <div className={styles.mid}></div>
      <div className={styles.right}>
        <div className={styles.nickname}>{gameActivity.nickname}</div>
      </div>
    </div>
  )
}

export default GameHeader
