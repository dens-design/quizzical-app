import { useState } from 'react'
import Game from "./components/game"
import Intro from "./components/intro"


function App() {
  const [gameRunning, setGameRunning] = useState(false)
  
  function startGame(){
    setGameRunning(true)
  }

  return (
    <>
    {gameRunning ? <Game/> : <Intro startGame={startGame}/>}
    </>
  )
}

export default App
