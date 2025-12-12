import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { TeamBoard } from "./components/TeamBoard/TeamBoard";
import { PlayerPool } from "./components/PlayerPool/PlayerPool";
import { PlayerInput } from "./components/PlayerInput/PlayerInput";
import { PlayerCard } from "./components/PlayerCard/PlayerCard";
import { useTeamState } from "./hooks/useTeamState";
import "./App.css";

function App() {
  const { players, assignments, addPlayer, removePlayer, assignPlayer, unassignPlayer, randomAssign } = useTeamState();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const playerId = active.id as string;
    const targetId = over.id as string;

    if (targetId === "player-pool") {
      unassignPlayer(playerId);
    } else if (targetId.startsWith("blue-") || targetId.startsWith("red-")) {
      assignPlayer(playerId, targetId);
    }
  };

  const activePlayer = activeId ? players.find((p) => p.id === activeId) : null;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>LoL Team Builder</h1>
      </header>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="main-content">
          <div className="input-section">
            <PlayerInput onAddPlayer={addPlayer} />
            <button className="random-assign-btn" onClick={randomAssign}>
              랜덤 배치
            </button>
          </div>

          <TeamBoard assignments={assignments} players={players} onRemovePlayer={removePlayer} />

          <PlayerPool players={players} assignments={assignments} onRemovePlayer={removePlayer} />
        </div>

        <DragOverlay>
          {activePlayer ? (
            <PlayerCard id={activePlayer.id} name={activePlayer.name} handleRemovePlayer={removePlayer} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
