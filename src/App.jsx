import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import { useState } from "react";

function App() {
  const [movesLog, setMovesLog] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleClickedField(rowIndex, colIndex) {
    setActivePlayer((currActive) => (currActive === "X" ? "O" : "X"));
    setMovesLog((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X")
        currentPlayer = "O";

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === "X"} name="Murga" move="X" />
          <Player isActive={activePlayer === "O"} name="Agrum" move="O" />
        </ol>
        <GameBoard onClickSquare={handleClickedField} movesLog={movesLog} />
      </div>
      <Log movesLog={movesLog} />
    </main>
  );
}

export default App;
