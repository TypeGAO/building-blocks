import { useState, useEffect } from 'react';
import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"

function Timer() {
  const { gameActivity, setGameActivity }  = useGameActivity()
  const [timeLeft, setTimeLeft] = useState(gameActivity.time)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      setGameActivity({
          ...gameActivity,
          time: timeLeft - 1
      })
    }, 1000)

    if (timeLeft === 0) {
      socket.emit("endGame", gameActivity.roomId);
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <span>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  )
}

export default Timer
