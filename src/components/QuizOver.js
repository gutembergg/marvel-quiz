import React, { useEffect, useState } from "react";

import { GiTrophyCup } from "react-icons/gi";
import Loader from "./Loader";
import Modal from "./Modal";

const QuizOver = React.forwardRef(
    ({ quizLevel, percent, maxQuestions, score, levelsNames, loadLevelsQuestions }, ref) => {
        const [ask, setAsk] = useState([]);
        const [openModal, setOpenModal] = useState(false);

        const API_KEY = process.env.REACT_APP_MARVEL_API_KEY;
        const hash = "389057C95BD9C79C8F230276FB96619A";

        useEffect(() => {
            setAsk(ref.current);
        }, [ref]);

        const showModal = () => {
            setOpenModal(true);
        };

        const closeModal = () => {
            setOpenModal(false);
        };

        const average = maxQuestions / 2;

        if (score < average) {
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
                                <p className="successMsg">
                                    <GiTrophyCup size="50px" style={{ marginRight: "8px" }} />
                                    Bravo vous êtes un expert !
                                </p>
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
                                            <button onClick={() => showModal()} className="btnInfo">
                                                Infos
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">
                                        <Loader text="Pas de réponse" />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Modal showModal={openModal} closeModal={closeModal}>
                    <div className="modalHeader">
                        <h2>Titre</h2>
                    </div>
                    <div className="modalBody">
                        <h3>Titre 2</h3>
                    </div>
                    <div className="modalFooter">
                        <button className="modalBtn">Fermer</button>
                    </div>
                </Modal>
            </>
        );
    }
);

export default React.memo(QuizOver);
