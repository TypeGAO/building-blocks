import { Button, SpinnerOverlay } from "../../components"
import CoinAmount from "../../components/coin-amount/CoinAmount"
import { socket } from "../../socket"
import useGameActivity from "../../hooks/useGameActivity"
import { useQuery } from "react-query"
import { useState } from "react"
import { fetchHint, fetchQuestion } from "../../api"
import toast from "react-hot-toast"

interface HintButtonProps {
  setHint: React.Dispatch<React.SetStateAction<string>>
}

function HintButton({ setHint }: HintButtonProps) {
  const { gameActivity, currentPlayer } = useGameActivity()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const { isLoading: hintIsLoading } = useQuery({
    queryKey: ["fetchHint", isSubmitted],
    queryFn: async () => {
      if (currentPlayer.score >= 150) {
        const question = await fetchQuestion(currentPlayer.currentQuestionId)
        const res = await fetchHint(
          currentPlayer.currentCode,
          question.data.question
        )
        setHint(res.data)
      } else {
        toast.error("Not Enough Coins!")
      }
    },
    enabled: !!isSubmitted,
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

  const handleClick = () => {
    setIsSubmitted(true)
  }

  return (
    <div>
      {hintIsLoading && <SpinnerOverlay label="Thinking" />}
      <Button
        size="md"
        color="neutral"
        onClick={handleClick}
        disabled={isSubmitted}
      >
        Hint <CoinAmount amount={150} size="sm" />
      </Button>
    </div>
  )
}

export default HintButton
