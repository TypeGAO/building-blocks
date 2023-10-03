import { useContext } from "react"
import GameActivityContext from "../contexts/GameActivityProvider"

function useGameActivity() {
  return useContext(GameActivityContext)
}

export default useGameActivity
