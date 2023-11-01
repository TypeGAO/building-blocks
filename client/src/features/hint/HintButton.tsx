import { Button, SpinnerOverlay } from "../../components"
import CoinAmount from "../../components/coin-amount/CoinAmount"
import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"
import { useQuery } from "react-query"
import { useState } from "react"
import { fetchHint, fetchQuestion } from "../../api"
import toast from "react-hot-toast"
import useDelayedLoadingState from "../../hooks/useDelayedLoadingState"

function HintButton() {
  const { gameActivity, setGameActivity, currentPlayer } = useGameActivity()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleClick = () => {
    setIsSubmitted(true);
  }

  const { isLoading } = useQuery({
    queryKey: ["fetchHint", isSubmitted],
    queryFn: async () => {
        if (currentPlayer.score >= 150) {
            const question = await fetchQuestion(currentPlayer.currentQuestionId);
            const res = await fetchHint(currentPlayer.currentCode, question.data.question)
            toast.error(res.data)
        } else {
          toast.error("Not Enough Coins!")
        }
    },
    enabled: !!isSubmitted,
    retry: 0,
    onSuccess: (data) => {
      if (currentPlayer.score >= 150) {
          socket.emit("createHint", gameActivity.roomId, gameActivity.nickname)
      } 
      setIsSubmitted(false)
    },
    onError: () => {
      toast.error("Error Getting Hint")
      setIsSubmitted(false)
    },
  })

  const showSpinnerOverlay = useDelayedLoadingState(isLoading, 200)

  return (
    <div>
      {showSpinnerOverlay && <SpinnerOverlay label="Connecting" />}
      <Button size="md" color="neutral" onClick={handleClick}>
          Hint <CoinAmount amount={150} size="sm" />
      </Button>
    </div>
  )
}

export default HintButton
