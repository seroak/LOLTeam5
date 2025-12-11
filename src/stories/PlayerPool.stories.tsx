import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerPool } from "../components/PlayerPool/PlayerPool";
import { DndContext } from "@dnd-kit/core";

const meta: Meta<typeof PlayerPool> = {
  title: "Components/PlayerPool",
  component: PlayerPool,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <DndContext>
        <div style={{ width: "800px" }}>
          <Story />
        </div>
      </DndContext>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPlayers = [
  { id: "p1", name: "Zeus" },
  { id: "p2", name: "Oner" },
  { id: "p3", name: "Faker" },
];

export const WithPlayers: Story = {
  args: {
    players: mockPlayers,
    assignments: {},
  },
};

export const Empty: Story = {
  args: {
    players: [],
    assignments: {},
  },
};

export const SomeAssigned: Story = {
  args: {
    players: mockPlayers,
    assignments: {
      "blue-Top": "p1",
    },
  },
};
