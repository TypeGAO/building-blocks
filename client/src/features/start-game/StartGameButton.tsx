import { Button } from "../../components"
import { socket } from "../../socket"
import { startGame } from "../../api"
import toast from "react-hot-toast"
import useGameActivity from "../../hooks/useGameActivity"
import { useQuery } from "react-query"

function StartGameButton() {
  const { gameActivity } = useGameActivity()

  const { isLoading, refetch } = useQuery({
    queryKey: ["startGame", gameActivity.roomId],
    queryFn: () => {
      if (gameActivity.roomId) {
        startGame(gameActivity.roomId)
      }
    },
    enabled: false,
    onSuccess: () => {
      socket.emit("startGame", gameActivity.roomId, gameActivity.time)
    },
    onError: () => {
      toast.error(
        "Oh no, there was a problem starting the game. Please try again!"
      )
    },
  })

  const handleClick = async () => {
    if (gameActivity.players.length === 0) {
      toast.error("Lobby is empty!")
      return
    }
    refetch()
  }

  return (
    <Button size="lg" onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Starting" : "Start"}
    </Button>
  )
}

export default StartGameButton
