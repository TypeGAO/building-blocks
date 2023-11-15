import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import toast from "react-hot-toast"
import { Button, Input, Spinner } from "../../components"
import { useNavigate } from "react-router-dom"
import { fetchCategories } from "../../api"
import styles from "./styles.module.css"
import { QuestionSet } from "../../types"
import { Categories } from "../../types"

function QuestionSetBuilder() {
  const [question_set, setQuestionSet] = useState<QuestionSet>({
    title: "",
    description: "",
    grade_level: 0,
    categories: [],
  })

  const {
    data: inputCategories,
    isFetching: categoriesIsFetching,
    isLoading: categoriesIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    onError: () => {
      toast.error("Unable to load categories")
    },
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    if (type === "radio") {
      const newValue = name === "grade_level" ? parseInt(value, 10) : value
      setQuestionSet({ ...question_set, [name]: newValue })
    } else if (type === "checkbox" && name === "categories") {
      if (checked) {
        setQuestionSet({
          ...question_set,
          [name]: [...question_set.categories, value],
        })
      } else {
        setQuestionSet({
          ...question_set,
          [name]: question_set.categories.filter(
            (category) => category !== value
          ),
        })
      }
    } else {
      setQuestionSet({ ...question_set, [name]: value })
    }
  }

  const handleClick = () => {
    // Bad code
    let questionSetString = JSON.stringify(question_set)
    localStorage.setItem("questionSet", questionSetString)
    navigate(`/host/questions/add`)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={question_set.title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={question_set.description}
          onChange={handleChange}
        />
      </div>
      <div className={styles.card}>
        <h2 className={styles.formHeading}>Choose a grade level</h2>

        {[8, 9, 10, 11, 12, 13].map((grade) => (
          <div className={styles.selection}>
            <input
              type="radio"
              name="grade_level"
              value={grade.toString()}
              checked={question_set.grade_level === grade}
              onChange={handleChange}
            />
            <label key={grade} htmlFor="grade_level">
              {grade === 13 ? "University" : `${grade}th`}
            </label>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <h2 className={styles.formHeading}>Concepts</h2>
        {!categoriesIsLoading || !categoriesIsFetching ? (
          inputCategories?.data.map((item: Categories) => (
            <div key={item.id} className={styles.selection}>
              <label>{item.category}</label>
              <input
                type="checkbox"
                name="categories"
                value={item.category}
                checked={question_set.categories.includes(item.category)}
                onChange={handleChange}
              />
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>

      <div>
        <Button color="green" size="lg" onClick={handleClick}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default QuestionSetBuilder
