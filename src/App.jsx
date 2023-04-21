import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
function App() {
  const[userName,setUserName]=useState(null);
  const [questionNumber, setQuestionNumber] = useState(1); // set initial question number to 1
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Name the Father of the Indian Constitution?",
      answers: [
        {
          text: "Mahatma Gandhi",
          correct: false,
        },
        {
          text: "Narendra Modi",
          correct: false,
        },
        {
          text: "Sardar Patel",
          correct: false,
        },
        {
          text: "BR Ambedkar",
          correct: true,
        },
      ],
    },
    {
      id: 2, // update id to 2
      question: "Who was the first Prime Minister of India?",
      answers: [
        {
          text: "Mahatma Gandhi",
          correct: false,
        },
        {
          text: "Narendra Modi",
          correct: false,
        },
        {
          text: "Jawaharlal Nehru",
          correct: true,
        },
        {
          text: "Rahul Gandhi",
          correct: false,
        },
      ],
    },
    {
      id: 3, // update id to 3
      question: "Name the gas which is filled in balloons?",
      answers: [
        {
          text: "Helium",
          correct: true,
        },
        {
          text: "Hydrogen",
          correct: false,
        },
        {
          text: "Oxygen",
          correct: false,
        },
        {
          text: "Carbon Dioxide",
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(()=>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 400" },
      { id: 5, amount: "$ 500" },
      { id: 6, amount: "$ 600" },
      { id: 7, amount: "$ 700" },
      { id: 8, amount: "$ 800" },
      { id: 9, amount: "$ 900" },
      { id: 10, amount: "$ 1000" },
      { id: 11, amount: "$ 1100" },
      { id: 12, amount: "$ 1200" },
      { id: 13, amount: "$ 1300" },
      { id: 14, amount: "$ 1400" },
      { id: 15, amount: "$ 1500" },
    ].reverse(),[]
  ) ;
  useEffect(()=>{
    questionNumber>1 &&  setEarned(moneyPyramid.find((m)=>m.id===questionNumber-1).amount
    );
  },[moneyPyramid,questionNumber])

  return (
  <div className="app">
    {userName ? (
      <>
        <div className="main">
          {stop ? (
            <h1 className="endText">You earned: {earned}</h1>
          ) : (
            <>
              <div className="top">
                <div className="timer">
                  <Timer setStop={setStop} questionNumber={questionNumber} />
                </div>
              </div>
              <div className="bottom">
                <Trivia
                  data={data}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  setStop={setStop}
                />
              </div>
            </>
          )}
        </div>
        <div className="pyramid">
          <ul className="moneyList">
            {moneyPyramid.map((m) => (
              <li
                className={
                  questionNumber === m.id
                    ? "moneyListItem active"
                    : "moneyListItem"
                }
              >
                <span className="moneyListItemNumber">{m.id}</span>
                <span className="moneyListItemAmount">{m.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    ) : (
      <Start setUserName={setUserName} />
    )}
  </div>
);
    }



export default App;
