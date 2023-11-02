import { useQuery } from "react-query"
import toast from "react-hot-toast"
import { fetchQuestion } from "../../api"
import { Question as QuestionComponent } from "../../components"

interface QuestionProps {
  questionId: number
}

function Question({ questionId }: QuestionProps) {
  const { data: question } = useQuery({
    queryKey: ["fetchQuestion", questionId],
    queryFn: () => fetchQuestion(questionId),
    enabled: !!questionId,
    onError: () => {
      toast.error("Yikes. There was a problem preparing your question.")
    },
  })

  return (
    <QuestionComponent
      title={question?.data.title}
      description={question?.data.question}
    />
  )
}

export default Question
