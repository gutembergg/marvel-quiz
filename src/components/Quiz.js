import React, { Component } from 'react';

import Levels from './Levels';
import ProgressBar from './ProgressBar';
import Questions from './Questions';
import { QuizMarvel } from './quizMarvel';

class Quiz extends Component {

    state = {
        levelsNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storagedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0
    }

    loadQuestions = level => {
       const fetchQuizz = QuizMarvel[0].quizz[level];

       if(fetchQuizz.length >= this.state.maxQuestions) {
        const newArray = fetchQuizz.map(({ answer, ...rest }) => rest);

        this.setState({storagedQuestions: newArray});

       } else { 
           console.log("No questions")
       }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.storagedQuestions !== prevState.storagedQuestions) {
            this.setState({ 
                question: this.state.storagedQuestions[this.state.idQuestion].question,
                options: this.state.storagedQuestions[this.state.idQuestion].options
            })
        }
    }

    render() {

        //const { pseudo } = this.props.userData;

        return (
        <div>
            <Levels />
            <ProgressBar />
            <Questions question={this.state.question} options={this.state.options} />
        </div>
        )
    }
    
}

export default Quiz;
