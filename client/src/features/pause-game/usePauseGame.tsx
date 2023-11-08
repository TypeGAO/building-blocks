import { useState } from "react"
import useGameActivity from "../../hooks/useGameActivity"
import { socket } from "../../socket"

function usePauseGame() {
  const { gameActivity } = useGameActivity()
  const [isGamePaused, setIsGamePaused] = useState(false)

  const pauseGame = () => {
    socket.emit("pauseGame", gameActivity.roomId)
    setIsGamePaused(true)
  }

  const unpauseGame = () => {
    socket.emit("startGame", gameActivity.roomId)
    setIsGamePaused(false)
  }

  return { isGamePaused, pauseGame, unpauseGame }
}

export default usePauseGame
