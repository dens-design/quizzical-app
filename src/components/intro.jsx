export default function Intro(props){
    return(
    <main className="content-center">
        <h1>Quizzical</h1>
        <p>Find out how your good your trivia knowledge is</p>
        <button className="btn-intro" onClick={props.startGame}>Start quiz</button>
    </main>
)
}