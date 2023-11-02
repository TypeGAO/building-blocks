import { Question as QuestionComponent } from "../../components"
import { useState } from "react"
import { useQuery } from "react-query"
import { useEffect } from "react"
import { fetchQuestion } from "../../api"
import toast from "react-hot-toast"

interface QuestionProps {
    questionId: number
}

function Question({ questionId }: QuestionProps) {
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const { data, refetch } = useQuery({
    queryKey: ["fetchQuestion"],
    queryFn: async () => {
      const question = await fetchQuestion(questionId);
      setTitle(question.data.title);
      setDesc(question.data.question);
    },
    retry: 0,
    onError: () => {
      toast.error("Error Getting Question")
    },
  })
  useEffect(() => {
      refetch();
  }, [questionId]);

  return (
    <QuestionComponent
      title={ title }
      description={ desc }
    />
  )
}

export default Question
