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
        description: '',
        grade_level: 0,
        categories: [],
    })

    const { data: inputCategories, isFetching: categoriesIsFetching, isLoading: categoriesIsLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
        onError: () => {
            toast.error("Unable to load categories")
        }
    })

    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: (question_set: QuestionSet) => addQuestionSet(question_set),

        onSuccess: (res) => {
            navigate(`/host/questions/${res.data.id}`)
        },
        onError: () => {
            toast.error("Unable to send question data")
        }
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (type === 'radio') {
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
        }
        else {
            setQuestionSet({ ...question_set, [name]: value });
        }
    };

    const handleClick = () => {
        mutate(question_set);
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
                {[8, 9, 10, 11, 12, 13].map((grade) => (
                    <label key={grade}>
                        <input
                            type="radio"
                            name="grade_level"
                            value={grade.toString()}
                            checked={question_set.grade_level === grade}
                            onChange={handleChange}
                        />
                        {grade === 13 ? 'University' : `${grade}th`}
                    </label>
                ))}
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
