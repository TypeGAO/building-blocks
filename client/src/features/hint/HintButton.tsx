import { Button, SpinnerOverlay } from "../../components"
import CoinAmount from "../../components/coin-amount/CoinAmount"
import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"
import { useQuery } from "react-query"
import { fetchHint } from "../../api"
import toast from "react-hot-toast"
import useDelayedLoadingState from "../../hooks/useDelayedLoadingState"

function HintButton() {
  const { gameActivity, currentPlayer } = useGameActivity()

  const { isLoading, refetch } = useQuery({
    queryKey: ["fetchHint"],
    queryFn: () => fetchHint(currentPlayer.currentCode, "FIND ERROR"),
    enabled: false,
    onSuccess: () => {
      if (currentPlayer.score >= 150) {
        socket.emit("createHint", gameActivity.roomId, gameActivity.nickname)
      }
    },
    onError: () => {
      toast.error(
        "Oh no, there was a problem thinking of a hint. Please try again!"
      )
    },
  })

  const showSpinnerOverlay = useDelayedLoadingState(isLoading, 200)

  const handleClick = () => {
    if (currentPlayer.score >= 150) {
      refetch()
    } else {
      toast.error("Not Enough Coins!")
    }
  }

  return (
    <div>
      {showSpinnerOverlay && <SpinnerOverlay label="Thinking" />}
      <Button size="md" color="neutral" onClick={handleClick}>
        Hint <CoinAmount amount={150} size="sm" />
      </Button>
    </div>
  )
}

export default HintButton
