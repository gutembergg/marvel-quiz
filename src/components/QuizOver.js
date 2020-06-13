import React, { useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const [ask, setAsk] = useState([]);
  //console.log(ask);

  useEffect(() => {
    setAsk(ref.current);
  }, [ref]);

  return (
    <>
      <div className="stepsBtnContainer">
        <p className="successMsg">Bravo vous êtes un expert !</p>
        <button className="btnResult success">Niveau Suivat</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussi: 10%</div>
        <div className="progressPercent">Note: 10/10</div>
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
            {ask.map((question) => (
              <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                  <button className="btnInfo">Infos</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default React.memo(QuizOver);
