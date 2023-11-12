import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./styles.module.css"
import useDelayedLoadingState from "../../hooks/useDelayedLoadingState"
import { Tabs, Tab } from "../../components"

interface PublicTest {
  input: [any]
  output: [any]
}

interface QuestionProps {
  currentQuestion: number
  title: string
  description: string
  isLoading: boolean
  publicTests: PublicTest
}

function QuestionItem({
  currentQuestion,
  title,
  description,
  isLoading,
  publicTests,
}: QuestionProps) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1) // update key to force remount
  }, [currentQuestion])

  const showSkeleton = useDelayedLoadingState(isLoading, 200)

  if (showSkeleton) {
    return (
      <div style={{ marginTop: "var(--36)" }}>
        <Skeleton height="var(--28)" width="70%" />
        <Skeleton count={4} height="var(--28)" width="100%" />
      </div>
    )
  }

  return (
    <div key={key} className={styles.question}>
      <div className={`${styles.sign} ${styles.slideDown}`}>
        Challenge #{currentQuestion}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.testcasesContainer}>
        {publicTests && (
          <Tabs>
            {publicTests?.input.map((item, index) => {
              return (
                <Tab label={`Example ${index + 1}`}>
                  <div className={styles.testcases}>
                    <span className={styles.ioLabel}>Input</span>
                    <div className={styles.io}>{item}</div>
                    <span className={styles.ioLabel}>Output</span>
                    <div className={styles.io}>
                      {publicTests?.output[index]}
                    </div>
                  </div>
                </Tab>
              )
            })}
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default QuestionItem
