import React, { useEffect, useState } from "react";

const QuizOver = React.forwardRef(
    ({ quizLevel, percent, maxQuestions, score, levelsNames, loadLevelsQuestions }, ref) => {
        const [ask, setAsk] = useState([]);

        useEffect(() => {
            setAsk(ref.current);
        }, [ref]);

        const average = maxQuestions / 2;

        if (score < average) {
            // setTimeout(() => loadLevelsQuestions(0), 3000);
            setTimeout(() => loadLevelsQuestions(quizLevel), 3000);
        }

        return (
            <>
                {score >= average ? (
                    <>
                        {quizLevel < levelsNames.length ? (
                            <div className="stepsBtnContainer">
                                <p className="successMsg">Bravo passez au niveau suivant !</p>
                                <button
                                    onClick={() => loadLevelsQuestions(quizLevel)}
                                    className="btnResult success"
                                >
                                    Niveau Suivat
                                </button>
                            </div>
                        ) : (
                            <div className="stepsBtnContainer">
                                <p className="successMsg">Bravo vous êtes un expert !</p>
                                <button
                                    onClick={() => loadLevelsQuestions(0)}
                                    className="btnResult gameOver"
                                >
                                    Recommencer
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="stepsBtnContainer">
                            <p className="failureMsg">Vous avez échoué</p>
                        </div>
                    </>
                )}

                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">
                        Note: {score}/{maxQuestions}
                    </div>
                </div>

                <hr />
                <p>Réponses aux questions posées</p>

                <div className="answerContainer">
                    <table className="answers">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Réponses</th>
                                <th>Infos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {score >= average ? (
                                ask.map(question => (
                                    <tr key={question.id}>
                                        <td>{question.question}</td>
                                        <td>{question.answer}</td>
                                        <td>
                                            <button className="btnInfo">Infos</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">
                                        <div className="loader"></div>
                                        <p style={{ textAlign: "center", color: "red" }}>
                                            Pas de réponse
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
);

export default React.memo(QuizOver);
