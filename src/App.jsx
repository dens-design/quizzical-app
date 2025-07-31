import { useState } from 'react'
import Game from "./components/game"
import Intro from "./components/intro"
import Highscores from "./components/highscores"

function App() {
  const [currentPage, setCurrentPage] = useState('intro') // 'intro', 'game', 'highscores'
  
  function startGame(){
    setCurrentPage('game')
  }

  function showHighscores(){
    setCurrentPage('highscores')
  }

  function goBack(){
    setCurrentPage('intro')
  }

  return (
    <>
      {currentPage === 'game' && <Game/>}
      {currentPage === 'intro' && <Intro startGame={startGame} showHighscores={showHighscores}/>}
      {currentPage === 'highscores' && <Highscores goBack={goBack}/>}
    </>
  )
}

export default App
