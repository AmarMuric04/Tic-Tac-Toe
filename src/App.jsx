import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winningCombinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function switchPlayer(movesLog) {
  let currentPlayer = "X";

  if (movesLog.length > 0 && movesLog[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

function App() {
  const [movesLog, setMovesLog] = useState([]);

  const activePlayer = switchPlayer(movesLog);

  let gameBoard = initialGameBoard;

  for (const turn of movesLog) {
    const { square, player } = turn;
    const { row: rowIndex, col: colIndex } = square;

    gameBoard[rowIndex][colIndex] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    /*prettier-ignore */
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    /*prettier-ignore */
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column]
    /*prettier-ignore */
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    )
      winner = firstSquareSymbol;
  }
  function handleClickedField(rowIndex, colIndex) {
    setMovesLog((prevTurns) => {
      const currentPlayer = switchPlayer(prevTurns);

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
        {winner && <GameOver winner={winner} />}
        <GameBoard onClickSquare={handleClickedField} board={gameBoard} />
      </div>
      <Log movesLog={movesLog} />
    </main>
  );
}

export default App;
