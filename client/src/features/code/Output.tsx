import { Console } from "../../components"
import useGameActivity from "../../hooks/useGameActivity"

function Output() {
  const { currentPlayer } = useGameActivity()

  return <Console title="Computer" content={currentPlayer.lastOutput} />
}

export default Output
