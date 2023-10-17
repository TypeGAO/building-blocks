import { useContext } from "react"
import GameActivityContext from "../contexts/GameActivityProvider"

/**
 * Custom hook to access the GameActivityContext and retrieve its values.
 *
 * Example usage:
 *
 * ```jsx
 * const { gameActivity, setGameActivity } = useGameActivity();
 *
 * // Use the gameActivity state and setGameActivity method within your component
 * ```
 */
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
