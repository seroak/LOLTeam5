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
    if (players.length > 9) {
      alert("플레이어는 10명 초과해서 만들지 못합니다");
      return;
    }
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

  const randomAssign = () => {
    setAssignments((prev) => {
      const next = { ...prev };

      // 1. Get currently assigned player IDs
      const assignedPlayerIds = new Set(Object.values(next).filter((id) => id !== null));

      // 2. Get unassigned players
      const unassignedPlayers = players.filter((p) => !assignedPlayerIds.has(p.id));

      // 3. Get empty lanes
      const emptyLanes = Object.keys(next).filter((key) => next[key] === null);

      // 4. Shuffle unassigned players AND empty lanes
      const shuffledPlayers = [...unassignedPlayers].sort(() => Math.random() - 0.5);
      const shuffledLanes = [...emptyLanes].sort(() => Math.random() - 0.5);

      // 5. Assign players to empty lanes
      for (let i = 0; i < Math.min(shuffledPlayers.length, shuffledLanes.length); i++) {
        next[shuffledLanes[i]] = shuffledPlayers[i].id;
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
    randomAssign,
  };
};
