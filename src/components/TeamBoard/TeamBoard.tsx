import { LaneSlot } from "../LaneSlot/LaneSlot";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import type { Assignment, Player } from "../../hooks/useTeamState";
import "./TeamBoard.css";
interface TeamBoardProps {
  assignments: Assignment;
  players: Player[];
  onRemovePlayer?: (id: string) => void;
}

const LANES = ["Top", "Jungle", "Mid", "ADC", "Support"];

export const TeamBoard = ({ assignments, players, onRemovePlayer }: TeamBoardProps) => {
  const getPlayerInSlot = (slotId: string) => {
    const playerId = assignments[slotId];
    if (!playerId) return null;
    return players.find((p) => p.id === playerId);
  };

  return (
    <div className="team-board">
      <div className="team-column blue-team">
        <h2 className="team-header blue">Blue Team</h2>
        {LANES.map((lane) => {
          const slotId = `blue-${lane}`;
          const player = getPlayerInSlot(slotId);
          return (
            <LaneSlot key={slotId} id={slotId} laneName={lane} teamColor="blue">
              {player && <PlayerCard id={player.id} name={player.name} handleRemovePlayer={onRemovePlayer} />}
            </LaneSlot>
          );
        })}
      </div>

      <div className="vs-divider">
        <div className="vs-text">VS</div>
      </div>

      <div className="team-column red-team">
        <h2 className="team-header red">Red Team</h2>
        {LANES.map((lane) => {
          const slotId = `red-${lane}`;
          const player = getPlayerInSlot(slotId);
          return (
            <LaneSlot key={slotId} id={slotId} laneName={lane} teamColor="red">
              {player && <PlayerCard id={player.id} name={player.name} handleRemovePlayer={onRemovePlayer} />}
            </LaneSlot>
          );
        })}
      </div>
    </div>
  );
};
