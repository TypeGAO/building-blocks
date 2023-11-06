import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import toast from "react-hot-toast"
import { Button, Input } from "../../components"
import { useNavigate } from "react-router-dom";
import { fetchCategories, addQuestionSet } from "../../api"

import { QuestionSet } from "../../types";
import { Categories } from "../../types";

function QuestionSetBuilder() {

    const [question_set, setQuestionSet] = useState<QuestionSet>({
        title: '',
        desc: '',
        grade: 0,
        category: ''
    })

    const { data: categories, isFetching: categoriesIsFetching, isLoading: categoriesIsLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
        onError: () => {
            toast.error("Unable to load categories")
        }
    })




    //make a new object like the one above
    //instead of useQuery were using useMutatation
    //have a is error for errors, on success, naviagate page
    //append the id to the URL 
    const { isLoading, mutate } = useMutation({
        mutationFn: (question_set: QuestionSet) => addQuestionSet(question_set),
        onSuccess: () => {
            // navigate(`/set/${id}`)
         },
        onError: () => {
            toast.error("")
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // If you want to ensure that the "grade" value is always a number, you can use parseInt to convert it.
        // This handles the case where the input may be a string.
        const newValue = name === 'grade' ? parseInt(value, 10) : value;

        setQuestionSet({ ...question_set, [name]: newValue });
    };

    const navigate = useNavigate();
    const handleClick = () => {
        //Ping the database

        mutate(question_set);
        navigate('/host/create_questions');
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
                name="desc"
                placeholder="Description"
                value={question_set.desc}
                onChange={handleChange}
            />


            <div>
                Select Grade Level:
                <label>
                    <input
                        type="radio"
                        name="grade"
                        value="8th"
                        checked={question_set.grade === 8}
                        onChange={handleChange}
                    />
                    8th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade"
                        value="9th"
                        checked={question_set.grade === 9}
                        onChange={handleChange}
                    />
                    9th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade"
                        value="10th"
                        checked={question_set.grade === 10}
                        onChange={handleChange}
                    />
                    10th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade"
                        value="11th"
                        checked={question_set.grade === 11}
                        onChange={handleChange}
                    />
                    11th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade"
                        value="12th"
                        checked={question_set.grade === 12}
                        onChange={handleChange}
                    />
                    12th
                </label>
                <label>
                    <input
                        type="radio"
                        name="grade"
                        value="Uni"
                        checked={question_set.grade === 13}
                        onChange={handleChange}
                    />
                    Uni
                </label>
            </div>

            <div>
                Categories:

                {!categoriesIsLoading || !categoriesIsFetching ? (
                    categories?.data.map((item: Categories) => (
                        <div key={item.id} className="questionContainer">
                            {item.category}
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value={item.category}
                                    checked={question_set.category === item.category}
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
