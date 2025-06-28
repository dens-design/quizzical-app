import { decode } from "html-entities"

export default function Question(props){
    
    const answers = props.answers.map((answer,index )=> {

    let classString="btn-answer "


    if(props.reveal){
        if(props.correctId === index) classString += "btn-correct"
        else if(props.selection=== index) classString += "btn-wrong"
        else classString+="btn-disabled"
        }
    else{
        (props.selection || props.selection===0  ) && props.selection === index ? classString+="btn-selected": classString+="btn-neutral"
    }
    

    
    
    return(
    <button
    key={index}
    onClick={()=>{props.answerQuestion(props.id,index)}}
    className={classString}

    >{decode(answer)}</button>)})

    return(
        <div className="question">
            <p>{decode(props.question)}</p>
            {answers}
        </div>
    )
}