import { useEffect, useState } from "react"
import Question from "./question"
import { uniqueId } from "lodash"

export default function Game(){
    const [questions,setQuestions] = useState([])
    const [result,setResult] = useState(null)
    const [gameId,setGameId] = useState(uniqueId())
    const [session,setSession] = useState(null)

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
        if(!session){
        fetch("https://opentdb.com/api_token.php?command=request")
        .then(response=>response.json())
        .then(data=>setSession(data.token))
        .catch(error=>console.error("Fetch error: ", error))}
    },[])

    useEffect(()=>{
        if(!session) return

        fetch(`https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&token=${session}`)
        .then (response => response.json())
        .then (data => createQuestionList(data.results))
        .catch(error=> console.error("Fetch error: " ,error))
    },[gameId,session])



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

    function newGame(){
        setResult(null)
        setGameId(uniqueId())
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
                    <button className="btn-game" onClick={newGame}>Play again</button>
                </section>
                )
            : null}
            </div>
        </main>
)
}