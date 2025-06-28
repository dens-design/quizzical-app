import { useEffect, useState } from "react"
import Question from "./question"

export default function Game(){
    const [questions,setQuestions] = useState([])
    const [result,setResult] = useState(null)

    console.log(questions)
    
    const isAllAnswered = questions.every(question => question.selection>=0)

    const questionList = questions.map((question,index) => {

        return(
        <Question
            key={index}
            id={index}
            question={question.question} 
            answers={question.answers}
            answerQuestion={answerQuestion}
            selection={question.selection}
    
        />) ;
    });

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
        .then (response => response.json())
        .then (data => createQuestionList(data.results))
        .catch(error=> console.error("Fetch error: " ,error))
    },[])



    function answerQuestion(question, answer){
        setQuestions(prevQuestions =>{
            const newQuestions = [...prevQuestions]
            newQuestions[question]={...newQuestions[question],selection:answer}
            return newQuestions
        })
    }

    function createQuestionList(data){
        let questionList = data;
        
        questionList.forEach((question,index) => {
            const rand = Math.floor(Math.random()*4)
            question.answers = question.incorrect_answers;
            question.answers.splice(rand,0,question.correct_answer)
            question.correctId = rand;
        })

        setQuestions(questionList);
        console.log(questions)
    }



    function checkAnswers(){
        //Compare selection to correct id for each question
        setResult(questions.filter(question => question.selection === question.correctId).length)
    }

    return(
        <main className="game">
            <div className="container">
            {questionList}
            {isAllAnswered&&result===null ? (<button onClick={checkAnswers} className="btn-game">Check Answers</button>):null}
            {result!=null
            ? ( <section className="flex-center">
                    <p>{`You scored ${result}/5 correct answers`}</p>
                    <button className="btn-game">Play again</button>
                </section>
                )
            : null}
            </div>
        </main>
)
}