import { useEffect, useState } from "react"
import Question from "./question"
import { shuffle } from "lodash"

export default function Game(){
    const [questions,setQuestions] = useState([])

    function answerQuestion(question, answer){
        setQuestions(prevQuestions =>{
            const newQuestions = [...prevQuestions]
            newQuestions[question]={...newQuestions[question],selection:answer}
            return newQuestions
        })
    }

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
        .then (response => response.json())
        .then (data=>setQuestions(data.results))
        .catch(error=> console.error("Fetch error: " ,error))
    },[])

    console.log(questions)

    let questionList = []


    if(questions){
        questionList = questions.map((question,index) => {
        const answers = [{answer: question.correct_answer, isCorrect:true}]
        question.incorrect_answers.forEach(answer => {
            answers.push({answer: answer, isCorrect: false})            
        });
        const shuffledAnswers = shuffle(answers)



        //answer,0


            return(
    <Question
            key={index}
            id={index}
            question={question.question} 
            answers={shuffledAnswers}
            answerQuestion={answerQuestion}
            selection={question.selection}
    
    />) ;
    })} 

    return(
        <main className="game">
            {questions ? questionList : null}
        </main>
)
}