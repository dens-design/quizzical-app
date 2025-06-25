import { decode } from "html-entities"

export default function Question(props){
    const answers = props.answers.map((answer,index )=>

    
    

    <button
    key={index}
    iscorrect={""+answer.isCorrect}
    onClick={()=>{props.answerQuestion(props.id,index)}}
    className={(props.selection || props.selection===0  ) && props.selection === index ? "btn-answer btn-selected":"btn-answer "}

    >{decode(answer.answer)}</button>)

    return(
        <div className="question">
            <p>{decode(props.question)}</p>
            {answers}
        </div>
    )
}