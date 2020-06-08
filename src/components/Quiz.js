import React, { Component } from 'react';

import Levels from './Levels';
import ProgressBar from './ProgressBar';
import Questions from './Questions';
import { QuizMarvel } from './quizMarvel';

class Quiz extends Component {

    state = {
        levelsNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10
    }

    loadQuestions = level => {
       const fectQuizz = QuizMarvel[0].quizz[level];
       console.log(fectQuizz)
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
    }

    render() {

        //const { pseudo } = this.props.userData;

        return (
        <div>
            <Levels />
            <ProgressBar />
            <Questions />
        </div>
        )
    }
    
}

export default Quiz;
