import React, { Component } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Levels from "./Levels";
import ProgressBar from "./ProgressBar";
import Questions from "./Questions";
import { QuizMarvel } from "./quizMarvel";

toast.configure();

class Quiz extends Component {
  state = {
    levelsNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storagedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    goodAnswer: "",
    score: 0,
    showToast: false,
  };

  storeDataRef = React.createRef();

  loadQuestions = (level) => {
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
  }

  nextQuestion = (userAnswer) => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //END
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;

    if (goodAnswer === userAnswer) {
      this.setState({ score: this.state.score + 1 });

      toast.success("Bravo! + 1", {
        position: "top-right",
        bodyClassName: "toastify-color",
        autoClose: 5000,
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
        autoClose: 5000,
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

    if (this.props.userData.pseudo) {
      this.showMsgWelcome(this.props.userData.pseudo);
    }
  }

  render() {
    console.log(this.state.score);
    //const { pseudo } = this.props.userData;

    return (
      <div>
        <Levels />
        <ProgressBar />
        <Questions
          question={this.state.question}
          options={this.state.options}
          nextQuestion={this.nextQuestion}
          idQuestion={this.state.idQuestion}
        />
      </div>
    );
  }
}

export default Quiz;
