import useGameActivity from "../hooks/useGameActivity"
import styles from "./HostLobby.module.css"
import { QuestionSet } from "../features/question-set"
import { fetchQuestionSets } from "../api"
import { useState } from "react"
import { useQuery } from "react-query"
import { SpinnerOverlay } from "../components"

function HostCreating() {
  const { gameActivity } = useGameActivity()
  const [time, setTime] = useState(600);

  const { 
      data: questionSets,
      isLoading: questionSetsLoading 
    } = useQuery({
    queryKey: ["fetchQuestionSets"],
    queryFn: () =>  fetchQuestionSets(),
    enabled: true,
    onError: () => {
      toast.error(
        "Oh no, there was a problem getting the question sets. Please try again!"
      )
    },
  })

  const handleChange = (e) => {
    setTime(e.target.value);
    socket.emit("setTime", gameActivity.roomId, e.target.value);
  };

  return (
    <div>
      <select value={time} onChange={handleChange}>
        <option value={300}>5 min</option>
        <option value={600}>10 min</option>
        <option value={1200}>20 min</option>
        <option value={1800}>30 min</option>
      </select>
      {questionSetsLoading && <SpinnerOverlay label="Loading" />}
      {
          questionSets?.data.map((a, index) => {
              return (
                  <QuestionSet title={a.title} description={a.description} grade_level={a.grade_level} categories={a.categories} id={a.id} />
              )
          })
      }
    </div>
  )
}

export default HostCreating
