import { ProgressBar } from ".."
import useGameActivity from "../../hooks/useGameActivity"
import styles from "./GameHeader.module.css"
import { useState } from "react"
import { useQuery } from "react-query"
import toast from "react-hot-toast"
import { fetchQuestionSetLength } from "../../api"

function GameHeader() {
  const { gameActivity, currentPlayer } = useGameActivity()
  const [questionSetLength, setQuestionSetLength] = useState<number>(null)
  const { data } = useQuery({
    queryKey: ["fetchQuestionSetLength"],
    queryFn: async () => {
      const questionSetLength = await fetchQuestionSetLength(gameActivity.questionSetId);
      setQuestionSetLength(questionSetLength);
    },
    retry: 0,
  })

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.leftContainer}>
          {gameActivity.stage === "started" && (
            <>
              <div className={styles.leftItem}>
                <ProgressBar percentage={currentPlayer.currentQuestion / questionSetLength * 100} />
              </div>
              <div className={styles.leftItem}>
                <span>
                  <strong>{currentPlayer.currentQuestion}</strong>/{questionSetLength} solved
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
