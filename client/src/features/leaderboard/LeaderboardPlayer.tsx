import { useEffect, useState } from "react"
import { CoinAmount, ProgressBar } from "../../components"
import styles from "./styles.module.css"

interface LeaderboardPlayerProps {
  rank?: number
  nickname: string
  score: number
  currentQuestion?: number
  questionSetLength?: number
  doneTime?: string
}

function LeaderboardPlayer({
  rank,
  nickname,
  score,
  questionSetLength,
  currentQuestion,
}: LeaderboardPlayerProps) {
  const [key, setKey] = useState(0)
  const [animationClass, setAnimationClass] = useState("")

  useEffect(() => {
    setKey((prevKey) => prevKey + 1) // update key to force remount

    if (rank !== undefined || currentQuestion !== undefined) {
      setAnimationClass("fade-in")

      const timer = setTimeout(() => {
        setAnimationClass("")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [rank, currentQuestion])

  const percentage: number =
    currentQuestion && questionSetLength
      ? (currentQuestion / questionSetLength) * 100
      : 0

  return (
    <div className={`${styles.player} ${styles[animationClass]}`} key={key}>
      <div className={styles.playerLeft}>
        {rank && (
          <div
            className={styles.playerRank}
            id={styles[`rank_${rank?.toString()}`]}
          >
            {rank}
          </div>
        )}
        <span className={styles.playerNickname}>{nickname}</span>
      </div>
      <div className={styles.playerRight}>
        <div className={styles.playerProgress}>
          {currentQuestion ? (
            <ProgressBar percentage={percentage} />
          ) : (
            <span className={styles.playerTime}></span>
          )}
        </div>
        <div>
          <CoinAmount amount={score} size="lg" />
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPlayer
