import useGameActivity from "../../../hooks/useGameActivity"
import EnterNickname from "./EnterNickname"
import EnterPin from "./EnterPin"

function EnterGame() {
  const { gameActivity } = useGameActivity()

  if (gameActivity.roomId) {
    return <EnterNickname />
  }

  return <EnterPin />
}

export default EnterGame