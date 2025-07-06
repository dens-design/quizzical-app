import { useEffect, useState } from "react"
import Question from "./question"

const generateId = () => Math.random().toString(36).substr(2, 10)


const API_CONFIG = {
    baseUrl: 'https://opentdb.com',
    questionCount: 5,
    category: 9, // General Knowledge
    difficulty: 'easy',
    type: 'multiple'
}

export default function Game(){
    const [questions,setQuestions] = useState([])
    const [result,setResult] = useState(null)
    const [gameId,setGameId] = useState(generateId())
    const [session,setSession] = useState(null)
    const [loading,setLoading] = useState(false)

    
    
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
            correctId={question.correctId}
            reveal={result===null ? false : true}
    
        />) ;
    });
    useEffect(()=>{
        if(!session){
        setLoading(true)
        fetch(`${API_CONFIG.baseUrl}/api_token.php?command=request`)
        .then(response=>response.json())
        .then(data=>setSession(data.token))
        .catch(error=>console.error("Fetch error: ", error))}
    },[])

    useEffect(()=>{
        if(!session) return
        setLoading(true)

        fetch(`${API_CONFIG.baseUrl}/api.php?amount=${API_CONFIG.questionCount}&category=${API_CONFIG.category}&difficulty=${API_CONFIG.difficulty}&type=${API_CONFIG.type}&token=${session}`)
        .then (response => response.json())
        .then (data => createQuestionList(data.results))
        .catch(error=> console.error("Fetch error: " ,error))
        .finally(()=>setLoading(false))
    },[gameId,session])



    function answerQuestion(question, answer){
        setQuestions(prevQuestions =>{
            const newQuestions = [...prevQuestions]
            newQuestions[question]={...newQuestions[question],selection:answer}
            return newQuestions
        })
    }

    function createQuestionList(data){
        const processedQuestions = data.map(question => {
            // Combine all answers and shuffle them
            const allAnswers = [...question.incorrect_answers, question.correct_answer]
            const shuffledAnswers = [...allAnswers] // Create a copy to avoid mutating
            
            // Fisher-Yates shuffle for truly random ordering
            for (let i = shuffledAnswers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]]
            }
            
            // Find the position of the correct answer after shuffling
            const correctId = shuffledAnswers.indexOf(question.correct_answer)
            
            return {
                question: question.question,
                answers: shuffledAnswers,
                correctId,
                selection: -1
            }
        })

        setQuestions(processedQuestions)
    }

    function newGame(){
        setResult(null)
        setGameId(generateId())
    }



    function checkAnswers(){
        setResult(questions.filter(question => question.selection === question.correctId).length)
    }

    if (loading) {
        return (
            <main className="game">
                <div className="container">
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                </div>
            </main>
        )
    }

    return(
        <main className="game">
            <div className="container">
            {questionList}
            {questions.length > 0 && isAllAnswered && result === null ? (<button onClick={checkAnswers} className="btn-game">Check Answers</button>):null}
            {result!=null
            ? ( <section className="flex-center">
                    <p>{`You scored ${result}/${API_CONFIG.questionCount} correct answers`}</p>
                    <button className="btn-game" onClick={newGame}>Play again</button>
                </section>
                )
            : null}
            </div>
        </main>
)
}