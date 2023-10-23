import { ArrowsOutSimple, ArrowsInSimple } from "@phosphor-icons/react"
import { Button, HostControls } from "../components"
import useGameActivity from "../hooks/useGameActivity"
import styles from "./HostLobby.module.css"
import { StartGameButton } from "../features/start-game"
import useFullscreen from "../hooks/useFullScreen"
import { DEV_URL, PROD_URL } from "../constants"

function getJoinUrl() {
  let url = import.meta.env.DEV ? DEV_URL : PROD_URL
  url = url.replace(/^http:\/\//, "www.")
  return url
}

function HostLobby() {
  const { gameActivity } = useGameActivity()
  const [isFullScreen, toggle] = useFullscreen()

  const playerCount: number = gameActivity.players.length

  return (
    <div className={styles.lobby}>
      <div className={styles.controls}>
        <HostControls
          controls={[
            {
              icon: isFullScreen ? (
                <ArrowsInSimple size={24} weight="fill" />
              ) : (
                <ArrowsOutSimple size={24} weight="fill" />
              ),
              label: isFullScreen ? "Exit full screen" : "Enter full screen",
              onClick: toggle,
            },
          ]}
        />
      </div>
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <h2 className={styles.bannerLabel}>
            Join at <span className={styles.bannerUrl}>{getJoinUrl()}</span>
            <span style={{ display: "block" }}>with Game PIN:</span>
          </h2>
        </div>
        <div className={styles.bannerRight}>
          <h1 className={styles.bannerPin}>{gameActivity.roomId}</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.playerCountStart}>
          {playerCount === 0 ? (
            "Waiting for players"
          ) : (
            <>
              <span>
                {playerCount} {playerCount === 1 ? "player" : "players"}
              </span>
              <StartGameButton roomId={gameActivity.roomId} players={gameActivity.players.length}/>
            </>
          )}
        </div>
        <div className={styles.playerList}>
          {[...gameActivity.players].reverse().map((player, index) => (
            <div
              key={player.nickname}
              className={`${styles.player} ${
                index === 0 && styles.playerAnimate
              }`}
            >
              {player.nickname}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HostLobby
