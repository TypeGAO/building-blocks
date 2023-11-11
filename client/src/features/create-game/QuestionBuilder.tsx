import { useState } from "react"
import { useMutation } from "react-query"
import toast from "react-hot-toast"

import { Button, Input } from "../../components"
import { useNavigate } from "react-router-dom";
import { addQuestions } from "../../api"

import { Questions } from "../../types";


interface QuestionSetIDProps {
  setId: string | undefined
}


function QuestionBuilder({ setId }: QuestionSetIDProps) {

  //console.log(setId)
  const [theQuestions, setTheQuestions] = useState<Questions[]>([{
    id: 0,
    title: "",
    question: "",
    starter_code: "",
    test_cases: [["", ""]],
    public_tests: [""],
    question_set_id: 0,
  }])

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (theQuestions: Questions[]) => addQuestions(theQuestions),

    onSuccess: (res) => {
      navigate(`/TODO`)
    },
    onError: () => {
      toast.error("")
    }
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;

    setTheQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value,
      };
      return updatedQuestions;
    });
  };

  const anotherQuestion = () => {
    setTheQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: prevQuestions.length,
        title: "",
        question: "",
        starter_code: "",
        test_cases: [["", ""]],
        public_tests: [],
        question_set_id: 0,
      },
    ]);
  };

  const anotherPublicTestCase = (index: number) => {
    setTheQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[index];
      currentQuestion.public_tests.push("");
      return updatedQuestions;
    });
  };


  const anotherPrivateTestCase = (index: number) => {
    setTheQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[index];
      currentQuestion.test_cases.push(["", ""]);
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
            type="textarea"
            name="question"
            placeholder={"Question #" + (index + 1) + "s Description"}
            value={item.question}
            onChange={(e) => handleChange(e, index)}
          />
          <Input
            type="textarea"
            name="starter_code"
            placeholder={"Question #" + (index + 1) + "s Starter Code"}
            value={item.starter_code}
            onChange={(e) => handleChange(e, index)}
          />


          {item.public_tests?.map((public_tests_item: string, public_index) => (
            <div key={"public_" + public_index} className="publicContainer">
              Public Test Case #{public_index + 1}
              <Input
                type="textarea"
                name="public_tests_input"
                placeholder={"Test Case Input #" + (index + 1)}
                value={item.public_tests[public_index]}
                onChange={(e) => handleChange(e, index)}
              />
              <Input
                type="textarea"
                name="public_tests_output"
                placeholder={"Test Case Output #" + (index + 1)}
                value={item.public_tests[public_index]}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          ))}
          <Button color="green" size="lg" onClick={() => { anotherPublicTestCase(index) }}>
            Add Another Public Test Case
          </Button>


          {item.test_cases?.map((test_case_item: [string, string], test_index) => (
            <div key={"private_" + test_index} className="testContainer">
              Private Test Case #{index + 1}
              <Input
                type="textarea"
                name="test_case_input"
                placeholder={"Test Case Input #" + (test_index + 1)}
                value={item.test_cases[test_index][0]}
                onChange={(e) => handleChange(e, index)}
              />
              <Input
                type="textarea"
                name="test_case_output"
                placeholder={"Test Case Output #" + (test_index + 1)}
                value={item.test_cases[test_index][1]}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          ))}
          <Button color="green" size="lg" onClick={() => { anotherPrivateTestCase(index) }}>
            Add Another Private Test Case
          </Button>





        </div>
      ))}
      <Button color="green" size="lg" onClick={anotherQuestion}>
        Add Another Question
      </Button>


    </div>
  );
}

export default QuestionBuilder
