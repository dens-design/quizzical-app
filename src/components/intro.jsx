export default function Intro(props){
    return(
    <main>
        <h1>Quizzical</h1>
        <p>Find out how your good your trivia knowledge is</p>
        <button onClick={props.startGame}>Start quiz</button>
    </main>
)
}