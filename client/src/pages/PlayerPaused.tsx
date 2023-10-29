import styles from "./PlayerPaused.module.css"
import { GameHeader } from "../components"
import { Pause } from "@phosphor-icons/react"

function PlayerPaused() {
  return (
    <>
      <GameHeader />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.icon}>
            <Pause size={42} weight="fill" color="var(--neutral-400)" />
          </div>
          <h1 className={styles.title}>Game Paused</h1>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              Don’t worry — the timer has stopped and your work is saved
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerPaused
