import React, { useState, useEffect } from "react";

import { FaChevronRight } from "react-icons/fa";

const Questions = ({ question, options, nextQuestion, idQuestion, maxQuestions }) => {
    const [btnDisable, setBtnDisable] = useState(true);
    const [userAnwser, setUserAnwser] = useState("");

    const submitOption = selectedOption => {
        setUserAnwser(selectedOption);
        setBtnDisable(false);
    };

    useEffect(() => {
        setUserAnwser("");
        setBtnDisable(true);
    }, [idQuestion]);

    return (
        <>
            <h2>{question}</h2>

            {options.map((option, index) => (
                <p
                    key={index}
                    onClick={() => submitOption(option)}
                    className={`answerOptions ${userAnwser === option ? "selected" : null}`}
                >
                    <FaChevronRight style={{ marginRight: "8px" }} />
                    {option}
                </p>
            ))}

            <button
                onClick={() => nextQuestion(userAnwser)}
                disabled={btnDisable}
                className="btnSubmit"
            >
                {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
            </button>
        </>
    );
};

export default Questions;
