import { PauseGameButton } from "../features/pause-game"
import useGameActivity from "../hooks/useGameActivity"
import { Player } from "../types"

function HostGame() {
  const { gameActivity } = useGameActivity()

  return (
    <div>
      <h1>Host View Game Started</h1>
      <ul>
        {gameActivity.players.map((player: Player) => (
          <li>
            {player.nickname}: {player.currentQuestion}
          </li>
        ))}
      </ul>
      <PauseGameButton />
    </div>
  )
}

export default HostGame
