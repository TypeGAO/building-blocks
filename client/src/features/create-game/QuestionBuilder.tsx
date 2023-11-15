// @ts-nocheck
import { useState } from "react"
import { useMutation } from "react-query"
import toast from "react-hot-toast"

import { Button, Input, Spinner, TextArea } from "../../components"
import { useNavigate } from "react-router-dom"
import { addQuestions, addQuestionSet } from "../../api"
import styles from "./styles.module.css"
import { Questions } from "../../types"
import { Editor } from "@monaco-editor/react"

const options = {
  selectOnLineNumbers: true,
  fontSize: 16,
  minimap: {
    enabled: false,
  },
  theme: {
    base: "vs",
    inherit: true,
    rules: [],
  },
}

function QuestionBuilder() {
  const [theQuestions, setTheQuestions] = useState<Questions[]>([
    {
      title: "",
      question: "",
      starter_code: "def <function_name>(n): # Don't change this line!\n    return 0",
      //Stores the cases for the output's mapping function
      test_cases_storage: [["", ""]],
      public_tests_storage: [["", ""]],
      //Stores the JSONB format that will be send to the database
      test_cases: { input: "", expected_output: "" },
      public_tests: { input: [], output: [] },
    },
  ])

  const navigate = useNavigate()

  const handleStarterCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newQuestions = [...theQuestions]
    const updatedQuestion = { ...newQuestions[index] }

    updatedQuestion.starter_code = e

    newQuestions[index] = updatedQuestion
    setTheQuestions(newQuestions)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    array_index: number = -1
  ) => {
    const { name, value } = e.target
    const newQuestions = [...theQuestions]
    const updatedQuestion = { ...newQuestions[index] }

    //'index' keeps track of which question inside 'theQuestions' we are editing
    //'array_index' keeps track of which test case inside either 'public_tests' or 'test_cases'
    if (array_index != -1) {
      if (name === "public_tests_input") {
        updatedQuestion.public_tests_storage[array_index][0] = value
      }
      if (name === "public_tests_output") {
        updatedQuestion.public_tests_storage[array_index][1] = value
      }

      if (name === "test_case_input") {
        updatedQuestion.test_cases_storage[array_index][0] = value
      }
      if (name === "test_case_output") {
        updatedQuestion.test_cases_storage[array_index][1] = value
      }

      updatedQuestion.public_tests.input[array_index] =
        updatedQuestion.public_tests_storage[array_index][0]
      updatedQuestion.public_tests.output[array_index] =
        updatedQuestion.public_tests_storage[array_index][1]

      //I know this is incredibly inefficient but I don't know a better way to handle it
      updatedQuestion.test_cases = { input: "", expected_output: "" }
      for (let i = 0; i < updatedQuestion.test_cases_storage.length; i++) {
        if (i != 0) {
          updatedQuestion.test_cases.input += "\n"
          updatedQuestion.test_cases.expected_output += "\n"
        }
        updatedQuestion.test_cases.input += ( "print(" + updatedQuestion.test_cases_storage[i][0] + ")" )
        updatedQuestion.test_cases.expected_output +=
          updatedQuestion.test_cases_storage[i][1]
      }
    } else {
      // Handle the rest of the cases dynamically
      if (Object.prototype.hasOwnProperty.call(updatedQuestion, name)) {
        ;(updatedQuestion as any)[name] = value
      }
    }

    newQuestions[index] = updatedQuestion
    setTheQuestions(newQuestions)
  }

  const anotherQuestion = () => {
    setTheQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        title: "",
        question: "",
        starter_code: "",
        test_cases_storage: [["", ""]],
        public_tests_storage: [["", ""]],
        test_cases: { input: "", expected_output: "" },
        public_tests: { input: [], output: [] },
      },
    ])
  }

  const anotherPublicTestCase = (index: number) => {
    setTheQuestions((prevQuestions) => {
      const updatedQuestions = JSON.parse(JSON.stringify(prevQuestions))
      const currentQuestion = updatedQuestions[index]
      currentQuestion.public_tests_storage.push(["", ""])
      return updatedQuestions
    })
  }

  const anotherPrivateTestCase = (index: number) => {
    setTheQuestions((prevQuestions) => {
      const updatedQuestions = JSON.parse(JSON.stringify(prevQuestions))
      const currentQuestion = updatedQuestions[index]
      currentQuestion.test_cases_storage.push(["", ""])
      return updatedQuestions
    })
  }

  const nextPage = async () => {
    // Bad code
    const question_set = JSON.parse(localStorage.getItem("questionSet"))
    const res = await addQuestionSet(question_set)
    await addQuestions(theQuestions.map((q: Questions) => {
      return {...q, 
               question_set_id: res.data.id
             }
    }))
    localStorage.clear()
    navigate(`/`)
  }

  return (
    <div>
      {theQuestions?.map((item: Questions, index) => (
        <div
          key={"question_" + index}
          className={styles.card}
          style={{ marginBottom: "var(--12)" }}
        >
          <div className={styles.inputGroup}>
            <span className={styles.fieldLabel}>Question #{index + 1}</span>
            <Input
              type="text"
              name="title"
              placeholder={"Question #" + (index + 1) + "s Title"}
              value={item.title}
              onChange={(e) => handleChange(e, index)}
            />
            <Input
              type="text"
              name="question"
              placeholder={"Question #" + (index + 1) + "s Description"}
              value={item.question}
              onChange={(e) => handleChange(e, index)}
            />
            <div
              style={{
                border: "var(--2) solid var(--neutral-200)",
                borderRadius: "var(--6)",
                padding: "var(--6)",
              }}
            >
              <Editor
                value={item.starter_code}
                height="300px"
                defaultValue={`def <function_name>(n): # Don't change this line!\n    return 0`}
                defaultLanguage="python"
                options={options}
                loading={<Spinner color="neutral" />}
                onChange={(e) => handleStarterCodeChange(e, index)}
              />
            </div>
          </div>
          {item.public_tests_storage?.map(
            (public_tests_item: [string, string], public_index) => (
              <div key={"public_" + public_index} className="publicContainer">
                <div className={styles.inputGroup}>
                  <span className={styles.fieldLabel}>
                    Public Test Case #{public_index + 1}
                  </span>
                  <Input
                    type="text"
                    name="public_tests_input"
                    placeholder={"Test Case Input #" + (index + 1)}
                    value={item.public_tests_storage[public_index][0]}
                    onChange={(e) => handleChange(e, index, public_index)}
                  />
                  <TextArea
                    rows={4}
                    type="text"
                    name="public_tests_output"
                    placeholder={"Test Case Output #" + (index + 1)}
                    value={item.public_tests_storage[public_index][1]}
                    onChange={(e) => handleChange(e, index, public_index)}
                  />
                </div>
              </div>
            )
          )}
          <Button
            size="md"
            onClick={() => {
              anotherPublicTestCase(index)
            }}
          >
            Add public test case
          </Button>
          {item.test_cases_storage?.map(
            (test_case_item: [string, string], test_index) => (
              <div key={"private_" + test_index} className="testContainer">
                <div
                  className={styles.inputGroup}
                  style={{ marginTop: "var(--24)" }}
                >
                  <span className={styles.fieldLabel}>
                    Private Test Case #{test_index + 1}
                  </span>
                  <Input
                    type="text"
                    name="test_case_input"
                    placeholder={"Test Case Input #" + (test_index + 1)}
                    value={item.test_cases_storage[test_index][0]}
                    onChange={(e) => handleChange(e, index, test_index)}
                  />
                  <TextArea
                    rows={4}
                    type="text"
                    name="test_case_output"
                    placeholder={"Test Case Output #" + (test_index + 1)}
                    value={item.test_cases_storage[test_index][1]}
                    onChange={(e) => handleChange(e, index, test_index)}
                  />
                </div>
              </div>
            )
          )}
          <Button
            size="md"
            onClick={() => {
              anotherPrivateTestCase(index)
            }}
          >
            Add private test case
          </Button>
        </div>
      ))}

      <div
        style={{
          marginTop: "var(--12)",
        }}
      >
        <Button size="lg" onClick={anotherQuestion}>
          Add Question
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "var(--12)",
        }}
      >
        <Button color="green" size="lg" onClick={nextPage}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default QuestionBuilder
