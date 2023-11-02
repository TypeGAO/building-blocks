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
  const { gameActivity, currentPlayer } = useGameActivity()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const { isLoading } = useQuery({
    queryKey: ["fetchHint", isSubmitted],
    queryFn: async () => {
      if (currentPlayer.score >= 150) {
        const question = await fetchQuestion(currentPlayer.currentQuestionId)
        const res = await fetchHint(
          currentPlayer.currentCode,
          question.data.question
        )
        toast.error(res.data)
      } else {
        toast.error("Not Enough Coins!")
      }
    },
    enabled: !!isSubmitted,
    retry: 0,
    onSuccess: () => {
      if (currentPlayer.score >= 150) {
        socket.emit(
          "createHint",
          gameActivity.roomId,
          gameActivity.nickname,
          gameActivity
        )
      }
      setIsSubmitted(false)
    },
    onError: () => {
      toast.error(
        "Oh no, there was a problem thinking of a hint. Please try again!"
      )
    },
  })

  const showSpinnerOverlay = useDelayedLoadingState(isLoading, 200)

  const handleClick = () => {
    setIsSubmitted(true)
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
