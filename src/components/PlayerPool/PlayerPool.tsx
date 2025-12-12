import { useDroppable } from "@dnd-kit/core";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import type { Player } from "../../hooks/useTeamState";
import "./PlayerPool.css";
interface PlayerPoolProps {
  players: Player[];
  assignments: { [key: string]: string | null };
  onRemovePlayer?: (id: string) => void;
}

export const PlayerPool = ({ players, assignments, onRemovePlayer }: PlayerPoolProps) => {
  const { setNodeRef } = useDroppable({
    id: "player-pool",
  });

  // Filter players who are NOT assigned to any lane
  const unassignedPlayers = players.filter((p) => {
    return !Object.values(assignments).includes(p.id);
  });

  return (
    <div className="player-pool-container">
      <h3 className="pool-header">대기 중인 소환사</h3>
      <div ref={setNodeRef} className="player-pool">
        {unassignedPlayers.length === 0 ? (
          <div className="empty-pool-msg">대기 중인 소환사 없습니다...</div>
        ) : (
          unassignedPlayers.map((p) => (
            <PlayerCard key={p.id} id={p.id} name={p.name} handleRemovePlayer={onRemovePlayer} />
          ))
        )}
      </div>
    </div>
  );
};
