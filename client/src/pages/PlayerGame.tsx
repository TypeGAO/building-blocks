import { Scene } from "../features/scene"
import styles from "./PlayerGame.module.css"

import useGameActivity from "../hooks/useGameActivity"
import { Player } from "../types"
import { Code } from "../features/code"
import { GameHeader } from "../components"

function PlayerGame() {
  const { gameActivity } = useGameActivity()

  return (
    <>
      <GameHeader />
      <div className={styles.container}>
        <div className={styles.col}>question col</div>
        <div className={styles.col}>
          <Code />
          <h2>
            Question:{" "}
            {gameActivity.players.find(
              (player: Player) =>
                player.nickname === gameActivity.nickname &&
                player.roomId === gameActivity.roomId
            )?.currentQuestion ?? 0}
          </h2>
          <h2>
            Score:{" "}
            {gameActivity.players.find(
              (player: Player) =>
                player.nickname === gameActivity.nickname &&
                player.roomId === gameActivity.roomId
            )?.score ?? 0}
          </h2>
        </div>
        <div className={styles.col}>
          <Scene />
        </div>
      </div>
    </>
  )
}

export default PlayerGame
