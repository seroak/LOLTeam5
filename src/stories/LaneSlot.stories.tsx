import type { Meta, StoryObj } from "@storybook/react-vite";
import { LaneSlot } from "../components/LaneSlot/LaneSlot";
import { DndContext } from "@dnd-kit/core";
import { PlayerCard } from "../components/PlayerCard/PlayerCard";
const meta: Meta<typeof LaneSlot> = {
  title: "Components/LaneSlot",
  component: LaneSlot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <DndContext>
        <Story />
      </DndContext>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const blueTop: Story = {
  args: {
    id: "blue-Top",
    laneName: "Top",
    teamColor: "blue",
    children: <PlayerCard id="p1" name="Zeus" />,
  },
};
export const redTop: Story = {
  args: {
    id: "red-Top",
    laneName: "Top",
    teamColor: "red",
    children: <PlayerCard id="p1" name="Zeus" />,
  },
};
