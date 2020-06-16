import React, { Component } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Levels from "./Levels";
import ProgressBar from "./ProgressBar";
import Questions from "./Questions";
import { QuizMarvel } from "./quizMarvel";
import QuizOver from "./QuizOver";

toast.configure();

const levelsNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizLevel: 0,
            maxQuestions: 10,
            storagedQuestions: [],
            question: null,
            options: [],
            idQuestion: 0,
            goodAnswer: "",
            score: 0,
            showToast: false,
            gameEnd: false,
            percent: 0,
        };
    }

    storeDataRef = React.createRef();

    loadQuestions = level => {
        const fetchQuizz = QuizMarvel[0].quizz[level];

        if (fetchQuizz.length >= this.state.maxQuestions) {
            const newArray = fetchQuizz.map(({ answer, ...rest }) => rest);

            this.storeDataRef.current = fetchQuizz;

            this.setState({ storagedQuestions: newArray });
        } else {
            console.log("No questions");
        }
    };

    showMsgWelcome = () => {
        if (!this.state.showToast) {
            this.setState({ showToast: true });

            toast.warn(`Bienvenue ${this.props.userData.pseudo}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    };

    componentDidMount() {
        this.loadQuestions(levelsNames[this.state.quizLevel]);
    }

    nextQuestion = userAnswer => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.setState({ gameEnd: true });
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }

        const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;

        if (goodAnswer === userAnswer) {
            this.setState({ score: this.state.score + 1 });

            toast.success("Bravo! + 1", {
                position: "top-right",
                bodyClassName: "toastify-color",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } else {
            toast.error("Raté! 0", {
                position: "top-right",
                bodyClassName: "toastify-color",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storagedQuestions !== prevState.storagedQuestions) {
            this.setState({
                question: this.state.storagedQuestions[this.state.idQuestion].question,
                options: this.state.storagedQuestions[this.state.idQuestion].options,
            });
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storagedQuestions[this.state.idQuestion].question,
                options: this.state.storagedQuestions[this.state.idQuestion].options,
            });
        }

        if (this.state.gameEnd !== prevState.gameEnd) {
            const percentGrade = this.getPercentage(this.state.score, this.state.maxQuestions);
            this.gameOver(percentGrade);
        }

        if (this.props.userData.pseudo) {
            this.showMsgWelcome(this.props.userData.pseudo);
        }
    }

    getPercentage = (ourScore, maxQuest) => (ourScore / maxQuest) * 100;

    gameOver = percent => {
        if (percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent,
            });
        } else {
            this.setState({
                percent,
            });
        }
    };

    loadLevelsQuestions = params => {
        this.setState({ ...this.state, quizLevel: params });
        this.setState({
            gameEnd: false,
            idQuestion: 0,
            score: 0,
        });

        this.loadQuestions(levelsNames[params]);
    };

    render() {
        return (
            <>
                {this.state.gameEnd ? (
                    <QuizOver
                        ref={this.storeDataRef}
                        quizLevel={this.state.quizLevel}
                        percent={this.state.percent}
                        maxQuestions={this.state.maxQuestions}
                        score={this.state.score}
                        levelsNames={levelsNames}
                        loadLevelsQuestions={this.loadLevelsQuestions}
                    />
                ) : (
                    <>
                        <Levels levelsNames={levelsNames} quizLevel={this.state.quizLevel} />
                        <ProgressBar
                            idQuestion={this.state.idQuestion}
                            maxQuestions={this.state.maxQuestions}
                        />
                        <Questions
                            question={this.state.question}
                            options={this.state.options}
                            nextQuestion={this.nextQuestion}
                            idQuestion={this.state.idQuestion}
                            maxQuestions={this.state.maxQuestions}
                        />
                    </>
                )}
            </>
        );
    }
}

export default Quiz;
