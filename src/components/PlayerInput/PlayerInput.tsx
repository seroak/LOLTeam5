import React, { useState } from "react";
import "./PlayerInput.css";
interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({ onAddPlayer }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName("");
    }
  };

  return (
    <form className="player-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="player-input"
        placeholder="Enter summoner name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
};
