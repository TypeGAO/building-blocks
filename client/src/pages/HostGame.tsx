import { PauseGameButton } from "../features/pause-game"
import { StartGameButton } from "../features/start-game"
import useGameActivity from "../hooks/useGameActivity"
import { Player } from "../types"

interface HostGameProps {
  isPaused?: boolean
}

function HostGame({ isPaused }: HostGameProps) {
  const { gameActivity } = useGameActivity()

  return (
    <div>
      <h1>Host View Game Started</h1>
      {isPaused && "GAME PAUSED"}
      <ul>
        {gameActivity.players.map((player: Player, index) => (
          <li key={index}>
            {player.nickname}: {player.currentQuestion}
          </li>
        ))}
      </ul>
      <PauseGameButton />
      {isPaused && <StartGameButton />}
    </div>
  )
}

export default HostGame
