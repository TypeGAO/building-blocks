import { useContext } from "react"
import GameActivityContext from "../contexts/GameActivityProvider"

function useGameActivity() {
  const context = useContext(GameActivityContext)

  if (!context) {
    throw new Error(
      "useGameActivity must be used within a GameActivityProvider"
    )
  }

  return context
}

export default useGameActivity
