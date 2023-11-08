import { Leaderboard } from "../features/leaderboard"
import { usePauseGame } from "../features/pause-game"
import styles from "./HostGame.module.css"
import {
  ArrowsOutSimple,
  ArrowsInSimple,
  Timer as TimerIcon,
  Pause,
  Play,
} from "@phosphor-icons/react"
import { HostControls } from "../components"
import useFullscreen from "../hooks/useFullScreen"
import { Timer } from "../features/timer"

interface HostGameProps {
  isPaused?: boolean
}

function HostGame({ isPaused }: HostGameProps) {
  const [isFullScreen, toggle] = useFullscreen()
  const { isGamePaused, pauseGame, unpauseGame } = usePauseGame()

  return (
    <div className={styles.game}>
      <div className={styles.top}>
        <div className={styles.topContent}>
          {isPaused ? (
            "Game Paused"
          ) : (
            <>
              <TimerIcon size={32} weight="fill" />
              <Timer />
            </>
          )}
        </div>
      </div>
      <div className={styles.controls}>
        <HostControls
          controls={[
            {
              icon: isFullScreen ? (
                <ArrowsInSimple size={24} />
              ) : (
                <ArrowsOutSimple size={24} />
              ),
              label: isFullScreen ? "Exit full screen" : "Enter full screen",
              onClick: toggle,
            },
            {
              icon: isGamePaused ? <Play size={24} /> : <Pause size={24} />,
              label: isGamePaused ? "Resume Game" : "Pause Game",
              onClick: isGamePaused ? unpauseGame : pauseGame,
            },
          ]}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.signContainer}>
          <div className={styles.sign}>Scoreboard</div>
        </div>
        <div className={styles.leaderboardContainer}>
          <div className={styles.leaderboard}>
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostGame
