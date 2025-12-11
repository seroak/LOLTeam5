import { useState } from "react";

export interface Player {
  id: string;
  name: string;
}

export type Lane = "Top" | "Jungle" | "Mid" | "ADC" | "Support";
export type Team = "blue" | "red";

export interface Assignment {
  [key: string]: string | null; // key: "blue-Top", value: playerId
}

export const useTeamState = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [assignments, setAssignments] = useState<Assignment>({
    "blue-Top": null,
    "blue-Jungle": null,
    "blue-Mid": null,
    "blue-ADC": null,
    "blue-Support": null,
    "red-Top": null,
    "red-Jungle": null,
    "red-Mid": null,
    "red-ADC": null,
    "red-Support": null,
  });

  const addPlayer = (name: string) => {
    const newPlayer = { id: crypto.randomUUID(), name };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    // Also remove from assignments
    setAssignments((prev) => {
      const next = { ...prev };
      for (const [key, _] of Object.entries(next)) {
        if (next[key] === id) {
          next[key] = null;
        }
      }
      return next;
    });
  };

  const assignPlayer = (playerId: string, laneId: string) => {
    setAssignments((prev) => {
      const next = { ...prev };
      // If player was already assigned somewhere, clear it

      for (const [key, _] of Object.entries(next)) {
        if (next[key] === playerId) {
          next[key] = null;
        }
      }
      // Assign to new lane
      next[laneId] = playerId;
      return next;
    });
  };

  const unassignPlayer = (playerId: string) => {
    setAssignments((prev) => {
      const next = { ...prev };
      for (const [key, _] of Object.entries(next)) {
        if (next[key] === playerId) {
          next[key] = null;
        }
      }
      return next;
    });
  };

  return {
    players,
    assignments,
    addPlayer,
    removePlayer,
    assignPlayer,
    unassignPlayer,
  };
};
