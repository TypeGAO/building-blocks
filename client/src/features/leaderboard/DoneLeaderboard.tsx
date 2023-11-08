import useGameActivity from "../../hooks/useGameActivity"
import { Player } from "../../types"
import LeaderboardPlayer from "./LeaderboardPlayer"

function DoneLeaderboard() {
  const { gameActivity } = useGameActivity()

  return (
    <>
      {gameActivity.players
        .filter((p: Player) => {
          return p.doneTime != ""
        })
        .sort((a, b) => {
          const doneTimeA = new Date(a.doneTime).getTime()
          const doneTimeB = new Date(b.doneTime).getTime()
          return doneTimeA - doneTimeB
        })
        .map((player: Player, index) => (
          <LeaderboardPlayer
            rank={index + 1}
            nickname={player.nickname}
            doneTime={player.doneTime}
            score={player.score}
            key={index}
          />
        ))}
    </>
  )
}

export default DoneLeaderboard
