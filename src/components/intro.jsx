export default function Intro(props){
    const categories = [
        { id: 9, name: "General Knowledge", icon: "🧠" },
        { id: 10, name: "Books", icon: "📚" },
        { id: 11, name: "Film", icon: "🎬" },
        { id: 12, name: "Music", icon: "🎵" },
        { id: 14, name: "Television", icon: "📺" },
        { id: 15, name: "Video Games", icon: "🎮" },
        { id: 17, name: "Science & Nature", icon: "🔬" },
        { id: 18, name: "Computers", icon: "💻" },
        { id: 19, name: "Mathematics", icon: "📐" },
        { id: 20, name: "Mythology", icon: "🏛️" },
        { id: 21, name: "Sports", icon: "⚽" },
        { id: 22, name: "Geography", icon: "🌍" },
        { id: 23, name: "History", icon: "📜" },
        { id: 24, name: "Politics", icon: "🏛️" },
        { id: 25, name: "Art", icon: "🎨" },
        { id: 27, name: "Animals", icon: "🐾" },
        { id: 28, name: "Vehicles", icon: "🚗" },
        { id: 29, name: "Comics", icon: "💥" },
        { id: 30, name: "Gadgets", icon: "📱" },
        { id: 32, name: "Cartoons & Animations", icon: "🎭" }
    ];

    return(
    <main className="content-center">
        <h1>Quizzical</h1>
        <p>Find out how your good your trivia knowledge is</p>
        <div className="intro-buttons">
            <button className="btn-intro" onClick={props.startGame}>Start quiz</button>
            {/*<button className="btn-highscores" onClick={props.showHighscores}>🏆 View High Scores</button>*/}
        </div>
    </main>
)
}