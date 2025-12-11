import type { Meta, StoryObj } from "@storybook/react-vite";
import { TeamBoard } from "../components/TeamBoard/TeamBoard";
import { DndContext } from "@dnd-kit/core";

const meta: Meta<typeof TeamBoard> = {
  title: "Components/TeamBoard",
  component: TeamBoard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <DndContext>
        <div style={{ padding: "20px", minHeight: "100vh" }}>
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
  { id: "p4", name: "Gumayusi" },
  { id: "p5", name: "Keria" },
];

export const Empty: Story = {
  args: {
    assignments: {},
    players: mockPlayers,
  },
};

export const FullTeam: Story = {
  args: {
    assignments: {
      "blue-Top": "p1",
      "blue-Jungle": "p2",
      "blue-Mid": "p3",
      "blue-ADC": "p4",
      "blue-Support": "p5",
    },
    players: mockPlayers,
  },
};
