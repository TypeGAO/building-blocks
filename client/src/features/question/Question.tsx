import { useQuery } from "react-query"
import toast from "react-hot-toast"
import { fetchQuestion } from "../../api"
import QuestionItem from "./QuestionItem"
import useGameActivity from "../../hooks/useGameActivity"

interface QuestionProps {
  questionId: number
}

function Question({ questionId }: QuestionProps) {
  const { currentPlayer } = useGameActivity()

  const {
    data: question,
    isFetching: questionIsFetching,
    isLoading: questionIsLoading,
  } = useQuery({
    queryKey: ["fetchQuestion", questionId],
    queryFn: () => fetchQuestion(questionId),
    enabled: !!questionId,
    onError: () => {
      toast.error("Yikes. There was a problem preparing your question.")
    },
  })

  return (
    <QuestionItem
      currentQuestion={currentPlayer.currentQuestion + 1}
      title={question?.data.title}
      description={question?.data.question}
      isLoading={questionIsLoading || questionIsFetching}
      publicTests={question?.data.public_tests}
    />
  )
}

export default Question
