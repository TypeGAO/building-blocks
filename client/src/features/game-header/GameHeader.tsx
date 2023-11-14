import { useQuery } from "react-query"
import { useEffect } from "react"

import { CoinAmount, ProgressBar } from "../../components"
import useGameActivity from "../../hooks/useGameActivity"
import styles from "./styles.module.css"
import { fetchQuestionSetLength } from "../../api"

function GameHeader() {
  const { gameActivity, currentPlayer } = useGameActivity()

  const { data: questionSetLength, refetch } = useQuery({
    queryKey: ["fetchQuestionSetLength"],
    queryFn: () => fetchQuestionSetLength(gameActivity.questionSetId),
  })

  const percentage: number =
    (currentPlayer.currentQuestion / questionSetLength) * 100

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.leftContainer}>
          {(gameActivity.stage === "started" ||
            gameActivity.stage === "paused" ||
            gameActivity.stage === "done") && (
            <>
              <div className={styles.leftItem}>
                <ProgressBar percentage={percentage} />
              </div>
              <div className={styles.leftItem}>
                <span>
                  <strong>{currentPlayer.currentQuestion}</strong>/
                  {questionSetLength} solved
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.mid}></div>
      <div className={styles.right}>
        <div className={styles.nickname}>{currentPlayer.nickname}</div>
        <div>
          <CoinAmount amount={currentPlayer.score} size="md" />
        </div>
      </div>
    </div>
  )
}

export default GameHeader
