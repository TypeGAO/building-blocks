import { Scene } from "../features/scene"
import styles from "./PlayerGame.module.css"
import ConfettiExplosion from "react-confetti-explosion"

import useGameActivity from "../hooks/useGameActivity"
import { Code } from "../features/code"
import { GameHeader } from "../features/game-header"
import { Question } from "../features/question"
import { Hint } from "../features/hint"

interface PlayerGameProps {
  isDone?: boolean
}

function PlayerGame({ isDone }: PlayerGameProps) {
  const { currentPlayer } = useGameActivity()

  return (
    <>
      <GameHeader />

      {isDone && (
        <div className={styles.confetti}>
          <ConfettiExplosion />
        </div>
      )}

      <div className={styles.container}>
        {!isDone && (
          <>
            <div className={styles.col}>
              <Question questionId={currentPlayer.currentQuestionId} />
              <div className={styles.hintContainer}>
                <Hint />
              </div>
            </div>
            <div className={styles.col}>
              <Code />
            </div>
          </>
        )}
        <div className={styles.col}>
          <Scene showCrane={isDone ? false : true} />
        </div>
      </div>
    </>
  )
}

export default PlayerGame
