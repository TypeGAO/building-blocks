import useGameActivity from "../hooks/useGameActivity"
import styles from "./HostLobby.module.css"

function HostLobby() {
  const { gameActivity } = useGameActivity()

  const playerCount: number = gameActivity.players.length

  return (
    <div className={styles.lobby}>
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <h2 className={styles.bannerLabel}>
            Join at <span className={styles.bannerUrl}>_url_</span>
            <span style={{ display: "block" }}>with Game PIN:</span>
          </h2>
        </div>
        <div className={styles.bannerRight}>
          <h1 className={styles.bannerPin}>{gameActivity.roomId}</h1>
        </div>
      </div>
      <div className={styles.playerList}>
        {playerCount === 0 && (
          <div className={styles.empty}>Waiting on players</div>
        )}

        {[...gameActivity.players].reverse().map((player, index) => (
          <div
            key={player.nickname}
            className={`${styles.player} ${index === 0 && styles.playerAnimate
              }`}
          >
            {player.nickname}
          </div>
        ))}
      </div>
      playerCount : {playerCount}
    </div>
  )
}

export default HostLobby
