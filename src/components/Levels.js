import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelsNames, quizLevel }) => {
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quisSteps = levelsNames.map(level => ({ title: level.toUpperCase() }));
        setLevels(quisSteps);
    }, [levelsNames]);

    console.log(levels);

    return (
        <div className="levelsContainer" style={{ background: "transparent" }}>
            <Stepper
                steps={levels}
                activeStep={quizLevel}
                circleTop={0}
                activeTitleColor={"#d31017"}
                activeColor={"#EB1D27"}
                completeColor={"#EB1D27"}
                completeTitleColor={"#d31017"}
                size={42}
                circleFontSize={20}
            />
        </div>
    );
};

export default React.memo(Levels);
