import React from "react";
import Question from "./Question";

function Quiz(props) {
    const {startNewGame, setStartNewGame, quizData} = props
    const [count, setCount] = React.useState(0)
    const [startGame, setStartGame] = React.useState(false)
    const [questionsData, setQuestionsData] = React.useState([])
    const [reset, setReset] = React.useState(false)


    const questions = questionsData.map(question => {
        return (
            <Question
                key={question.id}
                question={question}
                getAnswer={getAnswer}
                answersChecked={startNewGame}
                reset={reset}
            />
        )
    })

    function prepareQuestions(results) {
        const questions = []
        for (let result in results) {
            const question = {
                id: parseInt(result) + 1,
                question: results[result]['question'],
                correctAnswer: results[result]['correct_answer'],
                allAnswers: [...results[result]['incorrect_answers'], results[result]['correct_answer']]
                    .sort((a, b) => 0.5 - Math.random()),
                userAnswer: '',
                isAnswerCorrect: null,
            }
            questions.push(question)
        }
        return questions
    }


    function startQuiz(event) {
        setReset(true)
        setStartGame(true)
        setStartNewGame(false)
        setCount(0)
        setQuestionsData(oldQuestions => prepareQuestions(quizData))
        setReset(false)
    }

    function getAnswer(userAnswer, questionId) {
        setQuestionsData(oldAnswers => {
            return oldAnswers.map(answer => {
                return answer.id === questionId ? {...answer, userAnswer: userAnswer} : answer
            })
        })
    }

    function checkAnswers(event) {
        setQuestionsData(oldQuestionsData => {
            return oldQuestionsData.map(question => {
                if (question.correctAnswer === question.userAnswer) {
                    setCount(oldCount => oldCount + 1)
                    return {...question, isAnswerCorrect: true}
                } else {
                    return {...question, isAnswerCorrect: false}
                }
            })
        })
        setStartNewGame(true)
    }

    return (
        <section className='Quiz'>
            {startGame && questions && <div className='Quiz-game'>
                {questions}
                <div className='Quiz-game__footer'>
                    {startNewGame &&
                        <p className='Quiz-game__score'>Your Scored {count} / {questions.length} Correct Answers</p>}
                    <button className='Quiz-game__check' onClick={startNewGame ? startQuiz : checkAnswers}>
                        {startNewGame ? 'Start New Game' : 'Check Answers'}
                    </button>
                </div>
            </div>}
            {!startGame && <div style={{height: "80vh"}} className="Quiz-start">
                <h1 className='Quiz-start__title'>Quiz Island</h1>
                <p className='Quiz-start__description'>Have Fun Playing Our Quiz Game Be Sure To Share Your Score And
                    Your Feedback To Other Audience</p>
                <button className='Quiz-start__button' onClick={startQuiz}>Start Quiz</button>
            </div>}
        </section>
    )
}

export default Quiz