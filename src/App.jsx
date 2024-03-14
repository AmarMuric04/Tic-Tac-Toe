import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winningCombinations";

const PLAYERS = {
  X: "Murga",
  O: "Agrum",
};

const INITIAL_GAMEBORD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function switchPlayer(movesLog) {
  let currentPlayer = "X";

  if (movesLog.length > 0 && movesLog[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

function getWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol];
  }

  return winner;
}

function getBoard(movesLog) {
  let gameBoard = [...INITIAL_GAMEBORD.map((innerArrays) => [...innerArrays])];

  for (const turn of movesLog) {
    const { square, player } = turn;
    const { row: rowIndex, col: colIndex } = square;

    gameBoard[rowIndex][colIndex] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [movesLog, setMovesLog] = useState([]);

  const activePlayer = switchPlayer(movesLog);
  const gameBoard = getBoard(movesLog);
  const winner = getWinner(gameBoard, players);
  const hasDraw = movesLog.length === 9 && !winner;

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

  function handleRestart() {
    setMovesLog([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "X"}
            name={PLAYERS.X}
            move="X"
          />
          <Player
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "O"}
            name={PLAYERS.O}
            move="O"
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onClickSquare={handleClickedField} board={gameBoard} />
      </div>
      <Log movesLog={movesLog} />
    </main>
  );
}

export default App;
