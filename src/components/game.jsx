import { useEffect, useState } from "react"

export default function Game(){
    const [questions,setQuestions] = useState(null)
    console.log(questions)

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
        .then (response => response.json())
        .then (data=>setQuestions(data.results))
        .catch(error=> console.error("Fetch error: " ,error))
    },[])

    return(
        <main>
            <h1>Game</h1>
        </main>
)
}