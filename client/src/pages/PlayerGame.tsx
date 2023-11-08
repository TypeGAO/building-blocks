import { Scene } from "../features/scene"
import styles from "./PlayerGame.module.css"

import useGameActivity from "../hooks/useGameActivity"
import { Code } from "../features/code"
import { GameHeader } from "../features/game-header"
import { Question } from "../features/question"
import { Hint } from "../features/hint"

function PlayerGame() {
  const { currentPlayer } = useGameActivity()

  return (
    <>
      <GameHeader />
      <div className={styles.container}>
        <div className={styles.col}>
          <Question questionId={currentPlayer.currentQuestionId} />
          <div className={styles.hintContainer}>
            <Hint />
          </div>
        </div>
        <div className={styles.col}>
          <Code />
        </div>
        <div className={styles.col}>
          <Scene />
        </div>
      </div>
    </>
  )
}

export default PlayerGame
