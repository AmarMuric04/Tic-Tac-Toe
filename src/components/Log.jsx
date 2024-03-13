export default function Log({ movesLog }) {
  console.log(movesLog);
  return (
    <ol id="log">
      {movesLog.map((move, i) => (
        <li key={i}>
          {movesLog.length - i}: {move.player} Played at {move.square.row}{" "}
          {move.square.col}
        </li>
      ))}
    </ol>
  );
}
