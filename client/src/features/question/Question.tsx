import { useQuery } from "react-query"
import toast from "react-hot-toast"
import { fetchQuestion } from "../../api"
import { Question as QuestionComponent } from "../../components"
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
    <QuestionComponent
      currentQuestion={currentPlayer.currentQuestion + 1}
      title={question?.data.title}
      description={question?.data.question}
      isLoading={questionIsLoading || questionIsFetching}
    />
  )
}

export default Question
