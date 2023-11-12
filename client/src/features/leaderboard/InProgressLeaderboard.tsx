import { useQuery } from "react-query"
import useGameActivity from "../../hooks/useGameActivity"
import { Player } from "../../types"
import LeaderboardPlayer from "./LeaderboardPlayer"
import { fetchQuestionSetLength } from "../../api"

function InProgressLeaderboard() {
  const { gameActivity } = useGameActivity()

  const { data: questionSetLength } = useQuery({
    queryKey: ["fetchQuestionSetLength"],
    queryFn: () => fetchQuestionSetLength(gameActivity.questionSetId),
  })

  return (
    <>
      {gameActivity.players
        .sort((a, b) => {
          return a.currentQuestion - b.currentQuestion
        })
        .reverse()
        .filter((p: Player) => {
          return p.doneTime == ""
        })
        .map((player: Player, index) => (
          <LeaderboardPlayer
            nickname={player.nickname}
            currentQuestion={player.currentQuestion}
            questionSetLength={questionSetLength}
            score={player.score}
            key={index}
          />
        ))}
    </>
  )
}

export default InProgressLeaderboard
