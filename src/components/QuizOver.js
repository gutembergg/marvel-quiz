import React, { useEffect, useState } from "react";

import { GiTrophyCup } from "react-icons/gi";
import Loader from "./Loader";
import Modal from "./Modal";
import Axios from "axios";

const QuizOver = React.forwardRef(
    ({ quizLevel, percent, maxQuestions, score, levelsNames, loadLevelsQuestions }, ref) => {
        const [ask, setAsk] = useState([]);
        const [openModal, setOpenModal] = useState(false);
        const [apiResponse, setApiResponse] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        const API_KEY = process.env.REACT_APP_MARVEL_API_KEY;
        const hash = "389057c95bd9c79c8f230276fb96619a";

        useEffect(() => {
            setAsk(ref.current);

            if (localStorage.getItem("marvelStorageDate")) {
                const date = localStorage.getItem("marvelStorageDate");

                checkStorageAge(date);
            }
        }, [ref]);

        const checkStorageAge = date => {
            const today = Date.now();
            const time = today - date;

            const dayDifference = time / (1000 * 36000 * 24);

            if (dayDifference >= 15) {
                localStorage.clear();
                localStorage.setItem("marvelStorageDate", Date.now());
            }
        };

        const showModal = async id => {
            setOpenModal(true);

            if (localStorage.getItem(id)) {
                setApiResponse(JSON.parse(localStorage.getItem(id)));
                setIsLoading(false);
            } else {
                try {
                    const response = await Axios.get(
                        `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_KEY}&hash=${hash}`
                    );

                    localStorage.setItem(id, JSON.stringify(response.data));

                    if (!localStorage.getItem("marvelStorageDate")) {
                        localStorage.setItem("marvelStorageDate", Date.now());
                    }

                    setApiResponse(response.data);
                    setIsLoading(false);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const closeModal = () => {
            setOpenModal(false);
            setIsLoading(true);
        };

        const average = maxQuestions / 2;

        if (score < average) {
            setTimeout(() => loadLevelsQuestions(quizLevel), 3000);
        }

        const captalizeFirstLetter = string => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const resultData = !isLoading ? (
            <>
                <div className="modalHeader">
                    <h2>{apiResponse.data.results[0].name}</h2>
                </div>
                <div className="modalBody">
                    <div className="comicImage">
                        <img
                            src={
                                apiResponse.data.results[0].thumbnail.path +
                                "." +
                                apiResponse.data.results[0].thumbnail.extension
                            }
                            alt={apiResponse.data.results[0].name}
                        />
                        <p>{apiResponse.attributionText}</p>
                    </div>
                    <div className="comicDetails">
                        <h3>Description</h3>
                        {apiResponse.data.results[0].description ? (
                            <p>{apiResponse.data.results[0].description}</p>
                        ) : (
                            <p>Description indisponible</p>
                        )}
                        <p>Plus d'infos</p>
                        {apiResponse.data.results[0].urls &&
                            apiResponse.data.results[0].urls.map((url, index) => (
                                <a
                                    key={index}
                                    href={url.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {captalizeFirstLetter(url.type)}
                                </a>
                            ))}
                    </div>
                </div>
                <div className="modalFooter">
                    <button onClick={closeModal} className="modalBtn">
                        Fermer
                    </button>
                </div>
            </>
        ) : (
            <>
                <div className="modalHeader">
                    <h2>Réponse de Marvel...</h2>
                </div>
                <div className="modalBody">
                    <Loader />
                </div>
            </>
        );

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
                                            <button
                                                onClick={() => showModal(question.heroId)}
                                                className="btnInfo"
                                            >
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
                    {resultData}
                </Modal>
            </>
        );
    }
);

export default React.memo(QuizOver);
