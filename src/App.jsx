import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import { useState } from "react";

function App() {
  const [movesLog, setMovesLog] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleClickedField() {
    setActivePlayer((currActive) => (currActive === "X" ? "O" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === "X"} name="Murga" move="X" />
          <Player isActive={activePlayer === "O"} name="Agrum" move="O" />
        </ol>
        <GameBoard
          onClickSquare={handleClickedField}
          activePlayerSymbol={activePlayer}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
