import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./LaneSlot.css";

interface LaneSlotProps {
  id: string;
  laneName: string; // e.g., 'Top', 'Jungle'
  teamColor: "blue" | "red";
  children?: React.ReactNode;
}

export const LaneSlot = ({ id, laneName, teamColor, children }: LaneSlotProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { laneName, teamColor },
  });

  const style = {
    borderColor: isOver ? "var(--hex-cyan)" : undefined,
    boxShadow: isOver ? "var(--glow-cyan)" : undefined,
  };

  return (
    <div ref={setNodeRef} className={`lane-slot ${teamColor}`} style={style}>
      <div className="lane-label">{laneName}</div>
      <div className="lane-content">{children}</div>
    </div>
  );
};
