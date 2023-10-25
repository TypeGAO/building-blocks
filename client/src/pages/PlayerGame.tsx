import { Scene } from "../features/scene"
import styles from "./PlayerGame.module.css"

import useGameActivity from "../hooks/useGameActivity"
import { Player } from "../types"
import { RunCodeButton } from "../features/run-code"

function PlayerGame() {
  const { gameActivity } = useGameActivity()

  return (
    <div className={styles.container}>
      <div className={styles.col}>question col</div>
      <div className={styles.col}>
        editor + output col
        <div>
          <h2>
            Question:{" "}
            {gameActivity.players.find(
              (player: Player) =>
                player.nickname === gameActivity.nickname &&
                player.roomId === gameActivity.roomId
            )?.currentQuestion ?? 0}
          </h2>
          <RunCodeButton code={"print('howdy world')"} />
        </div>
      </div>
      <div className={styles.col}>
        <Scene />
      </div>
    </div>
  )
}

export default PlayerGame
