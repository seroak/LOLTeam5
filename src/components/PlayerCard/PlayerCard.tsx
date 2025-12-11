import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./PlayerCard.css";

interface PlayerCardProps {
  id: string;
  name: string;
  handleRemovePlayer?: (id: string) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ id, name, handleRemovePlayer }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { name },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="player-card group">
      <div className="player-card-inner">
        <span className="player-name">{name}</span>
        {handleRemovePlayer && (
          <button
            className="remove-player-btn"
            onPointerDown={(e) => {
              e.stopPropagation(); // Prevent drag start
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleRemovePlayer(id);
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
