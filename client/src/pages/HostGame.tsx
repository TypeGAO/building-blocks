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
      {isPaused && "GAME PAUSED"}
      {!isPaused && <PauseGameButton />}
      {isPaused && <StartGameButton />}
      <h1>Leaderboard</h1>
      <h2>Done</h2>
      <ul>
        {gameActivity.players.filter((p: Player) => {
            return p.doneTime != "";
        }).sort((a, b) => {
          let doneTimeA = new Date(a.doneTime).getTime();
          let doneTimeB = new Date(b.doneTime).getTime();
          return doneTimeA - doneTimeB;
        }).map((player: Player, index) => (
              <li key={index}>
                <b>{index+1}. </b>{player.nickname}: {player.doneTime}, {player.score} coins
              </li>
            ))}
      </ul>
      <h2>In Progress</h2>
      <ul>
        {gameActivity.players.sort((a,b) => {
            return a.currentQuestion - b.currentQuestion
        }).reverse().filter((p: Player) => {
            return p.doneTime == "";
        }).map((player: Player, index) => (
              <li key={index}>
                {player.nickname}: {player.currentQuestion}
              </li>
          ))
        }
      </ul>
      <h2>Richest: </h2>
      <b>{gameActivity.players.sort((a, b) => {
              return a.score - b.score
          }).reverse().map((p: Player) => {
              return <p>{p.nickname}: {p.score} coins</p>
          })[0]}
      </b>
    </div>
  )
}

export default HostGame
