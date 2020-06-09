import React, { useState } from 'react';

const Questions = ({ question, options }) => {

    const [ btnDisable, setBtnDisable ] = useState(true);
    const [ userAnwser, setUserAnwser ] = useState('');

    const submitOption = selectedOption => {
        setUserAnwser(selectedOption);
        setBtnDisable(false);
    }

    return (
        <>
            <h2>{question}</h2>

            {options.map((option, index) => (
                <p 
                    key={index} 
                    onClick={() => submitOption(option)} 
                    className={`answerOptions ${userAnwser === option ? "selected" : null}`}
                    >
                        {option}
                </p>
            ))}

            <button disabled={btnDisable} className="btnSubmit">Suivant</button>
        </>
    )
}

export default Questions;
