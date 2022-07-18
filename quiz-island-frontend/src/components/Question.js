import React from "react";

function Question(props) {
    const [clicked, setClicked] = React.useState({})
    const renderHTML = (rawHTML) => React.createElement("span", {dangerouslySetInnerHTML: {__html: rawHTML}});

    React.useEffect(() => {
        // reset all clicked buttons not to be clicked once new game starts
        setClicked({id: -1})
    }, [props.answersChecked])

    function decideButtonClass(index, value) {
        let buttonClass
        if (props.answersChecked) {
            // decide class button if the answer is correct and the button value same as user answer
            if (props.question.isAnswerCorrect && value === props.question.userAnswer) {
                buttonClass = 'Question__answer correct'
                // or if the answer is wrong but the button value is same as user answer
            } else if (!props.question.isAnswerCorrect && value === props.question.userAnswer) {
                buttonClass = 'Question__answer wrong'
                // or if the answer is wrong but the correct value is same as the button value
            } else if (!props.question.isAnswerCorrect && value === props.question.correctAnswer) {
                buttonClass = 'Question__answer correct'
                // others buttons will stay same
            } else {
                buttonClass = 'Question__answer'
            }
        } else {
            // if the button got clicked it will be active otherwise it will stay the same
            if (index === clicked.id) {
                buttonClass = 'Question__answer active'
            } else {
                buttonClass = 'Question__answer'
            }
        }
        return buttonClass
    }

    function handleOnClick(event, clickedID, questionId) {
        // it will set clicked to the button index,
        // it will send the questionID and the value of that button to getAnswer function in Quiz
        const {value} = event.target
        setClicked({id: clickedID})
        props.getAnswer(value, questionId)
    }

    // Creating Button for every answer from the all answers array
    const buttons = props.question.allAnswers.map((answer, index) => {
        return (
            <button
                key={index}
                name={answer}
                className={decideButtonClass(index, answer)}
                onClick={(event) => handleOnClick(event, index, props.question.id)}
                value={answer}
            >
                {renderHTML(answer)}
            </button>
        )
    })
    return (
        <div className='Question'>
            <h2 className='Question__title'>{renderHTML(props.question.question)}</h2>
            {buttons}
        </div>
    )
}

export default Question