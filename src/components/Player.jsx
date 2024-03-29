import { useState } from "react";
export default function Player({ name, move, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState();

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    isEditing ? onChangeName(symbol, playerName) : null;
  }

  function handleValueChange(event) {
    setPlayerName(event.target.value);
  }

  let nameText = <span className="player-name">{playerName}</span>;
  let editText = "Edit";

  if (isEditing) {
    nameText = (
      <input
        value={playerName}
        type="text"
        required
        onChange={handleValueChange}
      />
    );
    editText = "Save";
  }
  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {nameText}
        <span className="player-symbol">{move}</span>
      </span>
      <button onClick={handleEditClick}>{editText}</button>
    </li>
  );
}
