import { Scene } from "../features/scene"
import styles from "./PlayerGame.module.css"

import useGameActivity from "../hooks/useGameActivity"
import { Code } from "../features/code"
import { GameHeader } from "../components"
import { Question } from "../features/question"
import { HintButton } from "../features/hint"

function PlayerGame() {
  const { currentPlayer } = useGameActivity()

  return (
    <>
      <GameHeader />
      <div className={styles.container}>
        <div className={styles.col}>
          <Question questionId={currentPlayer.currentQuestionId}/>
          <HintButton />
        </div>
        <div className={styles.col}>
          <Code />
          <h2>Question: {currentPlayer?.currentQuestion ?? 0}</h2>
          <h2>Score: {currentPlayer?.score ?? 0} </h2>
        </div>
        <div className={styles.col}>
          <Scene />
        </div>
      </div>
    </>
  )
}

export default PlayerGame
