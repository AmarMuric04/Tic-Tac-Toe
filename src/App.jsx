import Player from "./components/Player";

function App() {

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Murga" move="X" />
          <Player name="Agrum" move="O" />
        </ol>
      </div>
    </main>
  );
}

export default App;
