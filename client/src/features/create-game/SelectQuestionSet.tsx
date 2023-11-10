import { useState } from "react"
import { useQuery } from "react-query"
import toast from "react-hot-toast"
import Skeleton from "react-loading-skeleton"

import { fetchQuestionSets } from "../../api"
import { QuestionSetItem } from "../../types"
import useDelayedLoadingState from "../../hooks/useDelayedLoadingState"
import { Input } from "../../components"
import QuestionSet from "./QuestionSet"
import styles from "./styles.module.css"

function SelectQuestionSet() {
  const [searchFilter, setSearchFilter] = useState<string>("")

  const { data: questionSets, isLoading: questionSetsIsLoading } = useQuery({
    queryKey: ["fetchQuestionSets"],
    queryFn: () => fetchQuestionSets(),
    enabled: true,
    onError: () => {
      toast.error(
        "There was a problem getting the question sets. Please try again!"
      )
    },
  })

  const showSkeleton = useDelayedLoadingState(questionSetsIsLoading, 200)

  const filteredQuestionSets = questionSets?.data.filter(
    (item: QuestionSetItem) => {
      const searchLowerCase = searchFilter.toLowerCase()
      return (
        item?.title?.toLowerCase().includes(searchLowerCase) ||
        item?.categories?.some(
          (category: string) =>
            category?.toLowerCase().includes(searchLowerCase)
        )
      )
    }
  )

  return (
    <>
      <Input
        type="text"
        placeholder="Search by set title or category"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />

      {filteredQuestionSets?.length === 0 && (
        <span className={styles.noResults}>
          Hmm.. Try narrowing your search or build your own set
        </span>
      )}

      <div className={styles.questionSetGrid}>
        {showSkeleton && (
          <>
            {Array.from({ length: 9 }, (_, index) => (
              <Skeleton key={index} height="200px" />
            ))}
          </>
        )}

        {filteredQuestionSets?.map((item: QuestionSetItem, index: number) => {
          return (
            <QuestionSet
              key={index}
              title={item.title}
              description={item.description}
              gradeLevel={item.grade_level}
              categories={item.categories}
              id={item.id}
            />
          )
        })}
      </div>
    </>
  )
}

export default SelectQuestionSet
