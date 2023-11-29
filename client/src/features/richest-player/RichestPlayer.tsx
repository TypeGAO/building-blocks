import useGameActivity from "../../hooks/useGameActivity"
import { Player } from "../../types"

function RichestPlayer() {
  const { gameActivity } = useGameActivity()

  return (
    <>
      {
        gameActivity.players
          .sort((a, b) => {
            return a.score - b.score
          })
          .reverse()
          .map((p: Player) => {
            return (
              <p>
                {p.nickname}: {p.score} coins
              </p>
            )
          })[0]
      }
    </>
  )
}

export default RichestPlayer
