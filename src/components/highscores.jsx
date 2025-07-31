export default function Highscores(props) {
    // Mock data for demonstration - this will be replaced with real data later
    const mockScores = [
        { id: 1, player: "Player 1", score: 85, category: "General Knowledge", date: "2024-01-15" },
        { id: 2, player: "Player 2", score: 92, category: "Science & Nature", date: "2024-01-14" },
        { id: 3, player: "Player 3", score: 78, category: "History", date: "2024-01-13" },
        { id: 4, player: "Player 4", score: 95, category: "Geography", date: "2024-01-12" },
        { id: 5, player: "Player 5", score: 88, category: "Music", date: "2024-01-11" },
    ];

    return (
        <main className="content-center">
            <div className="highscores-container">
                <h1>🏆 High Scores</h1>
                <p className="highscores-subtitle">Top quiz performances</p>
                
                <div className="scores-table-container">
                    <table className="scores-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player</th>
                                <th>Score</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockScores.map((score, index) => (
                                <tr key={score.id} className={index < 3 ? `top-${index + 1}` : ''}>
                                    <td className="rank">
                                        {index === 0 && "🥇"}
                                        {index === 1 && "🥈"}
                                        {index === 2 && "🥉"}
                                        {index > 2 && `#${index + 1}`}
                                    </td>
                                    <td className="player-name">{score.player}</td>
                                    <td className="score">{score.score}%</td>
                                    <td className="category">{score.category}</td>
                                    <td className="date">{score.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="highscores-actions">
                    <button className="btn-back" onClick={props.goBack}>
                        ← Back to Menu
                    </button>
                </div>
            </div>
        </main>
    );
}
