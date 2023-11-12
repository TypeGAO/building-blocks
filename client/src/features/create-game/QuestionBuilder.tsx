import { useState } from "react"
import { useMutation } from "react-query"
import toast from "react-hot-toast"

import { Button, Input } from "../../components"
import { useNavigate } from "react-router-dom";
import { addQuestions } from "../../api"

import { Questions } from "../../types";


interface QuestionSetIDProps {
  setId: string
}

function QuestionBuilder({ setId }: QuestionSetIDProps) {
  const [theQuestions, setTheQuestions] = useState<Questions[]>([{
    title: "",
    question: "",
    starter_code: "",
    //Stores the cases for the output's mapping function
    test_cases_storage: [["", ""]],
    public_tests_storage: [["", ""]],
    //Stores the JSONB format that will be send to the database
    test_cases: { input: "", expected_output: "" },
    public_tests: { input: [], output: [] },
    question_set_id: parseInt(setId, 10),
  }])

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (theQuestions: Questions[]) => addQuestions(theQuestions),

    onSuccess: (res) => {
      navigate(`/TODO`)
    },
    onError: () => {
      toast.error("Can't send the data")
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, array_index: number = -1) => {
    const { name, value } = e.target;
    const newQuestions = [...theQuestions];
    const updatedQuestion = { ...newQuestions[index] };

    //'index' keeps track of which question inside 'theQuestions' we are editing
    //'array_index' keeps track of which test case inside either 'public_tests' or 'test_cases' 
    if (array_index != -1) {
      if (name === "public_tests_input") {
        updatedQuestion.public_tests_storage[array_index][0] = value;
      }
      if (name === "public_tests_output") {
        updatedQuestion.public_tests_storage[array_index][1] = value;
      }

      if (name === "test_case_input") {
        updatedQuestion.test_cases_storage[array_index][0] = value;
      }
      if (name === "test_case_output") {
        updatedQuestion.test_cases_storage[array_index][1] = value;
      }

      updatedQuestion.public_tests.input[array_index] = updatedQuestion.public_tests_storage[array_index][0];
      updatedQuestion.public_tests.output[array_index] = updatedQuestion.public_tests_storage[array_index][1];

      //I know this is incredibly inefficient but I don't know a better way to handle it
      updatedQuestion.test_cases = { input: "", expected_output: "" };
      for (let i = 0; i < updatedQuestion.test_cases_storage.length; i++) {
        if (i != 0) {
          updatedQuestion.test_cases.input += "\n";
          updatedQuestion.test_cases.expected_output += "\n";
        }
        updatedQuestion.test_cases.input += updatedQuestion.test_cases_storage[i][0];
        updatedQuestion.test_cases.expected_output += updatedQuestion.test_cases_storage[i][1];
      }

    }
    else {
      // Handle the rest of the cases dynamically
      if (Object.prototype.hasOwnProperty.call(updatedQuestion, name)) {
        (updatedQuestion as any)[name] = value
      }
    }


    newQuestions[index] = updatedQuestion;
    setTheQuestions(newQuestions);
  };


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
        question_set_id: parseInt(setId, 10),
      },
    ]);
  };

  const anotherPublicTestCase = (index: number) => {
    setTheQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[index];
      currentQuestion.public_tests_storage.push(["", ""]);
      return updatedQuestions;
    });
  };

  const anotherPrivateTestCase = (index: number) => {
    setTheQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[index];
      currentQuestion.test_cases_storage.push(["", ""]);
      return updatedQuestions;
    });
  };


  const nextPage = () => {
    mutate(theQuestions);
  }

  return (
    <div>
      {theQuestions?.map((item: Questions, index) => (
        <div key={"question_" + index} className="questionContainer">
          Question #{index + 1}
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
          <Input
            type="text"
            name="starter_code"
            placeholder={"Question #" + (index + 1) + "s Starter Code"}
            value={item.starter_code}
            onChange={(e) => handleChange(e, index)}
          />


          {item.public_tests_storage?.map((public_tests_item: [string, string], public_index) => (
            <div key={"public_" + public_index} className="publicContainer">
              Public Test Case #{public_index + 1}
              <Input
                type="text"
                name="public_tests_input"
                placeholder={"Test Case Input #" + (index + 1)}
                value={item.public_tests_storage[public_index][0]}
                onChange={(e) => handleChange(e, index, public_index)}
              />
              <Input
                type="text"
                name="public_tests_output"
                placeholder={"Test Case Output #" + (index + 1)}
                value={item.public_tests_storage[public_index][1]}
                onChange={(e) => handleChange(e, index, public_index)}
              />
            </div>
          ))}
          <Button color="green" size="md" onClick={() => { anotherPublicTestCase(index) }}>
            Add Another Public Test Case
          </Button>


          {item.test_cases_storage?.map((test_case_item: [string, string], test_index) => (
            <div key={"private_" + test_index} className="testContainer">
              Private Test Case #{index + 1}
              <Input
                type="text"
                name="test_case_input"
                placeholder={"Test Case Input #" + (test_index + 1)}
                value={item.test_cases_storage[test_index][0]}
                onChange={(e) => handleChange(e, index, test_index)}
              />
              <Input
                type="text"
                name="test_case_output"
                placeholder={"Test Case Output #" + (test_index + 1)}
                value={item.test_cases_storage[test_index][1]}
                onChange={(e) => handleChange(e, index, test_index)}
              />
            </div>
          ))}
          <Button color="green" size="md" onClick={() => { anotherPrivateTestCase(index) }}>
            Add Another Private Test Case
          </Button>
        </div>
      ))}
      <Button color="green" size="lg" onClick={anotherQuestion}>
        Add Another Question
      </Button>

      <Button color="green" size="lg" onClick={nextPage}>
        Submit your questions
      </Button>


    </div>
  );
}

export default QuestionBuilder
