import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import toast from "react-hot-toast"
import { Button, Input } from "../../components"
//import { useNavigate } from "react-router-dom";
import { fetchCategories, addQuestionSet } from "../../api"

import { QuestionSet } from "../../types";
import { Categories } from "../../types";

function QuestionSetBuilder() {

    const [question_set, setQuestionSet] = useState<QuestionSet>({
        title: '',
        grade_level: 0,
        description: '',
        categories: [],
    })

    const { data: inputCategories, isFetching: categoriesIsFetching, isLoading: categoriesIsLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
        onError: () => {
            toast.error("Unable to load categories")
        }
    })

    const { /*isLoading,*/ mutate } = useMutation({
        mutationFn: (question_set: QuestionSet) => addQuestionSet(question_set),

        onSuccess: (res) => {
            console.log("Andrew Test:")
            console.log(res)
            //navigate(`/set/${id}`)
         },
        onError: () => {
            toast.error("")
        }
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
    
        if (type === 'radio') {
            // Handle radio inputs
            const newValue = name === 'grade_level' ? parseInt(value, 10) : value;

            setQuestionSet({ ...question_set, [name]: newValue });
        } 
        else if (type === 'checkbox' && name === 'categories') {
            if (checked) {
                setQuestionSet({ ...question_set, [name]: [...question_set.categories, value] });
            } 
            else {
                setQuestionSet({
                    ...question_set,
                    [name]: question_set.categories.filter((category) => category !== value),
                });
            }

            console.log("Handle Change:");
            console.log(...question_set.categories);
        } 
        else {
            setQuestionSet({ ...question_set, [name]: value });
        }
    };
    

    

    //const navigate = useNavigate();
    const handleClick = () => {
        //Ping the database
        mutate(question_set);

        //navigate(`/set/${id}`)
        //navigate('/host/create_questions');
    }

    return (
        <div>
            <div style={{ width: "500px" }}>
                <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={question_set.title}
                    onChange={handleChange}
                />
            </div>

            <Input
                type="text"
                name="description"
                placeholder="Description"
                value={question_set.description}
                onChange={handleChange}
            />


            <div>
                Select Grade Level:
                <label>
                    <input
                        type="radio"
                        name="grade_level"
                        value="8"
                        checked={question_set.grade_level === 8}
                        onChange={handleChange}
                    />
                    8th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade_level"
                        value="9"
                        checked={question_set.grade_level === 9}
                        onChange={handleChange}
                    />
                    9th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade_level"
                        value="10"
                        checked={question_set.grade_level === 10}
                        onChange={handleChange}
                    />
                    10th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade_level"
                        value="11"
                        checked={question_set.grade_level === 11}
                        onChange={handleChange}
                    />
                    11th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade_level"
                        value="12"
                        checked={question_set.grade_level === 12}
                        onChange={handleChange}
                    />
                    12th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade_level"
                        value="13"
                        checked={question_set.grade_level === 13}
                        onChange={handleChange}
                    />
                    Uni
                </label>
            </div>

            <div>
                Categories:

                {!categoriesIsLoading || !categoriesIsFetching ? (
                    inputCategories?.data.map((item: Categories) => (
                        <div key={item.id} className="questionContainer">
                            {item.category}
                            <label>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    value={item.category}
                                    checked={question_set.categories.includes(item.category)}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )}
            </div>



            <div>
                <Button color="green" size="lg" onClick={handleClick}>
                    Next Page
                </Button>
            </div>

        </div>
    );
}

export default QuestionSetBuilder
