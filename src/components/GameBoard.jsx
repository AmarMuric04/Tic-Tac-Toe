const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onClickSquare, movesLog }) {
  let gameBoard = initialGameBoard;

  for (const turn of movesLog) {
    const { square, player } = turn;
    const { row: rowIndex, col: colIndex } = square;

    gameBoard[rowIndex][colIndex] = player;
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li
                onClick={onClickSquare.bind(null, rowIndex, colIndex)}
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
