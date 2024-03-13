import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleClickedField(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      /*prettier-ignore */
      const newGameBoard = [...prevGameBoard.map(innerArray=> [...innerArray])];

      newGameBoard[rowIndex][colIndex] = "X";
      return newGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li
                onClick={handleClickedField.bind(null, rowIndex, colIndex)}
                key={colIndex}
              >
                <button>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
